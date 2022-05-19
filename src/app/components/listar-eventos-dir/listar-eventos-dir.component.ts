import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/app/models/carrera.model';
import { Profesor } from 'src/app/models/profesor.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { EventoService } from 'src/app/services/evento.service';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-listar-eventos-dir',
  templateUrl: './listar-eventos-dir.component.html',
  styleUrls: ['./listar-eventos-dir.component.css']
})
export class ListarEventosDirComponent implements OnInit {

  eventos: any[]
  carreras: Carrera[]
  profesores: Profesor[]
  idInstituto: number
  idCarrera: number
  idProfesor: number
  fechaInicial: string
  fechaFinal: string

  constructor(private eventoService: EventoService, private carreraService: CarreraService, private profesorService: ProfesorService) {
    this.eventos = []
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
    // Obtener id del Profesor
    let id: number = Number(localStorage.getItem('idProfesor'))
    // Obtener Instituto del profesor
    this.profesorService.getProfesor(id).subscribe((resultado: any) => {
      this.idInstituto = resultado.idInstituto

      // Obtener las Carreras del Instituto
      this.carreraService.obtenerCarrerasPorInstituto(this.idInstituto).subscribe((carrerasRes: any) => {
        this.carreras = carrerasRes
      }, err => console.error(err))
      // Obtener profesores del instituto
      this.profesorService.obtenerProfesoresPorInstituto(this.idInstituto).subscribe((profesoresRes: any) => {
        this.profesores = profesoresRes
      }, err => console.error(err))

      // Obtener los Eventos del instituto
      this.eventoService.obtenerEventosInstituto(this.idInstituto, this.fechaInicial, this.fechaFinal).subscribe((eventosRes: any) => {
        this.eventos = eventosRes
      }, err => console.error(err))

    }, err => console.error(err))

  }

  actualizarEventos() {
    if (this.idCarrera == -1 && this.idProfesor == -1) {
      // Obtener los Eventos del instituto
      this.eventoService.obtenerEventosInstituto(this.idInstituto, this.fechaInicial, this.fechaFinal).subscribe((eventosRes: any) => {
        this.eventos = eventosRes
      }, err => console.error(err))
    } else if (this.idProfesor == -1) {
      // Obtener los Eventos del instituto
      this.eventoService.obtenerEventosCarrera(this.idCarrera, this.fechaInicial, this.fechaFinal).subscribe((eventosRes: any) => {
        this.eventos = eventosRes
      }, err => console.error(err))
    } else {
      this.eventoService.obtenerEventosProfesor(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((eventosRes: any) => {
        this.eventos = eventosRes
      }, err => console.error(err))
    }
  }

  cambioCarrera() {
    this.idProfesor = -1

    if (this.idCarrera == -1) {
      // Obtener profesores del instituto
      this.profesorService.obtenerProfesoresPorInstituto(this.idInstituto).subscribe((profesoresRes: any) => {
        this.profesores = profesoresRes
      }, err => console.error(err))
    } else {
      this.profesorService.obtenerProfesoresPorCarrera(this.idCarrera).subscribe((profesoresRes: any) => {
        this.profesores = profesoresRes
      })
    }

    this.actualizarEventos()
  }

}
