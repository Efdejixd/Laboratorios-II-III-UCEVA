import { Component, OnInit } from '@angular/core';
import { Course } from '../course.model';
import { CourseService } from '../course.service';
import { apiErrorMessage } from '../../../core/error-message';

@Component({ selector: 'app-course-list-page', standalone: false, templateUrl: './course-list-page.component.html' })
export class CourseListPageComponent implements OnInit {
  records: Course[] = [];
  loading = false;
  errorMessage = '';
  busyId: number | null = null;
  constructor(private readonly service: CourseService) {}
  ngOnInit(): void { this.load(); }
  load(): void {
    this.loading = true;
    this.errorMessage = '';
    this.service.getAll().subscribe({
      next: records => { this.records = records; this.loading = false; },
      error: error => { this.errorMessage = apiErrorMessage(error); this.loading = false; }
    });
  }
  remove(record: Course): void {
    if (!window.confirm(`¿Eliminar el registro #${record.id}? Esta acción no se puede deshacer.`)) return;
    this.busyId = record.id;
    this.errorMessage = '';
    this.service.delete(record.id).subscribe({
      next: response => {
        this.busyId = null;
        if (response.result) this.load();
        else this.errorMessage = 'No se pudo eliminar el registro.';
      },
      error: error => { this.errorMessage = apiErrorMessage(error); this.busyId = null; }
    });
  }
}
