import { Component, OnInit } from '@angular/core';
import { Profesor } from 'src/app/models/profesor.model';
import { ProfesorService } from 'src/app/services/profesor.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-profesores-jc',
  templateUrl: './listar-profesores-jc.component.html',
  styleUrls: ['./listar-profesores-jc.component.css']
})
export class ListarProfesoresJcComponent implements OnInit {

  profesores: Profesor[]
  profesorActual: Profesor
  profesorEditar: Profesor
  urlImagenes: string

  constructor(private profesorService: ProfesorService) {
    this.profesores = []
    this.profesorActual = new Profesor()
    this.profesorEditar = new Profesor()
    this.urlImagenes = environment.URI_IMG
  }

  ngOnInit(): void {
    this.profesorService.getProfesor(Number(localStorage.getItem('idProfesor'))).subscribe((profesorRes: any) => {
      this.profesorActual = profesorRes

      // Obtener profesores de la carrera actual
      this.profesorService.obtenerProfesoresPorCarrera(this.profesorActual.idCarrera).subscribe((profesoresRes: any) => {
        this.profesores = profesoresRes
      }, err => console.error(err))
    }, err => console.error(err))
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

}
