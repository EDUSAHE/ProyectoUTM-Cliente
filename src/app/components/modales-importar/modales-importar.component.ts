import { Component, OnInit } from '@angular/core';
import { Actividad } from 'src/app/models/actividad.model';
import { Carrera } from 'src/app/models/carrera.model';
import { Evento } from 'src/app/models/evento.model';
import { Instituto } from 'src/app/models/instituto.model';
import { Profesor } from 'src/app/models/profesor.model';
import { ActividadService } from 'src/app/services/actividad.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { EventoService } from 'src/app/services/evento.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-modales-importar',
  templateUrl: './modales-importar.component.html',
  styleUrls: ['./modales-importar.component.css']
})
export class ModalesImportarComponent implements OnInit {

  datosImportar: any

  constructor(private profesorService: ProfesorService, private institutoService: InstitutoService, private carreraService: CarreraService,
    private eventoService: EventoService, private actividadService: ActividadService) {
    this.datosImportar = []
  }

  ngOnInit(): void {
  }

  cargarExcel(event: any) {
    if (event.target.files.length > 0) {
      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(event.target.files[0]);
      fileReader.onload = (e) => {
        let data = new Uint8Array(<any>fileReader.result);
        let bstr = ''
        data.forEach(codigo => bstr += String.fromCharCode(codigo))

        var workbook = XLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        this.datosImportar = XLSX.utils.sheet_to_json(worksheet)
      }
    } else
      console.log('No hay archivo')
  }

  subirExcelProfesores() {
    if (this.datosImportar.length < 1) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Ningún Archivo Seleccionado'
      })
      return
    }

    this.datosImportar.forEach((profesor: Profesor) => {
      this.profesorService.guardarProfesor(profesor).subscribe(res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Profesores Importados Satisfactoriamente',
        })
      }, err => console.error(err))
    })
  }

  subirExcelInstitutos() {
    if (this.datosImportar.length < 1) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Ningún Archivo Seleccionado'
      })
      return
    }

    this.datosImportar.forEach((instituto: Instituto) => {
      this.institutoService.agregarInstituto(instituto).subscribe(res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Institutos Importados Satisfactoriamente',
        })
      }, err => console.error(err))
    })
  }

  subirExcelCarreras() {
    if (this.datosImportar.length < 1) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Ningún Archivo Seleccionado'
      })
      return
    }

    this.datosImportar.forEach((carrera: Carrera) => {
      this.carreraService.agregarCarrera(carrera).subscribe(res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Carreras Importadas Satisfactoriamente',
        })
      }, err => console.error(err))
    })
  }

  subirExcelEventosDir() {
    if (this.datosImportar.length < 1) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Ningún Archivo Seleccionado'
      })
      return
    }

    this.datosImportar.forEach((evento: Evento) => {
      this.eventoService.agregarEvento(evento).subscribe(res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Eventos Importados Satisfactoriamente',
        })
      }, err => console.error(err))
    })
  }

  subirExcelActividadesDir() {
    if (this.datosImportar.length < 1) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Ningún Archivo Seleccionado'
      })
      return
    }

    this.datosImportar.forEach((actividad: Actividad) => {
      this.actividadService.agregarActividad(actividad).subscribe(res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Actividades Importadas Satisfactoriamente',
        })
      }, err => console.error(err))
    })
  }

}
