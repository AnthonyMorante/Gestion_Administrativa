import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { AxiosService } from '../../../Services/axios.service';
import { js,global } from '../../../app.config';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  usuario: string = "";
  mostrarMenu: boolean = false;
  version:string=global.version;
  inicio:boolean=false;
  constructor(private router: Router,private _axios:AxiosService) {
    this.router.events.subscribe((event) => event instanceof NavigationEnd? this.inicio = this.router.url === '/Inicio':null);
  }
  ngOnInit():void {
    const token = localStorage.getItem(global.token.user);
    if (token != null) {
      this.usuario = (jwtDecode(token) as { usuario: string }).usuario;
    }

  }

  async logout(): Promise<void> {
    await js.toastLogout();
    this._axios.logout();
    setTimeout(() => this.router.navigate(["/login"]), 1900);
  }


}
