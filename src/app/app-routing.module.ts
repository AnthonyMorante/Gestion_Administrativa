
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './Componentes/Inicio/inicio/inicio.component';
import { ClientesComponent } from './Componentes/Administracion/Clientes/clientes/clientes.component';
import { EmpleadosComponent } from './Componentes/Administracion/Empleados/empleados/empleados.component';
import { ProductosComponent } from './Componentes/Administracion/Productos/productos/productos.component';
import { ProveedoresComponent } from './Componentes/Administracion/Proveedores/proveedores/proveedores.component';
import { FacturaComponent } from './Componentes/Documentos/Factura/factura/factura.component';
import { LoginComponent } from './Componentes/login/login.component';






const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },
  {path:'Inicio', component:InicioComponent, children: [
    {
      path: 'clientes',
      component: ClientesComponent
    },
    {
      path: 'empleados',
      component: EmpleadosComponent
    }, 
    {
      path: 'productos',
      component: ProductosComponent
    },
    {
      path: 'proveedores',
      component: ProveedoresComponent
    },
    {
      path: 'facturas',
      component: FacturaComponent
    },
  ],},



  {path:'Inicio', component:InicioComponent},
  {path:'',pathMatch:'full',redirectTo:'login'},
  {path:'**',pathMatch:'full',redirectTo:'login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
