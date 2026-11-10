import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessorListPageComponent } from './pages/professor-list-page.component';
import { ProfessorDetailPageComponent } from './pages/professor-detail-page.component';
import { ProfessorFormPageComponent } from './pages/professor-form-page.component';

const routes: Routes = [
  { path: '', component: ProfessorListPageComponent },
  { path: 'new', component: ProfessorFormPageComponent },
  { path: ':id/edit', component: ProfessorFormPageComponent },
  { path: ':id', component: ProfessorDetailPageComponent }
];
@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class ProfessorsRoutingModule {}
