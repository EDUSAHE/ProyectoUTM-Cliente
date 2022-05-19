import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Actividad } from '../models/actividad.model';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  constructor(private http: HttpClient) { }

  agregarActividad(actividad: Actividad) {
    return this.http.post(`${environment.API_URI}/actividades/create`, actividad)
  }

  obtenerActividadesProfesor(idProfesor: number, fechaIni: string, fechafin: string) {
    return this.http.get(`${environment.API_URI}/actividades/actividadesByProfesor/${idProfesor}/${fechaIni}/${fechafin}`)
  }

  obtenerActividadesInstituto(idInstituto: number, fechaIni: string, fechafin: string) {
    return this.http.get(`${environment.API_URI}/actividades/actividadesByInstituto/${idInstituto}/${fechaIni}/${fechafin}`)
  }

  obtenerActividadesCarrera(idCarrera: number, fechaIni: string, fechafin: string) {
    return this.http.get(`${environment.API_URI}/actividades/actividadesByCarrera/${idCarrera}/${fechaIni}/${fechafin}`)
  }

}
