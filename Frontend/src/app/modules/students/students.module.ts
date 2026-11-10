import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentListPageComponent } from './pages/student-list-page.component';
import { StudentDetailPageComponent } from './pages/student-detail-page.component';
import { StudentFormPageComponent } from './pages/student-form-page.component';
@NgModule({
  declarations: [StudentListPageComponent, StudentDetailPageComponent, StudentFormPageComponent],
  imports: [CommonModule, ReactiveFormsModule, StudentsRoutingModule]
})
export class StudentsModule {}
