import { PoliticaDisponibilidade } from '../porta/PoliticaDisponibilidade.js';

// Politica simples: dia util dentro do expediente.
export class AgendaPadraoMedico extends PoliticaDisponibilidade {
  #horaInicio;
  #horaFim;

  constructor(horaInicio, horaFim) {
    super();
    this.#horaInicio = horaInicio;
    this.#horaFim = horaFim;
  }

  estaLivre(medico, dataHora) {
    const diaSemana = dataHora.getDay();
    const diaUtil = diaSemana !== 0 && diaSemana !== 6;
    const hora = dataHora.getHours();
    const dentroExpediente = hora >= this.#horaInicio && hora < this.#horaFim;
    return diaUtil && dentroExpediente;
  }
}
