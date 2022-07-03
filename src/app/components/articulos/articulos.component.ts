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
	idInstitutoActual: number
	profesoresInstituto: any[]
	Profesores: any[]
	articulos: any[]
	autoresNuevos: AutoresUTM[]
	autorNuevo: AutoresUTM
	articulo: any
	fileToUpload: any
	fechaInicial: string
	fechaFinal: string
	ArticuloActual: Articulo
	urlArchivos: string
	profesoresActuales: any[]
	ordenProfesores: any
	externo: Externo
	externos: Externo[]
	sugerenciasExternos: any[]
	institutos: any[]
	idProfesoresInstituto: any[]
	posiciones: any[]
	opcionFiltrado: any
	posNuevoExterno: any
	posArticulo: any
	externoExistente: any
	// Paginación
	pageSize = 10;
	p = 1;

	constructor(
		private recargaService: RecargaService,
		private profesorService: ProfesorService,
		private institutoService: InstitutoService,
		private externoService: ExternoService,
		private route: ActivatedRoute,
		private articulosService: ArticulosService,
		private cambioInforService: CambioInfoService,
		private imagenesService: ImagenesService
	) {
		this.posNuevoExterno = 1
		this.posArticulo = 1
		this.opcionFiltrado = 1
		this.posiciones = ["---", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		this.profesoresInstituto = []
		this.idProfesoresInstituto = []
		this.idInstitutoActual = 0
		this.idArticuloActual = 0
		this.institutos = []
		this.idProfesor = 0
		this.sugerenciasExternos = []
		this.externo = new Externo();
		this.externoExistente = { "idExternoAPA": 0, "pos": 1 }
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

		this.recargaService.recarga$.subscribe(signal => this.listarByFiltrado());

		this.urlArchivos = environment.URI_ARCHIVOS
		this.listarByFiltrado()
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
			this.listarByFiltrado()
		})
	}

	//desplegar model
	ActualizarArticuloModal(idArticulo: any) {
		this.articulosService.obtenerArticulo(idArticulo).subscribe((resArticulo: any) => {
			this.ArticuloActual = resArticulo;
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
			this.listarByFiltrado();
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
	ModalAutoresExternos(idArticulo: any, index: any) {
		this.idArticuloActual = idArticulo
		this.posArticulo = index;
		console.log("AutoresExternos");
		this.AutoresExternosSugerencias()
		this.ExternoExistente()
		$('#AutoresExternos').modal();
		$('#AutoresExternos').modal('open');
	}

	//<!-- Modal AutoresUTM-->
	ModalAutoresUTM(idArticulo: any) {
		this.idArticuloActual = idArticulo
		this.institutoService.obtenerTodo().subscribe((resInstitutos: any) => {
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

	cambioInstituto() {
		this.idProfesoresInstituto = []
		this.articulosService.listProfesoresByInstitutoNoAutores(this.idInstitutoActual, this.idArticuloActual).subscribe((resProfesores: any) => {
			this.profesoresInstituto = resProfesores
			for (let i = 0; i < resProfesores.length; i++) {
				this.profesoresInstituto[i].pos = "---"
				this.profesoresInstituto[i].check = false
			}
			console.log(this.profesoresInstituto)
		},
			err => console.error(err))
	}

	addAutor(index: number, modo: number) {
		this.autorNuevo = new AutoresUTM()
		this.autorNuevo.idProfesor = this.profesoresInstituto[index].idProfesor;
		this.autorNuevo.pos = Number(this.profesoresInstituto[index].pos)
		if (modo == 1 && this.profesoresInstituto[index].pos != "---") {
			this.autoresNuevos.push(this.autorNuevo)
		}
		else if (modo == 2 && this.profesoresInstituto[index].check == true) {
			this.autoresNuevos.push(this.autorNuevo)
		}
	}

	addAutoresUTMSelect() {
		this.articulosService.addAutoresUTM(this.idArticuloActual, this.autoresNuevos).subscribe((resAutores: any) => {
			this.listarByFiltrado();
			$('#AutoresUTM').modal('close');
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Autores Añadidos',
				showConfirmButton: false,
				timer: 1000
			})
		},
			err => console.log(err))
		this.autoresNuevos = []
	}

	ModalPrioridades(idArticulo: any, profesores: any) {
		console.log("modalPrioridad");
		this.idArticuloActual = idArticulo;
		this.profesoresActuales = profesores;
		$('#modalPrioridad').modal();
		$('#modalPrioridad').modal('open');
		console.log(this.profesoresActuales);
	}

	eliminarAutorPublicacion(idArticulo: any, idProfesor: any, esInterno: any) {
		Swal.fire({
			title: '¿Deseas eliminar este Autor?',
			position: 'center',
			icon: 'question',
			showDenyButton: true,
			showConfirmButton: true,
			confirmButtonText: 'Sí'
		})
			.then(respuesta => {
				if (respuesta.isConfirmed) {
					this.articulosService.eliminarAutor(idArticulo, idProfesor, esInterno).subscribe({
						next: (resEliminar: any) => {
							Swal.fire({
								position: 'center',
								icon: 'success',
								title: 'Autor Eliminado',
								showConfirmButton: false,
								timer: 1000
							})
							this.listarByFiltrado();
						}
					});
				}
			});
	}

	CambiarPrioridad() {
		let aux: any[] = []
		for (let i = 0; i < this.profesoresActuales.length; i++) {
			aux.push({
				idProfesor: this.profesoresActuales[i].idProfesor,
				pos: this.profesoresActuales[i].pos,
				esInterno: this.profesoresActuales[i].esInterno
			})
		}
		this.articulosService.updatePrioridadesOfAutoresByPublicacion(this.idArticuloActual, aux).subscribe((resNewPos: any) => {
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Prioridades Actualizadas',
				showConfirmButton: false,
				timer: 1000
			})
			this.listarByFiltrado();
		},
			err => console.error(err))
	}

	AutoresExternosSugerencias() {
		this.articulosService.getSugerenciasExternoByAutorUTM(this.idProfesor).subscribe((resExternosSugeridos: any) => {
			this.sugerenciasExternos = resExternosSugeridos
			console.log(this.sugerenciasExternos)
			for (let i = 0; i < this.articulos[this.posArticulo].autores.length; i++) {
				if (this.articulos[this.posArticulo].autores[i].esInterno == 0) {
					for(let j=0;j<this.sugerenciasExternos.length;j++){
						if(this.sugerenciasExternos[j].idExternoAPA==this.articulos[this.posArticulo].autores[i].idProfesor){
							this.sugerenciasExternos.splice(j,1);
						}
					}
				}
			}
			console.log(this.sugerenciasExternos)

		},
			err => console.error(err))
	}

	crearNuevoAutorExterno() {
		console.log(this.externo);
		this.articulosService.createExterno(this.idArticuloActual, this.posNuevoExterno, this.externo).subscribe((resExterno: any) => {
			$('#AutoresExternos').modal('close');
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Se ha creado y agregado el autor externo',
				showConfirmButton: false,
				timer: 1300
			})
			this.listarByFiltrado();
			this.externo = new Externo()
			this.posNuevoExterno = 1
		},
			err => console.error(err))
	}

	ExternoExistente() {
		this.articulosService.listAutoresExternosExistentesSinColaboracionArticulos(this.idProfesor).subscribe((resExternos: any) => {
			this.externos = resExternos;
			if (this.externos.length > 0)
				this.externoExistente.idExternoAPA = this.externos[0].idExternoAPA;
			console.log(this.externos);
		},
			err => console.error(err))
	}

	addExternoExistente() {
		this.articulosService.addAutorExterno(this.idArticuloActual, new Date().toLocaleDateString("en-CA"), this.externoExistente).subscribe((resAddExterno: any) => {
			$('#AutoresExternos').modal('close');
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Autor Externo Agregado',
				showConfirmButton: false,
				timer: 1000
			})
			this.listarByFiltrado();
		},
			err => console.error(err))
	}

	eliminarArticulo(idArticulo: number) {
		Swal.fire({
			title: '¿Estas seguro de querer eliminar el Articulo?',
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
							Swal.fire({
								position: 'center',
								icon: 'success',
								title: 'Articulo Eliminado',
								showConfirmButton: false,
								timer: 1000
							})
							this.listarByFiltrado();
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
					this.listarByFiltrado()
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

	listarByFiltrado() {
		this.articulos = []
		switch (Number(this.opcionFiltrado)) {
			case 1:
				this.articulosService.listArticulosByProfesorByPeriodo(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((resArticulos: any) => {
					this.articulos = resArticulos
					console.log(this.articulos)
				},
					err => console.error(err))
				break;
			case 2:
				this.articulosService.listArticulosByProfesorByPeriodoByTitulo(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((resArticulos: any) => {
					this.articulos = resArticulos
					console.log(this.articulos)
				},
					err => console.error(err))
				break;
			case 3:
				this.articulosService.listArticulosByProfesorByPeriodoByEstado(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((resArticulos: any) => {
					this.articulos = resArticulos
					console.log(this.articulos)
				},
					err => console.error(err))
				break;
			case 4:
				this.articulosService.listArticulosByProfesorByPeriodoByAnyo(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((resArticulos: any) => {
					this.articulos = resArticulos
					console.log(this.articulos)
				},
					err => console.error(err))
				break;
			case 5:
				this.articulosService.listArticulosByProfesorByPeriodoByTipo(this.idProfesor, this.fechaInicial, this.fechaFinal).subscribe((resArticulos: any) => {
					this.articulos = resArticulos
					console.log(this.articulos)
				},
					err => console.error(err))
				break;
		}
	}

}
