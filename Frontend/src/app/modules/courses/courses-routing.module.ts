import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListPageComponent } from './pages/course-list-page.component';
import { CourseDetailPageComponent } from './pages/course-detail-page.component';
import { CourseFormPageComponent } from './pages/course-form-page.component';
const routes: Routes = [
  { path: '', component: CourseListPageComponent },
  { path: 'new', component: CourseFormPageComponent },
  { path: ':id/edit', component: CourseFormPageComponent },
  { path: ':id', component: CourseDetailPageComponent }
];
@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class CoursesRoutingModule {}
