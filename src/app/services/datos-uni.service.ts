import { Injectable } from '@angular/core';
import { InstitutoService } from './instituto.service';
import { CarreraService } from './carrera.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DatosUniService {

	private datosSourse: BehaviorSubject<Map<number, string>[]>;
	datos$: Observable<Map<number, string>[]>;

	constructor(private instService: InstitutoService, private carrService: CarreraService) {

		// Para observable
		this.datosSourse = new BehaviorSubject([new Map(), new Map()]);
		this.datos$ = this.datosSourse.asObservable();

		// Guarda los datos de la bd
		let institutos = new Map<number, string>();
		let carreras = new Map<number, string>();

		this.instService.obtenerTodo().subscribe({
			next: (resInstitutos: any) => {
				resInstitutos.forEach((inst: any) => {
					institutos.set(inst.idInstituto, inst.nombreInstituto);
				});

				carrService.obtenerTodo().subscribe({
					next: (resCarreras: any) => {
						resCarreras.forEach((carr: any) => {
							carreras.set(carr.idCarrera, carr.nombreCarrera);
						});

						this.datosSourse.next([institutos, carreras]);
					}
				});
			}
		});
	}
}
