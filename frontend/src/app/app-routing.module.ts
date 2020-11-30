import { ChatComponent } from './pages/chat/chat.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
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
import { StudentSubmissionComponent } from './pages/studentSubmissionFolder/student-submission/student-submission.component';
import { SiOpportunitiesComponent } from './pages/si-opportunities/si-opportunities.component';
import { CourseLecturesComponent } from './pages/course-lectures/course-lectures.component';
import { TypeGuard } from './guards/type.guard';
import { CoursesComponent } from './components/dashboard-components/courses/courses.component';
import { SurveyResponsesComponent } from './pages/survey-responses/survey-responses.component';
import { ViewStudentSubmissionsComponent } from './pages/view-student-submissions/view-student-submissions.component';
import { StudentAnalyticsComponent } from './pages/student-analytics/student-analytics.component';


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
  {
    path: 'course/:id/assessments',
    component: AssessmentsComponent,
    canActivate: [AuthGuard, TypeGuard],
  },
  {
    path: 'course/:id/assessments/studentSubmissions/:assessment',
    component: StudentSubmissionComponent,
    canActivate: [AuthGuard, TypeGuard],
  },
  {
    path: 'course/:id/assessments/studentSubmissions/:assessment/:submissionId/:studentId/:submissionName',
    component: ViewStudentSubmissionsComponent,
    canActivate: [AuthGuard, TypeGuard]
  },
  {
    path: 'course/:id/studentAnalytics',
    component: StudentAnalyticsComponent,
    canActivate: [AuthGuard, TypeGuard]
  },
  {
    path: 'course/:id/edit',
    component: CreateCourseComponent,
    canActivate: [AuthGuard, TypeGuard]
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
  {
    path: 'course/create',
    component: CreateCourseComponent,
    canActivate: [AuthGuard, TypeGuard],
  },
  {
    path: 'course/enroll',
    component: EnrollCourseComponent,
    canActivate: [AuthGuard, TypeGuard],
  },
  {
    path: 'course/:id',
    component: CoursePreviewComponent,
    canActivate: [AuthGuard, TypeGuard],
  },
  {
    path: 'course',
    component: CoursesComponent,
    canActivate: [AuthGuard, TypeGuard],
  },
  {
    path: 'socialinitiatives',
    component: GivingGardenComponent,
    canActivate: [AuthGuard, TypeGuard],
  },
  {
    path: 'course/lectures/:courseId/:title/:id/:date',
    component: CourseLecturesComponent,
    canActivate: [AuthGuard, TypeGuard],
  },
  {
    path: 'chat',
    component: ChatComponent,
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
  {
    path: 'opportunities',
    component: SiOpportunitiesComponent,
    canActivate: [AuthGuard, TypeGuard],
  },
  {
    path : 'surveyresponses/:courseId',
    component: SurveyResponsesComponent,
    canActivate: [AuthGuard, TypeGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
