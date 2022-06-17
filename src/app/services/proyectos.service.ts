import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Proyecto } from '../models/proyecto.model';


@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(private http: HttpClient) { }

<<<<<<< HEAD
  agreagarProyecto(proyecto:any){
=======
  agregarProyecto(proyecto:any){
>>>>>>> 946bcc072208465c92adb61a43aaac495814080e

    return this.http.post(`${environment.API_URI}/proyectos/create`,proyecto);
  }
  // Servicios solicitados al Servidor

  listProyectosByProfesorByPeriodo(idProfesor:number, fechaIni:any, fechaFin:any){
    return this.http.get(`${environment.API_URI}/`);
  }

  listColaboradoresExternosProyectos(idProfesor:number){
    return this.http.get(`${environment.API_URI}/`);
  }

  listColaboradoresInternosProyectos(idProfesor:number){
    return this.http.get(`${environment.API_URI}/`);
  }
}