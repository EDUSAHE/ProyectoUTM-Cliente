import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Materia } from '../models/materia.model';

@Injectable({
  providedIn: 'root'
})
export class ProfesorYmateriaService {

  constructor(private http: HttpClient) { }
  
  asignarMateria(materia:any){
    return this.http.post(`${environment.API_URI}/profesorYMateria/create`,materia);
  }

  editarMateria(idProfesorYMateria:number, datos:any){
    return this.http.put(`${environment.API_URI}/profesorYMateria/update/${idProfesorYMateria}`,datos)
  }

  eliminarAsignacion(idProfesorYMateria:number){
    return this.http.delete(`${environment.API_URI}/profesorYMateria/delete/${idProfesorYMateria}`)
  }
}
