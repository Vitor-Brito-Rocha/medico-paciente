import ConsultaRepository from "./ConsultaRepository.js";
import Consulta from "./Consulta.js";
import Medico from "./Medico.js";
import { UUID, DataSource } from "./Tipos.js";

export default class ConsultaRepositoryPostgres implements ConsultaRepository {
  conexao: DataSource;

  salvar(c: Consulta): void {}
  buscarPorId(id: UUID): Consulta { return undefined as any; }
  buscarPorMedicoNoDia(m: Medico, dia: Date): Consulta[] { return undefined as any; }
}
