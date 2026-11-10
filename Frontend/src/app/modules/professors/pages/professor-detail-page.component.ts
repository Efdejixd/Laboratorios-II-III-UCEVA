import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Professor } from '../professor.model';
import { ProfessorService } from '../professor.service';
import { apiErrorMessage } from '../../../core/error-message';

@Component({ selector: 'app-professor-detail-page', standalone: false, templateUrl: './professor-detail-page.component.html' })
export class ProfessorDetailPageComponent implements OnInit {
  record: Professor | null = null;
  errorMessage = '';
  loading = true;
  constructor(private readonly route: ActivatedRoute, private readonly service: ProfessorService) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isInteger(id) || id < 1) { this.errorMessage = 'Identificador inválido.'; this.loading = false; return; }
    this.service.getById(id).subscribe({
      next: record => { this.record = record; this.loading = false; if (!record) this.errorMessage = 'Registro no encontrado.'; },
      error: error => { this.errorMessage = apiErrorMessage(error); this.loading = false; }
    });
  }
}
