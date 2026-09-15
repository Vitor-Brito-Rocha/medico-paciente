import Consulta from "./Consulta.js";
import Medico from "./Medico.js";
import { UUID } from "./Tipos.js";

export default interface ConsultaRepository {
  salvar(c: Consulta): void;
  buscarPorId(id: UUID): Consulta;
  buscarPorMedicoNoDia(m: Medico, dia: Date): Consulta[];
}
