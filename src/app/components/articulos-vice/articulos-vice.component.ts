import { Component, OnInit } from '@angular/core';
import { ArticulosService } from 'src/app/services/articulos.service';
import { ProfesorService } from 'src/app/services/profesor.service';
declare var $: any

@Component({
  selector: 'app-articulos-vice',
  templateUrl: './articulos-vice.component.html',
  styleUrls: ['./articulos-vice.component.css']
})

export class ArticulosViceComponent implements OnInit {

  articulos: any[]
  autores: any[]
  fechaInicial: any
  fechaFinal: any

  constructor(private profesorService: ProfesorService, private articulosService: ArticulosService) {
    this.articulos = []
    this.autores = []
    let hoy = new Date()
    this.fechaInicial = (hoy.getFullYear() - 3) + '-01-01'
    this.fechaFinal = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2)
    console.log('hoy:', this.fechaInicial)
  }

  ngOnInit(): void {
    this.actualizarDatos()

  }

  cambioFecha(): void {
    console.log('cambio en la fecha')
    console.log('Fecha Inicial:', this.fechaInicial)
    console.log('Fecha Final:', this.fechaFinal)
    this.actualizarDatos()
  }

  actualizarDatos(): void {
    this.articulosService.getArticulosByPeriodo(this.fechaInicial, this.fechaFinal).subscribe((res: any) => {
      this.articulos = res

      this.articulos.forEach((articulos: any) => {
        this.profesorService.getProfesoresByArticulo(articulos.idArticulo).subscribe(resProfesores => {
          console.log(resProfesores)
          this.autores.push(resProfesores)
        }, error => {
          console.error(error)
        })
      })
    }, error => {
      console.error(error)
    })
  }

}
