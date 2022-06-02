import { ArchivoArticulo } from "./archivo.model"
import { Profesor } from "./profesor.model"

export class Articulo {
	idArticulo: number
	tipCLR: string
	titulo: string
	nombreCRL: string
	doi: string
	numero: string
	estadoArticulo: string
	fechaEdicion: string
	tipoNI: string
	issnisbn: string
	anyo: string
	volumen: string
	paginas: string
	pais: string
	estado: string
	indexada: string
	editores: string
	editorial: string
	ciudad: string
	profesores: Profesor[]
	archivos: ArchivoArticulo[]

	constructor() {
		this.idArticulo = 0
		this.tipCLR = 'Congreso'
		this.titulo = ''
		this.estado = 'Enviado'
		this.editorial = ''
		this.indexada = 'No'
		this.numero = ''
		this.nombreCRL = ''
		this.estadoArticulo = ''
		this.fechaEdicion = ''
		this.tipoNI = 'Nacional'
		this.issnisbn = ''
		this.anyo = ''
		this.ciudad = ''
		this.pais = ''
		this.doi = ''
		this.volumen = ''
		this.editores = ''
		this.paginas = ''
		this.profesores = []
		this.archivos = []
	}
}