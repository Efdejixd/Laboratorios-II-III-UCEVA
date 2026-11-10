import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseListPageComponent } from './pages/course-list-page.component';
import { CourseDetailPageComponent } from './pages/course-detail-page.component';
import { CourseFormPageComponent } from './pages/course-form-page.component';
@NgModule({
  declarations: [CourseListPageComponent, CourseDetailPageComponent, CourseFormPageComponent],
  imports: [CommonModule, ReactiveFormsModule, CoursesRoutingModule]
})
export class CoursesModule {}
