import { Usuario } from "./usuario";

export class Novedades {

    _id!: string;
    usuario: Usuario;
    texto: string;
    estado: string;

    constructor()
    {
        this.usuario = new Usuario();
        this.texto = "";
        this.estado = "";
    }
}
