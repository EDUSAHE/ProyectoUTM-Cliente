export class Profesor {
	idProfesor: number
	nombres: string
	apellidoPaterno: string
	apellidoMaterno: string
	correoProfesor: string
	password: string
	nivel: string
	idInstituto: number
	idCarrera: number
	grado: string
	idTipoProfesor: number
	nombreApa: string

	constructor() {
		this.idProfesor = 0
		this.nombres = ''
		this.apellidoPaterno = ''
		this.apellidoMaterno = ''
		this.correoProfesor = ''
		this.password = ''
		this.nivel = '4'
		this.idCarrera = 0
		this.idInstituto = -1
		this.grado = ''
		this.idTipoProfesor = 1
		this.nombreApa = ''
	}

}