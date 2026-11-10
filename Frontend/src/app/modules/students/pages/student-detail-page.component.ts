import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../student.model';
import { StudentService } from '../student.service';
import { apiErrorMessage } from '../../../core/error-message';
@Component({ selector: 'app-student-detail-page', standalone: false, templateUrl: './student-detail-page.component.html' })
export class StudentDetailPageComponent implements OnInit {
  record: Student | null = null;
  errorMessage = '';
  loading = true;
  constructor(private readonly route: ActivatedRoute, private readonly service: StudentService) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isInteger(id) || id < 1) { this.errorMessage = 'Identificador inválido.'; this.loading = false; return; }
    this.service.getById(id).subscribe({
      next: record => { this.record = record; this.loading = false; if (!record) this.errorMessage = 'Registro no encontrado.'; },
      error: error => { this.errorMessage = apiErrorMessage(error); this.loading = false; }
    });
  }
}
