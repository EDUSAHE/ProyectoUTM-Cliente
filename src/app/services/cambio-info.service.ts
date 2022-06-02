import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CambioInfoService {

  private messageSourse = new BehaviorSubject<string>('')
  currentMsg$ = this.messageSourse.asObservable()

  private nivelSource = new BehaviorSubject<number>(4)
  currentNivel$ = this.nivelSource.asObservable()

  constructor() {}

  enviar(mensaje: string) {
    this.messageSourse.next(mensaje)
  }

  setNivel(nivel: number) {
    this.nivelSource.next(nivel)
  }

}
