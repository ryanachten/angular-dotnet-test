import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { JwtModule } from "@auth0/angular-jwt";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TabsModule } from "ngx-bootstrap/tabs";
import { NgxGalleryModule } from "@kolkov/ngx-gallery";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { FileUploadModule } from "ng2-file-upload";
import { TimeagoModule } from "ngx-timeago";

import { AppComponent } from "./components/app.component";
import { NavComponent } from "./components/nav/nav.component";
import { AuthService } from "./services/auth.service";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";
import { ListsComponent } from "./components/lists/lists.component";
import { MemberListComponent } from "./components/members/member-list/member-list.component";
import { MessagesComponent } from "./components/messages/messages.component";
import { ErrorInterceptorProvider } from "./services/error.interceptor";
import { appRoutes } from "./routes";
import { MemberCardComponent } from "./components/members/member-card/member-card.component";
import { MemberDetailComponent } from "./components/members/member-detail/member-detail.component";
import { MemberDetailResolver } from "./resolvers/member-detail.resolver";
import { MemberListResolver } from "./resolvers/member-list.resolver";
import { MemberEditComponent } from "./components/members/member-edit/member-edit.component";
import { PhotoEditorComponent } from "./components/members/photo-editor/photo-editor.component";
import { MemberEditResolver } from "./resolvers/member-edit.resolver";
import { AuthGuard } from "./guards/auth.guard";
import { PreventUnsavedChanges } from "./guards/prevent-unsaved-changes.guard";

const tokenGetter = () => localStorage.getItem("token");

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListsComponent,
    MemberListComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    MessagesComponent,
    NavComponent,
    RegisterComponent,
    PhotoEditorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgxGalleryModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ["localhost:5000"],
        blacklistedRoutes: ["localhost:5000/api/auth"],
      },
    }),
    TimeagoModule.forRoot(),
  ],
  providers: [
    AuthService,
    AuthGuard,
    PreventUnsavedChanges,
    ErrorInterceptorProvider,
    MemberDetailResolver,
    MemberEditResolver,
    MemberListResolver,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
