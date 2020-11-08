import { ChatComponent } from './pages/chat/chat.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CourseComponent } from './pages/course/course.component';
import { CreateCourseComponent } from './pages/create-course/create-course.component';
import { CoursePreviewComponent } from './pages/course-preview/course-preview.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EnrollCourseComponent } from './pages/enroll-course/enroll-course.component';
import { LoginSignupComponent } from './pages/login-signup/login-signup.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SignupQuestionaireComponent } from './pages/signup-questionaire/signup-questionaire.component';
import { SignupQuestionaire2Component } from './pages/signup-questionaire2/signup-questionaire2.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

const routes: Routes = [
  { path: 'signup', component: LoginSignupComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  {
    path: 'questionaire',
    component: SignupQuestionaireComponent,
    canDeactivate: [AuthGuard],
  },
  {
    path: 'questionaire2',
    component: SignupQuestionaire2Component,
    canDeactivate: [AuthGuard],
  },
  { path: 'course', component: CourseComponent },
  { path: 'course/:id', component: CoursePreviewComponent },
  {
    path: 'createcourse',
    component: CreateCourseComponent,
    canActivate: [AuthGuard],
  },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  {
    path: 'enrollcourse',
    component: EnrollCourseComponent,
    canActivate: [AuthGuard],
  },
  { path: 'user/:username', component: UserProfileComponent },
  { path: 'user', redirectTo: 'dashboard', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
