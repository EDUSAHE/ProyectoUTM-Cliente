import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto.model';
import { ProyectosService } from 'src/app/services/proyectos.service';


declare var $: any;
@Component({
	selector: 'app-proyectos',
	templateUrl: './proyectos.component.html',
	styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

	
	fechaInicial: any;
	fechaFinal: any;
	idProfesor: any;

	proyectos: any[];

	constructor(private proyectoService: ProyectosService) {
		
		let hoy = new Date()
		
		this.proyectos = []


		this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
		this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
		this.idProfesor = Number(localStorage.getItem('idProfesor'))
	}

	ngOnInit(): void {
		this.idProfesor=Number(localStorage.getItem('idProfesor'));
		this.listProyectosByProfesorByPeriodo();
		console.log(this.proyectoService)
	}

	cambioIni() {
		console.log("cambio fecha de inicio");
		this.fechaInicial = $('#fechaIni').val();
		console.log(this.fechaInicial);
		this.proyectoService.listProyectosByProfesorByPeriodo(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((proyectoRes: any) => {
			this.proyectos = proyectoRes;
			console.log(this.proyectos);

		}, err => console.error(err))

	}

	cambioFin() {
		console.log("cambio fecha de fin");
		this.fechaFinal = $('#fechaFin').val();
		console.log(this.fechaFinal);
		this.proyectoService.listProyectosByProfesorByPeriodo(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((proyectoRes: any) => {
			this.proyectos = proyectoRes;
			console.log(this.proyectos);

		}, err => console.error(err))
	}



	convertirFecha(fecha: string) {
		return new Date(fecha).toLocaleDateString("en-CA");
	}
	
	listProyectosByProfesorByPeriodo(){
this.proyectoService.listProyectosByProfesorByPeriodo(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((proyectoRes: any) => {
			this.proyectos = proyectoRes
			console.log(proyectoRes);
		 }, err => console.error(err))

	}

}

