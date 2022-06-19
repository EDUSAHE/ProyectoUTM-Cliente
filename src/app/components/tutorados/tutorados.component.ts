import { Component, OnInit } from '@angular/core';
import { TutoradosService } from 'src/app/services/tutorados.service';

@Component({
	selector: 'app-tutorados',
	templateUrl: './tutorados.component.html',
	styleUrls: ['./tutorados.component.css']
})
export class TutoradosComponent implements OnInit {

	fechaInicial: string;
	fechaFinal: string;

	carreras = new Map();
	niveles = new Map();

	tutorados: any[]
	idProfesor: number
	constructor(private tutoradosService : TutoradosService) {
		this.tutorados = []
		let hoy = new Date()
		this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
		this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
		this.idProfesor = Number(localStorage.getItem('idProfesor'));
		this.carreras.set(2, 'Ingeniería en Computación');
		this.carreras.set(3, 'Ingeniería en Diseño');
		this.carreras.set(4, 'Ingeniería en Electronica');
		this.carreras.set(5, 'Licenciatura en Ciencias Empresariales');
		this.carreras.set(6, 'Ingeniería en Alimentos');
		this.carreras.set(7, 'Licenciatura en Matemáticas Aplicadas');
		this.carreras.set(11, 'Ingeniería en Industrial');
		this.carreras.set(12, 'Estudios de Nuevos Materiales');
		this.carreras.set(14, 'Ingeniería en Mecatrónica');
		this.carreras.set(17, 'Ingeniería en Física Aplicada');
		this.carreras.set(31, 'Ingeniería Mecánica Automotriz');
		this.carreras.set(32, 'Ingenieri­a Civil');
		this.carreras.set(50, 'Maestría en Diseño de Modas');
		this.niveles.set(1, 'Licenciatura');
		this.niveles.set(2, 'Maestría');
		this.niveles.set(3, 'Doctorado');
	}

	ngOnInit(): void {
		this.obtenerTutorados()
	}
	
	convertirFecha(fecha: string) {
		return new Date(fecha).toLocaleDateString("en-CA");
	}

	obtenerTutorados(){
		this.tutoradosService.listTutoradosByPeriodo(this.idProfesor,this.fechaInicial,this.fechaFinal).subscribe((resTutorados:any) =>{
			this.tutorados = resTutorados;
			console.log(this.tutorados);
		},
			err => console.error(err))
	}
}
