// Orquestra a triagem. Depende do contrato, entao aceita qualquer analisador.
export class TriagemService {
  #analisador;

  constructor(analisador) {
    this.#analisador = analisador;
  }

  triar(consulta) {
    return this.#analisador.analisar(consulta, consulta.anexos);
  }
}
