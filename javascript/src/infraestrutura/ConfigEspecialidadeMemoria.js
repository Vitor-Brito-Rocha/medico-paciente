import { ConfigEspecialidadeRepository } from '../porta/ConfigEspecialidadeRepository.js';
import { ConfiguracaoEspecialidade } from '../dominio/ConfiguracaoEspecialidade.js';
import { Especialidade } from '../dominio/Especialidade.js';
import { TipoDocumento } from '../dominio/TipoDocumento.js';

/**
 * Aqui fica visivel o ganho da refatoracao: cada especialidade e uma ENTRADA,
 * nao uma classe. Em producao isso vira linha de tabela no banco.
 */
export class ConfigEspecialidadeMemoria extends ConfigEspecialidadeRepository {
  #tabela = new Map([
    [Especialidade.CARDIOLOGIA, new ConfiguracaoEspecialidade(
      Especialidade.CARDIOLOGIA,
      'Voce assiste um cardiologista. Resuma risco cardiovascular.',
      [TipoDocumento.EXAME_PREVIO, TipoDocumento.LAUDO],
    )],
    [Especialidade.DERMATOLOGIA, new ConfiguracaoEspecialidade(
      Especialidade.DERMATOLOGIA,
      'Voce assiste um dermatologista. Descreva a lesao relatada.',
      [TipoDocumento.EXAME_PREVIO],
    )],
  ]);

  para(especialidade) {
    const cfg = this.#tabela.get(especialidade);
    if (!cfg) {
      throw new Error(`Especialidade sem configuracao: ${especialidade}`);
    }
    return cfg;
  }
}
