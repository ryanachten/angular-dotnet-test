import { Injectable } from "@angular/core";
import {
  Resolve,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { User } from "../models/user";
import { UserService } from "../services/user.service";
import { AlertService } from "../services/alert.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alert: AlertService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> {
    return this.userService.getUser(route.params["id"]).pipe(
      catchError((error) => {
        this.alert.error("Problem retrieving user data");
        this.router.navigate(["/members"]);
        return of(null);
      })
    );
  }
}
