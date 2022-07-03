import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GruposMultiplesService {

  constructor(private http: HttpClient) { }

  agregarGrupoMultiAsignacion(grupo:any){
    return this.http.post(`${environment.API_URI}/gruposMultiples/create`,grupo);
  }

  eliminarGrupoMultiAsignacion(idProfesorYMateriaMultiple:number,grupo:any){
    return this.http.post(`${environment.API_URI}/gruposMultiples/delete/${idProfesorYMateriaMultiple}`,grupo);
  }

}
