import { AgendaService } from '../porta/AgendaService.js';
import { Consulta } from '../dominio/Consulta.js';
import { Mensagem } from '../dominio/Mensagem.js';
import { RegistroUsuarios } from './RegistroUsuarios.js';

/**
 * DIP puro: os tres colaboradores chegam pelo construtor como CONTRATO.
 * Trocar memoria por Postgres, ou email por whatsapp, nao mexe numa linha daqui.
 */
export class AgendamentoServiceImpl extends AgendaService {
  #repo;
  #notificador;
  #politica;

  constructor(repo, notificador, politica) {
    super();
    this.#repo = repo;
    this.#notificador = notificador;
    this.#politica = politica;
  }

  agendar(paciente, medico, dataHora, modalidade) {
    if (!this.#politica.estaLivre(medico, dataHora)) {
      throw new Error(`Medico indisponivel em ${dataHora.toISOString()}`);
    }
    const consulta = new Consulta(paciente, medico, dataHora, modalidade);
    consulta.confirmar();
    this.#repo.salvar(consulta);
    this.#avisar(paciente, 'Consulta confirmada',
      `Sua consulta foi marcada para ${dataHora.toLocaleString('pt-BR')}.`);
    return consulta;
  }

  cancelar(id, motivo) {
    const consulta = this.#repo.buscarPorId(id);
    consulta.cancelar(motivo);
    this.#repo.salvar(consulta);
    this.#avisar(consulta.paciente, 'Consulta cancelada', `Motivo: ${motivo}`);
  }

  remarcar(id, nova) {
    const consulta = this.#repo.buscarPorId(id);
    if (!this.#politica.estaLivre(consulta.medico, nova)) {
      throw new Error(`Medico indisponivel em ${nova.toISOString()}`);
    }
    consulta.remarcar(nova);
    this.#repo.salvar(consulta);
    this.#avisar(consulta.paciente, 'Consulta remarcada',
      `Novo horario: ${nova.toLocaleString('pt-BR')}`);
  }

  #avisar(paciente, titulo, corpo) {
    const dono = RegistroUsuarios.donoDoPerfil(paciente);
    if (dono) {
      this.#notificador.notificar(dono, new Mensagem(titulo, corpo));
    }
  }
}
