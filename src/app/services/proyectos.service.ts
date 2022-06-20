import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Proyecto } from '../models/proyecto.model';


@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(private http: HttpClient) { }

  agregarProyecto(proyecto:any,idProfesor:any){

    return this.http.post(`${environment.API_URI}/proyectos/create/${idProfesor}`,proyecto);
  }

  eliminarProyecto(idProyecto: number) {
    //this.router.delete('/delete/:idProyecto', proyectosController.delete)
	  return this.http.delete(`${environment.API_URI}/proyectos/delete/${idProyecto}`);
  }

  actualizarProyecto(proyecto:any,idProyecto:number){
    //this.router.put('/update/:idProyecto', proyectosController.update)
    return this.http.put(`${environment.API_URI}/proyectos/update/${idProyecto}`,proyecto);
  }

  listProyectosByProfesorByPeriodo(idProfesor:any, fechaIni:any, fechaFin:any){
    return this.http.get(`${environment.API_URI}/proyectos/listProyectosByProfesorByPeriodo/${idProfesor}/${fechaIni}/${fechaFin}`);
  }


  // Servicios solicitados al Servidor
  listColaboradoresExternosProyectos(idProfesor:number){
    return this.http.get(`${environment.API_URI}/`);
  }

  listColaboradoresInternosProyectos(idProfesor:number){
    return this.http.get(`${environment.API_URI}/`);
  }
}