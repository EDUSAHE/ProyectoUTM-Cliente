import { ArchivoArticulo } from "./archivo.model"
import { Profesor } from "./profesor.model"

export class Articulo {
	idArticulo: number
	tipoCRL: string
	titulo: string
	nombreCRL: string
	estadoArticulo: string
	fechaEdicion: string
	tipoNI: string
	issnisbn: string
	anyo: string
	volumen: string
	paginas: string
	profesores: Profesor[]
	archivos: ArchivoArticulo[]

	constructor() {
		this.idArticulo = 0
		this.tipoCRL = 'Revista'
		this.titulo = ''
		this.nombreCRL = ''
		this.estadoArticulo = 'Publicado'
		this.fechaEdicion = '2022-03-09'
		this.tipoNI = 'Nacional'
		this.issnisbn = '2342340234234'
		this.anyo = ''
		this.volumen = ''
		this.paginas = ''
		this.profesores = []
		this.archivos = []
	}
}