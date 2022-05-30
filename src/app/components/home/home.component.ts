import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/models/articulo.model';
import { ArticulosService } from 'src/app/services/articulos.service';
import { CambioInfoService } from 'src/app/services/cambio-info.service';
import Swal from 'sweetalert2';

declare var $: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articulo: Articulo;

  constructor(private articuloService: ArticulosService, private cambioInfoService: CambioInfoService) {
    this.articulo = new Articulo()
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

  agregarArticulo(){ 
    console.log("Agregar Publicacion");
      $('#agregarArticulo').modal({ dismissible: false });
      $('#agregarArticulo').modal('open');
  }
//creaar la Publicacion
crearArticulo(articulos:any){
  console.log(articulos)
}

  enviarMensajeArticulo() {
    this.cambioInfoService.enviar('')
  }

}
