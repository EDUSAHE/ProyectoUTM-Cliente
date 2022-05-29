import { Component, OnInit } from '@angular/core';
import { Comision } from 'src/app/models/comision.model';
import { Profesor } from 'src/app/models/profesor.model';

@Component({
  selector: 'app-listar-comisiones',
  templateUrl: './listar-comisiones.component.html',
  styleUrls: ['./listar-comisiones.component.css']
})
export class ListarComisionesComponent implements OnInit {

  comisiones:any[];
  comisionEditar:Comision;
  fechaInicial: string;
  fechaFinal: string;
  eleccion:any;
  profesores:Profesor[];
  comisionados:any[];

  constructor() {
    this.comisiones = [];
    this.profesores = [];
    this.comisionados = [];
    this.comisionEditar = new Comision();
    let hoy = new Date()
    this.fechaInicial = `${hoy.getFullYear()}-${('0' + hoy.getMonth()).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
    this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
   }

  ngOnInit(): void {
  }

}
