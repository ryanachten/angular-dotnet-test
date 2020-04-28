import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { User } from "src/app/models/user";
import { AlertService } from "src/app/services/alert.service";
import { NgForm } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-member-edit",
  templateUrl: "./member-edit.component.html",
  styleUrls: ["./member-edit.component.scss"],
})
export class MemberEditComponent implements OnInit {
  @ViewChild("editForm", { static: true }) editForm: NgForm;
  @HostListener("window:beforeunload", ["$event"])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  photoUrl: string;
  user: User;
  constructor(
    private route: ActivatedRoute,
    private alert: AlertService,
    private userService: UserService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data["user"];
    });
    this.auth.currentPhotoUrl.subscribe(
      (photoUrl) => (this.photoUrl = photoUrl)
    );
  }

  updateUser() {
    this.userService
      .updateUser(this.auth.decodedToken.nameid, this.user)
      .subscribe(
        (next) => {
          this.alert.success("Profile updated");
          this.editForm.reset(this.user);
        },
        (error) => this.alert.error(error)
      );
  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }
}
