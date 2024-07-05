export class Usuario {
    _id!: string;
    email: string;
    usuario: string;
    password: string;
    activo: boolean;
    perfil: string;

    constructor(id:string="", email:string="", password:string="", usuario:string="",
        activo:boolean=false, perfil:string=""){
        this._id=id;
        this.email = email;
        this.usuario = usuario;
        this.password = password;
        this.activo = activo;
        this.perfil = perfil;
    }

}
