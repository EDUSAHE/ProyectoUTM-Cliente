import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evento } from 'src/app/models/evento.model';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

	idProfesor: number;

	eventos: Evento[] = [];

	fechaInicial: string;
	fechaFinal: string;

  constructor(private eventoService: EventoService, private route: ActivatedRoute) {
    this.idProfesor = 0
    let hoy = new Date()
    this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
    this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idProfesor = Number(params.get('idProfesor'))
	  this.listarEventos()
      this.actualizarEventos()
    })
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

}
