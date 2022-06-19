import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Tesista } from '../models/tesista.model';


@Injectable({
  providedIn: 'root'
})
export class TesistasService {

  constructor(private http: HttpClient) { }

  listTesistasByProfesorByPeriodo(idProfesor:number, fechaIni:any, fechaFin:any){
    return this.http.get(`${environment.API_URI}/tesistas/listTesistasByProfesorByPeriodo/${idProfesor}/${fechaIni}/${fechaFin}`);
  }
}
