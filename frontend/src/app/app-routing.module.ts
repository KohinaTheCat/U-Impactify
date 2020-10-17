import { CreateCourseComponent } from './pages/create-course/create-course.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginSignupComponent } from './pages/login-signup/login-signup.component';
import { 
  AuthGuardService as AuthGuard 
} from './guard/auth-guard.service';

const routes: Routes = [
  { path: 'signup', component: LoginSignupComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'user/:id', component: LandingComponent },
  { path: '', component: LoginSignupComponent },
  { path: 'createcourse', component: CreateCourseComponent },
];

//canActivate: [AuthGuard] add this for routes that require auth.

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
