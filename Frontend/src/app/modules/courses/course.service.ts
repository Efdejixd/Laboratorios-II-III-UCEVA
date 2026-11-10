import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../core/api.config';
import { Course, CoursePayload, CreateCoursePayload } from './course.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private readonly url = `${API_BASE_URL}/courses`;
  constructor(private readonly http: HttpClient) {}
  getAll(): Observable<Course[]> { return this.http.get<Course[]>(this.url); }
  getById(id: number): Observable<Course> { return this.http.get<Course>(`${this.url}/${id}`); }
  create(value: CreateCoursePayload): Observable<Course> { return this.http.post<Course>(this.url, value); }
  update(id: number, value: CoursePayload): Observable<Course> { return this.http.put<Course>(`${this.url}/${id}`, value); }
  delete(id: number): Observable<{result: boolean}> { return this.http.delete<{result: boolean}>(`${this.url}/${id}`); }
}
