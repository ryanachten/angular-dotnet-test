import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { User } from "src/app/models/user";
import { AlertService } from "src/app/services/alert.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-member-edit",
  templateUrl: "./member-edit.component.html",
  styleUrls: ["./member-edit.component.scss"],
})
export class MemberEditComponent implements OnInit {
  @ViewChild("editForm", { static: true }) editForm: NgForm;
  user: User;
  constructor(private route: ActivatedRoute, private alert: AlertService) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data["user"];
    });
  }

  updateUser() {
    console.log(this.user);
    this.alert.success("Profile updated");
    this.editForm.reset(this.user);
  }
}
