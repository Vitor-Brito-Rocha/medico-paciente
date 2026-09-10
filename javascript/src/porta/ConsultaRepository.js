import { naoImplementado } from './_contrato.js';

// DIP: a aplicacao fala com esta abstracao, nunca com Postgres direto.
export class ConsultaRepository {
  salvar(consulta) {
    naoImplementado(this.constructor.name, 'salvar');
  }
  buscarPorId(id) {
    naoImplementado(this.constructor.name, 'buscarPorId');
  }
  buscarPorMedicoNoDia(medico, dia) {
    naoImplementado(this.constructor.name, 'buscarPorMedicoNoDia');
  }
}
