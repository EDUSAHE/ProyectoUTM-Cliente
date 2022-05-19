import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/app/models/carrera.model';
import { Instituto } from 'src/app/models/instituto.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-carreras',
  templateUrl: './listar-carreras.component.html',
  styleUrls: ['./listar-carreras.component.css']
})
export class ListarCarrerasComponent implements OnInit {

  institutos: Instituto[]
  carreras: Carrera[]
  idInstituto: number
  carreraEditar: Carrera

  constructor(private institutoService: InstitutoService, private carreraService: CarreraService) {
    this.institutos = []
    this.carreras = []
    this.idInstituto = 0
    this.carreraEditar = new Carrera()
  }

  ngOnInit(): void {
    this.institutoService.obtenerTodo().subscribe((resInstitutos: any) => {
      this.institutos = resInstitutos
      this.institutos.splice(0, 1)
      this.idInstituto = this.institutos[0].idInstituto

      // Obtener la carrera del instituto
      this.carreraService.obtenerCarrerasPorInstituto(this.idInstituto).subscribe((resCarreras: any) => {
        this.carreras = resCarreras
      }, err => { console.error(err) })
    }, err => { console.error(err) })
  }

  cambioInstituto(): void {
    // Obtener la carrera del instituto
    this.carreraService.obtenerCarrerasPorInstituto(this.idInstituto).subscribe((resCarreras: any) => {
      this.carreras = resCarreras
    }, err => { console.error(err) })
  }

  modificarCarrera(): void {
    this.carreraService.modificarCarrera(this.carreraEditar).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'Carrera Modificada'
      })
    }, err => console.error(err))
  }

  eliminarCarrera(index: number): void {
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
          this.carreraService.eliminarCarrera(this.carreras[index].idCarrera).subscribe(res => {
            this.carreras.splice(index, 1)
            Swal.fire({
              position: 'center',
              icon: 'success',
              text: 'Carrera Eliminado'
            })
          }, err => console.error(err))
        }
      })
  }

}
