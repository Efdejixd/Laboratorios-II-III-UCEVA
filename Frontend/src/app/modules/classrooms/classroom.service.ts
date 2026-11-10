import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../core/api.config';
import { Classroom, ClassroomPayload } from './classroom.model';

@Injectable({ providedIn: 'root' })
export class ClassroomService {
  private readonly url = `${API_BASE_URL}/classrooms`;
  constructor(private readonly http: HttpClient) {}
  getAll(): Observable<Classroom[]> { return this.http.get<Classroom[]>(this.url); }
  getById(id: number): Observable<Classroom> { return this.http.get<Classroom>(`${this.url}/${id}`); }
  create(value: ClassroomPayload): Observable<Classroom> { return this.http.post<Classroom>(this.url, value); }
  update(id: number, value: ClassroomPayload): Observable<Classroom> { return this.http.put<Classroom>(`${this.url}/${id}`, value); }
  delete(id: number): Observable<{result: boolean}> { return this.http.delete<{result: boolean}>(`${this.url}/${id}`); }
}
