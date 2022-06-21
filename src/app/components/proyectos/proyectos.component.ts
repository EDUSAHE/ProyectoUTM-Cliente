import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto.model';
import { ProyectosService } from 'src/app/services/proyectos.service';
import Swal from 'sweetalert2';


declare var $: any;
@Component({
	selector: 'app-proyectos',
	templateUrl: './proyectos.component.html',
	styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

	proyecto: Proyecto;


	fechaInicial: any;
	fechaFinal: any;
	idProfesor: any;

	proyectos: any[];

	constructor(private proyectoService: ProyectosService) {

		let hoy = new Date()

		this.proyecto = new Proyecto();
		this.proyectos = []


		this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
		this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
		this.idProfesor = Number(localStorage.getItem('idProfesor'))
	}

	ngOnInit(): void {
		this.idProfesor = Number(localStorage.getItem('idProfesor'));
		this.listProyectosByProfesorByPeriodo();
		console.log(this.proyectoService)
	}

	convertirFecha(fecha: string) {
		return new Date(fecha).toLocaleDateString("en-CA");
	}

	listProyectosByProfesorByPeriodo() {
		this.proyectoService.listProyectosByProfesorByPeriodo(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((proyectoRes: any) => {
			this.proyectos = proyectoRes
			console.log(proyectoRes);
		}, err => console.error(err))

	}

	//proyecto es la variable nueva donde se guardan las actualizaciones, poryecto actual es el que ya esta
	editarProyectoE(idProyecto: any) {
		this.proyectoService.listProyecto(idProyecto).subscribe((resProyecto: any) => {
			this.proyecto = resProyecto;
			this.proyecto.inicio=this.convertirFecha(resProyecto.inicio)
			this.proyecto.fin=this.convertirFecha(resProyecto.fin)
			console.log(this.proyecto);
		},
			err => console.error(err))
		this.editarProyecto();
	}

	editarProyecto() {
		$('#editarProyecto').modal();
		$('#editarProyecto').modal('open');
	}

	editarProyectoServer() {
		console.log()
		this.proyectoService.actualizarProyecto(this.proyecto, this.proyecto.idProyecto).subscribe((resElimina: any) => {
			this.listProyectosByProfesorByPeriodo();
			$('#EditarProyecto').modal('close');
			Swal.fire({
				position: 'center',
				icon: 'success',
				text: 'Proyecto Actualizado'
			})

		}, err => console.error(err));

	}


	eliminarProyecto(idProyecto: any) {
		console.log("Eliminar Proyecto");

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
					this.proyectoService.eliminarProyecto(idProyecto).subscribe((resElimina: any) => {
						this.listProyectosByProfesorByPeriodo();

						Swal.fire({
							position: 'center',
							icon: 'success',
							text: 'Proyecto Eliminado'
						})

					}, err => console.error(err));


				}
			})
	}

}





