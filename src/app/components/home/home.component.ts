import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/models/articulo.model';
import { Revisor } from 'src/app/models/revisor.model';
import { ArticulosService } from 'src/app/services/articulos.service';
import { CambioInfoService } from 'src/app/services/cambio-info.service';
import { Patente } from 'src/app/models/patente.model';
import Swal from 'sweetalert2';
import { Evento } from 'src/app/models/evento.model';
import { Actividad } from 'src/app/models/actividad.model';
import {RevisionesService} from 'src/app/services/revisiones.service'

declare var $: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articulo: Articulo;
  revisor:Revisor;
  evento:Evento;
  patente:Patente;
  actividad :Actividad;
  constructor(private articuloService: ArticulosService, private cambioInfoService: CambioInfoService,private revicionesServices:RevisionesService) {
    this.articulo = new Articulo()
    this.revisor = new Revisor();
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
	  $('.tooltipped').tooltip();
      $('.modal').modal()
    })
  }

  agregarArticulo() {
    console.log("Agregar Publicacion");
    $('#agregarArticulo').modal();
    $('#agregarArticulo').modal('open');
  }
  //creaar la Publicacion
  crearArticulo(articulos: any) {
    console.log(articulos)
  }

  agregarRevivision(){ 
    console.log("CrearRevision");
      $('#CrearRevision').modal();
      $('##CrearRevision').modal('open');
  }
  crearActividad(){

    console.log(this.actividad);

    
  }




crearRevision(){
  this.revisor.idProfesor=Number(localStorage.getItem('idProfesor'));
  
  this.revicionesServices.createRevision(this.revisor).subscribe(res => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Revision  Agregada'
    })
  }, err => console.error(err))
  
  console.log(this.revisor);
}

  enviarMensajeArticulo() {
    this.cambioInfoService.enviar('')
  }

  nuevaPatente() {
    console.log("Agregar Patente");
    $('#nuevaPatente').modal();
    $('#nuevaPatente').modal('open');
  }

  crearPatente(patente: any) {
    console.log(patente)
  }

  crearEvento(evento:any){
    console.log(evento)
    $('#nuevoEvento').modal();
    $('#nuevoEvento').modal('open');
  }

}
