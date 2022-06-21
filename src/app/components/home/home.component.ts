import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Articulo } from 'src/app/models/articulo.model';
import { Revisor } from 'src/app/models/revisor.model';
// import { Revision } from 'src/app/models/revision.model';
import { ArticulosService } from 'src/app/services/articulos.service';
import { Patente } from 'src/app/models/patente.model';
import Swal from 'sweetalert2';
import { Evento } from 'src/app/models/evento.model';
import { Actividad } from 'src/app/models/actividad.model';
import { RevisionesService } from 'src/app/services/revisiones.service'
import { EventoService } from 'src/app/services/evento.service'
import { ActividadService } from 'src/app/services/actividad.service'
import { PatentesService } from 'src/app/services/patentes.service';
import { Proyecto } from 'src/app/models/proyecto.model';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { RecargaService } from 'src/app/services/recarga.service';
import { DatePipe } from '@angular/common';

declare var $: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  proyecto: Proyecto = new Proyecto();
  articulo: Articulo = new Articulo();
  revisor: Revisor = new Revisor();
  evento: Evento = new Evento();
  patente: Patente = new Patente();
  actividad: Actividad = new Actividad();
  idProfesorProyecto: any;
  idProfesor: any;

  constructor(
	  private route: ActivatedRoute,
	  private datePipe: DatePipe,
	  private proyectoService: ProyectosService, 
	  private articuloService: ArticulosService,
	  private revicionesServices: RevisionesService, 
	  private enventoServices: EventoService, 
	  private patenteServices: PatentesService, 
	  private actividadServices: ActividadService,
	  private recargaService: RecargaService
  ) {
	this.setFechaArticulo();
	this.setFechaRevision();
	this.setFechaProyecto();
	this.setFechaPatente();
	this.setFechaEvento();
	this.setFechaActividad();
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
    this.route.paramMap.subscribe(params => {
      this.idProfesor = Number(localStorage.getItem('idProfesor'));
    })
  }

  agregarArticulo() {
    this.articulo = new Articulo();
	this.setFechaArticulo();
    $('#agregarArticulo').modal();
    $('#agregarArticulo').modal('open');
  }

  setFechaArticulo() {
	  const fecha = new Date();
	  this.articulo.fechaedicion = this.datePipe.transform(fecha, "yyyy-MM-dd") as string;
  }

  //crear la Publicacion
  crearArticulo(articulos: any) {
    console.log(articulos)
    this.articuloService.agregar(articulos, this.idProfesor, new Date().toLocaleDateString("en-CA")).subscribe((resArticulo: any) => {
      $('#agregarArticulo').modal('close');
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Articulo Agregado'
      });
	  this.recargaService.recargar();
    },
      err => console.error(err))
  }

  agregarRevision() {
    this.revisor = new Revisor();
	this.setFechaRevision();
    $('#agregarRevision').modal();
    $('#agregarRevision').modal('open');
  }

  setFechaRevision() {
	const fecha = new Date();
	this.revisor.fecha = this.datePipe.transform(fecha, "yyyy-MM-dd") as string;
  }

  crearRevision() {
    this.revisor.idProfesor = this.idProfesor;
    this.revicionesServices.createRevision(this.revisor).subscribe(res => {
      $('#agregarRevision').modal('close');
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Revision  Agregada'
      })
      this.revisor = new Revisor();
    }, err => console.error(err))
  }

  agregarProyecto() {
	this.proyecto = new Proyecto();
	this.setFechaProyecto();
    $('#agregarProyecto').modal();
    $('#agregarProyecto').modal('open');
  }

  setFechaProyecto() {
	const fecha = new Date();
	this.proyecto.inicio = this.datePipe.transform(fecha, "yyyy-MM-dd") as string;

	fecha.setDate(fecha.getDate() + 1);
	this.proyecto.fin = this.datePipe.transform(fecha, "yyyy-MM-dd") as string;
  }

  crearProyecto(): void {
    this.idProfesorProyecto = this.idProfesor
    this.proyectoService.agregarProyecto(this.proyecto, this.idProfesorProyecto).subscribe(res => {
      $('#agregarProyecto').modal('close');
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Proyecto  Agregado'
      })
    }, err => console.error(err))
  }

  agregarPatente() {
    this.patente = new Patente();
	this.setFechaPatente();
    $('#agregarPatente').modal();
    $('#agregarPatente').modal('open');
  }

  setFechaPatente() {
	const fecha = new Date();
	this.patente.registro = this.datePipe.transform(fecha, "yyyy-MM-dd") as string;

	fecha.setDate(fecha.getDate() + 1);
	this.patente.obtencion = this.datePipe.transform(fecha, "yyyy-MM-dd") as string;
  }

  crearPatente(patente: any) {
    if (this.patente.registro < this.patente.obtencion) {
      this.patenteServices.guardarPatente(patente,this.idProfesor).subscribe((resPatente: any) => {
	    $('#agregarPatente').modal('close');
	    Swal.fire({
		  position: 'center',
		  icon: 'success',
		  title: 'Patente Registrada'
	  	});
	  }, err => console.error(err));
    }
    else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Fecha de obtención debe de ser posterior'
      })
    }
  }

  agregarEvento() {
	this.evento = new Evento();
	this.setFechaEvento();
    $('#agregarEvento').modal();
    $('#agregarEvento').modal('open');
  }

  setFechaEvento() {
	const fecha = new Date();
	this.evento.inicio = this.datePipe.transform(fecha, "yyyy-MM-dd") as string;

	fecha.setDate(fecha.getDate() + 1);
	this.evento.fin = this.datePipe.transform(fecha, "yyyy-MM-dd") as string;
  }

  crearEvento() {
    this.evento.idProfesor = this.idProfesor;
    this.enventoServices.agregarEvento(this.evento).subscribe(res => {
      $('#agregarEvento').modal('close');
	  Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Evento  Agregado'
      })
    }, err => console.error(err))
  }

  agregarActividad() {
	this.actividad = new Actividad();
	this.setFechaActividad();
    $('#agregarActividad').modal();
    $('#agregarActividad').modal('open');
  }

  setFechaActividad() {
	const fecha = new Date();
	this.actividad.inicio = this.datePipe.transform(fecha, "yyyy-MM-dd") as string;

	fecha.setDate(fecha.getDate() + 1);
	this.actividad.fin = this.datePipe.transform(fecha, "yyyy-MM-dd") as string;
  }
  
  crearActividad() {
    this.actividad.idProfesor = this.idProfesor
    this.actividadServices.agregarActividad(this.actividad).subscribe(res => {
      $('#agregarActividad').modal('close');
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Actividad  Agregada'
      })
    }, err => console.error(err))
  }
}