import { Directive, Input, ElementRef, Renderer, OnInit } from "@angular/core";

import { UserService } from "src/app/core/user/user.service";

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: "[showIfLogged]",
})
export class ShowIfLoggedDirective implements OnInit {
  constructor(
    private element: ElementRef<any>,
    // tslint:disable-next-line: deprecation
    private renderer: Renderer,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // tslint:disable-next-line: no-unused-expression
    !this.userService.isLogged() &&
      this.renderer.setElementStyle(
        this.element.nativeElement,
        "display",
        "none"
      );
  }
}
