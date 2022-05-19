import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Profesor } from '../models/profesor.model';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  constructor(private http: HttpClient) { }

  obtenerTodo() {
    return this.http.get(`${environment.API_URI}/profesores`);
  }

  guardarProfesor(profesor: Profesor) {
    return this.http.post(`${environment.API_URI}/profesores/create`, profesor);
  }

  actualizarProfesor(profesor: Profesor, id: number) {
    return this.http.put(`${environment.API_URI}/profesores/update/${id}`, profesor);
  }

  getProfesor(idProfesor: number) {
    return this.http.get(`${environment.API_URI}/profesores/${idProfesor}`);
  }

  getProfesoresByArticulo(idArticulo: number) {
    return this.http.get(`${environment.API_URI}/profesores/profesoresByArticulo/${idArticulo}`);
  }

  cambiarContraseña(contraseña: string, correo: string) {
    return this.http.put(`${environment.API_URI}/profesores/cambiarContrasena/${correo}`, { password: contraseña })
  }

  obtenerProfesoresPorCarrera(idCarrera: number) {
    return this.http.get(`${environment.API_URI}/profesores/profesoresByCarrera/${idCarrera}`);
  }

  obtenerProfesoresPorInstituto(idInstituto: number) {
    return this.http.get(`${environment.API_URI}/profesores/profesoresByInstituto/${idInstituto}`);
  }

  eliminarProfesor(idProfesor: number) {
    return this.http.delete(`${environment.API_URI}/profesores/delete/${idProfesor}`);
  }

}
