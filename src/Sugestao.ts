import TipoDocumento from "./TipoDocumento.js";
import { DateTime } from "./Tipos.js";

export default class Sugestao {
  resumoClinico: string;
  rascunhoConduta: string;
  examesFaltantes: TipoDocumento[];
  geradaEm: DateTime;
}
