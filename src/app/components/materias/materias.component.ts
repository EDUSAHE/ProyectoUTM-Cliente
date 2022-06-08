import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

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

	fechaInicial: string;
	fechaFinal: string;

	constructor(private datePipe: DatePipe) {
		let hoy = new Date();

		// Obtiene fecha de hoy
		this.fechaFinal = this.datePipe.transform(hoy, "yyyy-MM-dd") as string;

		// Obtiene fecha de un mes atrás
		hoy.setMonth(hoy.getMonth() - 1);
		this.fechaInicial = this.datePipe.transform(hoy, "yyyy-MM-dd") as string;
	}

  ngOnInit(): void {
  }

}
