import { Injectable } from "@angular/core";
import { Resolve, Router } from "@angular/router";
import { User } from "../models/user";
import { UserService } from "../services/user.service";
import { AlertService } from "../services/alert.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alert: AlertService
  ) {}

  resolve(): Observable<User[]> {
    return this.userService.getUsers().pipe(
      catchError((error) => {
        this.alert.error("Problem retrieving users data");
        this.router.navigate(["/home"]);
        return of(null);
      })
    );
  }
}
