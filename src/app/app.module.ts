import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InicioComponent } from './Componentes/Inicio/inicio/inicio.component';
import { DatePipe } from '@angular/common'; 
import { APIInterceptor } from './Intercerptors/HttpInterceptor';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from "angular-datatables";
import { ClientesComponent } from './Componentes/Administracion/Clientes/clientes/clientes.component';
import { ProductosComponent } from './Componentes/Administracion/Productos/productos/productos.component';
import { ProveedoresComponent } from './Componentes/Administracion/Proveedores/proveedores/proveedores.component';
import { EmpleadosComponent } from './Componentes/Administracion/Empleados/empleados/empleados.component';
import { FacturaComponent } from './Componentes/Documentos/Factura/factura/factura.component';
import { LoginComponent } from './Componentes/login/login.component';








@NgModule({
  declarations: [

    AppComponent,
    InicioComponent,
    ClientesComponent,
    ProductosComponent,
    ProveedoresComponent,
    EmpleadosComponent,
    FacturaComponent,
    LoginComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule, 
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    DataTablesModule
 
  ],
  providers: [DatePipe, { provide: HTTP_INTERCEPTORS, useClass: APIInterceptor ,multi: true },   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
