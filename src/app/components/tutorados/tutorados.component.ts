import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-tutorados',
	templateUrl: './tutorados.component.html',
	styleUrls: ['./tutorados.component.css']
})
export class TutoradosComponent implements OnInit {

	fechaInicial: string;
	fechaFinal: string;

	carreras = new Map();

	tutorados: any[] = [
		{
			idTutorado: 1,
			idProfesor: 4,
			nivel: "Licenciatura",
			numero: 6,
			idCarrera: 2,
			estado: "En proceso",
			inicio: "2022-06-01",
			fin: "2022-06-05"
		},
		{
			idTutorado: 2,
			idProfesor: 4,
			nivel: "Licenciatura",
			numero: 12,
			idCarrera: 2,
			estado: "Terminado",
			inicio: "2017-05-30",
			fin: "2017-05-30"
		},
		{
			idTutorado: 3,
			idProfesor: 4,
			nivel: "Licenciatura",
			numero: 4,
			idCarrera: 2,
			estado: "En proceso",
			inicio: "2017-04-26",
			fin: "2017-04-28"
		}
	]

	constructor() {
		let hoy = new Date()
		this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
		this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`

		this.carreras.set(2, 'Ingeniería en computación');
	}

	ngOnInit(): void {
	}

}
