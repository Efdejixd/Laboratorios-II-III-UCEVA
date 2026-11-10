import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessorService } from '../professor.service';
import { ProfessorPayload } from '../professor.model';
import { apiErrorMessage } from '../../../core/error-message';

@Component({ selector: 'app-professor-form-page', standalone: false, templateUrl: './professor-form-page.component.html' })
export class ProfessorFormPageComponent implements OnInit {
  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
department: ['', [Validators.required, Validators.maxLength(100)]],
status: [true]
  });
  editId: number | null = null;
  recordNotFound = false;
  saving = false;
  loading = false;
  errorMessage = '';
  constructor(
    private readonly fb: FormBuilder,
    private readonly service: ProfessorService,
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
    const value: ProfessorPayload = {
      name: String(this.form.value.name).trim(),
  email: String(this.form.value.email).trim(),
  department: String(this.form.value.department).trim(),
  status: this.form.value.status === true
    };
    this.saving = true;
    const request = this.editId === null ? this.service.create(value) : this.service.update(this.editId, value);
    request.subscribe({
      next: () => void this.router.navigate(['/professors']),
      error: error => { this.errorMessage = apiErrorMessage(error); this.saving = false; }
    });
  }
}
