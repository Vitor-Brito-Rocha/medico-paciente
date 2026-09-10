// Sessao autenticada. Da uso concreto ao email e a senha do Usuario.
export class Sessao {
  #token;
  #usuarioId;
  #expiraEm;

  constructor(token, usuarioId, expiraEm) {
    this.#token = token;
    this.#usuarioId = usuarioId;
    this.#expiraEm = expiraEm;
  }

  estaValida() {
    return new Date() < this.#expiraEm;
  }

  get token() { return this.#token; }
  get usuarioId() { return this.#usuarioId; }
  get expiraEm() { return this.#expiraEm; }
}
