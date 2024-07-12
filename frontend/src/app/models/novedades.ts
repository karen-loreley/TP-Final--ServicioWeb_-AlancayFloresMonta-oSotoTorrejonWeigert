import { Local } from "./local";

export class Novedades {

    _id!: string;
    local: Local;
    fecha: Date;
    descripcion: string;
    estado: string;

    constructor()
    {
        this.local = new Local();
        this.fecha = new Date();
        this.descripcion = "";
        this.estado = "";
    }
}
