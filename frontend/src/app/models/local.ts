import { Propietario } from "./propietario";

export class Local {
    
    _id!: string;
    propietario: Propietario;
    nombre!: string;
    superficie: number;
    habilitado: boolean;
    costomes: number;
    pathimagen: string;
    alquilado: boolean;

    constructor(){
        this.propietario = new Propietario();
        this.nombre = "";
        this.superficie = 0;
        this.habilitado = false;
        this.costomes = 0;
        this.pathimagen = "";
        this.alquilado = false;
    }
}
