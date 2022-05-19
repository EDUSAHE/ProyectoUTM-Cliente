import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CambioInfoService {

  private messageSourse = new BehaviorSubject<string>('')
  currentMsg$ = this.messageSourse.asObservable()

  constructor() {}

  enviar(mensaje: string) {
    this.messageSourse.next(mensaje)
  }

}
