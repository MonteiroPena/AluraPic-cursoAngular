import { RouterModule } from "@angular/router";
import { NgModule, ErrorHandler } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GlobalErrorComponent } from "./global-error/global-error.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { GlobalErrorHandle } from "./global-error-handler/global-error-handler";

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [NotFoundComponent, GlobalErrorComponent],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandle,
    },
  ],
})
export class ErrorsModule {}
