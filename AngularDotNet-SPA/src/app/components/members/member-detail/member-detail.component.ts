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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data["user"];
    });
  }
}
