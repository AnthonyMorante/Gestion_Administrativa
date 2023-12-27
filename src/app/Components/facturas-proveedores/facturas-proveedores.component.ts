import { Component } from '@angular/core';
import { global, js } from '../../app.config';
import { AxiosService } from '../../Services/axios.service';
@Component({
  selector: 'app-facturas-proveedores',
  standalone: true,
  imports: [],
  templateUrl: './facturas-proveedores.component.html',
  styleUrl: './facturas-proveedores.component.css'
})
export class FacturasProveedoresComponent {
  public factura:any;
private baseUrl:string=`${global.BASE_API_URL}api/FacturasProveedores/`;
constructor(private _axios:AxiosService){}

  public async handleXml():Promise<void>{
    try {
      if(!js.fileXml.files[0]) return;
      let url=`${this.baseUrl}leerXml`
      let data=new FormData(js.frmXml);
      this.factura=(await this._axios.postForm(url,data)).data;
      console.log(this.factura);
    } catch (e) {
      js.handleError(e);
    } 
  }
  }

  




