import Modalidade from "./Modalidade.js";
import StatusConsulta from "./StatusConsulta.js";
import Documento from "./Documento.js";
import Paciente from "./Paciente.js";
import Medico from "./Medico.js";
import { UUID, DateTime } from "./Tipos.js";

export default class Consulta {
  id: UUID;
  dataHora: DateTime;
  modalidade: Modalidade;
  status: StatusConsulta;

  /** Paciente "1" --> "0..*" Consulta */
  paciente: Paciente;

  /** Medico "1" --> "0..*" Consulta */
  medico: Medico;

  /** Consulta "1" o-- "0..*" Documento */
  documentos: Documento[] = [];

  confirmar(): void {}
  cancelar(motivo: string): void {}
  remarcar(nova: DateTime): void {}
  registrarExame(uri: string, autor: UUID): Documento { return undefined as any; }
  registrarLaudo(uri: string, autor: UUID): Documento { return undefined as any; }
}
