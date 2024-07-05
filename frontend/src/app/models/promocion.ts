import { Local } from "./local";

export class Promocion {
    _id!:string;
    descripcion:string;
    imagen:string;
    desde!: Date;
    hasta!: Date;
    local!: Local; 

    constructor(){
        this.imagen='';
        this.descripcion='';
        this.desde = new Date(); 
        this.hasta = new Date(); 
        this.local = new Local();

    }
}
