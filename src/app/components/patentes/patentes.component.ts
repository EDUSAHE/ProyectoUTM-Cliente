import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patente } from 'src/app/models/patente.model';
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
	idProfesor: number;
	patentes: any[] = []
	idPatente: any;
	patenteActual: Patente;

	constructor(private route: ActivatedRoute, private patenteServices: PatentesService) {
		let hoy = new Date()
		this.idProfesor = Number(localStorage.getItem('idProfesor'));
		this.patentes = []
		this.patenteActual = new Patente
		this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
		this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
	}

	ngOnInit(): void {
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

	modificarPatenteModal(idPatente:any){
		this.patenteServices.obtenerPatente(idPatente).subscribe((resPatente:any)=>{
			this.patenteActual = resPatente;
			console.log(this.patenteActual)
		},
			err => console.error(err))
		$('#ModificarPatente').modal();
		$('#ModificarPatente').modal('open');
	}

	modificarPatente(patente:any) {
		console.log(patente)
		this.patenteServices.modificarPatente(patente.idPatente,patente).subscribe((resPatente:any)=>{
		},
			err => console.error(err))
		$('#ModificarPatente').modal('close');
		this.listarPatentes()
	}

	eliminarPatente(patente: any) {
		Swal.fire({
			title: '??Estas seguro de querer eliminar?',
			position: 'center',
			icon: 'question',
			showDenyButton: true,
			showConfirmButton: true,
			confirmButtonText: 'S??'
		})
			.then(respuesta => {
				if (respuesta.isConfirmed) {
					this.patenteServices.eliminarProfesoryPatente(this.idProfesor, patente.idPatente, 1).subscribe((resElimina: any) => {
						this.patenteServices.eliminarPatente(patente.idPatente).subscribe({ 
							next: (resEliminar: any) => {
								this.listarPatentes();
								Swal.fire({
									position: 'center',
									icon: 'success',
									text: 'Patente Eliminada'
								})
							},
							error: err => console.error(err)
						});
					}, err => console.error(err));


				}
			})
	}
}
