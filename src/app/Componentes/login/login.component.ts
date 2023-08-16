import { Component, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastComponent } from 'src/app/Compartidos/Componentes/toast';
import { LoginService } from 'src/app/Servicios/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



  btnLogin : boolean = false;

  loginForm = new  FormGroup({

    usuario: new FormControl('', Validators.required),
    clave: new FormControl('', Validators.required)

  });

  ingresarTexto :string="Ingresar";

  token:any;

  ngOnInit() {

      
    $(function() {
      'use strict';
      $('.form-control').on('input', function() {
        var $field = $(this).closest('.form-group');
        if (this) {
          $field.addClass('field--not-empty');
        } else {
          $field.removeClass('field--not-empty');
        }
      });

    });
  
  
  
    }


    constructor(private toast: ToastComponent ,private loginService: LoginService, private router: Router, private el: ElementRef) {
    }
  
    login(loginData:any){ 


      this.btnLogin=true;
      
      this.loginService.login(loginData).subscribe({
        next: (res) =>{ 
          
          if(res){
            

            localStorage.setItem("token",res.access_token);
            this.router.navigate(['/Inicio']);
            this.btnLogin=false;

          }

        
        } ,
        error:(err)=> {

          console.log(err);
          if(err.error.error_description ==="Contraseña Incorrecta"){
 
           this.toast.show_error("Login","Credenciales Incorrectas");
           return;

          } 
          this.btnLogin=false;
          this.toast.show_error("Error","Error Intente más Tarde");
          
        },
        })

    }
  
  


  

}
