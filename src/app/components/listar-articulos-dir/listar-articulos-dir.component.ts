import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/models/articulo.model';
import { Profesor } from 'src/app/models/profesor.model';
import { ArticulosService } from 'src/app/services/articulos.service';
import { ProfesorService } from 'src/app/services/profesor.service';

declare var $: any

@Component({
  selector: 'app-listar-articulos-dir',
  templateUrl: './listar-articulos-dir.component.html',
  styleUrls: ['./listar-articulos-dir.component.css']
})
export class ListarArticulosDirComponent implements OnInit {

  profesores: Profesor[]
  articulos: any[]
  todosArticulos: any[]
  idInstituto: number
  idProfesor: number
  pages: number = 1
  fechaInicial: string
  fechaFinal: string

  constructor(private articulosService: ArticulosService, private profesorService: ProfesorService) {
    this.profesores = []
    this.articulos = []
    this.todosArticulos = []
    this.idInstituto = -1
    this.idProfesor = -1
    let hoy = new Date()
    this.fechaInicial = `${hoy.getFullYear()}-${('0' + hoy.getMonth()).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
    this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
  }

  ngOnInit(): void {
    // Obtener id del Profesor
    let id: number = Number(localStorage.getItem('idProfesor'))
    // Obtener Instituto del profesor
    this.profesorService.getProfesor(id).subscribe((resultado: any) => {
      this.idInstituto = resultado.idInstituto

      // Obtener todos los profesores del instituto
      this.profesorService.obtenerProfesoresPorInstituto(this.idInstituto).subscribe((profesoresRes: any) => {
        this.profesores = profesoresRes
      }, err => console.error(err))

      this.actualizarArticulos()

    }, err => console.error(err))
    $(document).ready(function () {
      $('.collapsible').collapsible();
    });

  }

  actualizarArticulos() {
    if (this.idProfesor == -1) {
      // Obtener todos los articulos del instituto
      this.articulosService.obtenerArticulosPorInstitutoPorFechas(this.idInstituto, this.fechaInicial, this.fechaFinal).subscribe((articulosRes: any) => {
        this.articulos = articulosRes
      }, err => console.error(err))
    } else {
      // Obtener los articulos del profesor
      this.articulosService.getArticulosByProfesor(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((articulosRes: any) => {
        this.articulos = articulosRes
      }, err => console.error(err))
    }
  }

}
