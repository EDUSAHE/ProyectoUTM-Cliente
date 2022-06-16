import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Revision } from '../models/revision.model';

@Injectable({
  providedIn: 'root'
})
export class RevisionesService {

  constructor(private http: HttpClient) { }

  // Servicios solicitados al Servidor

  listRevisionByProfesor(idProfesor:number, fechaIni:any, fechaFin:any){
    return this.http.get(`${environment.API_URI}/revisor`);
  }
}
