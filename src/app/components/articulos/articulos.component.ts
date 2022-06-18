import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Articulo } from 'src/app/models/articulo.model';
import { Externo } from 'src/app/models/externo.model';
import { ArticulosService } from 'src/app/services/articulos.service';
import { CambioInfoService } from 'src/app/services/cambio-info.service';
import { ExternoService } from 'src/app/services/externo.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
declare var $: any
@Component({
	selector: 'app-articulos',
	templateUrl: './articulos.component.html',
	styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

	idProfesor: number
	Profesores: any []
	articulos: any[]
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
	constructor(private externoService:ExternoService, private route: ActivatedRoute, private articulosService: ArticulosService, private cambioInforService: CambioInfoService, private imagenesService: ImagenesService) {
		this.idProfesor = 0
		this.sugerenciasExternos = []
		this.externo = new Externo();
		this.articulo;
		this.Profesores = []
		this.articulos = []
		this.externos = []
		this.profesoresActuales = []
		this.ArticuloActual = new Articulo()
		this.fileToUpload = null
		this.ordenProfesores;
		let hoy = new Date()
		this.fechaInicial = `${hoy.getFullYear() - 1}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`
		this.fechaFinal = `${hoy.getFullYear()}-${('0' + (hoy.getMonth() + 1)).slice(-2)}-${('0' + hoy.getDate()).slice(-2)}`

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
			// console.log(this.articulos)
		},
			err => console.error(err))
	}

	//desplegar model
	ActualizarArticuloModal(idArticulo:any) {
		this.articulosService.obtenerArticulo(idArticulo).subscribe((resArticulo:any)=>{
			this.ArticuloActual=resArticulo;
		},
			err => console.error(err))
		$('#ActualizarArticulo').modal();
		$('#ActualizarArticulo').modal('open');
	}
	//Actualiza la Publicacion
	actualizarArticulo(articulo: any) {
		console.log(articulo)
		delete articulo.autores;
		console.log(this.articulo)
		this.articulosService.actualizarArticulo(articulo,articulo.idArticulo).subscribe((resActualiza: any) => {
		},
			err => console.error(err))
		this.obtenerArticulos();
		$('#ActualizarArticulo').modal('close');
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
	ModalAutoresUTM() {
		console.log("AutoresUTM");
		$('#AutoresUTM').modal();
		$('#AutoresUTM').modal('open');
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
