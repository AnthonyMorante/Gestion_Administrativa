import { Routes } from '@angular/router';
import { ClientesComponent } from './Components/clientes/clientes.component';
import { EmpleadosComponent } from './Components/empleados/empleados.component';
import { FacturasComponent } from './Components/facturas/facturas.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { LoginComponent } from './Components/login/login.component';
import { ProductosComponent } from './Components/productos/productos.component';
import { ProveedoresComponent } from './Components/proveedores/proveedores.component';
import { userGuard } from './Guards/user.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [userGuard]
  },
  {
    path: 'Inicio', component: InicioComponent, canActivate: [userGuard],
    children: [
      {
        path: 'clientes',
        component: ClientesComponent,
        canActivate: [userGuard]
      },
      {
        path: 'empleados',
        component: EmpleadosComponent,
        canActivate: [userGuard]
      },
      {
        path: 'productos',
        component: ProductosComponent,
        canActivate: [userGuard]
      },
      {
        path: 'proveedores',
        component: ProveedoresComponent,
        canActivate: [userGuard]
      },
      {
        path: 'facturas',
        component: FacturasComponent,
        canActivate: [userGuard]
      },
    ],
  },
  { path: 'Inicio', component: InicioComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];
