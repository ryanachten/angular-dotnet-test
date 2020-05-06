import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { AlertService } from "src/app/services/alert.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker/public_api";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private auth: AuthService,
    private alert: AlertService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createRegisterForm();
    this.bsConfig = {
      containerClass: "theme-blue",
    };
  }

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        gender: ["male"],
        username: ["", Validators.required],
        knownAs: ["", Validators.required],
        dateOfBirth: [null, Validators.required],
        city: ["", Validators.required],
        country: ["", Validators.required],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8),
          ],
        ],
        confirmPassword: ["", Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get("password").value === g.get("confirmPassword").value
      ? null
      : { mismatch: true };
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
