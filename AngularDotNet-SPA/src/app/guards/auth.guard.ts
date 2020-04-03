import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { AlertService } from "../services/alert.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private alert: AlertService
  ) {}
  canActivate(): boolean {
    if (this.auth.loggedIn()) {
      return true;
    }
    this.alert.error("Not authorised");
    this.router.navigate(["/home"]);
    return false;
  }
}
