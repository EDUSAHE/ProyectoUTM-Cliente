import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Patente } from '../models/patente.model';

@Injectable({
  providedIn: 'root'
})
export class PatentesService {

  constructor(private http: HttpClient) { }
  guardarPatente(patente:Patente){
    return this.http.post(`${environment.API_URI}/patentes/create`, patente);
  }

  eliminarPatente(idPatente: number) {
	  return this.http.delete(`${environment.API_URI}/patentes/delete/${idPatente}`);
  }

  guardarProfesoryPatente(nuevo:Patente){
    return this.http.post(`${environment.API_URI}/profesorYPatente/create`, nuevo);
  }

  eliminarProfesoryPatente(idPatente:number, idProfesor:number, esInterno:any){
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
