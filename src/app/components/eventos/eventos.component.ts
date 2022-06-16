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

	eventos: Evento[] = [
		{
			idEvento: 0,
			idProfesor: 1,
			tipoEvento: "Congreso",
			nombreEvento: "Congreso nacional del gel antibacterial",
			participacion: "Nacional",
			afectaLinea: "Si",
			tipoParticipacion: "Asistente",
			titulo: "Como crear el gel antibacterial",
			inicio: "2022-06-01",
			fin: "2022-06-05",
			comprobante: "Sí"
		},
		{
			idEvento: 0,
			idProfesor: 2,
			tipoEvento: "Taller",
			nombreEvento: "Pabellón de la informatica del CONALEP",
			participacion: "Nacional",
			afectaLinea: "Si",
			tipoParticipacion: "Ponente",
			titulo: "Programación con Kinect",
			inicio: "2017-05-30",
			fin: "2017-05-30",
			comprobante: "Sí"
		},
		{
			idEvento: 0,
			idProfesor: 3,
			tipoEvento: "Simposium",
			nombreEvento: "IX Simposium de Software Libre de la Mixteca",
			participacion: "Nacional",
			afectaLinea: "Si",
			tipoParticipacion: "Asistente",
			titulo: "Linux en la vida cotidiana",
			inicio: "2017-04-26",
			fin: "2017-04-28",
			comprobante: "Sí"
		}
	];

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

      this.actualizarEventos()
    })
  }

  actualizarEventos() {
    // this.eventoService.obtenerEventosProfesor(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((eventosRes: any) => {
    //   this.eventos = eventosRes

    // }, err => console.error(err))
  }

}
