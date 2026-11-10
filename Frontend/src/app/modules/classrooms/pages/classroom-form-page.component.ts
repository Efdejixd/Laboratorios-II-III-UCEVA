import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from '../classroom.service';
import { ClassroomPayload } from '../classroom.model';
import { apiErrorMessage } from '../../../core/error-message';

@Component({ selector: 'app-classroom-form-page', standalone: false, templateUrl: './classroom-form-page.component.html' })
export class ClassroomFormPageComponent implements OnInit {
  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
building: ['', [Validators.required, Validators.maxLength(100)]],
capacity: [1, [Validators.required, Validators.min(1), Validators.max(300), Validators.pattern(/^[0-9]+$/)]],
status: [true]
  });
  editId: number | null = null;
  recordNotFound = false;
  saving = false;
  loading = false;
  errorMessage = '';
  constructor(
    private readonly fb: FormBuilder,
    private readonly service: ClassroomService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param === null) return;
    const id = Number(param);
    if (!Number.isInteger(id) || id < 1) { this.errorMessage = 'Identificador inválido.'; return; }
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
    const value: ClassroomPayload = {
      name: String(this.form.value.name).trim(),
  building: String(this.form.value.building).trim(),
  capacity: Number(this.form.value.capacity),
  status: this.form.value.status === true
    };
    this.saving = true;
    const request = this.editId === null ? this.service.create(value) : this.service.update(this.editId, value);
    request.subscribe({
      next: () => void this.router.navigate(['/classrooms']),
      error: error => { this.errorMessage = apiErrorMessage(error); this.saving = false; }
    });
  }
}
