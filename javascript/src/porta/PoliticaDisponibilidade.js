import { naoImplementado } from './_contrato.js';

// Regra de horario isolada: muda a politica sem tocar no servico de agendamento.
export class PoliticaDisponibilidade {
  estaLivre(medico, dataHora) {
    naoImplementado(this.constructor.name, 'estaLivre');
  }
}
