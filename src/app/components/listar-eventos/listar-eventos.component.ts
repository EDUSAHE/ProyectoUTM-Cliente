import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/app/models/carrera.model';
import { Instituto } from 'src/app/models/instituto.model';
import { Profesor } from 'src/app/models/profesor.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { EventoService } from 'src/app/services/evento.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';

declare var $: any

@Component({
  selector: 'app-listar-eventos',
  templateUrl: './listar-eventos.component.html',
  styleUrls: ['./listar-eventos.component.css']
})
export class ListarEventosComponent implements OnInit {

  eventos: any[]
  todosEventos: any[]
  institutos: Instituto[]
  carreras: Carrera[]
  profesores: Profesor[]

  idInstituto: number
  idCarrera: number
  idProfesor: number

  fechaInicial: string
  fechaFinal: string

  constructor(private eventoService: EventoService, private carreraService: CarreraService, private profesorService: ProfesorService,
    private institutoService: InstitutoService) {
    this.eventos = []
    this.todosEventos = []
    this.institutos = []
    this.carreras = []
    this.profesores = []
    this.idInstituto = -1
    this.idCarrera = -1
    this.idProfesor = -1
    let hoy = new Date()
    this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
    this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
  }

  ngOnInit(): void {
    // Obtener todos los institutos
    this.institutoService.obtenerTodo().subscribe((institutosRes: any) => {
      this.institutos = institutosRes
      this.institutos.splice(0, 1)

      this.actualizarEventos()
    }, err => console.error(err))

  }

  actualizarEventos() {
    this.eventos = []
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
    }
  }

  cambioInstituto() {
    this.idCarrera = -1

    if (this.idInstituto != -1) {
      this.carreraService.obtenerCarrerasPorInstituto(this.idInstituto).subscribe((carrerasRes: any) => {
        this.carreras = carrerasRes
      }, err => console.error(err))
    }

    this.actualizarEventos()
  }

  cambioCarrera() {
    this.idProfesor = -1

    if (this.idCarrera != -1) {
      this.profesorService.obtenerProfesoresPorCarrera(this.idCarrera).subscribe((profesoresRes: any) => {
        this.profesores = profesoresRes
      })
    }

    this.actualizarEventos()
  }

}
