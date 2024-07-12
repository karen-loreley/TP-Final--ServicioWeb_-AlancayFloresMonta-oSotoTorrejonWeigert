import { Local } from "./local";
import { Novedades } from "./novedades";
import { Propietario } from "./propietario";

export class Alquiler {

    _id!: string;
    propietario: Propietario | null = null;
    local: Local;
    //novedades: Novedades
    plazomes: number;
    costoAlquiler: number;
    fechaAlquiler: Date;

    constructor()
    {
        this.propietario = new Propietario();
        this.local = new Local();
        //this.novedades = new Novedades();
        this.plazomes = 0;
        this.costoAlquiler = 0;
        this.fechaAlquiler = new Date();
    }
}
