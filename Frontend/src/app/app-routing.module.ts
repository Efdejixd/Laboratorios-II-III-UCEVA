import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'students', loadChildren: () => import('./modules/students/students.module').then(m => m.StudentsModule) },
  { path: 'courses', loadChildren: () => import('./modules/courses/courses.module').then(m => m.CoursesModule) },
  { path: 'professors', loadChildren: () => import('./modules/professors/professors.module').then(m => m.ProfessorsModule) },
  { path: 'classrooms', loadChildren: () => import('./modules/classrooms/classrooms.module').then(m => m.ClassroomsModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
