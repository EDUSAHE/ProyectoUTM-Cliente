export class Actividad {
	idActividad: number
	idProfesor: number
	actividad: string
	inicio: string
	fin: string
	descripcion: string
	validado: string
	comprobante: string

	constructor() {
		this.idActividad = 0
		this.idProfesor = 0
		this.actividad = ''
		this.inicio = ''
		this.fin = ''
		this.descripcion = ''
		this.validado = '1'
		this.comprobante = ''
	}
}