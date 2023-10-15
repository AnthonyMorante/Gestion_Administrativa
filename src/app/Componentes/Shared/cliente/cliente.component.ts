import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { AxiosService } from 'src/app/Services/axios.service';
import { global, js } from 'src/main';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit{   
  baseUrl = `${global.BASE_API_URL}api/`;
  //Datatable
  lista: any = [];
  listaTipoIdentificaciones: any = [];
  //Modal
  @ViewChild('modalDatos', { static: true }) modalDatos: ElementRef = {} as ElementRef;
  @ViewChild('frmDatos', { static: true }) frmDatos: ElementRef = {} as ElementRef;
  public modal: any;
  tituloModal: string = "Nuevo registro";
  idCliente: string = "";
  identificacion: any;
  activo:boolean=true;
  fechaRegistro:Date=new Date();
  //Combos
  @ViewChild('idProvincia', { static: true }) idProvincia: NgSelectComponent = {} as NgSelectComponent;
  @ViewChild('idCiudad', { static: true }) idCiudad: NgSelectComponent = {} as NgSelectComponent;
  listaProvincias: any = [];
  listaCiudades: any = [];
  constructor(private axios: AxiosService) { }

  ngOnInit() {
    this.modal = new js.bootstrap.Modal(this.modalDatos.nativeElement, {
      keyboard: false,
      backdrop: 'static',
    });
    this.identificacion = document.querySelector("#identificacion");
    js.activarValidadores(this.frmDatos.nativeElement);
    this.comboTipoIdentificaciones();
    this.comboProvincia();
  }

  async comboTipoIdentificaciones(): Promise<void> {
    try {
      const url = `${this.baseUrl}TipoIdentificaciones/listar`;
      this.listaTipoIdentificaciones = (await this.axios.get(url)).data;
    } catch (e) {
      js.handleError(e);
    }
  }

  async comboProvincia(): Promise<void> {
    this.idProvincia.handleClearClick();
    this.idCiudad.handleClearClick();
    this.idProvincia.handleClearClick();
    const url = `${this.baseUrl}Provincias/listar`;
    this.listaProvincias = (await this.axios.get(url)).data;
  }
  async comboCiudades(idProvincia: any): Promise<void> {
    this.listaCiudades = [];
    if (!idProvincia) {
      this.idCiudad.handleClearClick();
      return;
    }
    this.idCiudad.handleClearClick();
    const url = `${this.baseUrl}Ciudades/listar?idProvincia=${idProvincia}`;
    this.listaCiudades = (await this.axios.get(url)).data;
  }
  public nuevo() {
    this.tituloModal = "Nuevo registro";
    this.idCliente = "";
    this.idCiudad.handleClearClick();
    this.idProvincia.handleClearClick();
    this.listaCiudades=[];
    this.activo=true;
    js.limpiarForm(this.frmDatos.nativeElement,100);
  }
  handleDocumento(idTipoIdentificacion: any): void {
    const tipo = this.listaTipoIdentificaciones.find((x: any) => x.idTipoIdentificacion == idTipoIdentificacion.value)?.codigo;
    if (tipo == 5) {
      this.identificacion.setAttribute("data-validate", "cedula");
      js.activarValidadores(this.identificacion.closest("div"));
      js.validarCedula(this.identificacion);
    } else if (tipo == 4) {
      this.identificacion.setAttribute("data-validate", "ruc");
      js.activarValidadores(this.identificacion.closest("div"));
      js.validarRuc(this.identificacion);
    } else {
      this.identificacion.removeAttribute("data-validate");
      js.activarValidadores(this.identificacion.closest("div"));
      js.validarVacio(this.identificacion);
    }
  }
  public async guardar(): Promise<void> {
    try {
      if (!await js.validarTodo(this.frmDatos.nativeElement)) throw new Error("Verifique los campos requeridos");
      js.loaderShow();
      const url=`${this.baseUrl}Clientes/${!this.idCliente?"insertar":"actualizar"}`;
      const data=new FormData(this.frmDatos.nativeElement);
      if(!!this.idCliente)data.append("idCliente",this.idCliente);
      data.append("idProvincia", this.idProvincia.selectedValues[0]);
      data.append("idCiudad", this.idCiudad.selectedValues[0]);
      if(!this.idCliente) await this.axios.postFormJson(url,data);
      else await this.axios.putFormJson(url,data);
      js.toastSuccess(`Registro ${!this.idCliente?"guardado":"editado"} exitosamente`);
      this.modal.hide();

    } catch (e) {
      js.handleError(e);
    }finally{
      js.loaderHide();
    }
  }  
}