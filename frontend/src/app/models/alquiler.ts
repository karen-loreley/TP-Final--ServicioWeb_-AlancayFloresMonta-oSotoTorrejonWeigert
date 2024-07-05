import { Local } from "./local";
import { Propietario } from "./propietario";

export class Alquiler {

    _id!: string;
    propietario: Propietario;
    local: Local;
    plazomes: number;
    costoAlquiler: number;
    fechaAlquiler: Date;

    constructor()
    {
        this.propietario = new Propietario();
        this.local = new Local();
        this.plazomes = 0;
        this.costoAlquiler = 0;
        this.fechaAlquiler = new Date();
    }
}
