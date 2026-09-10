import { randomUUID } from 'node:crypto';
import { StatusConsulta } from './StatusConsulta.js';

/**
 * SRP: esta classe so cuida do estado de uma consulta e das regras que dependem
 * apenas dele. Nao salva em banco, nao notifica ninguem, nao chama IA.
 */
export class Consulta {
  #id = randomUUID();
  #paciente;
  #medico;
  #dataHora;
  #modalidade;
  #status = StatusConsulta.SOLICITADA;
  #motivoCancelamento = null;
  #anexos = [];

  constructor(paciente, medico, dataHora, modalidade) {
    this.#paciente = paciente;
    this.#medico = medico;
    this.#dataHora = dataHora;
    this.#modalidade = modalidade;
    paciente.registrarConsulta(this);
    medico.registrarConsulta(this);
  }

  confirmar() {
    if (this.#status !== StatusConsulta.SOLICITADA) {
      throw new Error(`Nao e possivel confirmar uma consulta ${this.#status}`);
    }
    this.#status = StatusConsulta.CONFIRMADA;
  }

  cancelar(motivo) {
    if (this.#status === StatusConsulta.REALIZADA) {
      throw new Error('Consulta ja realizada nao pode ser cancelada.');
    }
    this.#status = StatusConsulta.CANCELADA;
    this.#motivoCancelamento = motivo;
  }

  remarcar(nova) {
    if (this.#status === StatusConsulta.CANCELADA || this.#status === StatusConsulta.REALIZADA) {
      throw new Error('So consulta ativa pode ser remarcada.');
    }
    this.#dataHora = nova;
    this.#status = StatusConsulta.SOLICITADA;
  }

  anexar(documento) {
    this.#anexos.push(documento);
    this.#paciente.prontuario.anexar(documento);
  }

  get anexos() { return Object.freeze([...this.#anexos]); }
  get id() { return this.#id; }
  get paciente() { return this.#paciente; }
  get medico() { return this.#medico; }
  get dataHora() { return this.#dataHora; }
  get modalidade() { return this.#modalidade; }
  get status() { return this.#status; }
  get motivoCancelamento() { return this.#motivoCancelamento; }

  toString() {
    return `Consulta[${this.#dataHora.toISOString()}, ${this.#modalidade}, ${this.#status}]`;
  }
}
