import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-revisiones',
	templateUrl: './revisiones.component.html',
	styleUrls: ['./revisiones.component.css']
})
export class RevisionesComponent implements OnInit {

	fechaInicial: string;
	fechaFinal: string;

	revisiones: any[] = [
		{
			idRevisor: 1,
			idProfesor: 4,
			tipoRP: "Revista",
			nombreRI: "Instituto de revista prueba 1",
			fecha: "2017-06-28",
			tituloRP: "Revista prueba 1"
		},
		{
			idRevisor: 2,
			idProfesor: 4,
			tipoRP: "Publicación",
			nombreRI: "Revista HOLA",
			fecha: "2017-05-26",
			tituloRP: "Publicación prueba 2"
		},
		{
			idRevisor: 3,
			idProfesor: 4,
			tipoRP: "Revista",
			nombreRI: "Instituto de revista prueba 2",
			fecha: "2017-04-26",
			tituloRP: "Revista prueba 2"
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
