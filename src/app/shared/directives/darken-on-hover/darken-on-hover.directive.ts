import {
  Directive,
  ElementRef,
  HostListener,
  Renderer,
  Input,
} from "@angular/core";

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: "[apDarkenOnHover]",
})
export class DarkenOnHoverDirective {
  @Input() brightness = "70%";

  // tslint:disable-next-line: deprecation
  constructor(private el: ElementRef, private render: Renderer) {}

  @HostListener("mouseover")
  darkenOn() {
    this.render.setElementStyle(
      this.el.nativeElement,
      "filter",
      `brightness(${this.brightness})`
    );
  }

  @HostListener("mouseleave")
  darkenOff() {
    this.render.setElementStyle(
      this.el.nativeElement,
      "filter",
      "brightness(100%)"
    );
  }
}
