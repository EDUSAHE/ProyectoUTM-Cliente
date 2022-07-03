import { Component, OnInit } from '@angular/core';
import {  PlanesService  } from 'src/app/services/planes.service';
import {  MateriasService  } from 'src/app/services/materias.service';
@Component({
  selector: 'app-list-materiaporsemestre',
  templateUrl: './list-materiaporsemestre.component.html',
  styleUrls: ['./list-materiaporsemestre.component.css']
})
export class ListMateriaporsemestreComponent implements OnInit {
  fechaInicial: string;
	fechaFinal: string;
  planes:any[];
  idPlan:any;
  semestre:any;
  materias:any[]
  constructor(private planservicio:PlanesService,private materiaservicio:MateriasService) {
    let hoy = new Date()
    this.planes=[];
    this.materias=[];
    this.idPlan=1;
    this.semestre=1;
    this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
		this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
   }

  ngOnInit(): void {
    this.listPlanes()
  }

  ListMaterias(){
    console.log("Listando")
  }
  cambioPlan(){
    console.log(this.idPlan)
  }
  cambioSemestre(){
    console.log(this.semestre)
  }
  cambioIni(){
    
  console.log(	this.fechaInicial)
  }
  
  cambioFin(){
  
    console.log(	this.fechaFinal)
  }
  listPlanes(){
    this.planservicio.listPlanes().subscribe((resPlan:any)=>{
      this.planes=resPlan;
      console.log(this.planes);
    })
  }

  listMateria(){
    this.materiaservicio.listMateriasByPlanBySemestreByPeriodo(this.planes,this.semestre,this.fechaInicial,this.fechaFinal).subscribe((resMateria:any)=>{
      this.materias=resMateria;
      console.log(this.materias)
    })
  }
}
