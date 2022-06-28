import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComisionesService } from 'src/app/services/comisiones.service';
import {ProfesorService}from 'src/app/services/profesor.service';
import Swal from 'sweetalert2';
declare var $: any
@Component({
  selector: 'app-comisiones-jc',
  templateUrl: './comisiones-jc.component.html',
  styleUrls: ['./comisiones-jc.component.css']
})
export class ComisionesJcComponent implements OnInit {
  fechaInicial: string;
	fechaFinal: string;
  idProfesor: number;
  comisiones:any[]=[];
  profesores:any[]=[];
  
  constructor(private comisionesservice:ComisionesService,private profesorservices:ProfesorService) {
    let hoy = new Date()
    this.idProfesor = 0
		this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
		this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
	
   }

  ngOnInit(): void {
    this.obtenerProfesores();
  }

obtenerProfesores(){
  this.profesorservices.obtenerTodo().subscribe((profesoresRes: any) => {
    this.profesores=profesoresRes;
    }, err => console.error(err))

}
cambioIdProfesor(){
  this.obtnerComisiones();
  console.log(this.idProfesor);
  
}

cambioIni(){
  this.obtnerComisiones()
console.log(	this.fechaInicial)
}

cambioFin(){
  this.obtnerComisiones()
  console.log(	this.fechaFinal)
}
  obtnerComisiones(){

    this.comisionesservice.listComisionesByProfesorByPeriodo(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((comisionesRes: any) => {
			this.comisiones = comisionesRes;
      console.log(this.comisiones);
		 }, err => console.error(err))

    console.log("comisiones");
  }
}
