export class Evento {
	idEvento: number
	idProfesor: number
	tipoEvento: string
	nombreEvento: string
	participacion: string
	afectaLinea: string
	tipoParticipacion: string
	titulo: string
	inicio: string
	fin: string
	comprobante: string

	constructor() {
		this.idEvento = 0
		this.idProfesor = 0
		this.tipoEvento = ''
		this.nombreEvento = ''
		this.participacion = ''
		this.afectaLinea = ''
		this.tipoParticipacion = ''
		this.titulo = ''
		this.inicio = ''
		this.fin = ''
		this.comprobante = ''
	}
}