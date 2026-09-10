import { AnalisadorClinico } from '../porta/AnalisadorClinico.js';
import { Sugestao } from '../dominio/Sugestao.js';

/**
 * UM analisador para TODAS as especialidades.
 * O que muda entre cardiologia e dermatologia e o prompt e a lista de exames
 * esperados, e isso vem do banco como DADO. Nova especialidade = novo registro.
 */
export class AnalisadorIA extends AnalisadorClinico {
  #configs;
  #provedor;

  constructor(configs, provedor) {
    super();
    this.#configs = configs;
    this.#provedor = provedor;
  }

  analisar(consulta, documentos) {
    const cfg = this.#configs.para(consulta.medico.especialidade);

    const faltantes = cfg.docsEsperados.filter(
      (esperado) => !documentos.some((d) => d.tipo === esperado),
    );

    const prompt = this.#montarPrompt(cfg, documentos);
    const resposta = this.#provedor.completar(prompt);

    return new Sugestao(
      `Triagem de ${cfg.especialidade} com ${documentos.length} documento(s).`,
      resposta,
      faltantes,
    );
  }

  #montarPrompt(cfg, documentos) {
    const lista = documentos.map((d) => `- ${d.tipo}`).join('\n');
    return `${cfg.promptBase}\nDocumentos recebidos:\n${lista}`;
  }
}
