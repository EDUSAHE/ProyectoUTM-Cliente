import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  constructor(private http: HttpClient) { }

  getArticulosByProfesor(idProfesor: number, fechaInicial: string, fechaFinal: string) {
    return this.http.get(`${environment.API_URI}/articulos/articulosByProfesor/${idProfesor}/${fechaInicial}/${fechaFinal}`);
  }

  getArticulosByPeriodo(fechaInicial: any, fechaFinal: any) {
    return this.http.get(`${environment.API_URI}/articulos/${fechaInicial}/${fechaFinal}`);
  }

  agregar(articulo: any, idProfesor: any) {
    return this.http.post(`${environment.API_URI}/articulos/create/${idProfesor}`, articulo)
  }

  obtenerArticulosPorInstitutoPorFechas(idIntituto: number, fechaIni: string, fechaFin: string) {
    return this.http.get(`${environment.API_URI}/articulos/articulosByInstituto/${idIntituto}/${fechaIni}/${fechaFin}`);
  }

  obtenerArticulosPorInstituto(idIntituto: number) {
    return this.http.get(`${environment.API_URI}/articulos/articulosByInstituto/${idIntituto}`);
  }

  obtenerTodoPorInstituto(idInstituto: number, fechaIni: string, fechaFin: string) {
    return this.http.get(`${environment.API_URI}/articulos/todoByInstituto/${idInstituto}/${fechaIni}/${fechaFin}`);
  }

  obtenerTodoDividido() {
    return this.http.get(`${environment.API_URI}/articulos/todoDividido`);
  }

  obtenerTodoDivididoPorFecha(fechaInicial: string, fechaFinal: string) {
    return this.http.get(`${environment.API_URI}/articulos/todoDividido/${fechaInicial}/${fechaFinal}`);
  }

}
