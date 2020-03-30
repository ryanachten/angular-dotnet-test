import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { AlertService } from "src/app/services/alert.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private auth: AuthService, private alert: AlertService) {}

  ngOnInit() {}

  login() {
    this.auth.login(this.model).subscribe(
      next => this.alert.success("Logged in successfully"),
      error => this.alert.error(error)
    );
  }

  loggedIn() {
    const token = localStorage.getItem("token");
    return Boolean(token);
  }

  logout() {
    localStorage.removeItem("token");
    this.alert.message("Logged out");
  }
}
