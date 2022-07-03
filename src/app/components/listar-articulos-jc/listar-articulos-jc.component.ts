import { Component, OnInit } from '@angular/core';
import { ArticulosService } from 'src/app/services/articulos.service';
import { ActivatedRoute } from '@angular/router';
import { ProfesorService } from 'src/app/services/profesor.service';
import { RecargaService } from 'src/app/services/recarga.service';
import { CambioInfoService } from 'src/app/services/cambio-info.service';

declare var $: any;
@Component({
  selector: 'app-listar-articulos-jc',
  templateUrl: './listar-articulos-jc.component.html',
  styleUrls: ['./listar-articulos-jc.component.css']
})
export class ListarArticulosJcComponent implements OnInit {

  articulosCarrera: any[]
  articulosOriginal: any[]
  idCarrera: number
  fechaInicial: string
  fechaFinal: string
  opcionFiltrado: number
  opcionFormato: number
  opcionTipo: number
  idProfesorSelect: number
  profesoresCarrera: any[]
  idProfesor: number
  // Paginación
  pageSize = 10;
  p = 1;

  constructor(
    private articulosService: ArticulosService,
    private route: ActivatedRoute,
    private profesorService: ProfesorService,
    private recargaService: RecargaService,
    private cambioInforService: CambioInfoService,
  ) {
    this.idProfesor = Number(localStorage.getItem('idProfesor'))
    this.idCarrera = 0
    this.idProfesorSelect = 0
    this.profesoresCarrera = []
    this.opcionFiltrado = 1
    this.opcionFormato = 1
    this.opcionTipo = 3
    this.articulosCarrera = []
    this.articulosOriginal = []
    let hoy = new Date()
    this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
    this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
    //this.recargaService.recarga$.subscribe(signal => this.listarByFiltrado(1));
    cambioInforService.currentMsg$.subscribe(mensaje => {

    }, err => console.error(err))
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      //this.idProfesor = Number(params.get('idProfesor'))
      console.log(this.idProfesor)
      this.profesorService.getProfesor(this.idProfesor).subscribe((resProfesor: any) => {
        this.idCarrera = resProfesor.idCarrera
        console.log(this.idCarrera);
        this.listarByFiltrado(this.opcionFiltrado)
      },
        err => console.error(err))
    })
  }


  obtenerArticulosByCarrera(tipoNombre: number) {
    let a = ""
    this.articulosService.listArticulosByCarreraByPeriodo(this.idCarrera, this.fechaInicial, this.fechaFinal).subscribe((resArt: any) => {
      this.articulosOriginal = resArt
      for (let i = 0; i < this.articulosOriginal.length; i++) {
        for (let j = 0; j < this.articulosOriginal[i].autores.length; j++) {
          a = this.articulosOriginal[i].autores[j].nombreProfesor
          this.articulosOriginal[i].autores[j].nombreProfesor = this.articulosOriginal[i].autores[j].nombreApa
          this.articulosOriginal[i].autores[j].nombreApa = a
        }
      }
    },
      err => console.error(err))
    if(Number(tipoNombre)==2){
      for (let i = 0; i < this.articulosOriginal.length; i++) {
        for (let j = 0; j < this.articulosOriginal[i].autores.length; j++) {
          a = this.articulosOriginal[i].autores[j].nombreProfesor
          this.articulosOriginal[i].autores[j].nombreProfesor = this.articulosOriginal[i].autores[j].nombreApa
          this.articulosOriginal[i].autores[j].nombreApa = a
        }
      }
      console.log("orifinal")
      console.log(this.articulosOriginal)
    }
  }

  listarByFiltrado(filtro: any) {
    let aux = []
    this.opcionFiltrado = filtro
    console.log(this.opcionFiltrado)
    switch (Number(this.opcionFiltrado)) {
      case 1:
        let auxNombre = ""
        this.articulosService.listArticulosByCarreraByPeriodo(this.idCarrera, this.fechaInicial, this.fechaFinal).subscribe((resArticulos: any) => {
          this.articulosCarrera = resArticulos
          for (let i = 0; i < this.articulosCarrera.length; i++) {
            for (let j = 0; j < this.articulosCarrera[i].autores.length; j++) {
              auxNombre = this.articulosCarrera[i].autores[j].nombreProfesor
              this.articulosCarrera[i].autores[j].nombreProfesor = this.articulosCarrera[i].autores[j].nombreApa
              this.articulosCarrera[i].autores[j].nombreApa = auxNombre
            }
          }
          this.obtenerArticulosByCarrera(0);
          console.log(this.articulosOriginal)
          console.log(this.articulosCarrera)
        },
          err => console.error(err))
        break;
      case 2:
        this.obtenerArticulosByCarrera(2);
        let auxApa = ""
        for (let i = 0; i < this.articulosCarrera.length; i++) {
          for (let j = 0; j < this.articulosCarrera[i].autores.length; j++) {
            auxApa = this.articulosCarrera[i].autores[j].nombreApa
            this.articulosCarrera[i].autores[j].nombreApa = auxApa
          }
        }
        console.log(this.articulosCarrera)
        break;
      case 3:
        this.articulosCarrera = []
        for (let i = 0; i < this.articulosOriginal.length; i++) {
          this.articulosCarrera.push(this.articulosOriginal[i])
        }
        console.log(this.articulosCarrera)
        break;
      case 4:
        this.articulosCarrera = []
        for (let i = 0; i < this.articulosOriginal.length; i++) {
          if (this.articulosOriginal[i].tipoCRL == "Revista") {
            this.articulosCarrera.push(this.articulosOriginal[i])
          }
        }
        console.log(this.articulosCarrera)
        break;
      case 5:
        this.articulosCarrera = []
        for (let i = 0; i < this.articulosOriginal.length; i++) {
          if (this.articulosOriginal[i].tipoCRL == "Libro") {
            this.articulosCarrera.push(this.articulosOriginal[i])
          }
        }
        console.log(this.articulosCarrera)
        break;
      case 6:
        this.articulosCarrera = []
        for (let i = 0; i < this.articulosOriginal.length; i++) {
          if (this.articulosOriginal[i].tipoCRL == "Cap Libro") {
            this.articulosCarrera.push(this.articulosOriginal[i])
          }
        }
        console.log(this.articulosCarrera)
        break;
      case 7:
        this.articulosCarrera = []
        for (let i = 0; i < this.articulosOriginal.length; i++) {
          if (this.articulosOriginal[i].tipoCRL == "Congreso") {
            this.articulosCarrera.push(this.articulosOriginal[i])
          }
        }
        console.log(this.articulosCarrera)
        break;
      case 8:
        this.articulosCarrera = []
        for (let i = 0; i < this.articulosOriginal.length; i++) {
          if (this.articulosOriginal[i].tipoCRL == "Reporte Técnico") {
            this.articulosCarrera.push(this.articulosOriginal[i])
          }
        }
        console.log(this.articulosCarrera)
        break;
    }
  }
}
