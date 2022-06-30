import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Materia } from '../models/materia.model';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor(private http: HttpClient) { }

  list() {
	return this.http.get(`${environment.API_URI}/materias`);
  }

  listOne(idMateria: number) {
	return this.http.get(`${environment.API_URI}/materias/${idMateria}`);
  }

  // Servicios solicitados al servidor

  listMateriasByAnyoByPeriodo(idProfesor:number, AnyoI:any, AnyoF:any){
    return this.http.get(`${environment.API_URI}/materias/listMateriasByAnyoByPeriodo/${idProfesor}/${AnyoI}/${AnyoF}`);
  }

  listMateriasByAnyoByPeriodoMultiple(idProfesor:number, AnyoI:any, AnyoF:any){
    return this.http.get(`${environment.API_URI}/materias/listMateriasByAnyoByPeriodoMultiple/${idProfesor}/${AnyoI}/${AnyoF}`);
  }

  listMateriasByPlanBySemestreByPeriodo(idPlan:any,semestre:any,AnyoI:any,AnyoF:any){
    return this.http.get(`${environment.API_URI}/materias/listMateriasByPlanBySemestreByPeriodo/${idPlan}/${semestre}/${AnyoI}/${AnyoF}`);
  }

}
