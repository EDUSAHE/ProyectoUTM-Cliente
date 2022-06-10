import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/models/articulo.model';
import { Revision } from 'src/app/models/revision.model';
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
  revision:Revision;

  constructor(private articuloService: ArticulosService, private cambioInfoService: CambioInfoService) {
    this.articulo = new Articulo()
    this.revision = new Revision();

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

  agregarRevivision(){ 
    console.log("CrearRevision");
      $('#CrearRevision').modal({ dismissible: false });
      $('##CrearRevision').modal('open');
  }
//creaar la Publicacion
crearArticulo(articulos:any){
  console.log(articulos)
}


crearRevision(){
  this.revision.idProfesor=Number(localStorage.getItem('idProfesor'));
  console.log(this.revision);
}

  enviarMensajeArticulo() {
    this.cambioInfoService.enviar('')
  }

}
