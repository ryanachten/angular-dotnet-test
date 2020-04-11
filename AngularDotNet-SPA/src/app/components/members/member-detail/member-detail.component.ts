import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";
import { AlertService } from "src/app/services/alert.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-member-detail",
  templateUrl: "./member-detail.component.html",
  styleUrls: ["./member-detail.component.scss"],
})
export class MemberDetailComponent implements OnInit {
  user: User;

  constructor(
    private userService: UserService,
    private alert: AlertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    const id = parseInt(this.route.snapshot.params["id"]);
    this.userService.getUser(id).subscribe(
      (user: User) => (this.user = user),
      (error) => this.alert.error(error)
    );
  }
}
