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
import { NgxFileDropModule } from 'ngx-file-drop';
import { CourseComponent } from './pages/course/course.component';
import  {  PdfViewerModule  }  from  'ng2-pdf-viewer';


@NgModule({
  declarations: [
    AppComponent,
    FrontPageHeaderComponent,
    LoginSignupComponent,
    FooterComponent,
    CreateCourseComponent,
    DashboardComponent,
    CourseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
