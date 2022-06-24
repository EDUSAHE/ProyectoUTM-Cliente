import { Component, OnInit } from '@angular/core';
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
	idProfesor : number 
	// Paginación
	pageSize = 10;
	p = 1;
  constructor(private tesistasService: TesistasService) {
    let hoy = new Date()
		this.tesistas = []
		this.idProfesor= Number(localStorage.getItem('idProfesor'));
		this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
		this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
  }

  ngOnInit(): void {
	this.obtenerTesistas();
  }
  obtenerTesistas(){
		this.tesistasService.listTesistasByProfesorByPeriodo(this.idProfesor,this.fechaInicial,this.fechaFinal).subscribe((resTesistas:any) =>{
			this.tesistas = resTesistas
			console.log(this.tesistas)
		},
			err => console.error(err))
	}
	convertirFecha(fecha: string) {
		return new Date(fecha).toLocaleDateString("en-CA");
	}
}
