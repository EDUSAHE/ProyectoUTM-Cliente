import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/app/models/carrera.model';
import { Instituto } from 'src/app/models/instituto.model';
import { Profesor } from 'src/app/models/profesor.model';
import { ActividadService } from 'src/app/services/actividad.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';

declare var $: any

@Component({
  selector: 'app-listar-actividades',
  templateUrl: './listar-actividades.component.html',
  styleUrls: ['./listar-actividades.component.css']
})
export class ListarActividadesComponent implements OnInit {

  actividades: any[]
  todasActividades: any[]
  institutos: Instituto[]
  carreras: Carrera[]
  profesores: Profesor[]

  idInstituto: number
  idCarrera: number
  idProfesor: number

  fechaInicial: string
  fechaFinal: string

  constructor(private institutoService: InstitutoService, private actividadService: ActividadService, private carreraService: CarreraService, private profesorService: ProfesorService) {
    this.actividades = []
    this.todasActividades = []
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

      this.actualizarActividades()
    }, err => console.error(err))

  }

  actualizarActividades() {
    this.actividades = []
    this.todasActividades = []

    if (this.idInstituto == -1) {
      // Mostrar todas las actividades por instituto
      this.institutos.forEach(instituto => {
        let resultadoActividades = {
          nombreInstituto: instituto.nombreInstituto,
          actividades: []
        }

        this.actividadService.obtenerActividadesInstituto(instituto.idInstituto, this.fechaInicial, this.fechaFinal).subscribe((eventosRes: any) => {
          resultadoActividades.actividades = eventosRes
        }, err => console.error(err))

        this.todasActividades.push(resultadoActividades)
      })

      $(document).ready(function () {
        $('.collapsible').collapsible();
      })
    } else if (this.idCarrera == -1) {
      // Mostrar las actividades del instituto
      this.actividadService.obtenerActividadesInstituto(this.idInstituto, this.fechaInicial, this.fechaFinal).subscribe((actividadesRes: any) => {
        this.actividades = actividadesRes
      }, err => console.error(err))
    } else if (this.idProfesor == -1) {
      // Mostrar actividades de la carrera
      this.actividadService.obtenerActividadesCarrera(this.idCarrera, this.fechaInicial, this.fechaFinal).subscribe((actividadesRes: any) => {
        this.actividades = actividadesRes
      }, err => console.error(err))
    } else {
      // Mostrar actividades del profesor
      this.actividadService.obtenerActividadesProfesor(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((actividadesRes: any) => {
        this.actividades = actividadesRes
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

    this.actualizarActividades()
  }

  cambioCarrera() {
    this.idProfesor = -1

    if (this.idCarrera != -1) {
      this.profesorService.obtenerProfesoresPorCarrera(this.idCarrera).subscribe((profesoresRes: any) => {
        this.profesores = profesoresRes
      })
    }

    this.actualizarActividades()
  }

}
