import AgendaService from "./AgendaService.js";
import ConsultaRepository from "./ConsultaRepository.js";
import Notificador from "./Notificador.js";
import PoliticaDisponibilidade from "./PoliticaDisponibilidade.js";
import Paciente from "./Paciente.js";
import Medico from "./Medico.js";
import Consulta from "./Consulta.js";
import { UUID, DateTime } from "./Tipos.js";

export default class AgendamentoServiceImpl implements AgendaService {
  repo: ConsultaRepository;
  notificador: Notificador;
  politica: PoliticaDisponibilidade;

  agendar(p: Paciente, m: Medico, dt: DateTime): Consulta { return undefined as any; }
  cancelar(id: UUID, motivo: string): void {}
  remarcar(id: UUID, nova: DateTime): void {}
}
