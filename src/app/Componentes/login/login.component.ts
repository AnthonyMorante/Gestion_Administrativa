import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { js, global } from '../../../main';
import { AxiosService } from 'src/app/Services/axios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  token: any;

  constructor(private router: Router, private axios: AxiosService) {
  }
  @ViewChild('frmDatos', { static: true }) frmDatos: ElementRef = {} as ElementRef;
  @ViewChild('usuario', { static: true }) usuario: ElementRef = {} as ElementRef;
  @ViewChild('clave', { static: true }) clave: ElementRef = {} as ElementRef;
  version:string=global.version;
  private baseUrl: string = `${global.BASE_API_URL}connect/token`;
  ngOnInit() {
    js.activarValidadores(this.frmDatos.nativeElement);
    js.crearPasswordPreview();
  }
  async login(event: any) {
    event.preventDefault();
    try {
      if (!await js.validarTodo(this.frmDatos.nativeElement)) throw new Error("Verifique los campos requeridos");
      js.loaderShow();
      const body = {
        client_id: "Jwt",
        client_secret: "My Client Secret",
        grant_type: "password",
        username: this.usuario.nativeElement.value,
        password: this.clave.nativeElement.value
      }
      const res = (await this.axios.postXForm(this.baseUrl, body)).data;
      localStorage.setItem(global.token.user, res.access_token);
      this.router.navigate(["/Inicio"]);
    } catch (e) {
      js.handleError(e);
    } finally {
      js.loaderHide();
    }
  }
}
