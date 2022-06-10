import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-proyectos',
	templateUrl: './proyectos.component.html',
	styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

	fechaInicial: string;
	fechaFinal: string;

	proyectos: any[] = [
		{
			idProyecto: 1,
			nombreProyecto: "Plataforma de investigación 1",
			estado: "Iniciado",
			financiado: "No",
			porcentajeAvance: 10,
			inicio: "2020-04-30",
			fin: "2021-05-10",
			patrocinador: "UTM",
			responsable: "Profesor 1",
			colaboradores: ""
		},
		{
			idProyecto: 2,
			nombreProyecto: "Plataforma de investigación 2",
			estado: "Iniciado",
			financiado: "Sí",
			porcentajeAvance: 40,
			inicio: "2022-04-30",
			fin: "2023-12-20",
			patrocinador: "UMAR",
			responsable: "Profesor 2",
			colaboradores: ""
		},
		{
			idProyecto: 3,
			nombreProyecto: "Plataforma de investigación 3",
			estado: "Iniciado",
			financiado: "No",
			porcentajeAvance: 56,
			inicio: "2018-01-15",
			fin: "2019-08-12",
			patrocinador: "UNSIS",
			responsable: "Profesor 3",
			colaboradores: ""
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
