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
	// evento: string
	// lagcCA: string
	comprobante: string

	constructor() {
		this.idEvento = 0
		this.idProfesor = 0
		this.tipoEvento = 'Congreso'
		// this.evento = 'Congreso'
		this.nombreEvento = ''
		this.participacion = 'Nacional'
		this.afectaLinea = 'Si'
		// this.lagcCA = 'Si'
		this.tipoParticipacion = 'Asistente'
		this.titulo = ''
		this.inicio = ''
		this.fin = ''
		this.comprobante = ''
	}
}