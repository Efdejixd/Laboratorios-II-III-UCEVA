import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListPageComponent } from './pages/student-list-page.component';
import { StudentDetailPageComponent } from './pages/student-detail-page.component';
import { StudentFormPageComponent } from './pages/student-form-page.component';
const routes: Routes = [
  { path: '', component: StudentListPageComponent },
  { path: 'new', component: StudentFormPageComponent },
  { path: ':id/edit', component: StudentFormPageComponent },
  { path: ':id', component: StudentDetailPageComponent }
];
@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class StudentsRoutingModule {}
