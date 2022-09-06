import { Directive, ElementRef, HostListener, OnInit } from "@angular/core";

@Directive({
  selector: "[trapFocus]",
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}

  @HostListener("mouseenter") onMouseEnter() {
    this.focusIt();
  }

  private focusIt() {
    this.el.nativeElement.focus();
  }
}

@Directive({
  selector: "[autoFocus]",
})
export class AutoFocusDirective implements OnInit {
  constructor(private elRef: ElementRef) {}
  ngOnInit(): void {
    this.elRef.nativeElement.focus();
  }
}
