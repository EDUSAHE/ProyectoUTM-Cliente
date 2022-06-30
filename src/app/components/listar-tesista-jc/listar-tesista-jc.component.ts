import { Component, OnInit } from '@angular/core';
import { ProfesorService } from 'src/app/services/profesor.service';
import { TesistasService } from 'src/app/services/tesistas.service';
@Component({
  selector: 'app-listar-tesista-jc',
  templateUrl: './listar-tesista-jc.component.html',
  styleUrls: ['./listar-tesista-jc.component.css']
})
export class ListarTesistasJcComponent implements OnInit {
  tesistas: any[]
	fechaInicial: string;
	fechaFinal: string;
	idProfesor : number ;
	profesores:any[];
	idCarrera: any
	// Paginación
	pageSize = 10;
	p = 1;
  constructor(private tesistasService: TesistasService, private profesorServices: ProfesorService) {
    let hoy = new Date()
		this.tesistas = []
		this.profesores=[]
		this.idProfesor= Number(localStorage.getItem('idProfesor'));
		this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
		this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
  }

  ngOnInit(): void {
	this.profesorServices.getProfesor(this.idProfesor).subscribe((resProfesor: any) => {
		this.idCarrera = resProfesor.idCarrera
		this.obtenerTesistas()
		this.profesorServices.obtenerProfesoresPorCarrera(this.idCarrera).subscribe((resProfesor: any) => {
		  this.profesores=resProfesor
		}, err => console.error(err));
	  }, err => console.error(err));
  }
  obtenerTesistas(){
	if(this.idProfesor == -1){
		this.tesistasService.listTesistasByCarreraByPeriodo(this.idCarrera, this.fechaInicial, this.fechaFinal).subscribe((resEventos: any) => {
		  console.log(resEventos);
		  this.tesistas = resEventos
		}, err => console.error(err));
	  } 
	  else{
		this.tesistasService.listTesistasByProfesorByPeriodo(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((resEventosP: any) => {
		  console.log(resEventosP);
		  this.tesistas = resEventosP
		}, err => console.error(err));
	  }
	}
	convertirFecha(fecha: string) {
		return new Date(fecha).toLocaleDateString("en-CA");
	}
}
