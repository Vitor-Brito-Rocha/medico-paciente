import TipoDocumento from "./TipoDocumento.js";
import { UUID, DateTime } from "./Tipos.js";

export default class Documento {
  id: UUID;
  tipo: TipoDocumento;
  uri: string;
  enviadoEm: DateTime;
  autor: UUID;
}
