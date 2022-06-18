import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/models/articulo.model';
import { Revisor } from 'src/app/models/revisor.model';
import { ActivatedRoute } from '@angular/router';
// import { Revision } from 'src/app/models/revision.model';
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
  revisor: Revisor;
  evento: Evento;
  patente: Patente;
  actividad: Actividad;
  idProfesor: number;
  constructor(private route: ActivatedRoute, private articuloService: ArticulosService, private cambioInfoService: CambioInfoService) {
    this.articulo = new Articulo()
    this.revisor = new Revisor();
    this.evento = new Evento()
    this.patente = new Patente();
    this.actividad = new Actividad();
    this.idProfesor = 0;
    patente: Patente;
    evento: Evento;
    this.idProfesor = Number(localStorage.getItem('idProfesor'))
  }

  ngOnInit(): void {

    $(document).ready(function () {
      $('.fixed-action-btn').floatingActionButton({
        direction: 'left',
        hoverEnabled: false
      })
      $('.tooltipped').tooltip({ delay: 50 });
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
    this.articuloService.agregar(articulos,this.idProfesor).subscribe((resArticulo: any) => {
		},
			err => console.error(err))
    $('#agregarArticulo').modal('close');
  }
  
  agregarRevivision() {
    console.log("CrearRevision");
    $('#CrearRevision').modal();
    $('##CrearRevision').modal('open');
  }
  crearActividad() {

    console.log(this.actividad);


  }




  crearRevision() {
    this.revisor.idProfesor = Number(localStorage.getItem('idProfesor'));
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

  crearEvento(evento: any) {
    console.log(evento)
    $('#nuevoEvento').modal();
    $('#nuevoEvento').modal('open');
  }

}
