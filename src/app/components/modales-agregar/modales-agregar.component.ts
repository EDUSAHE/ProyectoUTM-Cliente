import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/app/models/carrera.model';
import { Comision } from 'src/app/models/comision.model';
import { Instituto } from 'src/app/models/instituto.model';
import { Profesor } from 'src/app/models/profesor.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modales-agregar',
  templateUrl: './modales-agregar.component.html',
  styleUrls: ['./modales-agregar.component.css']
})
export class ModalesAgregarComponent implements OnInit {

  profesorNuevo: Profesor
  profesorActual: Profesor
  institutoNuevo: Instituto
  carreraNueva: Carrera
  carreras: Carrera[]
  institutos: Instituto[]
  comision: Comision

  constructor(private carreraService: CarreraService, private institutoService: InstitutoService, private profesorService: ProfesorService) {
    this.profesorNuevo = new Profesor()
    this.profesorActual = new Profesor()
    this.institutoNuevo = new Instituto()
    this.carreraNueva = new Carrera()
    this.carreras = []
    this.institutos = []
    this.comision = new Comision()
  }

  ngOnInit(): void {
    // Obtener los institutos disponibles
    this.institutoService.obtenerTodo().subscribe((institutosRes: any) => {
      this.institutos = institutosRes
      this.institutos.splice(0, 1)
      this.profesorNuevo.idInstituto = this.institutos[0].idInstituto

      // Obtener todas las carreras del instituto
      this.actualizarCarreras()
    }, err => console.error(err))

    // Obtener datos del profesor (Jefe de Carrera)
    this.profesorService.getProfesor(Number(localStorage.getItem('idProfesor'))).subscribe((profesorRes: any) => {
      this.profesorActual = profesorRes
    }, err => console.error(err))
  }

  actualizarCarreras(): void {
    this.carreraService.obtenerCarrerasPorInstituto(this.profesorNuevo.idInstituto).subscribe((carrerasRes: any) => {
      this.carreras = carrerasRes
      this.profesorNuevo.idCarrera = this.carreras[0]?.idCarrera
    }, err => console.error(err))
  }

  agregarProfesor(): void {
    this.profesorService.guardarProfesor(this.profesorNuevo).subscribe(res => {
      this.profesorNuevo = new Profesor()

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Profesor Agregado'
      })
    }, err => console.error(err))
  }

  agregarProfesorJC(): void {
    this.profesorNuevo.idInstituto = this.profesorActual.idInstituto
    this.profesorNuevo.idCarrera = this.profesorActual.idCarrera
    this.profesorService.guardarProfesor(this.profesorNuevo).subscribe(res => {
      this.profesorNuevo = new Profesor()

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Profesor Agregado'
      })
    }, err => console.error(err))
  }

  agregarInstituto(): void {
    this.institutoService.agregarInstituto(this.institutoNuevo).subscribe(res => {
      this.institutoNuevo = new Instituto()

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Instituto Agregado'
      })

      // Actualizar los institutos disponibles
      this.institutoService.obtenerTodo().subscribe((institutosRes: any) => {
        this.institutos = institutosRes
      }, err => console.error(err))

    }, err => console.error(err))
  }

  agregarCarrera(): void {
    this.carreraService.agregarCarrera(this.carreraNueva).subscribe(resCarrera => {
      this.carreraNueva = new Carrera()

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Carrera Agregado'
      })

      // Actualizar las carreras disponibles
      this.carreraService.obtenerTodo().subscribe((carrerasRes: any) => {
        this.carreras = carrerasRes
      }, err => console.error(err))

    }, err => console.error(err))
  }

  registroComision(): void {
    if(this.comision.periodo=='Indefinido')
      this.comision.fin="2200-05-03";
    console.log(this.comision);
  }
}
