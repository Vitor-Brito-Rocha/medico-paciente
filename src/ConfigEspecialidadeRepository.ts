import Especialidade from "./Especialidade.js";
import ConfiguracaoEspecialidade from "./ConfiguracaoEspecialidade.js";

export default interface ConfigEspecialidadeRepository {
  para(e: Especialidade): ConfiguracaoEspecialidade;
}
