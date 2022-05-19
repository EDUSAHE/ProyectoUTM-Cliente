import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(private http: HttpClient) { }

  guardarArchivo(src: any, idArticulo: number, extension: any) {
    return this.http.post(`${environment.API_URI_IMAGENES}/guardarArchivo`, {
      file: src,
      name: idArticulo,
      extension: extension
    }
    )
  }

  obtenerArchivosPorArticulo(idArticulo: number) {
    return this.http.get(`${environment.API_URI}/archivoYArticulo/${idArticulo}`)
  }

}
