import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { AlertService } from "src/app/services/alert.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private auth: AuthService, private alert: AlertService) {}

  ngOnInit() {}

  register() {
    this.auth.register(this.model).subscribe(
      () => this.alert.success("Registered successfully"),
      error => this.alert.error(error)
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
