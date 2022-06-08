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
		this.evento = ''
		this.nombreEvento = ''
		this.participacion = ''
		// this.afectaLinea = ''
		this.lagcCA = ''
		this.tipoParticipacion = ''
		this.titulo = ''
		this.inicio = ''
		this.fin = ''
		// this.comprobante = ''
	}
}