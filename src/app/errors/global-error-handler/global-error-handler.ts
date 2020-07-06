import { ErrorHandler, Injectable, Injector } from "@angular/core";
import * as Stacktrace from "stacktrace-js";
import { Router } from "@angular/router";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";

import { UserService } from "src/app/core/user/user.service";
import { ServerLogService } from "./server-log.service";
import { environment } from "../../../environments/environment";

@Injectable()
export class GlobalErrorHandle implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    console.log("passei pelo handler");

    const location = this.injector.get(LocationStrategy);
    const userService = this.injector.get(UserService);
    const serverLogService = this.injector.get(ServerLogService);
    const router = this.injector.get(Router);

    const url = location instanceof PathLocationStrategy ? location.path() : "";

    const message = error.message ? error.message : error.toString();

    if (environment.production) {
      router.navigate(["/error"]);
    }

    Stacktrace.fromError(error).then((stackFrames) => {
      const stackAsString = stackFrames.map((sf) => sf.toString()).join("\n");
      console.log(message);
      console.log(stackAsString);
      console.log("o que será enviado para o servidor ");
      serverLogService
        .log({
          message,
          url,
          userName: userService.getUserName(),
          stack: stackAsString,
        })
        .subscribe(
          () => {
            console.log("Error logged on server");
          },
          (err) => {
            console.log(err);
            console.log("Fail to send error log to server");
          }
        );
    });
  }
}
