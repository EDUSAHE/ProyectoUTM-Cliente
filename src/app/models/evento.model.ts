export class Evento {
	idEvento: number
	idProfesor: number
	// tipoEvento: string
	evento: string
	nombreEvento: string
	participacion: string
	// afectaLinea: string
	lagcCA: string
	tipoParticipacion: string
	titulo: string
	inicio: string
	fin: string
	// comprobante: string

	constructor() {
		this.idEvento = 0
		this.idProfesor = 0
		// this.tipoEvento = ''
		this.evento = 'Congreso'
		this.nombreEvento = ''
		this.participacion = 'Nacional'
		// this.afectaLinea = ''
		this.lagcCA = 'Si'
		this.tipoParticipacion = 'Asistente'
		this.titulo = ''
		this.inicio = ''
		this.fin = ''
		// this.comprobante = ''
	}
}