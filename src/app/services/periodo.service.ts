import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Periodo } from '../models/periodo.model';


@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(`${environment.API_URI}/periodos`);
    }
  
    create(periodo: Periodo) {
    return this.http.post(`${environment.API_URI}/periodos/create`, periodo);
    }
  
    delete(idPeriodo: number) {
    return this.http.delete(`${environment.API_URI}/periodos/delete/${idPeriodo}`);
    }
  
    update(periodo: Periodo) {
    return this.http.put(`${environment.API_URI}/periodos/update/${periodo.idPeriodo}`, periodo);
    }
  
    listOne(idPeriodo: number) {
    return this.http.get(`${environment.API_URI}/periodos/${idPeriodo}`);
    }
}
