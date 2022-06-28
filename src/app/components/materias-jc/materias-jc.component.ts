import { Component, OnInit } from '@angular/core';
import { Materia } from 'src/app/models/materia.model';
import { PlanesService } from 'src/app/services/planes.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
	selector: 'app-materias-jc',
	templateUrl: './materias-jc.component.html',
	styleUrls: ['./materias-jc.component.css']
})
export class MateriasJcComponent implements OnInit {

	semestres: Map<number, string> = new Map();
	materias: any[] = [];
	materiaNueva: Materia = new Materia();
	materiaEditar: Materia = new Materia();

	// Datos estaticos en espera de controllers
	materiasPrueba: Materia[] = [
		{
			idMateria: 1,
			idPlan: 1,
			semestre: 3,
			nombre: "Diseño de algoritmos"
		},
		{
			idMateria: 2,
			idPlan: 2,
			semestre: 1,
			nombre: "Matematicas"
		},
		{
			idMateria: 3,
			idPlan: 3,
			semestre: 5,
			nombre: "Arquitectura de computadoras"
		},
		{
			idMateria: 4,
			idPlan: 4,
			semestre: 4,
			nombre: "Ensamblador"
		},
		{
			idMateria: 5,
			idPlan: 5,
			semestre: 2,
			nombre: "Estructura de datos"
		},
		{
			idMateria: 6,
			idPlan: 1,
			semestre: 3,
			nombre: "POO"
		},
		{
			idMateria: 7,
			idPlan: 2,
			semestre: 1,
			nombre: "Fisica"
		},
		{
			idMateria: 8,
			idPlan: 3,
			semestre: 3,
			nombre: "Matematicas discretas"
		},
	]
	planes: any[] = [
		{
			idPlan: 1,
			plan: "Plan 1"
		},
		{
			idPlan: 2,
			plan: "Plan 2"
		},
		{
			idPlan: 3,
			plan: "Plan 3"
		},
		{
			idPlan: 4,
			plan: "Plan 4"
		},
		{
			idPlan: 5,
			plan: "Plan 5"
		}
	]

	constructor(private planesService: PlanesService) {
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

		this.materiasPrueba.sort((a, b) => {
			if (a.semestre == b.semestre)
				return 0;
			
			if (a.semestre < b.semestre)
				return -1;
			
			return 1;
		});

		this.materias = this.materiasPrueba.reduce<any[]>((anterior, actual, i) => {
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

	cambioPlan(event: any) {
		const plan = event.value;
		console.log(plan);
	}

	abreFormularioMateria() {
		this.materiaNueva = new Materia();
		this.materiaNueva.idPlan = this.planes[0].idPlan;
		$('#agregarMateria').modal();
		$('#agregarMateria').modal('open');
	}

	agregarMateria() {
		console.log(this.materiaNueva);
	}

	abreEditarMateria(materia: Materia) {
		this.materiaEditar = materia;
		$('#editarMateria').modal();
		$('#editarMateria').modal('open');
	}

	editarMateria() {
		console.log(this.materiaEditar);
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
				console.log(`Eliminando ${id}...`);
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
