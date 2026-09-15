import AgendaService from "./AgendaService.js";
import DocumentoUploadPort from "./DocumentoUploadPort.js";
import Paciente from "./Paciente.js";
import Medico from "./Medico.js";
import Consulta from "./Consulta.js";
import Usuario from "./Usuario.js";
import { UUID, DateTime } from "./Tipos.js";

/** <<controller>> ControladorAgendamento */
export default class ControladorAgendamento {
  agendarConsulta(s: Usuario, p: Paciente, m: Medico, dt: DateTime, mod: any): Consulta { return undefined as any; }
  enviarExamePrevio(s: Usuario, c: Consulta, uri: string, autor: UUID): UUID { return undefined as any; }
  cancelar(s: Usuario, id: UUID, motivo: string): void {}
}
