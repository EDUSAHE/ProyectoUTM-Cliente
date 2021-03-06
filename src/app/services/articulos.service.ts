import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  constructor(private http: HttpClient) { }

  eliminarAutor(idArticulo:any, idProfesor:any, esInterno:any){
    return this.http.delete(`${environment.API_URI}/profesorYArticulo/delete/${idArticulo}/${idProfesor}/${esInterno}`);
  }

  eliminarArticulo(idArticulo: number) {
	return this.http.delete(`${environment.API_URI}/articulos/delete/${idArticulo}`);  
  }

  obtenerArticulo(idArticulo: number) {
    return this.http.get(`${environment.API_URI}/articulos/${idArticulo}`);
  }

  getArticulosByProfesor(idProfesor: number, fechaInicial: string, fechaFinal: string) {
    return this.http.get(`${environment.API_URI}/articulos/listArticulosByProfesorByPeriodo/${idProfesor}/${fechaInicial}/${fechaFinal}`);
  }

  getArticulosByPeriodo(fechaInicial: any, fechaFinal: any) {
    return this.http.get(`${environment.API_URI}/articulos/${fechaInicial}/${fechaFinal}`);
  }

  agregar(articulo: any, idProfesor: any, fechaCap: any) {
    return this.http.post(`${environment.API_URI}/articulos/create/${idProfesor}/${fechaCap}`, articulo)
  }

  actualizarArticulo(articulo: any, idArticulo: any) {
    return this.http.put(`${environment.API_URI}/articulos/update/${idArticulo}`, articulo)
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

  // Servicios solicitados al servidor

  listArticulosByProfesorByPeriodo(idProfesor:number, fechaIni:any, fechaFin:any){
    return this.http.get(`${environment.API_URI}/articulos/listArticulosByProfesorByPeriodo/${idProfesor}/${fechaIni}/${fechaFin}`);
  }

  // 'profesor' es un JSON con los atributos: 
  //  idProfesor, pos, esInterno
  updatePrioridadesOfAutoresByPublicacion(idArticulo:number, autores:any){
    return this.http.put(`${environment.API_URI}/profesorYArticulo/updatePrioridadesOfAutoresByPublicacion/${idArticulo}`,autores);
  }

  // 'profesor' es un JSON con los atributos:
  // idProfesor, pos
  addAutoresUTM(idArticulo:number, autores:any){
    return this.http.post(`${environment.API_URI}/profesorYArticulo/addAutoresUTM/${idArticulo}/`,autores);
  }

  listProfesoresByInstitutoNoAutores(idInstituto:number,idArticulo:number){
    return this.http.get(`${environment.API_URI}/articulos/listProfesoresByInstitutoNoAutores/${idInstituto}/${idArticulo}`);
  }

  //Autores Externos

  // 'profesor' es un JSON con los atributos:
  // correo, nombre, nombreAPA
  createExterno(idArticulo:number, pos:number, profesor:any){
    return this.http.post(`${environment.API_URI}/profesorYArticulo/createExterno/${idArticulo}/${pos}`,profesor);
  }

  getSugerenciasExternoByAutorUTM(idProfesor:number){
    return this.http.get(`${environment.API_URI}/articulos/getSugerenciasExternoByAutorUTM/${idProfesor}`);
  }

  listAutoresExternosExistentesSinColaboracionArticulos(idProfesor:number){
    return this.http.get(`${environment.API_URI}/articulos/listAutoresExternosExistentesSinColaboracionArticulos/${idProfesor}`);
  }

  addAutorExterno(idArticulo:number,fecha:any,autorExterno:any){
    return this.http.post(`${environment.API_URI}/articulos/addAutorExterno/${idArticulo}/${fecha}`,autorExterno);
  }

  //Filtrado para Arituculos Profesor-Investigador

  listArticulosByProfesorByPeriodoByTipo(idProfesor:number, fechaIni:any, fechaFin:any){
    return this.http.get(`${environment.API_URI}/articulos/listArticulosByProfesorByPeriodoByTipo/${idProfesor}/${fechaIni}/${fechaFin}`);
  }
  listArticulosByProfesorByPeriodoByEstado(idProfesor:number, fechaIni:any, fechaFin:any){
    return this.http.get(`${environment.API_URI}/articulos/listArticulosByProfesorByPeriodoByEstado/${idProfesor}/${fechaIni}/${fechaFin}`);
  }
  listArticulosByProfesorByPeriodoByTitulo(idProfesor:number, fechaIni:any, fechaFin:any){
    return this.http.get(`${environment.API_URI}/articulos/listArticulosByProfesorByPeriodoByTitulo/${idProfesor}/${fechaIni}/${fechaFin}`);
  }
  listArticulosByProfesorByPeriodoByAnyo(idProfesor:number, fechaIni:any, fechaFin:any){
    return this.http.get(`${environment.API_URI}/articulos/listArticulosByProfesorByPeriodoByAnyo/${idProfesor}/${fechaIni}/${fechaFin}`);
  }


  listArticulosByCarreraByPeriodo(idCarrera:number,fechaIni:any,fechaFin:any){
    return this.http.get(`${environment.API_URI}/articulos/listArticulosByCarreraByPeriodo/${idCarrera}/${fechaIni}/${fechaFin}`);
  }

}
