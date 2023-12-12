import { Routes } from '@angular/router';
import { ClientesComponent } from './Components/clientes/clientes.component';
import { EmpleadosComponent } from './Components/empleados/empleados.component';
import { FacturasComponent } from './Components/facturas/facturas.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { LoginComponent } from './Components/login/login.component';
import { ProductosComponent } from './Components/productos/productos.component';
import { ProveedoresComponent } from './Components/proveedores/proveedores.component';
import { userGuard } from './Guards/user.guard';
import { LotesComponent } from './Components/lotes/lotes.component';
import { ConfiguracionesComponent } from './Components/configuraciones/configuraciones.component';

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
        path: 'configuraciones-sri',
        component: ConfiguracionesComponent,
        canActivate: [userGuard]
      },
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
        path: 'lotes',
        component: LotesComponent,
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
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];
