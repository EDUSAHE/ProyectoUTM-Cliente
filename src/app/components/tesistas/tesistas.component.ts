import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-tesistas',
	templateUrl: './tesistas.component.html',
	styleUrls: ['./tesistas.component.css']
})
export class TesistasComponent implements OnInit {

	tesistas: any[] = [
		{
			idtesis: 1,
			matricula: 2008020089,
			status: "En proceso",
			inicio: "2017-03-10",
			fin: "2018-09-10",
			nombreTesis: "Reconocimiento de gestos humanos",
			nombreEstudiante: "Chalino Lopéz",
			nivel: "Licenciatura",
			profesores: [
				{
					nombreProfesor: "Carlos Alberto Fernández y Fernández"
				},
				{
					nombreProfesor: "Erik Germán Ramos Pérez"
				}
			]
		},
		{
			idtesis: 2,
			matricula: 2008020090,
			status: "En proceso",
			inicio: "2018-02-23",
			fin: "2019-02-23",
			nombreTesis: "Aplicación de redes neuronales",
			nombreEstudiante: "Noel Santos",
			nivel: "Maestria",
			profesores: [
				{
					nombreProfesor: "Erik Germán Ramos Pérez"
				},
				{
					nombreProfesor: "Moisés Emmanuel Ramírez Guzmán"
				}
			]
		},
		{
			idtesis: 3,
			matricula: 2008020091,
			status: "Terminada",
			inicio: "2020-05-11",
			fin: "2021-01-10",
			nombreTesis: "Prototipo de robot",
			nombreEstudiante: "Pedro Ruíz",
			nivel: "Licenciatura",
			profesores: [
				{
					nombreProfesor: "Erik Germán Ramos Pérez"
				},
			]
		}
	]

	fechaInicial: string;
	fechaFinal: string;

	constructor() {
		let hoy = new Date()
		this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
		this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
	}

	ngOnInit(): void {
	}

}
