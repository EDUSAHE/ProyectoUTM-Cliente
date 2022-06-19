import { Component, OnInit } from '@angular/core';
import { Profesor } from 'src/app/models/profesor.model';
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
	datosProf: Profesor = new Profesor();
	materiasProfesor: any[] = [];
	materiasMulti: any[] = [];

	materias: Map<number, string> = new Map();

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

		this.datosPersonalesService.datosPersonales$.subscribe(prof => {
			this.datosProf = prof;
		});

		this.materiasService.list().subscribe({
			next: (resMaterias: any) => {
				resMaterias.forEach((materia: any) => {
					this.materias.set(materia.idMateria, materia.nombreMateria);
				});
			}
		});
	}

	ngOnInit(): void {
		this.obtenerMaterias();
	}

	obtenerMaterias() {
		this.materiasService
		.listMateriasByAnyoByPeriodo(this.idProfesor, this.fechaInicial + "-01-01", this.fechaFinal + "-12-31").subscribe({
			next: (resMaterias: any) => {
				this.materiasProfesor = resMaterias;
				this.materiasService
				.listMateriasByAnyoByPeriodoMultiple(this.idProfesor, this.fechaInicial + "-01-01", this.fechaFinal + "-12-31").subscribe({
					next: (resMultiple: any) => {
						this.materiasMulti = resMultiple;
					}
				});
			}
		});
	}

}
