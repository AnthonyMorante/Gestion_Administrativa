import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { global, js } from 'src/main';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  usuario: string = "";
  mostrarMenu: boolean = false;
  version:string=global.version;
  inicio:boolean=false;
  constructor(private router: Router) {
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
    localStorage.removeItem(global.token.user);
    setTimeout(() => this.router.navigate(["/login"]), 1900);
  }


}

