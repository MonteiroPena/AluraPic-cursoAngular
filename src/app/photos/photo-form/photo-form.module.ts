import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { PhotoFormComponent } from "./photo-form.component";

@NgModule({
  declarations: [PhotoFormComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [PhotoFormComponent],
})
export class PhotoFormModule {}
