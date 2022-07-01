import { Component, OnInit } from '@angular/core'
import { ProfesorService } from 'src/app/services/profesor.service'
import { TutoradosService } from 'src/app/services/tutorados.service' //agregue

@Component({
  selector: 'app-listar-tutorados-jc',
  templateUrl: './listar-tutorados-jc.component.html',
  styleUrls: ['./listar-tutorados-jc.component.css']
})
export class ListarTutoradosJcComponent implements OnInit {

    fechaIni: string;
	fechaFin: string;

    carreras = new Map();
	niveles = new Map();

	tutorados: any[]
	idProfesor: number
	idCarrera: number
	profesores: any []
	idProfesorSelect: number
	nombreProfesorActual: any   //new
	opcionFiltrado : number

  constructor(private tutoradosService : TutoradosService, private profesorService : ProfesorService) {
   		this.tutorados = []
		this.opcionFiltrado = 1
		this.idProfesorSelect = 0
		this.profesores =[]
		let hoy = new Date()
		this.fechaIni = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
		this.fechaFin = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
		this.idProfesor = Number(localStorage.getItem('idProfesor'));
		this.idCarrera = 0  
		this.nombreProfesorActual; //String


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
	this.profesorService.getProfesor(this.idProfesor).subscribe((resProfesor:any)=>{
		this.idCarrera = resProfesor.idCarrera;
		this.listarTutoradosSelect()
		this.profesorService.obtenerProfesoresPorCarrera(this.idCarrera).subscribe((resProfesores:any)=>{
			this.profesores = resProfesores;
			this.idProfesorSelect=this.profesores[0].idProfesor
			console.log(this.idProfesorSelect)
			console.log(this.profesores)
		},
			err => console.error(err))
	},
		err => console.error(err))
	
  }

  listTutoradosByPeriodo(){
	console.log(this.idProfesorSelect);
	this.profesorService.getProfesor(this.idProfesorSelect).subscribe((resProfesor:any)=>{
		this.nombreProfesorActual=resProfesor.nombreProfesor;
		this.tutoradosService.listTutoradosByPeriodo(this.idProfesorSelect, this.fechaIni, this.fechaFin).subscribe((resTutorados:any) =>{
			this.tutorados = resTutorados;
			for(let i=0;i<this.tutorados.length;i++){
				this.tutorados[i].nombreProfesor=this.nombreProfesorActual;
			}
			console.log(this.tutorados);
		},
			err => console.error(err))
	},
		err => console.error(err))
	}

//	listTutoradosByCarreraByPeriodo
listTutoradosByCarreraByPeriodo(){
	this.tutoradosService.listTutoradosByCarreraByPeriodo(this.idCarrera, this.fechaIni, this.fechaFin).subscribe((resTutorados:any) =>{
		this.tutorados = resTutorados;
		console.log(this.tutorados);
	},
		err => console.error(err))
}

listarTutoradosSelect(){
	if(this.opcionFiltrado==1){
		this.listTutoradosByCarreraByPeriodo();
	}
	else{
		this.listTutoradosByPeriodo();
	}
}

convertirFecha(fecha: string) {
		return new Date(fecha).toLocaleDateString("en-CA");
	}

obtenerProfesoresPorCarrera() {
	  this.profesorService.obtenerProfesoresPorCarrera(this.idCarrera).subscribe((resProfesor:any) =>{
		this.profesores = resProfesor;
		console.log(this.profesores);
	},
		err => console.error(err))
}
}