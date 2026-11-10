import { Component, OnInit } from '@angular/core';
    import { FormBuilder, Validators } from '@angular/forms';
    import { ActivatedRoute, Router } from '@angular/router';
    import { CourseService } from '../course.service';
    import { CoursePayload, CreateCoursePayload } from '../course.model';
    import { apiErrorMessage } from '../../../core/error-message';

    @Component({ selector: 'app-course-form-page', standalone: false, templateUrl: './course-form-page.component.html' })
    export class CourseFormPageComponent implements OnInit {
      readonly form = this.fb.group({
name: ['', [Validators.required, Validators.maxLength(100)]],
description: ['', [Validators.required]],
credits: [1, [Validators.required, Validators.min(1), Validators.max(10), Validators.pattern(/^[0-9]+$/)]],
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
        private readonly service: CourseService,
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
            else this.form.patchValue(record);
            this.loading = false;
          },
          error: error => { this.errorMessage = apiErrorMessage(error); this.recordNotFound = true; this.loading = false; }
        });
      }
      submit(): void {
        this.form.markAllAsTouched();
        if (this.form.invalid || this.loading || this.saving || this.recordNotFound) return;
        this.errorMessage = '';
        const payload: CoursePayload = {
  name: String(this.form.value.name ?? '').trim(),
  description: String(this.form.value.description ?? '').trim(),
  credits: Number(this.form.value.credits),
  semester: Number(this.form.value.semester),
  status: this.form.value.status === true
        };
const request = this.editId === null ? this.service.create(payload) : this.service.update(this.editId, payload);
        this.saving = true;
        request.subscribe({
          next: () => void this.router.navigate(['/courses']),
          error: error => { this.errorMessage = apiErrorMessage(error); this.saving = false; }
        });
      }
    }
