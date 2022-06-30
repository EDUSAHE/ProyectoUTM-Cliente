import { Component, OnInit } from '@angular/core';
import { ProfesorService } from 'src/app/services/profesor.service';
import Swal from 'sweetalert2';
import { TesistasService } from 'src/app/services/tesistas.service';
import { Tesista } from 'src/app/models/tesista.model';
declare var $: any;

@Component({
  selector: 'app-listar-tesista-jc',
  templateUrl: './listar-tesista-jc.component.html',
  styleUrls: ['./listar-tesista-jc.component.css']
})
export class ListarTesistasJcComponent implements OnInit {
  tesistas: any[]
  tesisActual:Tesista
	fechaInicial: string;
	fechaFinal: string;
	idProfesor : number ;
	profesores:any[];
	idTesisActual:number
	profesoresActuales: any []
	idCarrera: any
	// Paginación
	pageSize = 10;
	p = 1;
  constructor(private tesistasService: TesistasService, private profesorServices: ProfesorService) {
    let hoy = new Date()
		this.tesistas = []
		this.profesoresActuales=[]
		this.profesores=[]
		this.idTesisActual=1
		this.tesisActual=new Tesista()
		this.idProfesor= Number(localStorage.getItem('idProfesor'));
		this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
		this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
  }

  ngOnInit(): void {
	this.profesorServices.getProfesor(this.idProfesor).subscribe((resProfesor: any) => {
		this.idCarrera = resProfesor.idCarrera
		this.obtenerTesistas()
		this.profesorServices.obtenerProfesoresPorCarrera(this.idCarrera).subscribe((resProfesor: any) => {
		  this.profesores=resProfesor
		}, err => console.error(err));
	  }, err => console.error(err));
  }
  obtenerTesistas(){
	if(this.idProfesor == -1){
		this.tesistasService.listTesistasByCarreraByPeriodo(this.idCarrera, this.fechaInicial, this.fechaFinal).subscribe((resEventos: any) => {
		  console.log(resEventos);
		  this.tesistas = resEventos
		}, err => console.error(err));
	  } 
	  else{
		this.tesistasService.listTesistasByProfesorByPeriodo(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((resEventosP: any) => {
		  console.log(resEventosP);
		  this.tesistas = resEventosP
		}, err => console.error(err));
	  }
	}
	convertirFecha(fecha: string) {
		return new Date(fecha).toLocaleDateString("en-CA");
	}
	ModalPrioridades(idTesis:any,profesores: any) {
		console.log("modalPrioridad");
		this.idTesisActual = idTesis;
		this.profesoresActuales = profesores;
		$('#modalPrioridad').modal();
		$('#modalPrioridad').modal('open');
		console.log(this.profesoresActuales);
	}
	CambiarPrioridad() {
		let aux: any[] = []
		for(let i=0; i<this.profesoresActuales.length;i++){
			aux.push({idProfesor:this.profesoresActuales[i].idProfesor,
				pos:this.profesoresActuales[i].pos,
				esInterno:this.profesoresActuales[i].esInterno})
		}
		this.tesistasService.updatePrioridadesTestistas(this.idTesisActual,aux).subscribe((resNewPos:any)=>{
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Prioridades Actualizadas',
				showConfirmButton: false,
				timer: 1000
			  })
			this.obtenerTesistas();
		},
			err => console.error(err))
	}
	ActualizarTesisModal(idTesis:any) {
		console.log("tesis")
		this.tesistasService.obtenerTesis(idTesis).subscribe((resArticulo:any)=>{
			this.tesisActual=resArticulo;
			console.log(this.tesisActual)
			$('#ActualizarTesis').modal();
			$('#ActualizarTesis').modal('open');
		},
			err => console.error(err))
	}
	actualizarArticulo() {
		console.log(this.tesisActual)
		this.tesistasService.actualizarTesis(this.tesisActual, this.tesisActual.idTesis).subscribe((resActualiza: any) => {
			this.obtenerTesistas();
			$('#ActualizarArticulo').modal('close');
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Articulo Modificado',
				showConfirmButton: false,
				timer: 1000
			  })
		},
			err => console.error(err))
	}
	eliminarTesista(idTesis: number) {
		Swal.fire({
			title: '¿Estas seguro de querer eliminar el Articulo?',
			position: 'center',
			icon: 'question',
			showDenyButton: true,
			showConfirmButton: true,
			confirmButtonText: 'Sí'
		})
		.then(respuesta => {
				if (respuesta.isConfirmed) {
					this.tesistasService.eliminarTesis(idTesis).subscribe({
						next: (resEliminar: any) => {
							Swal.fire({
								position: 'center',
								icon: 'success',
								title: 'Articulo Eliminado',
								showConfirmButton: false,
								timer: 1000
							  })
							this.obtenerTesistas();
						}
					});
				}
		});
	}
}
