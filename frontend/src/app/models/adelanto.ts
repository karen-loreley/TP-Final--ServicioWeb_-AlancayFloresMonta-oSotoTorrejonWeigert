import { Pago } from "./pago";

export class Adelanto {
    _id!: string;
    
    monto!: number;
    pago!: Pago;
    constructor(){
        
        this.pago = new Pago();
        this.monto = 0;

    }
}
