import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/app/models/carrera.model';
import { Instituto } from 'src/app/models/instituto.model';
import { Profesor } from 'src/app/models/profesor.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-profesores',
  templateUrl: './listar-profesores.component.html',
  styleUrls: ['./listar-profesores.component.css']
})
export class ListarProfesoresComponent implements OnInit {

  institutos: Instituto[]
  carreras: Carrera[]
  profesores: Profesor[]
  idInstitutoActual: number
  idCarreraActual: number
  urlImagenes: string
  profesorEditar: Profesor

  constructor(private institutoService: InstitutoService, private carreraService: CarreraService, private profesorService: ProfesorService) {
    this.institutos = []
    this.carreras = []
    this.profesores = []
    this.idInstitutoActual = 0
    this.idCarreraActual = 0
    this.urlImagenes = environment.URI_IMG
    this.profesorEditar = new Profesor()
  }

  ngOnInit(): void {
    this.institutoService.obtenerTodo().subscribe((resInstitutos: any) => {
      this.institutos = resInstitutos
      this.institutos.splice(0, 1)
      this.idInstitutoActual = this.institutos[0].idInstituto

      // Obtener Carreras
      this.carreraService.obtenerCarrerasPorInstituto(this.idInstitutoActual).subscribe((resCarreras: any) => {
        this.carreras = resCarreras
        this.idCarreraActual = this.carreras[0].idCarrera

        // Obtener profesores de la carrera
        this.profesorService.obtenerProfesoresPorCarrera(this.idCarreraActual).subscribe((resProfesores: any) => {
          this.profesores = resProfesores
        }, err => { console.error(err) })
      }, err => { console.error(err) })
    }, err => { console.error(err) })
  }

  cambioInstituto(): void {
    this.carreraService.obtenerCarrerasPorInstituto(this.idInstitutoActual).subscribe((resCarreras: any) => {
      this.carreras = resCarreras
      this.idCarreraActual = this.carreras[0].idCarrera

      // Obtener profesores de la carrera
      this.profesorService.obtenerProfesoresPorCarrera(this.idCarreraActual).subscribe((resProfesores: any) => {
        this.profesores = resProfesores
        console.log(this.profesores)
      }, err => { console.error(err) })
    }, err => { console.error(err) })
  }

  cambioCarrera(): void {
    this.profesorService.obtenerProfesoresPorCarrera(this.idCarreraActual).subscribe((resProfesores: any) => {
      this.profesores = resProfesores
      console.log('Profes', this.profesores)
    }, err => { console.error(err) })
  }

  modificarProfesor(): void {
    this.profesorService.actualizarProfesor(this.profesorEditar, this.profesorEditar.idProfesor).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'Profesor Modificado'
      })
    }, err => console.error(err))

  }

  eliminarProfesor(index: number): void {
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
          this.profesorService.eliminarProfesor(this.profesores[index].idProfesor).subscribe(res => {
            this.profesores.splice(index, 1)
            Swal.fire({
              position: 'center',
              icon: 'success',
              text: 'Profesor Eliminado'
            })
          }, err => console.error(err))
        }
      })
  }

  actualizarCarreras(): void {
    this.carreraService.obtenerCarrerasPorInstituto(this.profesorEditar.idInstituto).subscribe((carrerasRes: any) => {
      this.carreras = carrerasRes
      this.profesorEditar.idCarrera = this.carreras[0].idCarrera
    }, err => console.error(err))
  }

}
