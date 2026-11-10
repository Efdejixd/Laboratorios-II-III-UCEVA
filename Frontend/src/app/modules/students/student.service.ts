import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../core/api.config';
import { Student, StudentPayload, CreateStudentPayload } from './student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private readonly url = `${API_BASE_URL}/students`;
  constructor(private readonly http: HttpClient) {}
  getAll(): Observable<Student[]> { return this.http.get<Student[]>(this.url); }
  getById(id: number): Observable<Student> { return this.http.get<Student>(`${this.url}/${id}`); }
  create(value: CreateStudentPayload): Observable<Student> { return this.http.post<Student>(this.url, value); }
  update(id: number, value: StudentPayload): Observable<Student> { return this.http.put<Student>(`${this.url}/${id}`, value); }
  delete(id: number): Observable<{result: boolean}> { return this.http.delete<{result: boolean}>(`${this.url}/${id}`); }
}
