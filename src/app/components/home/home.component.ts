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
import {EventoService} from  'src/app/services/evento.service'
import {ActividadService} from 'src/app/services/actividad.service'
import { PatentesService } from 'src/app/services/patentes.service';
import { Proyecto } from 'src/app/models/proyecto.model';
import {ProyectosService} from 'src/app/services/proyectos.service';
declare var $: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  proyecto:Proyecto
  articulo: Articulo;
  revisor:Revisor;
  evento:Evento;
  patente:Patente;
  actividad :Actividad;
  constructor(private proyectoService:ProyectosService,private articuloService: ArticulosService, private cambioInfoService: CambioInfoService,private revicionesServices:RevisionesService,private enventoServices:EventoService, private patenteServices:PatentesService, private actividadServices:ActividadService) {
    this.articulo = new Articulo()
    this.revisor = new Revisor();
    this.evento=new Evento()
    this.patente= new Patente();
    this.actividad = new Actividad();
    this.proyecto=new Proyecto()
  patente: Patente;
  evento: Evento;
  let hoy = new Date();
    this.patente.registro = hoy.getFullYear() + '-' + ((hoy.getMonth() + 1) < 10 ? '0' + (hoy.getMonth() + 1) : '' + (hoy.getMonth() + 1)) + '-' + (hoy.getDate() < 10 ? '0' + hoy.getDate() : '' + hoy.getDate());
    this.patente.obtencion = hoy.getFullYear() + '-' + ((hoy.getMonth() + 1) < 10 ? '0' + (hoy.getMonth() + 1) : '' + (hoy.getMonth() + 1)) + '-' + ((hoy.getDate()) < 9 ? '0' + (hoy.getDate()+1) : '' + (hoy.getDate()+1));
    this.articulo.fechaedicion = hoy.getFullYear() + '-' + ((hoy.getMonth() + 1) < 10 ? '0' + (hoy.getMonth() + 1) : '' + (hoy.getMonth() + 1)) + '-' + (hoy.getDate() < 10 ? '0' + hoy.getDate() : '' + hoy.getDate());

  }

  ngOnInit(): void {
    
    $(document).ready(function () {
      $('.fixed-action-btn').floatingActionButton({
        direction: 'left',
        hoverEnabled: false
      })
    $('.tooltipped').tooltip({delay:50});
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
  $('#agregarArticulo').modal('close');
  }

  agregarRevivision(){ 
    console.log("CrearRevision");
      $('#CrearRevision').modal();
      $('##CrearRevision').modal('open');
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
    if (this.patente.registro < this.patente.obtencion) {
      this.patenteServices.guardarPatente(this.patente).subscribe((resUsuario: any) =>
      {
      }, err => console.error(err));
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registro nueva patente'
      })
    }
    else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Fecha de obtención debe de ser posterior'
      })
    }
  }

  crearEvento(){
   
    this.evento.idProfesor=Number(localStorage.getItem('idProfesor'));
    this.enventoServices.agregarEvento(this.evento).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Evento  Agregado'
      })
    }, err => console.error(err))
    
    console.log(this.evento)
  }
  crearActividad(){
   
    this.actividad.idProfesor=Number(localStorage.getItem('idProfesor'));
    this.actividadServices.agregarActividad(this.actividad).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Actividad  Agregada'
      })
    }, err => console.error(err))
    
    console.log(this.evento)
  }
  
  AgregarProyecto(): void {

    this.proyectoService.agregarProyecto(this.proyecto).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Proyecto   Agregado'
      })
    }, err => console.error(err))
    
    console.log(this.proyecto)
  }
}