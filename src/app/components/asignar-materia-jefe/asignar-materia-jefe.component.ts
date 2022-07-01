import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/app/models/carrera.model';
import { Profesor } from 'src/app/models/profesor.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { DatosPersonalesService } from 'src/app/services/datos-personales.service';
import { MateriasService } from 'src/app/services/materias.service';
import { PlanesService } from 'src/app/services/planes.service';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-asignar-materia-jefe',
  templateUrl: './asignar-materia-jefe.component.html',
  styleUrls: ['./asignar-materia-jefe.component.css']
})
export class AsignarMateriaJefeComponent implements OnInit {

  idProfesor: number;
  datosProf: Profesor[] = [];
  datosProfAux: Profesor = new Profesor();
  materiasProfesor: any[] = [];
  materiasMulti: any[] = [];

  materias: Map<number, string> = new Map();
  profesores: Profesor[] = [];
  carreraProfesor: Carrera = new Carrera();

  fechaActual: string;
  fechaInicial: string;
  fechaFinal: string;
  profesorActual: number = -1;

  idCarreraJefe: number = 0;
  periodoActual: number = 0;
   

  constructor(private materiasService: MateriasService, private planesService: PlanesService,
    private datosPersonalesService: DatosPersonalesService, private carreraService: CarreraService, private profesorService: ProfesorService) {
    let hoy = new Date();
    this.fechaActual = hoy.getFullYear() + "";
    this.fechaFinal = hoy.getFullYear() + "";
    this.fechaInicial = (hoy.getFullYear() - 1) + "";
    this.idProfesor = datosPersonalesService.idProfesor;

    // this.datosPersonalesService.datosPersonales$.subscribe(prof => {
    //   this.datosProf = prof;
    // });

    this.materiasService.list().subscribe({
      next: (resMaterias: any) => {
        resMaterias.forEach((materia: any) => {
          this.materias.set(materia.idMateria, materia.nombreMateria);
        });
      }
    });

  }

  ngOnInit(): void {
    this.profesorService.getProfesor(this.idProfesor).subscribe({
      next: (resProfesor: any) => {
          this.idCarreraJefe = Number(resProfesor.idCarrera);
          this.profesorService.obtenerProfesoresPorCarrera(resProfesor.idCarrera).subscribe({
            next: (resProfesores:any) => {
              this.profesores = resProfesores;
              this.profesorActual = -1;
              this.obtenerMaterias();
            }
          })
      }
    })
    
  }

  obtenerMaterias() {   
    this.materiasService
    .listMateriasByAnyoByPeriodo(this.idProfesor, this.fechaInicial + "-01-01", this.fechaFinal + "-12-31").subscribe({
    	next: (resMaterias: any) => {
    		this.materiasProfesor = resMaterias;
    		this.materiasService
    		.listMateriasByAnyoByPeriodoMultiple(this.idProfesor, this.fechaInicial + "-01-01", this.fechaFinal + "-12-31").subscribe({
    			next: (resMultiple: any) => {
    				this.materiasMulti = resMultiple;
    			}
    		});
    	}
    });
  }

  // obtenerProfesores(){
  //   this.profesorService.obtenerProfesoresPorCarrera(this.datosProf.idCarrera).subscribe({
  //     next: (resProfesores:any) => {
  //       console.log(resProfesores);
  //       resProfesores.forEach((profesor: any) => {
  //         this.profesores.set(profesor.idProfesor,profesor.nombreProfesor);
  //       })
  //     }
  //   })
  // }

  actualizarProfesor(){
    if(this.profesorActual === -1){
      //console.log("Todos los profesores " + this.profesorActual);
      //this.materiasService.listMateriasByCarreraByPeriodo(this.idCarreraJefe,)
    }
    else{
      console.log("Profesor en especifico " + this.profesorActual);
      this.profesores.forEach(profesor => {
        if(profesor.idProfesor === Number(this.profesorActual)){
          this.datosProf[0] = profesor;
          this.datosProfAux = this.datosProf[0];
          //console.log(this.datosProfAux);
        }
      })
    }
  }

  actualizarPeriodo(){

  }

  abreFormularioAsignarMateria(){

  }

  abreFormularioMultiAignacion(){

  }

}
