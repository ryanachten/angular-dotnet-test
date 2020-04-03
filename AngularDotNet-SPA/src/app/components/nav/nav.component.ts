import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { AlertService } from "src/app/services/alert.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    public auth: AuthService,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    this.auth.login(this.model).subscribe(
      next => this.alert.success("Logged in successfully"),
      error => this.alert.error(error),
      () => this.router.navigate(["/members"])
    );
  }

  loggedIn() {
    return this.auth.loggedIn();
  }

  logout() {
    localStorage.removeItem("token");
    this.alert.message("Logged out");
    this.router.navigate(["/home"]);
  }
}
