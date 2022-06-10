import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/models/articulo.model';
import { ArticulosService } from 'src/app/services/articulos.service';
import { CambioInfoService } from 'src/app/services/cambio-info.service';
import { Patente } from 'src/app/models/patente.model';
import Swal from 'sweetalert2';

declare var $: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articulo: Articulo;
  patente: Patente;

  constructor(private articuloService: ArticulosService, private cambioInfoService: CambioInfoService) {
    this.articulo = new Articulo()
    this.patente = new Patente()
  }

  ngOnInit(): void {
    $(document).ready(function () {
      $('.fixed-action-btn').floatingActionButton({
        direction: 'left',
        hoverEnabled: false
      })
      $('.modal').modal()
    })
  }

  agregarArticulo() {
    console.log("Agregar Publicacion");
    $('#agregarArticulo').modal({ dismissible: false });
    $('#agregarArticulo').modal('open');
  }
  //creaar la Publicacion
  crearArticulo(articulos: any) {
    console.log(articulos)
  }

  enviarMensajeArticulo() {
    this.cambioInfoService.enviar('')
  }

  nuevaPatente() {
    console.log("Agregar Patente");
    $('#nuevaPatente').modal({ dismissible: false });
    $('#nuevaPatente').modal('open');
  }

  crearPatente(patente: any) {
    console.log(patente)
  }

}
