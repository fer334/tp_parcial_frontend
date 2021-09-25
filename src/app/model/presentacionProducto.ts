export class Producto{
    idProducto!: number;
};

export class ExistenciaProducto{
    precioVenta!: number;
}

export class PresentacionProducto{
    idPresentacionProducto!: number; 
    nombre:string;
    codigo:number;
    flagServicio:string;
    idProducto!:Producto;
    existenciaProducto !: ExistenciaProducto;
    constructor (){
            this.idProducto=new Producto();
            this.existenciaProducto=new ExistenciaProducto();
    }
};
