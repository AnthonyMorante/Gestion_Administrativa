import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { global, js } from '../../app.config';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AxiosService } from '../../Services/axios.service';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-proformas',
  standalone: true,
  imports: [CommonModule, DataTablesModule],
  templateUrl: './proformas.component.html',
  styleUrl: './proformas.component.css'
})
export class ProformasComponent implements OnInit, AfterViewInit, OnDestroy  {
  constructor(private axios: AxiosService) { }

  _js: any = js;
  baseUrl = `${global.BASE_API_URL}api/`;
  componentTitle: string = "";
  //Datatable
  lista: any = [];
  @ViewChild(DataTableDirective) dtElement: DataTableDirective = {} as DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  mensajeDataTable: string = js.loaderDataTable();


  ngOnInit() {

    this.listarFacturas();

  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  getColor(estado: number) {
    return `background-color:${global.estados[estado]}`
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

  async listarFacturas() {
    try {
      const url = `${this.baseUrl}Facturas/listarProforma`;
      const columns = "idFactura,fechaRegistro,cliente,telefonoCliente,emailCliente,claveAcceso,fechaEmision,fechaAutorizacion";
      //DataTables
      this.dtOptions = {
        destroy: true,
        serverSide: true,
        pageLength: 10,
        pagingType: 'full_numbers',
        language: js.dataTableEs(),
        ajax: async (_data: any, resolve) => {
          try {
            this.lista = [];
            const res = (await this.axios.postJson(url, _data)).data;
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
