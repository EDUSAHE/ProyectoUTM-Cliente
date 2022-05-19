import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Carrera } from 'src/app/models/carrera.model';
import { Profesor } from 'src/app/models/profesor.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { TranslateService } from "@ngx-translate/core";
import { CambioInfoService } from 'src/app/services/cambio-info.service';

declare var $: any

@Component({
  selector: 'app-generales',
  templateUrl: './generales.component.html',
  styleUrls: ['./generales.component.css']
})
export class GeneralesComponent implements OnInit {

  idProfesor: number
  profesor: Profesor
  carrera: Carrera
  urlImagenes: String

  constructor(private route: ActivatedRoute, private profesorService: ProfesorService, private carreraService: CarreraService, private translate: TranslateService,
    private cambioInfoService: CambioInfoService) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es')
    let idioma = localStorage.getItem('idioma')
    if (idioma) translate.use(idioma)

    this.idProfesor = 0
    this.profesor = new Profesor()
    this.carrera = new Carrera()
    this.urlImagenes = environment.URI_IMG

    cambioInfoService.currentMsg$.subscribe(mensaje => {
      if (mensaje != '')
        translate.use(mensaje)
    }, err => console.error(err))
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idProfesor = Number(params.get('idProfesor'))

      this.profesorService.getProfesor(this.idProfesor).subscribe((resProfesor: any) => {
        this.profesor = resProfesor

        // Obtener el nombre de la carera
        this.carreraService.obtenerCarreraPorId(this.profesor.idCarrera).subscribe((resCarrera: any) => {
          this.carrera = resCarrera
        }, err => { console.error(err) })
      },
        err => console.error(err)
      );

    })
  }

  actualizarProfesor(): void {
    this.profesorService.actualizarProfesor(this.profesor, this.idProfesor).subscribe(result => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Datos Actualizados Correctamente'
      })
    }, err => { console.error(err) })
  }

}
