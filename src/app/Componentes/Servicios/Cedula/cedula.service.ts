import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CedulaService {

  @Output() disparadorCedula: EventEmitter<any>= new EventEmitter();
  constructor() { }
}
