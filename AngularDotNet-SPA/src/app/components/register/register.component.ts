import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { AlertService } from "src/app/services/alert.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup;

  constructor(private auth: AuthService, private alert: AlertService) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8),
      ]),
      confirmPassword: new FormControl("", Validators.required),
    });
  }

  register() {
    // this.auth.register(this.model).subscribe(
    //   () => this.alert.success("Registered successfully"),
    //   (error) => this.alert.error(error)
    // );
    console.log("registerForm", this.registerForm);
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
