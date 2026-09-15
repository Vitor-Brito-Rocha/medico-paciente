import Paciente from "./Paciente.js";
import Medico from "./Medico.js";
import Consulta from "./Consulta.js";
import { UUID, DateTime } from "./Tipos.js";

export default interface AgendaService {
  agendar(p: Paciente, m: Medico, dt: DateTime): Consulta;
  cancelar(id: UUID, motivo: string): void;
  remarcar(id: UUID, nova: DateTime): void;
}
