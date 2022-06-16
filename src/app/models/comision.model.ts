export class Comision {
	idComision: string;
    nombre: string;
    descripcion: string;
    asignacion:string;
    periodo: string;
    inicio: string;
    fin: string;
	comprobante: string;
    // idProfesor: number;

    constructor(){
		this.idComision = "";
        this.nombre = "";
        this.descripcion = "";
        // this.idProfesor = 0;
        this.periodo = "Definido";
        this.inicio = "";
        this.fin = "";
        this.asignacion="";
		this.comprobante="";
    }
}