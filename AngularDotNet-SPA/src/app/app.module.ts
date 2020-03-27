import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./components/app.component";
import { ValueComponent } from "./components/value/value.component";
import { NavComponent } from "./components/nav/nav.component";
import { AuthService } from "./services/auth.service";

@NgModule({
  declarations: [AppComponent, ValueComponent, NavComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
