import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-comisiones',
	templateUrl: './comisiones.component.html',
	styleUrls: ['./comisiones.component.css']
})
export class ComisionesComponent implements OnInit {

	fechaInicial: string;
	fechaFinal: string;

	comisiones: any[] = [
		{
			nombre: "Comisión 1",
			idProfesor: 4,
			periodo: "Definido",
			inicio: "2017-04-26",
			asignacion:"Jefatura",
		},
		{
			nombre: "Comisión 2",
			idProfesor: 4,
			periodo: "Indefinido",
			inicio: "2018-07-26",
			asignacion:"Vicerrectoria",
		},
		{
			nombre: "Comisión 3",
			idProfesor: 4,
			periodo: "Definido",
			inicio: "2020-04-30",
			asignacion:"Jefatura",
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
