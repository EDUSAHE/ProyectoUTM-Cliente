import { Component, OnInit } from '@angular/core';
import { EventoService } from 'src/app/services/evento.service';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-listar-eventos-jc',
  templateUrl: './listar-eventos-jc.component.html',
  styleUrls: ['./listar-eventos-jc.component.css']
})
export class ListarEventosJcComponent implements OnInit {
  idProfesor: any
  fechaInicial: string
  fechaFinal: string
  eventos: any[]
  profesores=[]
  // Paginación
  pageSize = 10;
  p = 1;
  idCarrera: any

  constructor(private eventoService: EventoService, private profesorServices: ProfesorService) {
    this.idProfesor = Number(localStorage.getItem('idProfesor'))
    let hoy = new Date()
    this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
    this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
    this.eventos = []
    this.profesores=[]
  }

  ngOnInit(): void {
    this.profesorServices.getProfesor(this.idProfesor).subscribe((resProfesor: any) => {
      this.idCarrera = resProfesor.idCarrera
      this.actualizarEventos()
    }, err => console.error(err));
  }

  actualizarEventos() {
    this.eventoService.obtenerEventosCarrera(this.idCarrera, this.fechaInicial, this.fechaFinal).subscribe((resEventos: any) => {
      console.log(resEventos);
      this.eventos = resEventos
    }, err => console.error(err));
    /* this.eventos = []
    this.todosEventos = []
    if (this.idInstituto == -1) {
      // Mostrar todo los eventos por instituto
      this.institutos.forEach(instituto => {
        let resultadoEventos = {
          nombreInstituto: instituto.nombreInstituto,
          eventos: []
        }

        this.eventoService.obtenerEventosInstituto(instituto.idInstituto, this.fechaInicial, this.fechaFinal).subscribe((eventosRes: any) => {
          resultadoEventos.eventos = eventosRes
        }, err => console.error(err))

        this.todosEventos.push(resultadoEventos)
      })

      $(document).ready(function () {
        $('.collapsible').collapsible();
      })
    } else if (this.idCarrera == -1) {
      // Mostrar eventos del instituto
      this.eventoService.obtenerEventosInstituto(this.idInstituto, this.fechaInicial, this.fechaFinal).subscribe((eventosRes: any) => {
        this.eventos = eventosRes
      }, err => console.error(err))
    } else if (this.idProfesor == -1) {
      // Mostrar eventos de la carrera
      this.eventoService.obtenerEventosCarrera(this.idCarrera, this.fechaInicial, this.fechaFinal).subscribe((eventosRes: any) => {
        this.eventos = eventosRes
      }, err => console.error(err))
    } else {
      // Mostrar eventos del profesor
      this.eventoService.obtenerEventosProfesor(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((eventosRes: any) => {
        this.eventos = eventosRes
      }, err => console.error(err))
    } */
  }
}
