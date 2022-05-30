import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Articulo } from 'src/app/models/articulo.model';
import { ArticulosService } from 'src/app/services/articulos.service';
import { CambioInfoService } from 'src/app/services/cambio-info.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
declare var $: any
@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  idProfesor: number
  articulos: Articulo[]
  fileToUpload: any
  fechaInicial: string
  fechaFinal: string
  ArticuloActual:any
  urlArchivos: string

  constructor(private route: ActivatedRoute, private articulosService: ArticulosService, private cambioInforService: CambioInfoService, private imagenesService: ImagenesService) {
    this.idProfesor = 0
    this.articulos = [] 
    this.ArticuloActual= new Articulo()
    this.fileToUpload = null
    let hoy = new Date()
    this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
    this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`

    this.urlArchivos = environment.URI_ARCHIVOS

    cambioInforService.currentMsg$.subscribe(mensaje => {
      this.obtenerArticulos()
    }, err => console.error(err))
  }
  //desplegar model
  ActualizarArticuloModal(articuloM:any){ 
    console.log("ActualizarArticulo");
      $('#ActualizarArticulo').modal({ dismissible: false });
      $('#ActualizarArticulo').modal('open');
     this.ArticuloActual=articuloM;

  }
//Actualiza la Publicacion
ActualizarP(articulo:any){
  console.log(articulo)
}








  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idProfesor = Number(params.get('idProfesor'))
      this.obtenerArticulos()
    })
  }

  obtenerArticulos(): void {
    this.articulosService.getArticulosByProfesor(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((resArticulos: any) => {
      this.articulos = resArticulos
      console.log(this.articulos)
    },
      err => console.error(err))
  }

  cargarArchivo(archivos: any, idArticulo: number): void {
    let archivo = archivos.files
    console.log(archivo)

    for (let i = 0; i < archivo.length; i++) {
      this.fileToUpload = archivo.item(i)
      let imgPromise = this.getFileBlob(this.fileToUpload)
      imgPromise.then(blob => {
        this.imagenesService.guardarArchivo(blob, idArticulo, archivo.item(i).type).subscribe(res => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Archivo Cargado Exitosamente'
          })
          this.obtenerArticulos()
        }, err => console.error(err))
      })
    }
  }

  getFileBlob(file: any) {
    var reader = new FileReader();
    return new Promise(function (resolve, reject) {
      reader.onload = (function (thefile) {
        return function (e: any) {
          resolve(e.target.result);
        };
      })(file);
      reader.readAsDataURL(file);
    });

  }

}
