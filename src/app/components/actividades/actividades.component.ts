import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actividad } from 'src/app/models/actividad.model';
import { ActividadService } from 'src/app/services/actividad.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  idProfesor: number
  actividades: Actividad[]
  fechaInicial: string
  fechaFinal: string
  actividad: any[]=[
{
  actividad:"Excursion a IBM",
  inicio:"2021-10-06",
  fin:"2022-10-06",
  descripcion:"Una excursión muy chingona para ver qué onda",
  validado:"Validado"
},
{
  actividad:"Exposicion Auditorio UTM",
  inicio:"2021-10-06",
  fin:"2022-10-06",
  descripcion:"Ver a papi rector",
  validado:"No validado"
},
{
  actividad:"Ponencia Sobre Super Computadoras",
  inicio:"2021-10-06",
  fin:"2022-10-06",
  descripcion:"Computadoras vrgas",
  validado:"Validado"
},

  ]
  constructor(private actividadService: ActividadService, private route: ActivatedRoute) {
    this.idProfesor = 0
    this.actividades = []
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
    this.actividadService.obtenerActividadesProfesor(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((eventosRes: any) => {
      this.actividades = eventosRes

    }, err => console.error(err))
  }

}
