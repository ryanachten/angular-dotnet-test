import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./components/app.component";
import { NavComponent } from "./components/nav/nav.component";
import { AuthService } from "./services/auth.service";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";
import { ErrorInterceptorProvider } from "./services/error.interceptor";

@NgModule({
  declarations: [AppComponent, HomeComponent, NavComponent, RegisterComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [AuthService, ErrorInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule {}
