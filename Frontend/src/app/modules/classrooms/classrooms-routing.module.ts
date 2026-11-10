import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassroomListPageComponent } from './pages/classroom-list-page.component';
import { ClassroomDetailPageComponent } from './pages/classroom-detail-page.component';
import { ClassroomFormPageComponent } from './pages/classroom-form-page.component';

const routes: Routes = [
  { path: '', component: ClassroomListPageComponent },
  { path: 'new', component: ClassroomFormPageComponent },
  { path: ':id/edit', component: ClassroomFormPageComponent },
  { path: ':id', component: ClassroomDetailPageComponent }
];
@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class ClassroomsRoutingModule {}
