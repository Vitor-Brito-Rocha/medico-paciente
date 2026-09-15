import Especialidade from "./Especialidade.js";
import TipoDocumento from "./TipoDocumento.js";
import Documento from "./Documento.js";

export default class ConfiguracaoEspecialidade {
  especialidade: Especialidade;
  promptBase: string;
  docsEsperados: TipoDocumento[];

  examesFaltantes(docs: Documento[]): TipoDocumento[] { return undefined as any; }
}
