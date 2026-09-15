import ConsultaRepository from "./ConsultaRepository.js";
import Consulta from "./Consulta.js";
import Medico from "./Medico.js";
import { UUID } from "./Tipos.js";

export default class ConsultaRepositoryMemoria implements ConsultaRepository {
  consultas: Consulta[] = [];

  salvar(c: Consulta): void {}
  buscarPorId(id: UUID): Consulta { return undefined as any; }
  buscarPorMedicoNoDia(m: Medico, dia: Date): Consulta[] { return undefined as any; }
}
