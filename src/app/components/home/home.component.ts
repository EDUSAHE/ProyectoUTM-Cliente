import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/models/articulo.model';
import { Revision } from 'src/app/models/revision.model';
import { ArticulosService } from 'src/app/services/articulos.service';
import { CambioInfoService } from 'src/app/services/cambio-info.service';
import { Patente } from 'src/app/models/patente.model';
import Swal from 'sweetalert2';
import { Evento } from 'src/app/models/evento.model';
import { Actividad } from 'src/app/models/actividad.model';

declare var $: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articulo: Articulo;
  revision:Revision;
  evento:Evento;
  patente:Patente;
  actividad :Actividad;
  constructor(private articuloService: ArticulosService, private cambioInfoService: CambioInfoService) {
    this.articulo = new Articulo()
    this.revision = new Revision();
    this.evento=new Evento()
    this.patente= new Patente();
    this.actividad = new Actividad();
  patente: Patente;
  evento: Evento;

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

  agregarRevivision(){ 
    console.log("CrearRevision");
      $('#CrearRevision').modal({ dismissible: false });
      $('##CrearRevision').modal('open');
  }
  crearActividad(){

    console.log(this.actividad);

    
  }




crearRevision(){
  this.revision.idProfesor=Number(localStorage.getItem('idProfesor'));
  console.log(this.revision);
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

  crearEvento(evento:any){
    console.log(evento)
    $('#nuevoEvento').modal({ dismissible: false });
    $('#nuevoEvento').modal('open');
  }

}
