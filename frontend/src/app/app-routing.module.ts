import { CoursePreviewComponent } from './pages/course-preview/course-preview.component';
import { EnrollCourseComponent } from './pages/enroll-course/enroll-course.component';
import { SignupQuestionaireComponent } from './pages/signup-questionaire/signup-questionaire.component';
import { CreateCourseComponent } from './pages/create-course/create-course.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginSignupComponent } from './pages/login-signup/login-signup.component';
import { CourseComponent } from './pages/course/course.component';
import { SignupQuestionaire2Component } from './pages/signup-questionaire2/signup-questionaire2.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { GlobalProfileComponent} from './components/profile-components/global-profile/global-profile.component'
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  { path: 'signup', component: LoginSignupComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'questionaire', component: SignupQuestionaireComponent },
  { path: 'questionaire2', component: SignupQuestionaire2Component },
  { path: 'course/:id', component: CourseComponent },
  { path: 'createcourse', component: CreateCourseComponent, canActivate: [AuthGuard]  },
  { path: 'enrollcourse', component: EnrollCourseComponent, canActivate: [AuthGuard]  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'user/:username', component: GlobalProfileComponent },
  {path: 'user', redirectTo: 'dashboard', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
