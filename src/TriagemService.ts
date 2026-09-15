import AnalisadorClinico from "./AnalisadorClinico.js";
import DocumentoDownloadPort from "./DocumentoDownloadPort.js";
import Consulta from "./Consulta.js";
import Sugestao from "./Sugestao.js";

export default class TriagemService {
  analisador: AnalisadorClinico;

  triar(c: Consulta): Sugestao { return undefined as any; }
}
