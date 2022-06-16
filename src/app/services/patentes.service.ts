import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Patente } from '../models/patente.model';

@Injectable({
  providedIn: 'root'
})
export class PatentesService {

  constructor(private http: HttpClient) { }

  // Servicios solicitados al Servidor
  listPatentesByProfesorByPeriodo(idProfesor:number, fechaIni:any, fechaFin:any){
    return this.http.get(`${environment.API_URI}/`);
  }

  listColaboradoresExternosPatentes(idProfesor:number){
    return this.http.get(`${environment.API_URI}/`);
  }

  listColaboradoresInternosPatentes(idProfesor:number){
    return this.http.get(`${environment.API_URI}/`);
  }
}
