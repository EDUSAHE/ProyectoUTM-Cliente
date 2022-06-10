import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-patentes',
	templateUrl: './patentes.component.html',
	styleUrls: ['./patentes.component.css']
})
export class PatentesComponent implements OnInit {

	fechaInicial: string;
	fechaFinal: string;

	patentes: any[] = [
		{
			idPatente: 1,
			idProfesor: 4,
			nombrePatente: "Patente 1",
			registro: "2017-04-26",
			obtencion: "2017-04-28",
			colaboradores: "Juan Perez, Luis Luis",
			resumen: "Prueba de patente 1"
		},
		{
			idPatente: 2,
			idProfesor: 4,
			nombrePatente: "Patente 2",
			registro: "2017-05-26",
			obtencion: "2017-05-28",
			colaboradores: "Julian Ruiz, Pedro pedro",
			resumen: "Prueba de patente 2"
		},
		{
			idPatente: 3,
			idProfesor: 4,
			nombrePatente: "Patente 3",
			registro: "2017-06-26",
			obtencion: "2017-06-28",
			colaboradores: "Pedro, Damian",
			resumen: "Prueba de patente 3"
		}
	]

	constructor() {
		let hoy = new Date()
		this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
		this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
	}

	ngOnInit(): void {
	}

}
