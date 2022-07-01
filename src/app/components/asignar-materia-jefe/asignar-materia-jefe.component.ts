import { Component, OnInit } from '@angular/core';
import { AsignarMateria } from 'src/app/models/asignarMateria.model';
import { Carrera } from 'src/app/models/carrera.model';
import { Periodo } from 'src/app/models/periodo.model';
import { Profesor } from 'src/app/models/profesor.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { DatosPersonalesService } from 'src/app/services/datos-personales.service';
import { MateriasService } from 'src/app/services/materias.service';
import { PeriodoService } from 'src/app/services/periodo.service';
import { PlanesService } from 'src/app/services/planes.service';
import { ProfesorService } from 'src/app/services/profesor.service';

declare var $: any;
@Component({
  selector: 'app-asignar-materia-jefe',
  templateUrl: './asignar-materia-jefe.component.html',
  styleUrls: ['./asignar-materia-jefe.component.css']
})
export class AsignarMateriaJefeComponent implements OnInit {

  idProfesor: number;
  materias: Map<number, string> = new Map();
  profesores: Profesor[] = [];
  carreraProfesor: Carrera = new Carrera();

  materiasPorProfesor: any[] = [];
  materiasPorProfesorMulti: any[] = [];

  profesorActual: number = -1;

  idCarreraJefe: number = 0;
  periodoActual: Periodo = new Periodo();
  periodos: Periodo[] = [];

  asignarNuevaMateria: AsignarMateria = new AsignarMateria;

  semestres: Map<number, string> = new Map();
  grupos: Map<number, string> = new Map();
  
  planes: any[] = [];
	planActual: number = 0;
  profesorAsignar: Profesor[] = [];
  profesorAsignarActual: number = 0;

  constructor(private materiasService: MateriasService, private planesService: PlanesService,
    private datosPersonalesService: DatosPersonalesService, private carreraService: CarreraService, 
    private profesorService: ProfesorService, private periodoService:PeriodoService) {
    
    this.idProfesor = datosPersonalesService.idProfesor;

    this.semestres.set(-1, "Propedéutico Largo");
		this.semestres.set(0, "Propedéutico");
		this.semestres.set(1, "Primero");
		this.semestres.set(2, "Segundo");
		this.semestres.set(3, "Tercero");
		this.semestres.set(4, "Cuarto");
		this.semestres.set(5, "Quinto");
		this.semestres.set(6, "Sexto");
		this.semestres.set(7, "Séptimo");
		this.semestres.set(8, "Octavo");
		this.semestres.set(9, "Noveno");
		this.semestres.set(10, "Décimo");

    this.materiasService.list().subscribe({
      next: (resMaterias: any) => {
        resMaterias.forEach((materia: any) => {
          this.materias.set(materia.idMateria, materia.nombreMateria);
        });
      }
    });

  }

  ngOnInit(): void {

    this.periodoService.list().subscribe({
      next: (resPeriodo: any) => {
        this.periodos = resPeriodo;
        this.periodos.forEach(periodo => {
          if(periodo.actual == Number(1)){
            this.periodoActual = periodo;
          }
        })

        this.profesorService.getProfesor(this.idProfesor).subscribe({
          next: (resProfesor: any) => {
              this.idCarreraJefe = Number(resProfesor.idCarrera);
              this.profesorService.obtenerProfesoresPorCarrera(resProfesor.idCarrera).subscribe({
                next: (resProfesores:any) => {
                  this.profesores = resProfesores;
                  this.profesorAsignar = resProfesores;
                  this.profesorActual = -1;
                  this.profesorAsignarActual = this.profesorAsignar[0].idProfesor;
                  this.formularios();
                }
              })
          }
        })
      }
    })
    
  }

  formularios(){
    this.planesService.listPlanesByCarrera(this.idCarreraJefe).subscribe({
      next: (resPlanes:any) =>{
        this.planes = resPlanes;
        this.planActual =  this.planes[0].idPlan;
        this.actualizaMaterias();

      }
    })
  }

  actualizaMaterias() {
    this.materiasService.listMateriasByCarreraByPeriodo(this.idCarreraJefe,this.periodoActual.idPeriodo).subscribe({
      next: (resMatByPeByCa:any) => {
        this.materiasPorProfesor = resMatByPeByCa;
        this.materiasService.listMateriasMultiplesByCarreraByPeriodo(this.idCarreraJefe,this.periodoActual.idPeriodo).subscribe({
          next: (resMatMulti:any) => {
            console.log("Todos");
            console.log(resMatMulti);
            this.materiasPorProfesorMulti = resMatMulti;
          }
        })
      }
    })
  }

  actualizarPeriodo(periodo: any){
    const periodoNuevo = Number(periodo.value);
    this.periodoActual = <Periodo>this.periodos.find(periodo => periodo.idPeriodo == periodoNuevo);
    this.actualizaMaterias();
  }

  actualizarProfesor(profesor: any){
    this.profesorActual = Number(profesor.value);
    if(this.profesorActual === -1){
      this.actualizaMaterias();
    }
    else{
      this.materiasService.listMateriasByPeriodoByProfesor(this.periodoActual.idPeriodo,this.profesorActual).subscribe({
        next: (resMateriasProfesor:any) => {
          this.materiasPorProfesor = []; 
          this.profesorService.getProfesor(this.profesorActual).subscribe({
            next: (resDatosProf:any) =>{
              let aux = resDatosProf.nombreProfesor
              this.materiasPorProfesor[0] = {
                'nombreProfesor': aux,
                'materias': resMateriasProfesor
              };

              this.materiasService.listMateriasMultiasignacionByPeriodoByProfesor(this.periodoActual.idPeriodo,this.profesorActual).subscribe({
                next: (resMatMultiP : any) => {
                  this.materiasPorProfesorMulti = [];
                  if(resMatMultiP[0].materias.length != 0){
                    let nombreP = resMatMultiP[0].nombreProfesor;
                    let idP = resMatMultiP[0].nombreProfesor;
                    
                    let atributos =  [{
                      'grupos': resMatMultiP[0].grupos,
                      'idMateria': resMatMultiP[0].materias[0].idMateria,
                      'idPlan': resMatMultiP[0].materias[0].idPlan,
                      'idProfesorYMateriaMultiple': resMatMultiP[0].materias[0].idProfesorYMateriaMultiple,
                      'nombre': resMatMultiP[0].materias[0].nombre,
                      'nombreCarrera': resMatMultiP[0].materias[0].nombreCarrera,
                      'nombreMateria': resMatMultiP[0].materias[0].nombreMateria,
                      'semestre': resMatMultiP[0].materias[0].semestre,
                    }]
                    this.materiasPorProfesorMulti[0] = {
                      'nombreProfesor': nombreP,
                      'idProfesor' : idP, 
                      'atributos': atributos
                    }
                  }
                }
              })
            }
          })
          
        }
      })
    }
  }

  

  abreFormularioAsignarMateria(){
    this.asignarNuevaMateria = new AsignarMateria;
    this.asignarNuevaMateria.idPlan = this.planes[0].idPlan;
    $('#asignarMateria').modal();
		$('#asignarMateria').modal('open');
  }

  asignarMateriaProfesor(){

  }

  

  abreFormularioMultiAignacion(){

  }

  abreEditarAsignacion(){

  }

  abreEliminarAsignacion(){

  }

  eliminarGrupo(){

  }

  semestreArray(): any[] {
		return Array.from(this.semestres, (sems) => {
			return { 
				llave: sems[0],
				valor: sems[1]
			}
		});
	}

}
