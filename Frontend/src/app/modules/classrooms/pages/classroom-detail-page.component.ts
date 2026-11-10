import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Classroom } from '../classroom.model';
import { ClassroomService } from '../classroom.service';
import { apiErrorMessage } from '../../../core/error-message';

@Component({ selector: 'app-classroom-detail-page', standalone: false, templateUrl: './classroom-detail-page.component.html' })
export class ClassroomDetailPageComponent implements OnInit {
  record: Classroom | null = null;
  errorMessage = '';
  loading = true;
  constructor(private readonly route: ActivatedRoute, private readonly service: ClassroomService) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isInteger(id) || id < 1) { this.errorMessage = 'Identificador inválido.'; this.loading = false; return; }
    this.service.getById(id).subscribe({
      next: record => { this.record = record; this.loading = false; if (!record) this.errorMessage = 'Registro no encontrado.'; },
      error: error => { this.errorMessage = apiErrorMessage(error); this.loading = false; }
    });
  }
}
