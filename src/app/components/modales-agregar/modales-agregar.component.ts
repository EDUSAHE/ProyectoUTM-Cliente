import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/app/models/carrera.model';
import { Comision } from 'src/app/models/comision.model';
import { Instituto } from 'src/app/models/instituto.model';
import { Profesor } from 'src/app/models/profesor.model';
import { Proyecto } from 'src/app/models/proyecto.model';
import { Tesista } from 'src/app/models/tesista.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { TesistasService } from 'src/app/services/tesistas.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { Tuturado } from 'src/app/models/tutorado.model';
import { TutoradosService } from 'src/app/services/tutorados.service';

declare var $: any
@Component({
  selector: 'app-modales-agregar',
  templateUrl: './modales-agregar.component.html',
  styleUrls: ['./modales-agregar.component.css']
})
export class ModalesAgregarComponent implements OnInit {

  tesista: Tesista
  profesorNuevo: Profesor
  profesorActual: Profesor
  institutoNuevo: Instituto
  carreraNueva: Carrera
  carreras: Carrera[]
  institutos: any[]
  profesorByIns: any[]
  comision: Comision
  proyecto:Proyecto
  Institutos:any[]
  idInstitutoActual : number
  idProfesorActual : number
  fechaInicial: string
	fechaFinal: string
  tutorados: Tuturado
  Carreras: any[]
  Profesores: any[]
  idCarreraActual: number
  numeroTutorados: any[]
  idProfesorSelect: number

  constructor(
    private tutoradosService: TutoradosService,
    private datePipe: DatePipe, 
    private carreraService: CarreraService, 
    private institutoService: InstitutoService, 
    private profesorService: ProfesorService,
    private tesistaService: TesistasService) {
    let hoy = new Date()
    this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
		this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`

    
    this.profesorByIns =[]
    this.idInstitutoActual = 0
    this.idProfesorActual = 1
    this.Institutos =[]
    this.tesista = new Tesista()
    this.profesorNuevo = new Profesor()
    this.profesorActual = new Profesor()
    this.institutoNuevo = new Instituto()
    this.numeroTutorados = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
    this.carreraNueva = new Carrera()
    this.carreras = []
    this.tutorados = new Tuturado()
    this.institutos = []
    this.comision = new Comision()
    this.proyecto = new Proyecto()
    this.Carreras = []
    this.Profesores = []
    this.idCarreraActual = 0;
    this.idProfesorSelect = 0
    this.tesista.inicio=this.fechaInicial
    this.tesista.fin=this.fechaFinal
  }

  ngOnInit(): void {
    this.setFechaTutorados()
    this.obtenerCarreras()
    // Obtener los institutos disponibles
    this.institutoService.obtenerTodo().subscribe((institutosRes: any) => {
      this.institutos = institutosRes
      this.institutos.splice(0, 1)
      this.Institutos=this.institutos;
      this.profesorNuevo.idInstituto = this.institutos[0].idInstituto
      this.profesorService.obtenerProfesoresPorInstituto(this.Institutos[0].idInstituto).subscribe((resProfesores:any) =>{
        this.profesorByIns = resProfesores;
        this.idProfesorActual=this.profesorByIns[0].idProfesor
        console.log(this.profesorByIns)
      },
        err => console.error(err))
      // Obtener todas las carreras del instituto
      this.actualizarCarreras()
    }, err => console.error(err))

    // Obtener datos del profesor (Jefe de Carrera)
    this.profesorService.getProfesor(Number(localStorage.getItem('idProfesor'))).subscribe((profesorRes: any) => {
      this.profesorActual = profesorRes
    }, err => console.error(err))


  }

  setFechaTutorados() {
    const fecha = new Date();
    this.tutorados.inicio = this.datePipe.transform(fecha, "yyyy-MM-dd") as string;
    this.tutorados.fin = this.datePipe.transform(fecha, "yyyy-MM-dd") as string;
  }

  obtenerCarreras() {
    this.carreraService.obtenerTodo().subscribe((resCarreras: any) => {
      this.Carreras = resCarreras;
      this.idCarreraActual = this.Carreras[0].idCarrera
      this.obtenerProfesoresByCarrera()
    },
      err => console.error(err))
  }

  obtenerProfesoresByCarrera() {
    this.profesorService.obtenerProfesoresPorCarrera(this.idCarreraActual).subscribe((resProfesoresCarrera: any) => {
      this.Profesores = resProfesoresCarrera;
      if(this.Profesores.length>0){
        this.idProfesorSelect = this.Profesores[0].idProfesor
      }
    },
      err => console.error(err))
  }

  actualizarCarreras(): void {
    // this.carreraService.obtenerCarrerasPorInstituto(this.profesorNuevo.idInstituto).subscribe((carrerasRes: any) => {
    //   this.carreras = carrerasRes
    //   this.profesorNuevo.idCarrera = this.carreras[0]?.idCarrera
    // }, err => console.error(err))
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
    if (this.comision.periodo == 'Indefinido')
      this.comision.fin = "2200-05-03";
    console.log(this.comision);
  }

  asignarTutoradosJC(): void {
    this.tutorados.idCarrera = this.idCarreraActual
    this.tutorados.idProfesor = this.idProfesorSelect
    this.tutoradosService.AsignarTutorados(this.tutorados).subscribe((resTutorados:any)=>{
      $('#asignarTutoradosJC').modal('close');
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Tutorados Asignados',
				showConfirmButton: false,
				timer: 1000
			})
    },
      err => console.error(err))
    this.tutorados = new Tuturado()
    this.setFechaTutorados()
    this.obtenerCarreras()
  }

  crearTesista(){
    this.tesistaService.crearTesis(this.idProfesorActual,this.tesista).subscribe(res => {
          Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tesita Agregado'
      })
    }, err => console.error(err));

    this.tesista= new Tesista;
    this.tesista.inicio=this.fechaInicial;
    this.tesista.fin=this.fechaFinal;

  }

  cambioInstituto(){
    this.profesorService.obtenerProfesoresPorInstituto(this.tesista.idInstituto).subscribe((resProfesores:any) =>{
      this.profesorByIns = resProfesores;
      console.log(this.profesorByIns)
    },
      err => console.error(err))
  }


      

}
