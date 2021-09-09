import { Categoria } from "./categoria";

export class Subcategoria {
    idTipoProducto!: number;
    descripción!: string;
    idCategoria!: Categoria;
}