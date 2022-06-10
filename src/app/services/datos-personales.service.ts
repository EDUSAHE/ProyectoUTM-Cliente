import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type datosPersonales = {
	idProfesor: number,
	nivel: number,
	correo: string,
	token: string
}

@Injectable({
	providedIn: 'root'
})
export class DatosPersonalesService {

	private datosPersonalesSource = new BehaviorSubject<datosPersonales | null>(null);
	datosPersonales$ = this.datosPersonalesSource.asObservable();

	constructor() {}

	setDatosPersonales(datos: datosPersonales){
		this.datosPersonalesSource.next(datos);
		localStorage.setItem("datos", JSON.stringify(datos));
	}

}
