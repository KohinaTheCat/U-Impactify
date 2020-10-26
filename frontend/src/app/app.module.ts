import { CoursePreviewComponent } from './pages/course-preview/course-preview.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { FrontPageHeaderComponent } from './components/front-page-header/front-page-header.component';
import { CreateCourseComponent } from './pages/create-course/create-course.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginSignupComponent } from './pages/login-signup/login-signup.component';
import { SignupQuestionaireComponent } from './pages/signup-questionaire/signup-questionaire.component';
import { SignupQuestionaire2Component } from './pages/signup-questionaire2/signup-questionaire2.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { CourseComponent } from './pages/course/course.component';
import  {  PdfViewerModule  }  from  'ng2-pdf-viewer';
import { GlobalSearchComponent } from './components/global-search/global-search.component';
import { CoursesComponent } from './components/dashboard-components/courses/courses.component';
import { IcUpcomingEventsComponent } from './components/dashboard-components/ic-upcoming-events/ic-upcoming-events.component';
import { SiProfileComponent } from './components/dashboard-components/si-profile/si-profile.component';
import { EnrollCourseComponent } from './pages/enroll-course/enroll-course.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { IcIlProfileComponent } from './components/profile-components/ic-il-profile/ic-il-profile.component';

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
    CourseComponent,
    GlobalSearchComponent,
    CoursesComponent,
    IcUpcomingEventsComponent,
    SiProfileComponent,
    EnrollCourseComponent,
    CoursePreviewComponent,
    ProfileComponent,
    IcIlProfileComponent,
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
