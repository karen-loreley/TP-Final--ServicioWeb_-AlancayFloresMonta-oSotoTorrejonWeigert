import { Alquiler } from "./alquiler";

export class Novedades {

    _id!: string;
    alquiler: Alquiler;
    fecha: Date;
    descripcion: string;
    estado: string;

    constructor()
    {
        this.alquiler = new Alquiler();
        this.fecha = new Date();
        this.descripcion = "";
        this.estado = "";
    }
}
