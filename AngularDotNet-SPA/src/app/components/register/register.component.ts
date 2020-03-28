import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: Object;
  model: any = {};

  constructor() {}

  ngOnInit() {}

  register() {
    console.log("model", this.model);
  }

  cancel() {
    console.log("cancel");
  }
}
