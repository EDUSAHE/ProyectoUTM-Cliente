import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Tuturado } from '../models/tutorado.model';


@Injectable({
  providedIn: 'root'
})
export class TutoradosService {

  constructor(private http: HttpClient) { }

  // Servicios solicitados al Servidor

  listTutoradosByPeriodo(idProfesor:number, fechaIni:any, fechaFin:any){
    return this.http.get(`${environment.API_URI}/tutorados/listTutoradosByPeriodo/${idProfesor}/${fechaIni}/${fechaFin}`);
  }
  
  listTutoradosByCarreraByPeriodo(idCarrera:number, fechaIni:any, fechaFin:any){
    return this.http.get(`${environment.API_URI}/tutorados/listTutoradosByCarreraByPeriodo/${idCarrera}/${fechaIni}/${fechaFin}`);
  }

  AsignarTutorados(tutorados:any){
    return this.http.post(`${environment.API_URI}/tutorados/create`,tutorados);
  }
}
