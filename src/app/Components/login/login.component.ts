import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AxiosService } from '../../Services/axios.service';
import { js, global } from '../../app.config';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private axios: AxiosService) {
  }
  token: any;
  @ViewChild('frmDatos', { static: true }) frmDatos: ElementRef = {} as ElementRef;
  @ViewChild('usuario', { static: true }) usuario: ElementRef = {} as ElementRef;
  @ViewChild('clave', { static: true }) clave: ElementRef = {} as ElementRef;
  version: string = global.version;
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
