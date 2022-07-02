import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Materia } from '../models/materia.model';
@Injectable({
  providedIn: 'root'
})
export class ProfesorYmateriamultipleService {

  constructor(private http: HttpClient) { }

  delete(idProfesorYMateriaMultiple:number){
    return this.http.delete(`${environment.API_URI}/profesorYMateriaMultiple/delete/${idProfesorYMateriaMultiple}`)
  }
}
