import Documento from "./Documento.js";
import { UUID } from "./Tipos.js";

export default class Prontuario {
  id: UUID;

  /** Prontuario "1" o-- "0..*" Documento */
  documentos: Documento[] = [];

  anexar(d: Documento): void {}
  historico(): Documento[] { return undefined as any; }
}
