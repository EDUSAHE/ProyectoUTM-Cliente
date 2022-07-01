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

  create(materia: Materia) {
	return this.http.post(`${environment.API_URI}/materias/create`, materia);
  }

  delete(idMateria: number) {
	return this.http.delete(`${environment.API_URI}/materias/delete/${idMateria}`);
  }

  update(materia: Materia) {
	return this.http.put(`${environment.API_URI}/materias/update/${materia.idMateria}`, materia);
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

  listMateriasByPlan(idPlan: number) {
	  return this.http.get(`${environment.API_URI}/materias/listMateriasByPlan/${idPlan}`);
  }

  listMateriasByCarreraByPeriodo(idCarrera: number, idPeriodo:number){
    return this.http.get(`${environment.API_URI}/materias/listMateriasByCarreraByPeriodo/${idCarrera}/${idPeriodo}`);
  }
  listMateriasMultiplesByCarreraByPeriodo(idCarrera: number, idPeriodo:number){
    return this.http.get(`${environment.API_URI}/materias/listMateriasMultiplesByCarreraByPeriodo/${idCarrera}/${idPeriodo}`);
  }
}
