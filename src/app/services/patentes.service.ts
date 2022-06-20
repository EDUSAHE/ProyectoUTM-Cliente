import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Patente } from '../models/patente.model';

@Injectable({
  providedIn: 'root'
})
export class PatentesService {

  constructor(private http: HttpClient) { }

  obtenerPatente(idPatente:number){
    return this.http.get(`${environment.API_URI}/patentes/${idPatente}`);
  }

  guardarPatente(patente:Patente, idProfesor: number){
    return this.http.post(`${environment.API_URI}/patentes/create/${idProfesor}`, patente);
  }

  modificarPatente(idPatente: number,patente:any) {
	  return this.http.put(`${environment.API_URI}/patentes/actualizar/${idPatente}`,patente);
  }

  eliminarPatente(idPatente: number) {
	  return this.http.delete(`${environment.API_URI}/patentes/delete/${idPatente}`);
  }

  guardarProfesoryPatente(nuevo:any){
    return this.http.post(`${environment.API_URI}/profesorYPatente/create`, nuevo);
  }

  eliminarProfesoryPatente(idProfesor:number, idPatente:number, esInterno:any){
    return this.http.delete(`${environment.API_URI}/profesorYPatente/delete/${idProfesor}/${idPatente}/${esInterno}`);
  }

  // Servicios solicitados al Servidor
  listPatentesByProfesorByPeriodo(idProfesor:number, fechaIni:any, fechaFin:any){
    return this.http.get(`${environment.API_URI}/patentes/listPatentesByProfesorByPeriodo/${idProfesor}/${fechaIni}/${fechaFin}`);
  }

  listColaboradoresExternosPatentes(idProfesor:number){
    return this.http.get(`${environment.API_URI}/`);
  }

  listColaboradoresInternosPatentes(idProfesor:number){
    return this.http.get(`${environment.API_URI}/`);
  }
}
