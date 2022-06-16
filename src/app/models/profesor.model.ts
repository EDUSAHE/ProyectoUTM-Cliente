export class Profesor {
	idProfesor: number
	nombreProfesor: string
	// apellidoPaterno: string
	// apellidoMaterno: string
	correo: string
	password: string
	nivel: number
	idCarrera: number
	grado: string
	tipo: number
	nombreApa: string
	idInstituto: number

	constructor() {
		this.idProfesor = 0
		this.nombreProfesor = ''
		// this.apellidoPaterno = ''
		// this.apellidoMaterno = ''
		this.correo = ''
		this.password = ''
		this.nivel = 4
		this.idCarrera = 0
		this.idInstituto = -1
		this.grado = ''
		this.tipo = 1
		this.nombreApa = ''
	}

}