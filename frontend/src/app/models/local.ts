export class Local {
    _id!: string;
    superficie: number;
    habilitado: boolean;
    costomes: number;
    pathimagen: string;
    alquilado: boolean;

    constructor(){
        this.superficie = 0;
        this.habilitado = false;
        this.costomes = 0;
        this.pathimagen = "";
        this.alquilado = false;
    }
}
