import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";


@Injectable({
    providedIn: 'root',
  })

export class ToastComponent {

    constructor(private toastr: ToastrService) {}




    show_success(title:string,message:string) {

        this.toastr.success(message, title, {
            timeOut: 3000,
            closeButton:true,
          });
    
    }



    
    show_error(title:string,message:string) {

        this.toastr.error(message, title, {
            timeOut: 3000,
            closeButton:true,
          });
        }



        show_warning(title:string,message:string) {

          this.toastr.warning(message, title, {
              timeOut: 3000,
              closeButton:true,
            });
          }


  }