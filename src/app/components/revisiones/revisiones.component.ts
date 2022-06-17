import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {RevisionesService}  from 'src/app/services/revisiones.service'
@Component({
	selector: 'app-revisiones',
	templateUrl: './revisiones.component.html',
	styleUrls: ['./revisiones.component.css']
})
export class RevisionesComponent implements OnInit {

	fechaInicial: string;
	fechaFinal: string;
	idProfesor: number;
	revisiones: any[] = []

	constructor( private route: ActivatedRoute,private revisionesServices:RevisionesService) {
		let hoy = new Date()
		this.idProfesor = 0
		this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
		this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
	}

	ngOnInit(): void {
		
			this.idProfesor=Number(localStorage.getItem('idProfesor'));
			this.listarRevisiones();
			console.log(this.revisiones)
		  
	}

	listarRevisiones(){
		this.revisionesServices.listRevisionByPeriodo(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((eventosRes: any) => {
			this.revisiones = eventosRes
		 }, err => console.error(err))
	}
}
