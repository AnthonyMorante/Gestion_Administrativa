
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './Componentes/Inicio/inicio/inicio.component';
import { ClientesComponent } from './Componentes/Administracion/Clientes/clientes/clientes.component';
import { EmpleadosComponent } from './Componentes/Administracion/Empleados/empleados/empleados.component';
import { ProductosComponent } from './Componentes/Administracion/Productos/productos/productos.component';
import { ProveedoresComponent } from './Componentes/Administracion/Proveedores/proveedores/proveedores.component';
import { LoginComponent } from './Componentes/login/login.component';
import { userGuard } from './Guards/user.guard';
import { FacturaComponent } from './Componentes/Documentos/Factura/factura/factura.component';






const routes: Routes = [

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
        component: FacturaComponent,
        canActivate: [userGuard]
      },
    ],
  },



  { path: 'Inicio', component: InicioComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
