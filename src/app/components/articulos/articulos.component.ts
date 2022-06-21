import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Articulo } from 'src/app/models/articulo.model';
import { Externo } from 'src/app/models/externo.model';
import { RecargaService } from 'src/app/services/recarga.service';
import { ArticulosService } from 'src/app/services/articulos.service';
import { CambioInfoService } from 'src/app/services/cambio-info.service';
import { ExternoService } from 'src/app/services/externo.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { AutoresUTM } from 'src/app/models/autoresUTM.model';

declare var $: any;

@Component({
	selector: 'app-articulos',
	templateUrl: './articulos.component.html',
	styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

	idProfesor: number
	idArticuloActual: number
	idInstitutoActual : number
	profesoresInstituto : any[]
	Profesores: any []
	articulos: any[]
	autoresNuevos: AutoresUTM[]
	autorNuevo: AutoresUTM
	articulo:any
	fileToUpload: any
	fechaInicial: string
	fechaFinal: string
	ArticuloActual: Articulo
	urlArchivos: string
	profesoresActuales: any
	ordenProfesores: any
	externo: Externo
	externos: Externo[]
	sugerenciasExternos: any []
	institutos : any []
	// Paginación
	pageSize = 3;
	p = 1;

	constructor(
		private recargaService: RecargaService,
		private profesorService: ProfesorService,
		private institutoService : InstitutoService,
		private externoService:ExternoService, 
		private route: ActivatedRoute, 
		private articulosService: ArticulosService, 
		private cambioInforService: CambioInfoService, 
		private imagenesService: ImagenesService
	) {
		this.profesoresInstituto = []
		this.idInstitutoActual = 0
		this.idArticuloActual = 0
		this.institutos = []
		this.idProfesor = 0
		this.sugerenciasExternos = []
		this.externo = new Externo();
		this.articulo;
		this.Profesores = []
		this.articulos = []
		this.externos = []
		this.profesoresActuales = []
		this.autoresNuevos = [];
		this.autorNuevo = new AutoresUTM()
		this.ArticuloActual = new Articulo()
		this.fileToUpload = null
		this.ordenProfesores;
		let hoy = new Date()
		this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
		this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`

		this.recargaService.recarga$.subscribe(signal => this.obtenerArticulos());

		this.urlArchivos = environment.URI_ARCHIVOS
		this.obtenerArticulos()
		cambioInforService.currentMsg$.subscribe(mensaje => {

		}, err => console.error(err))
	}

	ngOnInit(): void {
		$(document).ready(function () {
			$('.sidenav').sidenav()
			$(".dropdown-trigger").dropdown({ coverTrigger: false })
		})
		this.route.paramMap.subscribe(params => {
			this.idProfesor = Number(params.get('idProfesor'))
			this.obtenerArticulos()
		})
		this.AutoresExternosSugerencias();
	}

	obtenerArticulos(): void {
		this.articulosService.listArticulosByProfesorByPeriodo(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((resArticulos: any) => {
			this.articulos = resArticulos
			//console.log(this.articulos)
		},
			err => console.error(err))
	}

	//desplegar model
	ActualizarArticuloModal(idArticulo:any) {
		this.articulosService.obtenerArticulo(idArticulo).subscribe((resArticulo:any)=>{
			this.ArticuloActual=resArticulo;
			this.ArticuloActual.fechaedicion = this.convertirFecha(resArticulo.fechaedicion)
			$('#ActualizarArticulo').modal();
			$('#ActualizarArticulo').modal('open');
		},
			err => console.error(err))
	}

	//Actualiza la Publicacion
	actualizarArticulo() {
		console.log(this.ArticuloActual)
		this.articulosService.actualizarArticulo(this.ArticuloActual, this.ArticuloActual.idArticulo).subscribe((resActualiza: any) => {
			this.obtenerArticulos();
			$('#ActualizarArticulo').modal('close');
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Articulo Modificado',
				showConfirmButton: false,
				timer: 1000
			  })
		},
			err => console.error(err))
	}

	//<!-- Modal AutoresExternos-->
	ModalAutoresExternos() {
		console.log("AutoresExternos");
		this.AutoresExternosSugerencias()
		this.ExternoExistente()
		$('#AutoresExternos').modal();
		$('#AutoresExternos').modal('open');
	}

	//<!-- Modal AutoresUTM-->
	ModalAutoresUTM(idArticulo:any) {
		this.idArticuloActual = idArticulo
		this.institutoService.obtenerTodo().subscribe((resInstitutos:any)=>{
			this.institutos = resInstitutos;
			this.institutos.splice(0, 1)
			this.idInstitutoActual = this.institutos[0].idInstituto
			this.cambioInstituto()
		},
			err => console.error(err))
		console.log("AutoresUTM");
		$('#AutoresUTM').modal();
		$('#AutoresUTM').modal('open');
	}
	cambioInstituto(){
		this.profesorService.obtenerProfesoresPorInstituto(this.idInstitutoActual).subscribe((resProfesores:any)=>{
			this.profesoresInstituto = resProfesores;
		},
			err => console.error(err))
	}

	addAutor(){
		console.log(this.autorNuevo)
		this.autoresNuevos.push(this.autorNuevo)
	}

	//<!-- Modal Prioridades autores Publicacion-->
	ModalPrioridades(profesores: any) {
		console.log("modalPrioridad");
		$('#modalPrioridad').modal();
		$('#modalPrioridad').modal('open');
		this.profesoresActuales = profesores;
		console.log(this.profesoresActuales);
	}


	MostrarOrden() {
		console.log("ordenPrioridades");
		console.log(this.ordenProfesores)
	}

	AutoresUTM() {
		console.log();
	}
	AutoresExternosSugerencias() {
		this.articulosService.getSugerenciasExternoByAutorUTM(this.idProfesor).subscribe((resExternosSugeridos: any) => {
			this.sugerenciasExternos = resExternosSugeridos
		},
			err => console.error(err))
	}
	crearNuevoAutorExterno(NuevoExterno:any) {
		this.externoService.crearExterno(NuevoExterno).subscribe((resExterno:any) => {
			console.log(NuevoExterno);
		},
			err => console.error(err))
		$('#AutoresExternos').modal('close');
	}
	ExternoExistente() {
		this.externoService.listExternos().subscribe((resExternos:any)=>{
			this.externos =	resExternos.filter((el: any) => !this.sugerenciasExternos.includes(el));
			console.log(this.externos);
		},
			err => console.error(err))
	}

	eliminarArticulo(idArticulo: number) {
		Swal.fire({
			title: '¿Estas seguro de querer eliminar?',
			position: 'center',
			icon: 'question',
			showDenyButton: true,
			showConfirmButton: true,
			confirmButtonText: 'Sí'
		})
		.then(respuesta => {
				if (respuesta.isConfirmed) {
					this.articulosService.eliminarArticulo(idArticulo).subscribe({
						next: (resEliminar: any) => {
							this.obtenerArticulos();
						}
					});
				}
		});
	}

	convertirFecha(fecha: string) {
		return new Date(fecha).toLocaleDateString("en-CA");
	}

	cargarArchivo(archivos: any, idArticulo: number): void {
		let archivo = archivos.files
		console.log(archivo)

		for (let i = 0; i < archivo.length; i++) {
			this.fileToUpload = archivo.item(i)
			let imgPromise = this.getFileBlob(this.fileToUpload)
			imgPromise.then(blob => {
				this.imagenesService.guardarArchivo(blob, idArticulo, archivo.item(i).type).subscribe(res => {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: 'Archivo Cargado Exitosamente'
					})
					this.obtenerArticulos()
				}, err => console.error(err))
			})
		}
	}

	getFileBlob(file: any) {
		var reader = new FileReader();
		return new Promise(function (resolve, reject) {
			reader.onload = (function (thefile) {
				return function (e: any) {
					resolve(e.target.result);
				};
			})(file);
			reader.readAsDataURL(file);
		});

	}

}
