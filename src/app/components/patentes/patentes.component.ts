import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatentesService } from 'src/app/services/patentes.service';

@Component({
	selector: 'app-patentes',
	templateUrl: './patentes.component.html',
	styleUrls: ['./patentes.component.css']
})
export class PatentesComponent implements OnInit {

	fechaInicial: string;
	fechaFinal: string;
	idProfesor: any;
	patentes: any[] = []

	constructor(private route: ActivatedRoute,private patenteServices:PatentesService) {
		let hoy = new Date()
		this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
		this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
	}

	ngOnInit(): void {
		this.idProfesor=Number(localStorage.getItem('idProfesor'));
			this.listarPatentes();
			console.log(this.patentes)
	}

	listarPatentes(){
		this.patenteServices.listPatentesByProfesorByPeriodo(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((resPatentes: any) => {
			this.patentes = resPatentes;
			console.log(this.patentes);
			
		 }, err => console.error(err))
	}
	
}
