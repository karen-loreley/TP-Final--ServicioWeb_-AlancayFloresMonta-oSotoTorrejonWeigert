export class Propietario {

    _id!: string;
    apellido: string;
    nombres: string;
    dni: string;
    email: string;
    telefono: number;

    constructor()
    {
        this.apellido = "";
        this.nombres = "";
        this.dni = "";
        this.email = "";
        this.telefono = 0;
    }
}
