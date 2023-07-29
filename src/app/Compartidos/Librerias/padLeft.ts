import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";


@Injectable({
    providedIn: 'root',
  })

export class PadLeftLibrary {


      convert = (number: number | null | undefined, length: number): string => {
        let result = String(number);
        for (let i = result.length; i < length; ++i) {
          result = '0' + result;
        }
        return result;
      };


  }