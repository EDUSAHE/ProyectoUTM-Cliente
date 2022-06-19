import { Component, OnInit } from '@angular/core';
import { DatosPersonalesService } from 'src/app/services/datos-personales.service';
import { MateriasService } from 'src/app/services/materias.service';
import { PlanesService } from 'src/app/services/planes.service';

@Component({
	selector: 'app-materias',
	templateUrl: './materias.component.html',
	styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

	idProfesor: number;
	profesor = {
		nombre: "Erik Germán Ramos Pérez"
	}

	materias: any[] = [
		{
			nombreMateria: "Programación web II",
			grupo: "602-A",
			carrera: "Ingeniería en Computación",
			nombrePlan: "5",
			periodo: "2022-B"
		},
		{
			nombreMateria: "Programación web I",
			grupo: "502-A",
			carrera: "Ingeniería en Computación",
			nombrePlan: "5",
			periodo: "2022-A"
		},
		{
			nombreMateria: "Procesamiento del imágenes",
			grupo: "902-A",
			carrera: "Ingeniería en Computación",
			nombrePlan: "5",
			periodo: "2022-A"
		}
	];

	materiasMulti: any[] = [
		{
			nombreMateria: "Programación estructurada",
			grupos: [
				"102",
				"407"
			],
			carrera: "Ingeniería en Computación",
			nombrePlan: "2",
			periodo: "2022-B"
		}
	]

	planes: Map<number, string> = new Map();

	fechaActual: string;
	fechaInicial: string;
	fechaFinal: string;

	constructor(private materiasService: MateriasService, private planesService: PlanesService,
		private datosPersonalesService: DatosPersonalesService) {
		let hoy = new Date();
		this.fechaActual = hoy.getFullYear() + "";
		this.fechaFinal = hoy.getFullYear() + "";
		this.fechaInicial = (hoy.getFullYear() - 1) + "";
		this.idProfesor = datosPersonalesService.idProfesor;
	}

	ngOnInit(): void {
		this.materiasService
		.listMateriasByAnyoByPeriodo(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe({
			next: (resMaterias: any) => {
				// En espera de la corrección del controller
				console.log(resMaterias)
			}
		});
	}

}
