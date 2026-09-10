import { ConsultaRepository } from '../porta/ConsultaRepository.js';

// Adaptador de persistencia real. SQL fica confinado aqui dentro.
export class ConsultaRepositoryPostgres extends ConsultaRepository {
  #urlConexao;

  constructor(urlConexao) {
    super();
    this.#urlConexao = urlConexao;
  }

  salvar(consulta) {
    console.log(`[postgres] UPSERT consulta ${consulta.id} em ${this.#urlConexao}`);
  }

  buscarPorId(id) {
    console.log(`[postgres] SELECT consulta ${id}`);
    throw new Error('Requer driver pg configurado.');
  }

  buscarPorMedicoNoDia(medico, dia) {
    console.log(`[postgres] SELECT agenda do CRM ${medico.crm} em ${dia.toDateString()}`);
    return [];
  }
}
