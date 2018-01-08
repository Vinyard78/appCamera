import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[app-anim-on-load]'
})
export class AnimOnLoadDirective {
  	constructor(private el: ElementRef) { 
  		el.nativeElement.parentElement.style.transition = "ease .3s transform, ease .3s opacity";
  		el.nativeElement.parentElement.style.opacity = 0;
  		el.nativeElement.parentElement.style.transform = "scale3d(.7,.7,1)";

  	}

  	@HostListener('load') onLoad() {
  		this.el.nativeElement.parentElement.style.opacity = 1;
  		this.el.nativeElement.parentElement.style.transform = "scale3d(1,1,1)";
  	}

}