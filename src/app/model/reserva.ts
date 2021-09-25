class Persona{
    idPersona!:number;
    nombre!:string;
    apellido!:string;
}
export class Reserva{
    idReserva!:number;
    fechaCadena!:string;
    horaInicioCadena!:string;
    horaFinCadena!:string;
    idEmpleado!:Persona;
    idCliente!: Persona;
    observacion!:string;
    flagAsistio!: string;
    flagEstado!:string;
}