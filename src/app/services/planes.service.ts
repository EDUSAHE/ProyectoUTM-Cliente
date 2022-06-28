import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Plan } from '../models/plan.model';

@Injectable({
	providedIn: 'root'
})
export class PlanesService {

	constructor(private http: HttpClient) { }

	listPlanes() {
		return this.http.get(`${environment.API_URI}/plan`);
	}

	listPlanesByCarrera(idCarrera: number) {
		return this.http.get(`${environment.API_URI}/plan/planesByCarrera/${idCarrera}`);
	}
}
