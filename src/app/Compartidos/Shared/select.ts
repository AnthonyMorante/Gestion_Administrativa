  


import { Injectable } from "@angular/core";
declare var $: any;


@Injectable({
    providedIn: 'root',
  })

export class select {

    constructor() {}



  
   _2(data:any) {

    $('.select2').select2({
        data: data
      });

}




    


  }