import Consulta from "./Consulta.js";
import Documento from "./Documento.js";
import Sugestao from "./Sugestao.js";

export default interface AnalisadorClinico {
  analisar(c: Consulta, docs: Documento[]): Sugestao;
}
