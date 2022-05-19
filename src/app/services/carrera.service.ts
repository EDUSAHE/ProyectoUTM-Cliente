import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Carrera } from '../models/carrera.model';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  constructor(private http: HttpClient) { }

  obtenerTodo() {
    return this.http.get(`${environment.API_URI}/carreras`)
  }

  obtenerCarreraPorId(id: number) {
    return this.http.get(`${environment.API_URI}/carreras/${id}`)
  }

  obtenerCarrerasPorInstituto(idInstituto: number) {
    return this.http.get(`${environment.API_URI}/carreras/getCarrerasByInstituto/${idInstituto}`)
  }

  agregarCarrera(carrera: Carrera) {
    return this.http.post(`${environment.API_URI}/carreras/create`, carrera)
  }

  modificarCarrera(carrera: Carrera) {
    return this.http.put(`${environment.API_URI}/carreras/update/${carrera.idCarrera}`, carrera)
  }

  eliminarCarrera(idCarrera: number) {
    return this.http.delete(`${environment.API_URI}/carreras/delete/${idCarrera}`)
  }

}
