import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Proyecto } from '../models/proyecto.model';


@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(private http: HttpClient) { }

  // Servicios solicitados al Servidor

  listProyectosByProfesorByPeriodo(idProfesor:any, fechaIni:any, fechaFin:any){
    return this.http.get(`${environment.API_URI}/proyectos/listProyectosByProfesorByPeriodo/${idProfesor}/${fechaIni}/${fechaFin}`);
  }

  listColaboradoresExternosProyectos(idProfesor:number){
    return this.http.get(`${environment.API_URI}/`);
  }

  listColaboradoresInternosProyectos(idProfesor:number){
    return this.http.get(`${environment.API_URI}/`);
  }
}
