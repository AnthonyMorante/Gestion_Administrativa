import { Injectable } from "@angular/core";



@Injectable({
    providedIn: 'root',
  })

export class Validator {

    validarTodo(form:any,el:any) {

   
      

        for (const key of Object.keys(form.controls)) {

          if (form.get(key)?.invalid) {
            const invalidControl = el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
            invalidControl.focus();
            form.get(key)?.markAsTouched();
          }
        
        }
      }

      


  }