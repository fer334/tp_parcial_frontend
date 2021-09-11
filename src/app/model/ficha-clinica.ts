import { Paciente } from "./paciente";
import { Subcategoria } from "./subcategoria";

export class Local {
    idLocal!: number;
    nombre: string;
    flagCasaCentral: string;
    cantidadIngreso: number;
    anhoMesActual: string;
    fechaHoraUltimoIngreso: string;
    minutosSesion: number;
}

export class FichaClinica {
    idFichaClinica!: number;
    fechaHora: Date;
    motivoConsulta: string;
    diagnostico: string;
    observación: string;
    idLocal!: Local;
    idEmpleado!: Paciente;
    idCliente!: Paciente;
    idTipoProducto!: Subcategoria;

    fechaHoraCadena: Date;
    fechaHoraCadenaFormateada: string;
    fechaDesdeCadena: string;
    fechaHastaCadena: string;
    todosLosCampos: string;

    constructor(){
        this.idLocal = new Local();
        this.idEmpleado = new Paciente();
        this.idCliente = new Paciente();
        this.idTipoProducto = new Subcategoria();
    }
}