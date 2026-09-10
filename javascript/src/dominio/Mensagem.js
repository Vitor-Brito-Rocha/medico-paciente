// Conteudo enviado ao usuario. O canal (email, push, whatsapp) nao importa aqui.
export class Mensagem {
  #titulo;
  #corpo;
  #criadaEm = new Date();

  constructor(titulo, corpo) {
    this.#titulo = titulo;
    this.#corpo = corpo;
  }

  get titulo() { return this.#titulo; }
  get corpo() { return this.#corpo; }
  get criadaEm() { return this.#criadaEm; }
}
