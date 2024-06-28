export class Usuario {
    _id!: string;
    email: string;
    usuario: string;
    password: string;
    activo: boolean;
    perfil: string;

    constructor(){
        this.email = "";
        this.usuario = "";
        this.password = "";
        this.activo = false;
        this.perfil = "";
    }
}
