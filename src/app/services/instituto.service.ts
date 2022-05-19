import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Instituto } from '../models/instituto.model';

@Injectable({
  providedIn: 'root'
})
export class InstitutoService {

  constructor(private http: HttpClient) { }

  obtenerTodo() {
    return this.http.get(`${environment.API_URI}/institutos`);
  }

  agregarInstituto(instituto: Instituto) {
    return this.http.post(`${environment.API_URI}/institutos/create`, instituto);
  }

  modificarInstituto(instituto: Instituto) {
    return this.http.put(`${environment.API_URI}/institutos/update/${instituto.idInstituto}`, instituto);
  }

  eliminarInstituto(idInstituto: number) {
    return this.http.delete(`${environment.API_URI}/institutos/delete/${idInstituto}`);
  }

}
