import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { js, global } from '../../app.config';
import { AxiosService } from '../../Services/axios.service';
import { Subject } from 'rxjs';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-retenciones',
  standalone: true,
  imports: [CommonModule, DataTablesModule, NgSelectModule],
  templateUrl: './retenciones.component.html',
  styleUrl: './retenciones.component.css',
})
export class RetencionesComponent implements OnInit, OnDestroy,AfterViewInit {
  _js: any = js;
  baseUrl = `${global.BASE_API_URL}api/`;
  componentTitle: string = '';
  //Datatable
  lista: any = [];
  @ViewChild(DataTableDirective) dtElement: DataTableDirective = {} as DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  mensajeDataTable: string = js.loaderDataTable();

  constructor(
    private axios: AxiosService,
    private el: ElementRef,
    private renderer: Renderer2
  ) { }
  async ngOnInit() {

    await this.listarFacturas();

  }
  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  nuevo() {
  }


  async xml(claveAcceso: string): Promise<void> {
    try {
      js.loaderShow();
      const url = `${this.baseUrl}facturas/descargarXml/${claveAcceso}`;
      const res = (await this.axios.getFile(url)).data;
      const blob = new Blob([res], { type: 'application/xml' });
      const urlFile = URL.createObjectURL(blob);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = urlFile;
      a.download = `${claveAcceso}.xml`;
      a.click();
      window.URL.revokeObjectURL(urlFile);
      a.remove();
    } catch (e) {
      js.handleError(e);
    } finally {
      js.loaderHide();
    }
  }


  async pdf(claveAcceso: string): Promise<void> {
    try {
      js.loaderShow();
      const url = `${this.baseUrl}facturas/descargarPdf/${claveAcceso}`;
      const res = (await this.axios.getFile(url)).data;
      const blob = new Blob([res], { type: 'application/pdf' });
      const urlFile = URL.createObjectURL(blob);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = urlFile;
      a.download = `${claveAcceso}.pdf`;
      a.click();
      window.URL.revokeObjectURL(urlFile);
      a.remove();
    } catch (e) {
      js.handleError(e);
    } finally {
      js.loaderHide();
    }
  }


  async reenviar(claveAcceso: string): Promise<void> {
    try {
      js.loaderShow();
      const url = `${this.baseUrl}Facturas/reenviar/${claveAcceso}`;
      await this.axios.get(url);
      this.listarFacturas();
    } catch (e) {
      js.handleError(e);
    } finally {
      js.loaderHide();
    }
  }


  getColor(estado: number) {
    return `background-color:${global.estados[estado]}`
  }

  async listarFacturas() {
    try {

      const url = `${this.baseUrl}Facturas/listar`;
      const columns = "idFactura,fechaRegistro,cliente,telefonoCliente,emailCliente,claveAcceso,fechaEmision,fechaAutorizacion,estadoSri";
      this.dtOptions = {
        destroy: true,
        serverSide: true,
        pageLength: 10,
        pagingType: 'full_numbers',
        language: js.dataTableEs(),
        ajax: async (_data: any, resolve) => {
          try {
            console.log(_data);
            this.lista = [];
            const res = (await this.axios.postJson(url, _data)).data;
            console.log(res);
            this.lista = res.data;
            (res.data.length == 0 && !!_data.search.value) ? this.mensajeDataTable = js.notFoundDataTable() : (res.data.length == 0 && !_data.search.value) ? this.mensajeDataTable = js.notDataDataTable() : this.mensajeDataTable = js.loaderDataTable();
            resolve({
              recordsTotal: res.recordsTotal,
              recordsFiltered: res.recordsFiltered,
              data: [],
            });
          } catch (e) {
            js.handleError(e);
          }
        },
        columns: columns.split(",").map((x: string) => { return { data: x } }),
        columnDefs: [{ targets: [0], searchable: false, orderable: false }],
        order: [[1, "desc"]]
      };
      //DataTables
    } catch (e) {
      js.handleError(e);
    }
  }
}
