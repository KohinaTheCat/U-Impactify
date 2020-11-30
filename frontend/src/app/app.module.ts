import { CoursePreviewComponent } from './pages/course-preview/course-preview.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxFileDropModule } from 'ngx-file-drop';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './components/dashboard-components/courses/courses.component';
import { IcUpcomingEventsComponent } from './components/dashboard-components/ic-upcoming-events/ic-upcoming-events.component';
import { FooterComponent } from './components/footer/footer.component';
import { FrontPageHeaderComponent } from './components/front-page-header/front-page-header.component';
import { GlobalSearchComponent } from './components/global-search/global-search.component';
import { IcIlProfileComponent } from './components/profile-components/ic-il-profile/ic-il-profile.component';
import { SiProfileComponent } from './components/profile-components/si-profile/si-profile.component';
import { CreateCourseComponent } from './pages/create-course/create-course.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EnrollCourseComponent } from './pages/enroll-course/enroll-course.component';
import { LoginSignupComponent } from './pages/login-signup/login-signup.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SignupQuestionaireComponent } from './pages/signup-questionaire/signup-questionaire.component';
import { SignupQuestionaire2Component } from './pages/signup-questionaire2/signup-questionaire2.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ChatComponent } from './pages/chat/chat.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { GivingGardenComponent } from './pages/giving-garden/giving-garden.component';
import { AboutComponent } from './pages/home-pages/about/about.component';
import { SolutionsComponent } from './pages/home-pages/solutions/solutions.component';
import { PricingComponent } from './pages/home-pages/pricing/pricing.component';
import { StudentSubmissionComponent } from './pages/studentSubmissionFolder/student-submission/student-submission.component';
import { AssessmentsComponent } from './pages/assessments/assessments.component';
import { SiOpportunitiesComponent } from './pages/si-opportunities/si-opportunities.component';
import { OpportunityAccordianCardComponent } from './components/opportunity-accordian-card/opportunity-accordian-card.component';
import { CourseLecturesComponent } from './pages/course-lectures/course-lectures.component';
import { SurveyResponsesComponent } from './pages/survey-responses/survey-responses.component';
import { ViewStudentSubmissionsComponent } from './pages/view-student-submissions/view-student-submissions.component';
import { StudentAnalyticsComponent } from './pages/student-analytics/student-analytics.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupQuestionaireComponent,
    SignupQuestionaire2Component,
    FrontPageHeaderComponent,
    LoginSignupComponent,
    FooterComponent,
    CreateCourseComponent,
    DashboardComponent,
    GlobalSearchComponent,
    CoursesComponent,
    IcUpcomingEventsComponent,
    SiProfileComponent,
    EnrollCourseComponent,
    CoursePreviewComponent,
    IcIlProfileComponent,
    SettingsComponent,
    UserProfileComponent,
    ChatComponent,
    SearchResultsComponent,
    GivingGardenComponent,
    AssessmentsComponent,
    AboutComponent,
    SolutionsComponent,
    PricingComponent,
    StudentSubmissionComponent,
    SiOpportunitiesComponent,
    OpportunityAccordianCardComponent,
    CourseLecturesComponent,
    SurveyResponsesComponent,
    ViewStudentSubmissionsComponent,
    StudentAnalyticsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    PdfViewerModule,
    NgxFileDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
