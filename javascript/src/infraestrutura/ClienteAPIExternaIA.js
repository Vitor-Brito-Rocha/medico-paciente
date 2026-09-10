import { ProvedorIA } from '../porta/ProvedorIA.js';

// Adaptador da API de IA. Trocar de fornecedor nao afeta o AnalisadorIA.
export class ClienteAPIExternaIA extends ProvedorIA {
  #urlBase;
  #modelo;

  constructor(urlBase, modelo) {
    super();
    this.#urlBase = urlBase;
    this.#modelo = modelo;
  }

  completar(prompt) {
    console.log(`[ia ${this.#modelo} @ ${this.#urlBase}] prompt com ${prompt.length} caracteres`);
    return 'Rascunho de conduta gerado pelo agente. Requer revisao e assinatura do medico.';
  }
}
