import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfessorsRoutingModule } from './professors-routing.module';
import { ProfessorListPageComponent } from './pages/professor-list-page.component';
import { ProfessorDetailPageComponent } from './pages/professor-detail-page.component';
import { ProfessorFormPageComponent } from './pages/professor-form-page.component';

@NgModule({
  declarations: [ProfessorListPageComponent, ProfessorDetailPageComponent, ProfessorFormPageComponent],
  imports: [CommonModule, ReactiveFormsModule, ProfessorsRoutingModule]
})
export class ProfessorsModule {}
