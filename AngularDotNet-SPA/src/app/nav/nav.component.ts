import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  model: { username?: string; password?: string } = {};

  constructor() {}

  ngOnInit() {}

  login() {
    console.log("model", this.model);
  }
}
