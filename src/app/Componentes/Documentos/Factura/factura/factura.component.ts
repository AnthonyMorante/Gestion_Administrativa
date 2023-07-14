import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent {


  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}


  ngOnInit() {

  this.elementRef.nativeElement.querySelector(".formaPago").click();

  }


}
