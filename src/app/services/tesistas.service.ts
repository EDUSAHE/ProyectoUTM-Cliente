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
  listTesistasByCarreraByPeriodo(idProfesor:number, fechaIni:any, fechaFin:any){
    return this.http.get(`${environment.API_URI}/tesistas/listTesistasByCarreraByPeriodo/${idProfesor}/${fechaIni}/${fechaFin}`);
  }
  updatePrioridadesTestistas(idTesis:number, autores:any){
    return this.http.put(`${environment.API_URI}/tesistas/updatePrioridadesTestistas/${idTesis}`,autores);
  }
  obtenerTesis(idTesis: number) {
    return this.http.get(`${environment.API_URI}/tesistas/${idTesis}`);
  }
  actualizarTesis(tesis: any, idTesis: any) {
    return this.http.put(`${environment.API_URI}/tesistas/update/${idTesis}`, tesis)
  }
  eliminarTesis(idTesis:any){
    return this.http.delete(`${environment.API_URI}/tesistas/delete/${idTesis}`);
  }
}
