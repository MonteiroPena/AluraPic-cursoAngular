import { PlatformDetectorService } from "./../../../core/platform-detector/platform-detector.service";
import { Directive, ElementRef, OnInit } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: "[immediateClick]",
})
export class ImmediateClickDirective implements OnInit {
  constructor(
    private element: ElementRef<any>,
    private platformDetector: PlatformDetectorService
  ) {}
  ngOnInit(): void {
    // tslint:disable-next-line:no-unused-expression
    this.platformDetector.isPlatformBrowser &&
      this.element.nativeElement.click();
  }
}
