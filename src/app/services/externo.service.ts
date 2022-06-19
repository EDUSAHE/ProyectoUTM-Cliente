import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExternoService {

  constructor(private http: HttpClient) {}
    listExternos() {
      return this.http.get(`${environment.API_URI}/externosApa/`);
    }

    listOneExterno(idExternoAPA: number) {
      return this.http.get(`${environment.API_URI}/externosApa/${idExternoAPA}`);
    }

    crearExterno(Externo:any){
      return this.http.post(`${environment.API_URI}/externosApa/create`,Externo);
    }

    eliminarExterno(idExternoApa:number){
      return this.http.delete(`${environment.API_URI}/delete/${idExternoApa}`);
    }

    actualizarExterno(idExternoAPA: number, Externo:any){
      return this.http.put(`${environment.API_URI}/update/${idExternoAPA}`,Externo);
    }
}
