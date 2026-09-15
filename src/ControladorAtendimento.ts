import ConsultaRepository from "./ConsultaRepository.js";
import DocumentoDownloadPort from "./DocumentoDownloadPort.js";
import DocumentoUploadPort from "./DocumentoUploadPort.js";
import TriagemService from "./TriagemService.js";
import Medico from "./Medico.js";
import Consulta from "./Consulta.js";
import Documento from "./Documento.js";
import Sugestao from "./Sugestao.js";
import Usuario from "./Usuario.js";
import { UUID } from "./Tipos.js";

/** <<controller>> ControladorAtendimento */
export default class ControladorAtendimento {
  verAgenda(s: Usuario, m: Medico, dia: Date): Consulta[] { return undefined as any; }
  lerExame(s: Usuario, docId: UUID): Documento { return undefined as any; }
  solicitarTriagem(s: Usuario, c: Consulta): Sugestao { return undefined as any; }
  emitirLaudo(s: Usuario, c: Consulta, uri: string, autor: UUID): Documento { return undefined as any; }
}
