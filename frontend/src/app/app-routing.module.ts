import { CreateCourseComponent } from './pages/create-course/create-course.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginSignupComponent } from './pages/login-signup/login-signup.component';
import { 
  AuthGuardService as AuthGuard 
} from './guard/auth-guard.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'signup', component: LoginSignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: LoginSignupComponent },
];

//canActivate: [AuthGuard] add this for routes that require auth.

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
