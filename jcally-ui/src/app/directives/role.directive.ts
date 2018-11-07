import { Directive, Input, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[superAdmin]'
})
export class RoleDirective {

  constructor(public el: ElementRef, public renderer: Renderer) { }

  @Input() superAdmin: boolean;

  ngOnInit() {
    // Use renderer to render the emelemt with styles
    if (!this.superAdmin) {
      this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
    }
  }
}
