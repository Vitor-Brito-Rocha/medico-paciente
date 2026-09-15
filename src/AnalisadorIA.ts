import AnalisadorClinico from "./AnalisadorClinico.js";
import Consulta from "./Consulta.js";
import Documento from "./Documento.js";
import Sugestao from "./Sugestao.js";
import ConfigEspecialidadeRepository from "./ConfigEspecialidadeRepository.js";
import ProvedorIA from "./ProvedorIA.js";

/** <<futuro>> */
export default class AnalisadorIA implements AnalisadorClinico {
  config: ConfigEspecialidadeRepository;

  analisar(c: Consulta, docs: Documento[]): Sugestao { return undefined as any; }
}
