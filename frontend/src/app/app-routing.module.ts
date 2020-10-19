import { EnrollCourseComponent } from './pages/enroll-course/enroll-course.component';
import { CreateCourseComponent } from './pages/create-course/create-course.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginSignupComponent } from './pages/login-signup/login-signup.component';
import { CourseComponent } from './pages/course/course.component';

const routes: Routes = [
  { path: 'signup', component: LoginSignupComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'course', component: CourseComponent },
  { path: 'createcourse', component: CreateCourseComponent },
  { path: 'enrollcourse', component: EnrollCourseComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
