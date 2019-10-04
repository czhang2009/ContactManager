import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCursor]'
})
export class CursorDirective {

  constructor(private ele: ElementRef) {}
  @HostListener('mouseenter') onMouseEnter(){
    this.ele.nativeElement.style.cursor = 'hand';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.ele.nativeElement.style.cursor = 'pointer';
  }

}
