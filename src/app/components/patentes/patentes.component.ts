import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatentesService } from 'src/app/services/patentes.service';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
	selector: 'app-patentes',
	templateUrl: './patentes.component.html',
	styleUrls: ['./patentes.component.css']
})
export class PatentesComponent implements OnInit {

	fechaInicial: any;
	fechaFinal: any;
	idProfesor: any;
	patentes: any[] = []
	idPatente: any;

	constructor(private route: ActivatedRoute, private patenteServices: PatentesService) {
		let hoy = new Date()
		this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
		this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
	}

	ngOnInit(): void {
		this.idProfesor = Number(localStorage.getItem('idProfesor'));
		this.listarPatentes();
	}

	listarPatentes() {
		this.patenteServices.listPatentesByProfesorByPeriodo(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((resPatentes: any) => {
			this.patentes = resPatentes;
			console.log(this.patentes);

		}, err => console.error(err))
	}
	cambioIni() {
		console.log("cambio fecha de inicio");
		this.fechaInicial = $('#fechaIni').val();
		console.log(this.fechaInicial);
		this.patenteServices.listPatentesByProfesorByPeriodo(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((resPatentes: any) => {
			this.patentes = resPatentes;
			console.log(this.patentes);

		}, err => console.error(err))

	}
	cambioFin() {
		console.log("cambio fecha de fin");
		this.fechaFinal = $('#fechaFin').val();
		console.log(this.fechaFinal);
		this.patenteServices.listPatentesByProfesorByPeriodo(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((resPatentes: any) => {
			this.patentes = resPatentes;
			console.log(this.patentes);

		}, err => console.error(err))
	}
	convertirFecha(fecha: string) {
		return new Date(fecha).toLocaleDateString("en-CA");
	}

	eliminarPatente(idPatente: number) {
		console.log(idPatente)
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
					this.patenteServices.eliminarProfesoryPatente(this.idProfesor, idPatente, 1).subscribe({ /* esInterno tambien es atributo de la tabla Profesores o aqui se da por sentado que es 1 */
						next: (resEliminar: any) => {
							this.patenteServices.eliminarPatente(idPatente).subscribe((resElimina: any) => {
								this.listarPatentes();
								Swal.fire({
									position: 'center',
									icon: 'success',
									text: 'Patente Eliminada'
								})
							}, err => console.error(err))
						},
						error: err => console.error(err)
					});
				}
			})
	}
}
