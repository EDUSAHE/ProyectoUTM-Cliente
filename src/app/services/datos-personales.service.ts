import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Profesor } from '../models/profesor.model';
import { ProfesorService } from './profesor.service';

@Injectable({
	providedIn: 'root'
})
export class DatosPersonalesService {

	private datosPersonalesSource = new BehaviorSubject<Profesor>(new Profesor());
	datosPersonales$ = this.datosPersonalesSource.asObservable();

	private idProfesor: number;

	constructor(private profesorService: ProfesorService) {
		let id = localStorage.getItem('id');
		if (id === null) {
			this.idProfesor = 0;
		} else {
			localStorage.removeItem('id');
			this.idProfesor = Number(id);
			window.addEventListener("beforeunload", () => {
				localStorage.setItem("id", this.idProfesor + "");
			});
			this.recuperaDatos();
		}
	}

	setDatosPersonales(idProfesor: number){
		this.idProfesor = idProfesor;
		window.addEventListener("beforeunload", () => {
			localStorage.setItem("id", this.idProfesor + "");
		});
		this.recuperaDatos();
	}

	private recuperaDatos() {
		this.profesorService.getProfesor(this.idProfesor).subscribe({
			next: (datosProf: any) => {
				this.datosPersonalesSource.next(datosProf as Profesor);
			},
			error: err => console.error(err)
		});
	}
}
