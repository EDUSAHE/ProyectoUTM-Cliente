import { Component, OnInit } from '@angular/core';
import { AsignarMateria } from 'src/app/models/asignarMateria.model';
import { Carrera } from 'src/app/models/carrera.model';
import { GruposMultiples } from 'src/app/models/gruposMultiples';
import { Materia } from 'src/app/models/materia.model';
import { Periodo } from 'src/app/models/periodo.model';
import { Plan } from 'src/app/models/plan.model';
import { Profesor } from 'src/app/models/profesor.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { DatosPersonalesService } from 'src/app/services/datos-personales.service';
import { GruposMultiplesService } from 'src/app/services/grupos-multiples.service';
import { MateriasService } from 'src/app/services/materias.service';
import { PeriodoService } from 'src/app/services/periodo.service';
import { PlanesService } from 'src/app/services/planes.service';
import { ProfesorYmateriaService } from 'src/app/services/profesor-ymateria.service';
import { ProfesorYmateriamultipleService } from 'src/app/services/profesor-ymateriamultiple.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import Swal from 'sweetalert2';


declare var $: any;
@Component({
  selector: 'app-asignar-materia-jefe',
  templateUrl: './asignar-materia-jefe.component.html',
  styleUrls: ['./asignar-materia-jefe.component.css']
})
export class AsignarMateriaJefeComponent implements OnInit {
  nuevo: number = 1;
  editando: number = 0;
  grupo: number = 0;
  multi: number = 1;

  idProfesor: number;
  profesorActual: number = -1;

  profesores: Profesor[] = [];

  materiasPorProfesor: any[] = [];
  materiasPorProfesorMulti: any[] = [];
  materias: Map<number, string> = new Map();

  idCarreraJefe: number = 0;

  periodoActual: Periodo = new Periodo();
  periodos: Periodo[] = [];

  semestres: Map<number, string> = new Map();
  grupos: Map<number, string> = new Map();


  //Asignar materia
  asignarMateria: AsignarMateria = new AsignarMateria();
  editarMateria: AsignarMateria = new AsignarMateria();
  asignarMultiMateria: AsignarMateria = new AsignarMateria();
  
  carreras: Carrera[] = [];
  planes: Plan[] = [];
  materiasA: any[] = []
  carreraActual: number = 0;
  
  idProfYmate: number = 0;
  nuevoGrupo: GruposMultiples = new GruposMultiples();

  constructor(private materiasService: MateriasService, private planesService: PlanesService,
    private datosPersonalesService: DatosPersonalesService, private carreraService: CarreraService,
    private profesorService: ProfesorService, private periodoService: PeriodoService,
    private profesorYmateriaService: ProfesorYmateriaService,
    private profesorYmateriamultipleService: ProfesorYmateriamultipleService,
    private gruposMultiplesService: GruposMultiplesService) {

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

    this.grupos.set(0, "Único");
    this.grupos.set(1, "A");
    this.grupos.set(2, "B");
    this.grupos.set(3, "C");
    this.grupos.set(4, "D");
    this.grupos.set(5, "E");
    this.grupos.set(6, "F");

    this.materiasService.list().subscribe({
      next: (resMaterias: any) => {
        resMaterias.forEach((materia: any) => {
          this.materias.set(materia.idMateria, materia.nombreMateria);
        });
      }
    });

  }

  ngOnInit(): void {
    $(document).ready(function () {
      $('.modal').modal();
    });
    this.listadoMaterias();
  }

  listadoMaterias() {
    this.periodoService.list().subscribe({
      next: (resPeriodo: any) => {
        this.periodos = resPeriodo;
        this.periodos.forEach(periodo => {
          if (periodo.actual == Number(1)) {
            this.periodoActual = periodo;
          }
        })

        this.profesorService.getProfesor(this.idProfesor).subscribe({
          next: (resProfesor: any) => {
            this.idCarreraJefe = Number(resProfesor.idCarrera);
            this.profesorService.obtenerProfesoresPorCarrera(resProfesor.idCarrera).subscribe({
              next: (resProfesores: any) => {
                this.profesores = resProfesores;
                this.profesorActual = -1;
                this.carreraService.obtenerTodo().subscribe({
                  next: (resCarreras: any) => {
                    this.carreras = resCarreras;
                    this.carreraActual = this.carreras[0].idCarrera
                    this.listarPlanes(this.carreraActual);
                  }
                })

              }
            })
          }
        })
      }
    })
  }


  informacionMaterias() {
    this.materiasService.listMateriasByCarreraByPeriodo(this.idCarreraJefe, this.periodoActual.idPeriodo).subscribe({
      next: (resMatByPeByCa: any) => {
        this.materiasPorProfesor = resMatByPeByCa;
        this.materiasService.listMateriasMultiplesByCarreraByPeriodo(this.idCarreraJefe, this.periodoActual.idPeriodo).subscribe({
          next: (resMatMulti: any) => {
            this.materiasPorProfesorMulti = resMatMulti;
          }
        })
      }
    })
  }

  actualizarPeriodo(periodo: any) {
    const periodoNuevo = Number(periodo.value);
    this.periodoActual = <Periodo>this.periodos.find(periodo => periodo.idPeriodo == periodoNuevo);
    this.informacionMaterias();
  }

  actualizarProfesor(profesor: any) {
    this.profesorActual = Number(profesor.value);
    if (this.profesorActual === -1) {
      this.informacionMaterias();
    }
    else {
      this.materiasService.listMateriasByPeriodoByProfesor(this.periodoActual.idPeriodo, this.profesorActual).subscribe({
        next: (resMateriasProfesor: any) => {
          this.materiasPorProfesor = [];
          this.profesorService.getProfesor(this.profesorActual).subscribe({
            next: (resDatosProf: any) => {
              let aux = resDatosProf.nombreProfesor
              this.materiasPorProfesor[0] = {
                'nombreProfesor': aux,
                'materias': resMateriasProfesor
              };

              this.materiasService.listMateriasMultiasignacionByPeriodoByProfesor(this.periodoActual.idPeriodo, this.profesorActual).subscribe({
                next: (resMatMultiP: any) => {
                  this.materiasPorProfesorMulti = [];
                  if (resMatMultiP[0].materias.length != 0) {
                    let nombreP = resMatMultiP[0].nombreProfesor;
                    let idP = resMatMultiP[0].nombreProfesor;

                    let atributos = [{
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
                      'idProfesor': idP,
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


  actualizarCarrera(carrera: any) {
    if (this.nuevo === 1) {
      this.asignarMateria.idCarrera = Number(carrera.value);
      this.listarPlanes(this.asignarMateria.idCarrera);
    }
    else if (this.grupo === 1) {
      this.nuevoGrupo.idCarrera = Number(carrera.value);
      this.listarPlanes(this.nuevoGrupo.idCarrera);
    }
    else {
      this.editando = 1;
      this.editarMateria.idCarrera = Number(carrera.value);
      this.listarPlanes(this.editarMateria.idCarrera);
    }

  }

  actualizarPlan(plan: any) {
    if (this.nuevo === 1) {
      this.asignarMateria.idPlan = Number(plan.value);
      this.listarMaterias(this.asignarMateria.semestre, this.asignarMateria.idPlan);
    }
    else if (this.grupo === 1) {
      this.nuevoGrupo.idPlan = Number(plan.value);
    }
    else {
      this.editando = 1;
      this.editarMateria.idPlan = Number(plan.value);
      this.listarMaterias(this.editarMateria.semestre, this.editarMateria.idPlan);
    }
  }

  actualizarSemestre(semestre: any) {
    if (this.nuevo === 1) {
      this.asignarMateria.semestre = Number(semestre.value);
      this.listarMaterias(this.asignarMateria.semestre, this.asignarMateria.idPlan);
    }
    else if (this.grupo === 1) {
      this.nuevoGrupo.semestre = Number(semestre.value);
    }
    else {
      this.editando = 1;
      this.editarMateria.semestre = Number(semestre.value);
      this.listarMaterias(this.editarMateria.semestre, this.editarMateria.idPlan);
    }
  }

  actualizarGrupo(grupo: any) {
    if (this.nuevo === 1) {
      this.asignarMateria.grupo = Number(grupo.value);
    }
    else if (grupo === 1) {
      this.nuevoGrupo.grupo = Number(grupo.value);
    }
    else {
      this.editarMateria.grupo = Number(grupo.value);
    }
  }

  actualizarMateria(materia: any) {
    if (this.nuevo === 1) {
      this.asignarMateria.idMateria = Number(materia);
    }
    else {
      this.editarMateria.idMateria = Number(materia);
    }
  }

  listarMaterias(semestre: number, plan: number) {
    this.materiasService.listMateriasByPlan(plan).subscribe({
      next: (resMaterias: any) => {
        this.materiasA = [];
        let auxMat = resMaterias;
        auxMat.forEach((materiasSemestre: any) => {
          if (materiasSemestre.semestre === semestre) {
            this.materiasA.push(materiasSemestre);
          }
        })
        if (this.materiasA.length != 0) {

          if (this.nuevo === 1) {
            this.asignarMateria.idMateria = Number(this.materiasA[0].idMateria);
            this.asignarMateria.grupo = 0;
          }
          else {
            if (this.editando === 1) {
              this.editarMateria.idMateria = Number(this.materiasA[0].idMateria);
              this.editarMateria.grupo = 0;
            }
          }
          this.informacionMaterias();
        }


      }
    })
  }

  listarPlanes(idCarrera: number) {
    this.planesService.listPlanesByCarrera(idCarrera).subscribe({
      next: (resPlanes: any) => {
        this.planes = resPlanes;
        if (this.planes.length != 0) {
          // Asignar
          this.asignarMateria.idPlan = Number(this.planes[0].idPlan);
          this.asignarMateria.semestre = 0;
          // Editar
          if (this.editando === 1) {
            this.editarMateria.idPlan = Number(this.planes[0].idPlan);
            this.editarMateria.semestre = 0;
          }

          if (this.grupo === 1) {
            this.nuevoGrupo.idPlan = Number(this.planes[0].idPlan);
            this.nuevoGrupo.semestre = 0;
          }

          if (this.nuevo === 1) {
            this.listarMaterias(this.asignarMateria.semestre, this.asignarMateria.idPlan);
          }
          else {
            this.listarMaterias(this.editarMateria.semestre, this.editarMateria.idPlan);
          }
        }

        else {
          this.materiasA = [];
        }

      }
    })
  }

  abreFormularioAsignarMateria() {
    this.listadoMaterias();
    this.asignarMateria = new AsignarMateria();
    this.nuevo = 1;
    this.asignarMateria.idProfesor = this.profesores[0].idProfesor;
    this.asignarMateria.idCarrera = this.carreras[0].idCarrera;
    if (this.planes.length != 0) {
      this.asignarMateria.idPlan = this.planes[0].idPlan;
    }
    this.asignarMateria.semestre = 0;
    if (this.materiasA.length != 0) {
      this.asignarMateria.idMateria = Number(this.materiasA[0].idMateria);
    }
    this.asignarMateria.grupo = 0;
    $('#asignarMateria').modal();
    $('#asignarMateria').modal('open');
  }

  asignarMateriaProfesor() {
    let envio = {
      'idMateria': Number(this.asignarMateria.idMateria),
      'idProfesor': Number(this.asignarMateria.idProfesor),
      'grupo': Number(this.asignarMateria.grupo)
    }
    this.profesorYmateriaService.asignarMateria(envio).subscribe({
      next: (resAsigna: any) => {
        this.listadoMaterias();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Asignación agregada'
        });
      }
    })

    $('#asignarMateria').modal('close');
  }

  abreFormularioMultiAignacion() {
    this.listadoMaterias();
    this.asignarMateria = new AsignarMateria();
    this.nuevo = 1;
    this.asignarMateria.idProfesor = this.profesores[0].idProfesor;
    this.asignarMateria.idCarrera = this.carreras[0].idCarrera;
    if (this.planes.length != 0) {
      this.asignarMateria.idPlan = this.planes[0].idPlan;
    }
    this.asignarMateria.semestre = 0;
    if (this.materiasA.length != 0) {
      this.asignarMateria.idMateria = Number(this.materiasA[0].idMateria);
    }
    this.asignarMateria.grupo = 0;
    $('#asignarMulti').modal();
    $('#asignarMulti').modal('open');
  }

  multiAsignacion() {
    let id = Number(this.asignarMateria.idProfesor);
    let envio = {
      'idMateria': Number(this.asignarMateria.idMateria),
      'idPlan': Number(this.asignarMateria.idPlan),
      'semestre': Number(this.asignarMateria.semestre),
      'grupo': Number(this.asignarMateria.grupo)
    }
    this.materiasService.asignarMultiAsignacion(id, envio).subscribe({
      next: (resAsignarM: any) => {
        this.listadoMaterias();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Asignación agregada'
        });
      }
    })
    $('#asignarMulti').modal('close');
  }

  abreEditarAsignacion(materia: any, materiaP: any) {
    this.idProfYmate = Number(materiaP.idProfesorYMateria);
    this.nuevo = 0;
    this.editando = 0;
    this.editarMateria.idProfesor = materia.idProfesor;
    this.editarMateria.idPlan = materiaP.idPlan;
    this.editarMateria.semestre = materiaP.semestre;
    this.editarMateria.idMateria = Number(materiaP.idMateria);
    this.editarMateria.grupo = materiaP.grupo;
    this.profesorService.getProfesor(this.editarMateria.idProfesor).subscribe({
      next: (resProfesor: any) => {
        this.editarMateria.idCarrera = resProfesor.idCarrera;
        this.listarPlanes(this.editarMateria.idCarrera);
        $('#editarMateria').modal();
        $('#editarMateria').modal('open');
      }
    })

  }

  editarMateriaProfesor() {

    let envio = {
      'idMateria': Number(this.editarMateria.idMateria),
      'idProfesor': this.editarMateria.idProfesor,
      'idPeriodo': this.periodoActual.idPeriodo,
      'grupo': this.editarMateria.grupo
    }
    this.profesorYmateriaService.editarMateria(this.idProfYmate, envio).subscribe({
      next: (resEditar: any) => {
        this.listadoMaterias();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Asignación modificada'
        });
      }
    })
    $('#editarMateria').modal('close');
  }

  abreEliminarAsignacion(eliminar: number) {
    Swal.fire({
      title: '¿Estas seguro de querer eliminar?',
      position: 'center',
      icon: 'question',
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Sí'
    })
      .then(respuesta => {
        if (respuesta.isConfirmed) {
          this.profesorYmateriaService.eliminarAsignacion(eliminar).subscribe({
            next: (resEliminar: any) => {
              this.listadoMaterias();
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Asignación eliminada'
              });
            }
          });
        }
      });

  }

  abreEliminarMultiAsignacion(eliminar: number) {
    Swal.fire({
      title: '¿Estas seguro de querer eliminar?',
      position: 'center',
      icon: 'question',
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Sí'
    })
      .then(respuesta => {
        if (respuesta.isConfirmed) {

          this.profesorYmateriamultipleService.delete(eliminar).subscribe({
            next: (resEliminar: any) => {
              this.listadoMaterias();
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Asignación eliminada'
              });
            }
          });
        }
      });
  }

  abreAgregarGrupo(id: number) {
    this.grupo = 1;
    this.nuevoGrupo = new GruposMultiples();
    this.nuevoGrupo.idCarrera = this.carreras[0].idCarrera;
    if (this.planes.length != 0) {
      this.nuevoGrupo.idPlan = this.planes[0].idPlan;
    }
    this.nuevoGrupo.idProfesorYMateriaMultiple = id;
    this.nuevoGrupo.semestre = 0;
    this.nuevoGrupo.grupo = 0;
    $('#agregarGrupo').modal();
    $('#agregarGrupo').modal('open');
  }

  agregaGrupoMulti() {
    let envio = {
      "idProfesorYMateriaMultiple": Number(this.nuevoGrupo.idProfesorYMateriaMultiple),
      "idPlan": Number(this.nuevoGrupo.idPlan),
      "semestre": Number(this.nuevoGrupo.semestre),
      "grupo": Number(this.nuevoGrupo.grupo),
    }
    console.log(envio)
    this.gruposMultiplesService.agregarGrupoMultiAsignacion(envio).subscribe({
      next: (resAsigna: any) => {
        this.listadoMaterias();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Grupo agregado'
        });
      }
    })
    $('#agregarGrupo').modal('close');
  }

  eliminarGrupo(grupo: any) {
    let id = Number(grupo.idProfesorYMateriaMultiple);
    let eliminar = {
      "idPlan": Number(grupo.idPlan),
      "semestre": Number(grupo.semestre),
      "grupo": Number(grupo.grupo),
    }
    Swal.fire({
      title: '¿Estas seguro de querer eliminar?',
      position: 'center',
      icon: 'question',
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Sí'
    })
      .then(respuesta => {
        if (respuesta.isConfirmed) {

          this.gruposMultiplesService.eliminarGrupoMultiAsignacion(id, eliminar).subscribe({
            next: (resEliminar: any) => {
              this.listadoMaterias();
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Grupo eliminado'
              });
            }
          })

        }
      });
  }



  semestreArray(): any[] {
    return Array.from(this.semestres, (sems) => {
      return {
        llave: sems[0],
        valor: sems[1]
      }
    });
  }

  grupoArray(): any[] {
    return Array.from(this.grupos, (grups) => {
      return {
        llave: grups[0],
        valor: grups[1]
      }
    });
  }
}
