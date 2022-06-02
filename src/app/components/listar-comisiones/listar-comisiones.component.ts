import { Component, OnInit } from '@angular/core';
import { Comision } from 'src/app/models/comision.model';
import { Profesor } from 'src/app/models/profesor.model';

@Component({
  selector: 'app-listar-comisiones',
  templateUrl: './listar-comisiones.component.html',
  styleUrls: ['./listar-comisiones.component.css']
})
export class ListarComisionesComponent implements OnInit {

  comisiones:any[]=['Comisión para la selección de alumnos de nuevo ingreso','Comisión para asignación de becas economicas y alimentarias', 'Comisión para elección de pizzas'];
  comisionEditar:Comision;
  fechaInicial: string;
  fechaFinal: string;
  eleccion:any=2;
  profesores:Profesor[];
  comisionados:any[]=['Erik German Ramos Pérez', 'Moises Emanuel Ramírez Guzmán', 'Eduardo Sanchez Soto'];

  constructor() {
    this.profesores = [];
    this.comisionEditar = new Comision();
    let hoy = new Date()
    this.fechaInicial = `${hoy.getFullYear()}-${('0' + hoy.getMonth()).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
    this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
   }

  ngOnInit(): void {
  }
  modificarComision(){
    if(this.comisionEditar.periodo=="Indefinido")
      this.comisionEditar.fin="2200-05-03";
    console.log(this.comisionEditar);
  }

}
