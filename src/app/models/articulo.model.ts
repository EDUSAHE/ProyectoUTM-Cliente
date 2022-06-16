import { ArchivoArticulo } from "./archivo.model"
import { Profesor } from "./profesor.model"

export class Articulo {
	idArticulo: number
	tipoCRL: string
	titulo: string
	nombreCRL: string
	estado: string
	fechaedicion: string
	tipoNI: string
	issnisbn: string
	volumen: string
	paginas: string
	anyo: string
	doi: string
	comprobante: string
	indexada: string
	issue: string
	editores: string
	ciudad: string
	pais: string
	editorial: string
	profesores: Profesor[]
	archivos: ArchivoArticulo[]

	constructor() {
		this.idArticulo = 0
		this.tipoCRL = 'Congreso'
		this.titulo = ''
		this.estado = 'Enviado'
		this.editorial = ''
		this.indexada = 'No'
		this.nombreCRL = ''
		this.fechaedicion = ''
		this.tipoNI = 'Nacional'
		this.issnisbn = ''
		this.anyo = ''
		this.ciudad = ''
		this.pais = ''
		this.doi = ''
		this.volumen = ''
		this.editores = ''
		this.paginas = ''
		this.comprobante = ''
		this.issue = ''
		this.profesores = []
		this.archivos = []
	}
}