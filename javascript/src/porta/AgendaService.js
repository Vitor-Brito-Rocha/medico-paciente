import { naoImplementado } from './_contrato.js';

// Ciclo de vida do agendamento. Os tres metodos giram em torno do mesmo objeto.
export class AgendaService {
  agendar(paciente, medico, dataHora, modalidade) {
    naoImplementado(this.constructor.name, 'agendar');
  }
  cancelar(id, motivo) {
    naoImplementado(this.constructor.name, 'cancelar');
  }
  remarcar(id, nova) {
    naoImplementado(this.constructor.name, 'remarcar');
  }
}
