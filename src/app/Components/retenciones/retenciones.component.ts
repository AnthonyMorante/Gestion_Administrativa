import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { js, global } from '../../app.config';
import { AxiosService } from '../../Services/axios.service';

@Component({
  selector: 'app-retenciones',
  standalone: true,
  imports: [],
  templateUrl: './retenciones.component.html',
  styleUrl: './retenciones.component.css',
})
export class RetencionesComponent {
  _js: any = js;
  baseUrl = `${global.BASE_API_URL}api/`;
  componentTitle: string = '';
  @ViewChild('modalRetenciones', { static: true })
  modalRetenciones: ElementRef = {} as ElementRef;
  modal: any;
  tipoDocumento: string = 'RETENCIÓN';
  establecimiento: string = '001';
  puntoEmision: string = '001';
  secuencial: number = 0;
  listaEstablecimientos: any = [];
  listaPuntosEmisiones: any = [];

  ngOnInit() {

    this.modal = new js.bootstrap.Modal(this.modalRetenciones.nativeElement, {
      keyboard: false,
      backdrop: 'static',
    });
    this.el.nativeElement.querySelector("#docSustento").value="FACTURA";
    this.el.nativeElement.querySelector("#docSustento").disabled = true;;
    this.comboEstablecimientos();
    this.comboPuntosEmisiones();
    
  }

  constructor(
    private axios: AxiosService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  nuevo() {
    setTimeout(() => {
      this.el.nativeElement.querySelector("#fechaEmision").value = js.todayDate();
      this.handleSecuencial();
    }, 200);
  }

  async handleSecuencial(): Promise<void> {
    try {
      const url = `${this.baseUrl}Retenciones/secuenciales`;
      const secuenciales = (await this.axios.get(url)).data;
      this.secuencial = secuenciales[0]?.nombre;
    } catch (e) {
      js.handleError(e);
    }
  }

  async comboEstablecimientos() {
    try {
      const url = `${this.baseUrl}Retenciones/establecimientos`;
      this.listaEstablecimientos = (await this.axios.get(url)).data;
    } catch (e) {
      js.handleError(e);
    }
  }


  async comboPuntosEmisiones() {
    try {
      const url = `${this.baseUrl}Retenciones/puntosEmisiones`;
      this.listaPuntosEmisiones = (await this.axios.get(url)).data;
    } catch (e) {
      js.handleError(e);
    }
  }

  handleNumeroFactura(): void {
    const establecimiento = this.el.nativeElement.querySelector("#idEstablecimiento").value;
    const puntoEmision = this.el.nativeElement.querySelector("#idPuntoEmision").value;
    this.establecimiento = (this.listaEstablecimientos.find((x: any) => x.idEstablecimiento == establecimiento).nombre).toString().padStart(3, '0');
    this.puntoEmision = (this.listaPuntosEmisiones.find((x: any) => x.idPuntoEmision == puntoEmision).nombre).toString().padStart(3, '0');
  }

}
