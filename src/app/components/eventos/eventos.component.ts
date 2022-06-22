import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evento } from 'src/app/models/evento.model';
import { EventoService } from 'src/app/services/evento.service';
import Swal from 'sweetalert2';
declare var $: any
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  idEvento:number;

  eventoActual:any;
  idEventoActual:any;

	idProfesor: number;
	eventos: Evento[] = [];
	fechaInicial: string;
	fechaFinal: string;
  evento: Evento;
  constructor(private eventoService: EventoService, private route: ActivatedRoute) {
    this.idProfesor = Number(localStorage.getItem('idProfesor'))

    this.evento = new Evento()
    this.idEvento=0
    let hoy = new Date()
    this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
    this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()+3).slice(-2)}`
  
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idEvento= Number(params.get('idEvento'))
	    this.listarEventos()
     
    })
  }

  convertirFecha(fecha: string) {
		return new Date(fecha).toLocaleDateString("en-CA");
	}
  cambioIni(){
    this.listarEventos();
  }
  
  ActualizarEvento() {
    console.log("nuevoEventoActualizar Patente");
    $('#nuevoEventoActualizar').modal();
    $('#nuevoEventoActualizar').modal('open');
  }

ActualizarEventoR(id:any,eventoo:any){

    this.eventoActual=eventoo;
    this.evento=eventoo;
    this.idEventoActual=id;
    this.ActualizarEvento();
}

ActualizarEventoBD(){

 

this.eventoService.ActualizarEvento(this.idEventoActual,this.eventoActual).subscribe((resElimina: any) => {
			this.listarEventos();
			$('#EditarRevivision').modal('close');
					Swal.fire({
						position: 'center',
						icon: 'success',
						text: 'Evento Actulizado'
					})
			
		}, err => console.error(err));

}
  listarEventos(){
    console.log(this.idProfesor)
    console.log(this.fechaFinal);
    console.log(this.fechaInicial);
	this.eventoService.listEventosByPeriodo(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((eventosRes: any) => {
   	this.eventos = eventosRes
    console.log(this.eventos);
    }, err => console.error(err))
  }

  eliminarEvento(idevento:any){
    

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
					this.eventoService.eliminarEvento(idevento).subscribe((resElimina: any) => {
						this.listarEventos();
						
								Swal.fire({
									position: 'center',
									icon: 'success',
									text: 'Evento Eliminado'
								})
						
					}, err => console.error(err));

				
				}
			})
	}

}
