import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfesoresComponent } from './components/profesores/profesores.component';
import { GeneralesComponent } from './components/generales/generales.component';
import { HomeComponent } from './components/home/home.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { ArticulosViceComponent } from './components/articulos-vice/articulos-vice.component';
import { CambiarContrasenaComponent } from './components/cambiar-contrasena/cambiar-contrasena.component';
import { MateriasComponent } from './components/materias/materias.component';
import { ListarProfesoresComponent } from './components/listar-profesores/listar-profesores.component';
import { ListarArticulosPorInstitutoComponent } from './components/listar-articulos-por-instituto/listar-articulos-por-instituto.component';
import { ListarInstitutosComponent } from './components/listar-institutos/listar-institutos.component';
import { ListarCarrerasComponent } from './components/listar-carreras/listar-carreras.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { ListarEventosComponent } from './components/listar-eventos/listar-eventos.component';
import { ListarActividadesComponent } from './components/listar-actividades/listar-actividades.component';
import { ListarActividadesDirComponent } from './components/listar-actividades-dir/listar-actividades-dir.component';
import { ListarArticulosDirComponent } from './components/listar-articulos-dir/listar-articulos-dir.component';
import { ListarEventosDirComponent } from './components/listar-eventos-dir/listar-eventos-dir.component';
import { ListarProfesoresJcComponent } from './components/listar-profesores-jc/listar-profesores-jc.component';
import { ImprimirArticulosComponent } from './components/imprimir-articulos/imprimir-articulos.component';
import { ListarComisionesComponent } from './components/listar-comisiones/listar-comisiones.component';
import { AsignarMateriaComponent } from './components/asignar-materia/asignar-materia.component';
import { TesistasComponent } from './components/tesistas/tesistas.component';
import { TutoradosComponent } from './components/tutorados/tutorados.component';
import { PatentesComponent } from './components/patentes/patentes.component';
import { RevisionesComponent } from './components/revisiones/revisiones.component';
import { ComisionesComponent } from './components/comisiones/comisiones.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { ListarEventosJcComponent } from './components/listar-eventos-jc/listar-eventos-jc.component';
import {  ListMateriaporsemestreComponent} from "./components/list-materiaporsemestre/list-materiaporsemestre.component";
import { ListarTesistasJcComponent } from './components/listar-tesista-jc/listar-tesista-jc.component';
import { MateriasJcComponent } from './components/materias-jc/materias-jc.component';
import { ListarTutoradosJcComponent } from './components/listar-tutorados-jc/listar-tutorados-jc.component';
import { ComisionesJcComponent } from './components/comisiones-jc/comisiones-jc.component';
import { AsignarMateriaJefeComponent } from './components/asignar-materia-jefe/asignar-materia-jefe.component';
import { PlanesComponent } from './components/planes/planes.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profesores',
    component: ProfesoresComponent
  },
  {
    path: 'cambiarContrasena/:token',
    component: CambiarContrasenaComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'generales/:idProfesor',
        component: GeneralesComponent,
      },
      {
        path: 'articulos/:idProfesor',
        component: ArticulosComponent
      },
      {
        path: 'eventos/:idProfesor',
        component: EventosComponent
      },
      {
        path: 'actividades/:idProfesor',
        component: ActividadesComponent
      },
	  {
		  path: 'tesistas',
		  component: TesistasComponent
	  },
	  {
		  path: 'tutorados',
		  component: TutoradosComponent
	  },
    {
		  path: 'listarTutoradosJC',
		  component: ListarTutoradosJcComponent
	  },
	  {
		  path: 'patentes',
		  component: PatentesComponent
	  },
	  {
		  path: 'revisiones',
		  component: RevisionesComponent
	  },
	  {
		  path: 'comisiones',
		  component: ComisionesComponent
	  },
	  {
		  path: 'proyectos',
		  component: ProyectosComponent
	  },
      {
        path: 'articulosVice/:idProfesor',
        component: ArticulosViceComponent
      },
      {
        path: 'imprimirArticulos/:idProfesor',
        component: ImprimirArticulosComponent
      },
      {
        path: 'materias',
        component: MateriasComponent
      },
	  {
        path: 'materias-jc',
        component: MateriasJcComponent
      },
      {
        path: 'listarProfesores',
        component: ListarProfesoresComponent
      },
      {
        path: 'listarInstitutos',
        component: ListarInstitutosComponent
      },
      {
        path: 'listarCarreras',
        component: ListarCarrerasComponent
      },
      {
        path: 'listarArticulos',
        component: ListarArticulosPorInstitutoComponent
      },
      {
        path: 'listarEventos',
        component: ListarEventosComponent
      },
      {
        path: 'listarActividades',
        component: ListarActividadesComponent
      },
      {
        path: 'asignarMaterias',
        component: AsignarMateriaComponent
      },
      // Director
      {
        path: 'listarActividadesDir',
        component: ListarActividadesDirComponent
      },
      {
        path: 'listarArticulosDir',
        component: ListarArticulosDirComponent
      },
      {
        path: 'listarEventosDir',
        component: ListarEventosDirComponent
      },
      // Jefe de Carrera
      {
        path: 'listarProfesoresJC',
        component: ListarProfesoresJcComponent
      },
      {
        path: 'listarComisionesJC',
        component: ListarComisionesComponent
      },
      {
        path: 'listarEventosJC',
        component:ListarEventosJcComponent
      },
      {
        path: 'listarTesistaJC',
        component:ListarTesistasJcComponent
      },
      {
        path: 'comisionesJC',
        component:ComisionesJcComponent
      },
      {
        path: 'planes',
        component: PlanesComponent
      },
      //Materia por semestre
      { 
        path: 'listarMateriasemestre',
        component:ListMateriaporsemestreComponent

      },
      // Asignar materias Jefe de carrera
      
      {
        path: 'asignarMateriasJefe/:idProfesor',
        component: AsignarMateriaJefeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
