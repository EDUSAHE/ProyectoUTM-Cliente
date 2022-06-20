import { Component, OnInit } from '@angular/core';
import { ComisionesService } from 'src/app/services/comisiones.service';

@Component({
	selector: 'app-comisiones',
	templateUrl: './comisiones.component.html',
	styleUrls: ['./comisiones.component.css']
})
export class ComisionesComponent implements OnInit {

	fechaInicial: string;
	fechaFinal: string;

	comisiones: any[];
	idProfesor : number
	constructor(private comisionesService : ComisionesService) {
		let hoy = new Date()
		this.idProfesor = Number(localStorage.getItem('idProfesor'))
		this.comisiones = [];
		this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
		this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
	}

	ngOnInit(): void {
		this.obtenerComisiones()
	}
	convertirFecha(fecha: string) {
		return new Date(fecha).toLocaleDateString("en-CA");
	}

	obtenerComisiones(){
		this.comisionesService.listComisionesByProfesorByPeriodo(this.idProfesor,this.fechaInicial,this.fechaFinal).subscribe((resComisiones:any) => {
			this.comisiones = resComisiones;
			console.log(resComisiones);
		},
			err => console.error(err))
	}


}
