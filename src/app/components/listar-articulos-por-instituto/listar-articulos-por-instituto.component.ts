import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/models/articulo.model';
import { Instituto } from 'src/app/models/instituto.model';
import { Profesor } from 'src/app/models/profesor.model';
import { ArticulosService } from 'src/app/services/articulos.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';

declare var $: any

@Component({
  selector: 'app-listar-articulos-por-instituto',
  templateUrl: './listar-articulos-por-instituto.component.html',
  styleUrls: ['./listar-articulos-por-instituto.component.css']
})
export class ListarArticulosPorInstitutoComponent implements OnInit {

  institutos: Instituto[]
  profesores: Profesor[]
  articulos: Articulo[]
  todosArticulos: any[]
  idInstituto: number
  idProfesor: number
  pages: number = 1
  fechaInicial: string
  fechaFinal: string

  constructor(private institutoService: InstitutoService, private articulosService: ArticulosService, private profesorService: ProfesorService) {
    this.institutos = []
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
    this.institutoService.obtenerTodo().subscribe((resInstitutos: any) => {
      this.institutos = resInstitutos
      this.institutos.splice(0, 1)

      // Obtener todos los profesores
      this.profesorService.obtenerTodo().subscribe((resProfesores: any) => {
        this.profesores = resProfesores
      })

      this.actualizarArticulos()

    }, err => { console.error(err) })

    $(document).ready(function () {
      $('.collapsible').collapsible();
    });

  }

  cambioInstituto(): void {
    this.idProfesor = -1
    if (this.idInstituto == -1) {
      // Obtener todos los profesores
      this.profesorService.obtenerTodo().subscribe((resProfesores: any) => {
        this.profesores = resProfesores
      })
    } else {
      // Obtener profesores del instituto
      this.profesorService.obtenerProfesoresPorInstituto(this.idInstituto).subscribe((profesoresRes: any) => {
        this.profesores = profesoresRes
      })
    }

    this.actualizarArticulos()
  }

  actualizarArticulos() {
    if (this.idProfesor == -1 && this.idInstituto == -1) {
      // Obtener todos los articulos del institutos dependiendo la fecha
      this.todosArticulos = []
      this.institutos.forEach(instituto => {
        let resultadoArticulos = {
          nombreInstituto: instituto.nombreInstituto,
          articulos: []
        }

        this.articulosService.obtenerTodoPorInstituto(instituto.idInstituto, this.fechaInicial, this.fechaFinal).subscribe((articulosRes: any) => {
          resultadoArticulos.articulos = articulosRes
        }, err => console.error(err))
        this.todosArticulos.push(resultadoArticulos)
      })

      $(document).ready(function () {
        $('.collapsible').collapsible();
      })
    } else if (this.idProfesor == -1) {
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
