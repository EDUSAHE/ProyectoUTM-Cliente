import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CodirectorExtService {
  constructor(private http: HttpClient) { }

  crearCodirector(Codirector:any){
    return this.http.post(`${environment.API_URI}/externosCodirector/create`,Codirector);
  }
  listExternos() {
    return this.http.get(`${environment.API_URI}/externosCodirector/`);
  }
}
