import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActividadService } from 'src/app/services/actividad.service';
<<<<<<< Updated upstream
=======
import { Carrera } from 'src/app/models/carrera.model';
import { Instituto } from 'src/app/models/instituto.model';
import { Profesor } from 'src/app/models/profesor.model';
import { CarreraService } from 'src/app/services/carrera.service';
>>>>>>> Stashed changes
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';
declare var $: any
@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  todasactividades:any=[]
  idProfesor: number
  actividades: any[]
  fechaInicial: string
  fechaFinal: string
  todasActividades: any[]
  institutos:any=[]
  idInstituto: number
  idCarrera: number
  constructor(private institutoService: InstitutoService, private actividadService: ActividadService, private route: ActivatedRoute) {
    this.actividades = []
    this.todasActividades = []
    this.idInstituto = -1
    this.idCarrera = -1
    this.idProfesor = -1
    this.institutos=[]
    let hoy = new Date()
    this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
    this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idProfesor = Number(params.get('idProfesor'))
      this.actualizarActividades()
    })
  }

  actualizarActividades() {
        // Mostrar actividades del profesor
        this.actividadService.obtenerActividadesProfesor(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((actividadesRes: any) => {
          this.actividades = actividadesRes
        }, err => console.error(err))
  }
}
