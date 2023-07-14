import { DatePipe } from '@angular/common';
import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent {

  fechaActual: Date = new Date();
  fechaFormateada:any;
  constructor(private renderer: Renderer2, private elementRef: ElementRef,private datePipe: DatePipe) {



  }


  ngOnInit() {

  this.elementRef.nativeElement.querySelector(".formaPago").click();
  this.fechaFormateada = this.datePipe.transform(this.fechaActual, 'yyyy-MM-dd');



  }


}
