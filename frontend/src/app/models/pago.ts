import { Local } from "./local";

export class Pago {
    _id!: string;
    mes!: Date;

    local!: Local;

    constructor(){
        this.mes = new Date(); 
        this.local = new Local();
    }
}
