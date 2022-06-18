import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evento } from 'src/app/models/evento.model';
import { EventoService } from 'src/app/services/evento.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  idEvento:number;
	idProfesor: number;
	eventos: Evento[] = [];
	fechaInicial: string;
	fechaFinal: string;

  constructor(private eventoService: EventoService, private route: ActivatedRoute) {
    this.idProfesor = 0
    this.idEvento=0
    let hoy = new Date()
    this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
    this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idProfesor = Number(params.get('idProfesor'))
      this.idEvento= Number(params.get('idEvento'))
	    this.listarEventos()
      this.actualizarEventos()
    })
  }

  convertirFecha(fecha: string) {
		return new Date(fecha).toLocaleDateString("en-CA");
	}

  actualizarEventos() {
    // this.eventoService.obtenerEventosProfesor(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((eventosRes: any) => {
    //   this.eventos = eventosRes

    // }, err => console.error(err))
  }
  listarEventos(){
	this.eventoService.listEventosByPeriodo(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((eventosRes: any) => {
   	this.eventos = eventosRes
    }, err => console.error(err))
  }

  eliminarEvento(evento:any){
	// 	console.log("EliminarEvento");
   console.log(evento)
	// 	Swal.fire({
	// 		title: '¿Estas seguro de querer eliminar?',
	// 		position: 'center',
	// 		icon: 'question',
	// 		showDenyButton: true,
	// 		showConfirmButton: true,
	// 		confirmButtonText: 'Sí'
	// 	})
	// 		.then(respuesta => {
	// 			if (respuesta.isConfirmed) {
	// 				this.eventoService.eliminarEvento(idEvento).subscribe((resElimina: any) => {
						
	// 							Swal.fire({
	// 								position: 'center',
	// 								icon: 'success',
	// 								text: 'Evento eliminado'
	// 							})
						
	// 				}, err => console.error(err));


	// 			}
	// 		})
	}

}
