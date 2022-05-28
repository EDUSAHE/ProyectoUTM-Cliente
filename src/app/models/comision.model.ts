export class Comision{
    nombre: string;
    descripcion: string;
    idProfesor: number;
    periodo: string;
    inicio: string;
    fin: string;
    asignacion:string;

    constructor(){
        this.nombre = "";
        this.descripcion = "";
        this.idProfesor = 0;
        this.periodo = "Definido";
        this.inicio = "";
        this.fin = "";
        this.asignacion="";
    }
}