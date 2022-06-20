import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Comision } from '../models/comision.model';


@Injectable({
  providedIn: 'root'
})
export class ComisionesService {

  constructor(private http: HttpClient) { }

  // Servicios solicitados al Servidor

  listComisionesByProfesorByPeriodo(idProfesor:number, fechaIni:any, fechaFin:any){
    return this.http.get(`${environment.API_URI}/comisiones/listComisionesByProfesorByPeriodo/${idProfesor}/${fechaIni}/${fechaFin}`);
  }
}
