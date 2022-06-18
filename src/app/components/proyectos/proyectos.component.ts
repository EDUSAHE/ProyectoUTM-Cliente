import { Component, OnInit } from '@angular/core';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
	selector: 'app-proyectos',
	templateUrl: './proyectos.component.html',
	styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

	fechaInicial: string;
	fechaFinal: string;
	proyectos: any[]
	idProfesor : any
	constructor(private proyectoservice : ProyectosService) {
		let hoy = new Date()
		this.proyectos = []
		this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
		this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
		this.idProfesor = Number(localStorage.getItem('idProfesor'))
	}

	ngOnInit(): void {
		this.listarProyectos();
	}
	listarProyectos(){
		this.proyectoservice.listProyectosByProfesorByPeriodo(this.idProfesor,this.fechaInicial,this.fechaFinal).subscribe((resProyectos: any) => {
			this.proyectos = resProyectos;
			console.log(resProyectos);	
		},
			err => console.error(err))
	}

}
