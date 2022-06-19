import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Evento } from '../models/evento.model';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
 
  constructor(private http: HttpClient) { }

  agregarEvento(evento: Evento) {
    return this.http.post(`${environment.API_URI}/eventos/create`, evento)
  }

  obtenerEventosProfesor(idProfesor: number, fechaIni: string, fechafin: string) {
    return this.http.get(`${environment.API_URI}/eventos/eventosByProfesor/${idProfesor}/${fechaIni}/${fechafin}`)
  }

  obtenerEventosInstituto(idInstituto: number, fechaIni: string, fechafin: string) {
    return this.http.get(`${environment.API_URI}/eventos/eventosByInstituto/${idInstituto}/${fechaIni}/${fechafin}`)
  }

  obtenerEventosCarrera(idCarrera: number, fechaIni: string, fechafin: string) {
    return this.http.get(`${environment.API_URI}/eventos/eventosByCarrera/${idCarrera}/${fechaIni}/${fechafin}`)
  }
  eliminarEvento(idEvento:number){
    return this.http.delete(`${environment.API_URI}/eventos/delete/${idEvento}`)
  }

  ActualizarEvento(id:any,evento:any){
    return this.http.put(`${environment.API_URI}/eventos/update/${id}`,evento)

  }


  // Servicios solicitados al servidor

  listEventosByPeriodo(idProfesor:number, fechaIni:any, fechaFin:any){
    return this.http.get(`${environment.API_URI}/eventos/listEventosByPeriodo/${idProfesor}/${fechaIni}/${fechaFin}`);
  }

  
}
