import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Revisor } from '../models/revisor.model';

@Injectable({
  providedIn: 'root'
})
export class RevisionesService {

  constructor(private http: HttpClient) { }

  // Servicios solicitados al Servidor

  listRevisionByProfesor(idProfesor:number, fechaIni:any, fechaFin:any){
    return this.http.get(`${environment.API_URI}/revisor`);
  }

  createRevision(revision:Revisor){
    return this.http.post(`${environment.API_URI}/revisor/create`,revision);
  }

  EliminarRevision(idRevision:any){
    return this.http.delete(`${environment.API_URI}/revisor/delete/${idRevision}`)
  }
  EditarRevision(idRevision:any,revision:Revisor){
    return this.http.put(`${environment.API_URI}/revisor/update/${idRevision}`,revision);
  }
  
  // Servicios solicitados al servidor

  listRevisionByPeriodo(idProfesor:number, fechaIni:any, fechaFin:any){
    return this.http.get(`${environment.API_URI}/revisor/listRevisionByProfesor/${idProfesor}/${fechaIni}/${fechaFin}`);
  }

}
