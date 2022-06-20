import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActividadService } from 'src/app/services/actividad.service';
import { Carrera } from 'src/app/models/carrera.model';
import { Instituto } from 'src/app/models/instituto.model';
import { Profesor } from 'src/app/models/profesor.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import Swal from 'sweetalert2';

declare var $: any
@Component({
	selector: 'app-actividades',
	templateUrl: './actividades.component.html',
	styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
	todasactividades: any = []
	idProfesor: number
	actividades: any[]
	fechaInicial: string
	fechaFinal: string
	todasActividades: any[]
	institutos: any = []
	idInstituto: number
	idCarrera: number
	constructor(private institutoService: InstitutoService, private actividadService: ActividadService, private route: ActivatedRoute) {
		this.actividades = []
		this.todasActividades = []
		this.idInstituto = -1
		this.idCarrera = -1
		this.idProfesor = -1
		this.institutos = []
		let hoy = new Date()
		this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
		this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
	}

	ngOnInit(): void {
		this.route.paramMap.subscribe(params => {
			this.idProfesor = Number(params.get('idProfesor'))
			this.actualizarActividades()
		})
	}

	actualizarActividades() {
		// Mostrar actividades del profesor
		this.actividadService.obtenerActividadesProfesor(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((actividadesRes: any) => {
			this.actividades = actividadesRes
		}, err => console.error(err))
	}

	convertirFecha(fecha: string) {
		return new Date(fecha).toLocaleDateString("en-CA");
	}

	eliminarActividad(id: number) {
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
					this.actividadService.eliminarActividad(id).subscribe({
						next: (resEliminar: any) => {
							this.actualizarActividades();
							Swal.fire({
								position: 'center',
								icon: 'success',
								text: 'Actividad Eliminada'
							})
						},
						error: err => console.error(err)
					});
				}
		});
	}
}
