import { ProveedoresComponent } from './Componentes/Proveedores/proveedores/proveedores.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './Componentes/Inicio/inicio/inicio.component';
import { ClientesComponent } from './Componentes/Clientes/clientes/clientes.component';
import { EmpleadosComponent } from './Componentes/Empleados/empleados/empleados.component';
import { ProductosComponent } from './Componentes/Productos/productos/productos.component';






const routes: Routes = [


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
  ],},



  {path:'Inicio', component:InicioComponent},
  {path:'',pathMatch:'full',redirectTo:'Inicio'},
  {path:'**',pathMatch:'full',redirectTo:'Inicio'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
