export class Carrera {
	idCarrera: number
	nombreCarrera: string
	codigoCarrera: string
	idInstituto: number
	siglas: string

	constructor() {
		this.idCarrera = 0
		this.codigoCarrera = ''
		this.nombreCarrera = ''
		this.idInstituto = 1
		this.siglas = ''
	}
}