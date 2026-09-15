import ConfigEspecialidadeRepository from "./ConfigEspecialidadeRepository.js";
import Especialidade from "./Especialidade.js";
import ConfiguracaoEspecialidade from "./ConfiguracaoEspecialidade.js";
import { DataSource } from "./Tipos.js";

export default class ConfigEspecialidadePostgres implements ConfigEspecialidadeRepository {
  conexao: DataSource;

  para(e: Especialidade): ConfiguracaoEspecialidade { return undefined as any; }
}
