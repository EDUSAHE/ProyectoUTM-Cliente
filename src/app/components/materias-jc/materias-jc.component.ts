import { Component, OnInit } from '@angular/core';
import { Materia } from 'src/app/models/materia.model';
import { ProfesorService } from 'src/app/services/profesor.service';
import { MateriasService } from 'src/app/services/materias.service';
import { PlanesService } from 'src/app/services/planes.service';
import { DatosPersonalesService } from 'src/app/services/datos-personales.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
	selector: 'app-materias-jc',
	templateUrl: './materias-jc.component.html',
	styleUrls: ['./materias-jc.component.css']
})
export class MateriasJcComponent implements OnInit {

	datosProf: any;
	semestres: Map<number, string> = new Map();
	materias: any[] = [];
	materiaNueva: Materia = new Materia();
	materiaEditar: Materia = new Materia();
	planes: any[] = [];
	planActual: number = 0;

	constructor(
		private materiasService: MateriasService,
		private planesService: PlanesService,
		private profesorService: ProfesorService,
		private datosPersonalesService: DatosPersonalesService
	) {
		this.semestres.set(-1, "Propedéutico Largo");
		this.semestres.set(0, "Propedéutico");
		this.semestres.set(1, "Primero");
		this.semestres.set(2, "Segundo");
		this.semestres.set(3, "Tercero");
		this.semestres.set(4, "Cuarto");
		this.semestres.set(5, "Quinto");
		this.semestres.set(6, "Sexto");
		this.semestres.set(7, "Séptimo");
		this.semestres.set(8, "Octavo");
		this.semestres.set(9, "Noveno");
		this.semestres.set(10, "Décimo");
	}

	ngOnInit(): void {
		$(document).ready(function () {
			$('.modal').modal();
		});

		this.profesorService.getProfesor(this.datosPersonalesService.idProfesor).subscribe({
			next: (resProfesor: any) => {
				this.datosProf = resProfesor;
				this.planesService.listPlanesByCarrera(this.datosProf.idCarrera).subscribe({
					next: (resPlanes: any) => {
						this.planes = resPlanes;
						this.planActual =  this.planes[0].idPlan;
						this.obtieneMaterias(this.planActual);
					}
				});
			}
		});
		
	}

	obtieneMaterias(idPlan: number) {
		this.materiasService.listMateriasByPlan(idPlan).subscribe({
			next: (resMaterias: any) => {
				this.materias = resMaterias;
				this.materias = this.materias.reduce<any[]>((anterior, actual, i) => {
					if (i == 0)
						anterior.push([actual]);
					else {
						if (actual.semestre == anterior[anterior.length - 1][0].semestre) {
							anterior[anterior.length - 1].push(actual);
						} else {
							anterior.push([actual]);
						}
					}
		
					return anterior;
				}, []);
			}
		});
	}

	cambioPlan(event: any) {
		const plan = Number(event.value);
		this.planActual = plan;
		this.obtieneMaterias(plan);
	}

	abreFormularioMateria() {
		this.materiaNueva = new Materia();
		this.materiaNueva.idPlan = this.planes[0].idPlan;
		$('#agregarMateria').modal();
		$('#agregarMateria').modal('open');
	}

	agregarMateria() {
		this.materiasService.create(this.materiaNueva).subscribe({
			next: (resCrea: any) => {
				this.obtieneMaterias(this.planActual);
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Materia agregada'
				});
			}
		});
		$('#agregarMateria').modal('close');
	}

	abreEditarMateria(materia: Materia) {
		this.materiaEditar = materia;
		$('#editarMateria').modal();
		$('#editarMateria').modal('open');
	}

	editarMateria() {
		this.materiasService.update(this.materiaEditar).subscribe({
			next: (resEditar: any) => {
				this.obtieneMaterias(this.planActual);
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Materia editada'
				});
			}
		});
		$('#editarMateria').modal('close');
	}

	eliminarMateria(id: number) {
		Swal.fire({
			title: '¿Estas seguro de querer eliminar?',
			position: 'center',
			icon: 'question',
			showDenyButton: true,
			showConfirmButton: true,
			confirmButtonText: 'Sí'
		})
		.then(respuesta => {
			if (respuesta.isConfirmed) {
				this.materiasService.delete(id).subscribe({
					next: (resEliminar: any) => {
						this.obtieneMaterias(this.planActual);
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: 'Materia eliminada'
						});
					}
				});
			}
		});
	}

	semestreArray(): any[] {
		return Array.from(this.semestres, (sems) => {
			return { 
				llave: sems[0],
				valor: sems[1]
			}
		});
	}

}
