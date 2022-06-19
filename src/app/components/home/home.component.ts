import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Articulo } from 'src/app/models/articulo.model';
import { Revisor } from 'src/app/models/revisor.model';
// import { Revision } from 'src/app/models/revision.model';
import { ArticulosService } from 'src/app/services/articulos.service';
import { CambioInfoService } from 'src/app/services/cambio-info.service';
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
declare var $: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  proyecto: Proyecto
  articulo: Articulo;
  revisor: Revisor;
  evento: Evento;
  patente: Patente;
  actividad: Actividad;
  idProfesorProyecto:any
  idProfesor:any;
  constructor(private route: ActivatedRoute,private proyectoService: ProyectosService, private articuloService: ArticulosService, private cambioInfoService: CambioInfoService, private revicionesServices: RevisionesService, private enventoServices: EventoService, private patenteServices: PatentesService, private actividadServices: ActividadService) {
    this.articulo = new Articulo()
    this.revisor = new Revisor();
    this.evento = new Evento()
    this.patente = new Patente();
    this.actividad = new Actividad();
    this.idProfesor = Number(localStorage.getItem('idProfesor'))
    this.proyecto = new Proyecto()
    let hoy = new Date();
    this.patente.registro = hoy.getFullYear() + '-' + ((hoy.getMonth() + 1) < 10 ? '0' + (hoy.getMonth() + 1) : '' + (hoy.getMonth() + 1)) + '-' + (hoy.getDate() < 10 ? '0' + hoy.getDate() : '' + hoy.getDate());
    this.patente.obtencion = hoy.getFullYear() + '-' + ((hoy.getMonth() + 1) < 10 ? '0' + (hoy.getMonth() + 1) : '' + (hoy.getMonth() + 1)) + '-' + ((hoy.getDate()) < 9 ? '0' + (hoy.getDate() + 1) : '' + (hoy.getDate() + 1));
    this.articulo.fechaedicion = hoy.getFullYear() + '-' + ((hoy.getMonth() + 1) < 10 ? '0' + (hoy.getMonth() + 1) : '' + (hoy.getMonth() + 1)) + '-' + (hoy.getDate() < 10 ? '0' + hoy.getDate() : '' + hoy.getDate());
    this.revisor.fecha = hoy.getFullYear() + '-' + ((hoy.getMonth() + 1) < 10 ? '0' + (hoy.getMonth() + 1) : '' + (hoy.getMonth() + 1)) + '-' + (hoy.getDate() < 10 ? '0' + hoy.getDate() : '' + hoy.getDate());
    this.evento.inicio = hoy.getFullYear() + '-' + ((hoy.getMonth() + 1) < 10 ? '0' + (hoy.getMonth() + 1) : '' + (hoy.getMonth() + 1)) + '-' + (hoy.getDate() < 10 ? '0' + hoy.getDate() : '' + hoy.getDate());
    this.evento.fin = hoy.getFullYear() + '-' + ((hoy.getMonth() + 1) < 10 ? '0' + (hoy.getMonth() + 1) : '' + (hoy.getMonth() + 1)) + '-' + ((hoy.getDate()) < 9 ? '0' + (hoy.getDate() + 1) : '' + (hoy.getDate() + 1));
  
    this.proyecto.inicio = hoy.getFullYear() + '-' + ((hoy.getMonth() + 1) < 10 ? '0' + (hoy.getMonth() + 1) : '' + (hoy.getMonth() + 1)) + '-' + (hoy.getDate() < 10 ? '0' + hoy.getDate() : '' + hoy.getDate());
    this.proyecto.fin=hoy.getFullYear() + '-' + ((hoy.getMonth() + 1) < 10 ? '0' + (hoy.getMonth() + 1) : '' + (hoy.getMonth() + 1)) + '-' + ((hoy.getDate()) < 9 ? '0' + (hoy.getDate()+1) : '' + (hoy.getDate()+1));}

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
    console.log("Agregar Publicacion");
    $('#agregarArticulo').modal();
    $('#agregarArticulo').modal('open');
  }
  //creaar la Publicacion
  crearArticulo(articulos: any) {
    console.log(articulos)
    this.articuloService.agregar(articulos,this.idProfesor, new Date().toLocaleDateString("en-CA")).subscribe((resArticulo: any) => {
		  $('#agregarArticulo').modal('close');
		  this.articulo = new Articulo();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Articulo  Agregado'
      })
	},
			err => console.error(err))
  }
  
  agregarRevivision() {
    console.log("CrearRevision");
    $('#CrearRevision').modal();
    $('#CrearRevision').modal('open');
  }



  crearRevision(){
    this.revisor.idProfesor = this.idProfesor;
    this.revicionesServices.createRevision(this.revisor).subscribe(res => {
      $('#agregarRevivision').modal('close');
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Revision  Agregada'
      })
      this.revisor = new Revisor();
    }, err => console.error(err))

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
      this.patenteServices.guardarPatente(patente).subscribe((resPatente: any) => {
        let nuevo={
          'idProfesor':this.idProfesor,
          'idPatente':resPatente.insertId,
          'pos':1,
          'esInterno':1
        }
        this.patenteServices.guardarProfesoryPatente(nuevo).subscribe((resNuevo:any)=>{
          
        },err=>console.error(err));
        
      }, err => console.error(err));
      $('#nuevaPatente').modal('close');
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Patente Registrada'
      })
    }
    else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Fecha de obtención debe de ser posterior'
      })
    }
    this.patente = new Patente();
  }

  crearEvento() {
    this.evento.idProfesor = this.idProfesor
    this.enventoServices.agregarEvento(this.evento).subscribe(res => {
      $('#nuevoEvento').modal('close');
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Evento  Agregado'
      })
    }, err => console.error(err))
    console.log(this.evento)
    this.evento = new Evento()
  }
  crearActividad() {
    this.actividad.idProfesor = this.idProfesor
    this.actividadServices.agregarActividad(this.actividad).subscribe(res => {
      $('#nuevaActividad').modal('close');
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Actividad  Agregada'
      })
    }, err => console.error(err))
    console.log(this.evento)
    this.actividad = new Actividad;
  }

  AgregarProyecto(): void {
    this.idProfesorProyecto = this.idProfesor
    this.proyectoService.agregarProyecto(this.proyecto, this.idProfesorProyecto).subscribe(res => {
      $('#agregarProyecto').modal('close');
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Proyecto  Agregado'
      })
    }, err => console.error(err))
    console.log(this.proyecto)
    this.proyecto = new Proyecto()
  }
}