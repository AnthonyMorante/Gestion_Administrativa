import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { js, global } from '../../app.config';
import { AxiosService } from '../../Services/axios.service';

@Component({
  selector: 'app-configuraciones',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './configuraciones.component.html',
  styleUrl: './configuraciones.component.css'
})
export class ConfiguracionesComponent implements OnInit {
  constructor(private _axios: AxiosService) { }
  private baseUrl: string = `${global.BASE_API_URL}api/Configuraciones/`;
  public urlLogo: string = "";
  public urlFirma: string = "";
  private codigo: string = "";
  private download: boolean = false;
  public datos: any = {};
  public modal: any;
  public async ngOnInit(): Promise<void> {
    js.loaderShow();
    this.modal = new js.bootstrap.Modal(js.modalDatos, {
      keyboard: false,
      backdrop: "static"
    });
    js.activarValidadores(js.frmDatos);
    js.activarValidadores(js.frmFirma);
    js.crearPasswordPreview(js.frmFirma);
    await this.datosEmpresa();
    js.loaderHide();
  }
  private async datosEmpresa(): Promise<void> {
    try {
      const url = `${this.baseUrl}datosEmpresa`;
      const res = (await this._axios.get(url)).data;
      js.cargarFormulario(js.frmDatos, res);
      this.datos = res;
      this.handleLogo();
      this.handleFirma();
    } catch (e) {
      js.handleError(e);
    }
  }
  public async handleLogo(): Promise<void> {
    try {
      var imagenExistente = await new Promise(async resolve => {
        try {
          const url = `${global.BASE_API_URL}Imagenes/Logos/${this.datos.identificacion}/logo.png`;
          await js.fetch(url, {
            method: "HEAD",
            mode: 'no-cors'
          });
          this.urlLogo = url;
          resolve(true);
        } catch {
          this.urlLogo = "";
          resolve(false);
        }
      });
      (!imagenExistente) ?
        js.archivoLogo.removeAttribute("data-validate") :
        js.archivoLogo.setAttribute("data-validate", "no-validate");
      js.activarValidadores(js.archivoLogo.closest("div"));

      if (!!js.archivoLogo.value) {
        const file = js.archivoLogo.files[0];
        if (file.type.toString().indexOf("png") < 0) throw new Error("El archivo de imagen debe ser de tipo PNG")
      }

    } catch (e) {
      js.handleError(e);
      js.archivoLogo.value = "";
    }
  }
  public async handleFirma(): Promise<void> {
    try {
      this.download = false;
      this.urlFirma = `${global.BASE_API_URL}${this.datos.ruta}`.replaceAll("//", "/");
      console.log(this.urlFirma);
      var archivoExistente = await new Promise(async resolve => {
        try {
          const url = this.urlFirma;
          await js.fetch(url, {
            method: "HEAD",
            mode: 'no-cors'
          });
          this.urlFirma = url;
          resolve(true);
        } catch {
          this.urlFirma = "";
          resolve(false);
        }
      });
      (!archivoExistente) ?
        js.archivoFirma.removeAttribute("data-validate") :
        js.archivoFirma.setAttribute("data-validate", "no-validate");
      js.activarValidadores(js.archivoFirma.closest("div"));
      if (!!js.archivoFirma.value) {
        const file = js.archivoFirma.files[0];
        if (file.type.toString().indexOf("x-pkcs12") < 0) throw new Error("El archivo de imagen debe ser de tipo P12");
        this.modal.show();
      }
    } catch (e) {
      js.handleError(e);
      js.archivoFirma.value = "";
    }
  }

  public descargarFirma() {
    js.limpiarForm(js.frmFirma);
    this.download = true;
    this.modal.show();
  }

  public async validarFirma(): Promise<boolean> {
      return new Promise(async resolve=>{
        try {
          const url = `${this.baseUrl}validarFirma`;
          const data = new FormData(js.frmFirma);
          let res = (await this._axios.postForm(url, data)).data;
          res = res.toString().split("error:");
          if (res.length > 1) throw new Error(res[1]);
          if (this.download) js.open(this.urlFirma, "_blank");
          this.codigo = js.codigo.value;
          js.toastSuccess(res[0]);
          js.limpiarForm(js.frmFirma);
          this.modal.hide();
          resolve(true);
        } catch (e) {
          js.handleError(e);
          resolve(false);
        }
      });
  }

  public async guardar(){
    try {
      if(!await js.validarTodo(js.frmDatos)) throw new Error("Verifique los campos requeridos");
      const url=`${this.baseUrl}guardar`;
      const data=new FormData(js.frmDatos);
      data.append("codigo",this.codigo);
      await this._axios.postForm(url,data);
      js.toastSuccess("Configuración guardada con éxito");
      this.datosEmpresa();
    } catch (e) {
      js.handleError(e);
    } 
  }

}
