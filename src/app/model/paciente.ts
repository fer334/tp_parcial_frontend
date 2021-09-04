export class Paciente {
    setFechaNacimiento(arg0: string) {
        this.fechaNacimiento = arg0;
    }
    idPersona!:number;
    nombre!:string;
    apellido!:string;
    telefono!:string;
    email!:string;
    ruc!:string;
    cedula!:string;
    tipoPersona!:string;
    fechaNacimiento!:string;
}