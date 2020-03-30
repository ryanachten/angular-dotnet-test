import { Injectable } from "@angular/core";
import * as alertifyjs from "alertifyjs";

@Injectable({
  providedIn: "root"
})
export class AlertService {
  constructor() {}

  confirm(message: string, cb: () => void) {
    alertifyjs.confirm(message, (e: any) => {
      if (e) {
        return cb();
      }
    });
  }

  success(message: string) {
    alertifyjs.success(message);
  }

  error(message: string) {
    alertifyjs.error(message);
  }

  warning(message: string) {
    alertifyjs.warning(message);
  }

  message(message: string) {
    alertifyjs.message(message);
  }
}
