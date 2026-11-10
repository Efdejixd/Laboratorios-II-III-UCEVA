import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClassroomsRoutingModule } from './classrooms-routing.module';
import { ClassroomListPageComponent } from './pages/classroom-list-page.component';
import { ClassroomDetailPageComponent } from './pages/classroom-detail-page.component';
import { ClassroomFormPageComponent } from './pages/classroom-form-page.component';

@NgModule({
  declarations: [ClassroomListPageComponent, ClassroomDetailPageComponent, ClassroomFormPageComponent],
  imports: [CommonModule, ReactiveFormsModule, ClassroomsRoutingModule]
})
export class ClassroomsModule {}
