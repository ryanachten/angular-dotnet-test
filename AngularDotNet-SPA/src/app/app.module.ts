import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";

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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListsComponent,
    MemberListComponent,
    MemberCardComponent,
    MessagesComponent,
    NavComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [AuthService, ErrorInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
