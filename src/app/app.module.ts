import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InicioComponent } from './Componentes/Inicio/inicio/inicio.component';
import { ClientesComponent } from './Componentes/Clientes/clientes/clientes.component';
import { ProductosComponent } from './Componentes/Productos/productos/productos.component';
import { ProveedoresComponent } from './Componentes/Proveedores/proveedores/proveedores.component';
import { EmpleadosComponent } from './Componentes/Empleados/empleados/empleados.component';
import { APIInterceptor } from './Intercerptors/HttpInterceptor';
import { ToastrModule } from 'ngx-toastr';





@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ClientesComponent,
    ProductosComponent,
    ProveedoresComponent,
    EmpleadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true },   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
