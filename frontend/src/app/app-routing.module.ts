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
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { GivingGardenComponent } from './pages/giving-garden/giving-garden.component';
import { AssessmentsComponent } from './pages/assessments/assessments.component';
import { AboutComponent } from './pages/home-pages/about/about.component';
import { SolutionsComponent } from './pages/home-pages/solutions/solutions.component';
import { PricingComponent } from './pages/home-pages/pricing/pricing.component';

const routes: Routes = [
  { path: 'signup', component: LoginSignupComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'solutions', component: SolutionsComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },

  // I added this here
  {
    path: 'course/:id/assessments',
    component: AssessmentsComponent,
    canActivate: [AuthGuard],
  },

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
  { path: 'socialinitiatives', component: GivingGardenComponent },
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
  {
    path: 'search/:type/:query',
    component: SearchResultsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'search', redirectTo: 'dashboard', canActivate: [AuthGuard] },
  { path: 'search/:type', redirectTo: 'dashboard', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
