import { ConsultaRepository } from '../porta/ConsultaRepository.js';

/**
 * LSP: substitui a versao Postgres sem quebrar nada. E por isso que da pra rodar
 * o sistema inteiro em teste, sem banco.
 */
export class ConsultaRepositoryMemoria extends ConsultaRepository {
  #consultas = [];

  salvar(consulta) {
    if (!this.#consultas.includes(consulta)) {
      this.#consultas.push(consulta);
    }
  }

  buscarPorId(id) {
    const achada = this.#consultas.find((c) => c.id === id);
    if (!achada) {
      throw new Error(`Consulta nao encontrada: ${id}`);
    }
    return achada;
  }

  buscarPorMedicoNoDia(medico, dia) {
    return this.#consultas.filter(
      (c) => c.medico === medico && c.dataHora.toDateString() === dia.toDateString(),
    );
  }
}
