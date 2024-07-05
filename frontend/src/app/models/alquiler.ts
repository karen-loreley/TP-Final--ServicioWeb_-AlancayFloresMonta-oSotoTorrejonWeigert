import { Local } from "./local";
import { Propietario } from "./propietario";

export interface Alquiler {
  propietario: Propietario; // ObjectId
  local: Local;       // ObjectId
  plazomes: number;
  costoAlquiler: number;
  fechaAlquiler: Date;
}
