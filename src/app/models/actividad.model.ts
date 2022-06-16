export class Actividad {
	idActividad: number
	idProfesor: number
	actividad: string
	inicio: string
	fin: string
	descripcion: string
	validado: string
<<<<<<< Updated upstream
	comprobante: string
=======
	// comprobante: string
>>>>>>> Stashed changes

	constructor() {
		this.idActividad = 0
		this.idProfesor = 0
		this.actividad = ''
		this.inicio = ''
		this.fin = ''
		this.descripcion = ''
		this.validado = ''
<<<<<<< Updated upstream
		this.comprobante = ''
=======
		// this.comprobante = ''
>>>>>>> Stashed changes
	}
}