import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Plan } from '../models/plan.model';

@Injectable({
	providedIn: 'root'
})
export class PlanesService {

	constructor(private http: HttpClient) { }

	agregarPlan(plan: Plan) {
		return this.http.post(`${environment.API_URI}/planes/create`, plan);
	  }

	listPlanes() {
		return this.http.get(`${environment.API_URI}/planes`);
	}

	listPlanesByCarrera(idCarrera: number) {
		return this.http.get(`${environment.API_URI}/planes/planesByCarrera/${idCarrera}`);
	}

	modificarPlan(plan: Plan) {
		return this.http.put(`${environment.API_URI}/planes/actualizar/${plan.idPlan}`, plan);
	  }

	eliminarPlan(idPlan: number) {
    	return this.http.delete(`${environment.API_URI}/planes/delete/${idPlan}`);
  	}
}
