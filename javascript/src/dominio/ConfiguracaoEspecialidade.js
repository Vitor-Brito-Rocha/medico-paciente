/**
 * OCP na pratica: adicionar uma especialidade ao motor de IA e criar um registro
 * deste tipo, nao uma classe nova.
 */
export class ConfiguracaoEspecialidade {
  #especialidade;
  #promptBase;
  #docsEsperados;

  constructor(especialidade, promptBase, docsEsperados) {
    this.#especialidade = especialidade;
    this.#promptBase = promptBase;
    this.#docsEsperados = docsEsperados;
  }

  get especialidade() { return this.#especialidade; }
  get promptBase() { return this.#promptBase; }
  get docsEsperados() { return this.#docsEsperados; }
}
