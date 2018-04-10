import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { AuthService } from "./services/auth-service.service";
import { AuthInterceptor } from "./auth-interceptor.interceptor";
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from "./auth/auth.guard";
import { LibrariesComponent } from './libraries/libraries.component';
import { BaseComponent } from "./base/base.component";
import { CourseComponent } from './course/course.component';
import { AssignWriterComponent } from './course/assign-writer/assign-writer.component';
import { CourseService } from "./services/course.service";
import { ScheduleWriterMeetingComponent } from './course/schedule-writer-meeting/schedule-writer-meeting.component';
import { WriterMeetingWaitingComponent } from './course/writer-meeting-waiting/writer-meeting-waiting.component';
import { LibraryComponent } from './library/library.component';
import { LibraryAddComponent } from './library/library-add/library-add.component';
import { LibraryService } from "./services/library.service";
import { CourseAddComponent } from './course/course-add/course-add.component';
import { StoryboardComponent } from './course/storyboard/storyboard.component';
import { SlideComponent } from './course/storyboard/slide/slide.component';
import { QuillModule } from 'ngx-quill-wrapper';
import { QUILL_CONFIG } from 'ngx-quill-wrapper';
import { QuillConfigInterface } from 'ngx-quill-wrapper';

const DEFAULT_QUILL_CONFIG: QuillConfigInterface = {
};

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CoursesComponent,
    AuthComponent,
    LibrariesComponent,
    BaseComponent,
    CourseComponent,
    AssignWriterComponent,
    ScheduleWriterMeetingComponent,
    WriterMeetingWaitingComponent,
    LibraryComponent,
    LibraryAddComponent,
    CourseAddComponent,
    StoryboardComponent,
    SlideComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, canActivate: [AuthGuard], pathMatch: 'full' },
      { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] },
      { path: 'course/add/:libraryid', component: CourseAddComponent, canActivate: [AuthGuard] },
      { path: 'course/:id/Assign', component: AssignWriterComponent },
      { path: 'course/:id', component: CourseComponent, canActivate: [AuthGuard],
        children: [
            { path: "AssignWriter", component: AssignWriterComponent, canActivate: [AuthGuard], data: { role:"Administrator" } },
            { path: "ScheduleWriterMeeting", component: ScheduleWriterMeetingComponent, canActivate: [AuthGuard], data: { role:"Administrator" } },
            { path: "WriterMeetingWaiting", component: WriterMeetingWaitingComponent, canActivate: [AuthGuard], data: { role:"Administrator" } },
            { path: "Storyboard", component: StoryboardComponent, canActivate: [AuthGuard],
              children: [ { path: "Slide", component: SlideComponent, canActivate: [AuthGuard] }]}
          ]},
      { path: 'library/add', component: LibraryAddComponent, canActivate: [AuthGuard], data: { role:"Administrator" } },
      { path: 'library/:id', component: LibraryComponent, canActivate: [AuthGuard], data: { role:"Administrator" } },
      { path: 'libraries', component: LibrariesComponent, canActivate: [AuthGuard], data: { role:"Administrator" } },
      { path: 'auth', component: AuthComponent }
    ], { onSameUrlNavigation: "reload" }),
    QuillModule
  ],
  providers: [AuthService, {provide:HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, AuthGuard, CourseService, LibraryService,
    {
      provide: QUILL_CONFIG,
      useValue: DEFAULT_QUILL_CONFIG
    }],
  bootstrap: [AppComponent]

})

export class AppModule {}
