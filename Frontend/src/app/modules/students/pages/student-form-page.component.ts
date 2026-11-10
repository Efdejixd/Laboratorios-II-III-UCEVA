import { Component, OnInit } from '@angular/core';
    import { FormBuilder, Validators } from '@angular/forms';
    import { ActivatedRoute, Router } from '@angular/router';
    import { StudentService } from '../student.service';
    import { StudentPayload, CreateStudentPayload } from '../student.model';
    import { apiErrorMessage } from '../../../core/error-message';

    @Component({ selector: 'app-student-form-page', standalone: false, templateUrl: './student-form-page.component.html' })
    export class StudentFormPageComponent implements OnInit {
      readonly form = this.fb.group({
id: [1, [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]+$/)]],
name: ['', [Validators.required, Validators.maxLength(100)]],
email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
address: ['', [Validators.required, Validators.maxLength(150)]],
birthdate: ['', [Validators.required]],
semester: [1, [Validators.required, Validators.min(1), Validators.max(10), Validators.pattern(/^[0-9]+$/)]],
status: [true, []],
      });
      editId: number | null = null;
      recordNotFound = false;
      saving = false;
      loading = false;
      errorMessage = '';
      constructor(
        private readonly fb: FormBuilder,
        private readonly service: StudentService,
        private readonly route: ActivatedRoute,
        private readonly router: Router
      ) {}
      ngOnInit(): void {
        const param = this.route.snapshot.paramMap.get('id');
        if (param === null) return;
        const id = Number(param);
        if (!Number.isInteger(id) || id < 1) { this.errorMessage = 'Identificador inválido.'; this.recordNotFound = true; return; }
        this.editId = id;
        this.loading = true;
        this.service.getById(id).subscribe({
          next: record => {
            if (!record) { this.errorMessage = 'Registro no encontrado.'; this.recordNotFound = true; }
            else this.form.patchValue({ ...record, birthdate: String(record.birthdate).slice(0, 10) });
            this.loading = false;
          },
          error: error => { this.errorMessage = apiErrorMessage(error); this.recordNotFound = true; this.loading = false; }
        });
      }
      submit(): void {
        this.form.markAllAsTouched();
        if (this.form.invalid || this.loading || this.saving || this.recordNotFound) return;
        this.errorMessage = '';
        const payload: StudentPayload = {
  name: String(this.form.value.name ?? '').trim(),
  email: String(this.form.value.email ?? '').trim(),
  phone: String(this.form.value.phone ?? '').trim(),
  address: String(this.form.value.address ?? '').trim(),
  birthdate: String(this.form.value.birthdate ?? ''),
  semester: Number(this.form.value.semester),
  status: this.form.value.status === true
        };
const createValue: CreateStudentPayload = { id: Number(this.form.value.id), ...payload };
const request = this.editId === null ? this.service.create(createValue) : this.service.update(this.editId, payload);
        this.saving = true;
        request.subscribe({
          next: () => void this.router.navigate(['/students']),
          error: error => { this.errorMessage = apiErrorMessage(error); this.saving = false; }
        });
      }
    }
