import { randomUUID } from 'node:crypto';

// Exame previo, laudo, receita ou atestado trafegado entre paciente e medico.
export class Documento {
  #id = randomUUID();
  #tipo;
  #uri;
  #enviadoEm = new Date();
  #autor;

  constructor(tipo, uri, autor) {
    this.#tipo = tipo;
    this.#uri = uri;
    this.#autor = autor;
  }

  get id() { return this.#id; }
  get tipo() { return this.#tipo; }
  get uri() { return this.#uri; }
  get enviadoEm() { return this.#enviadoEm; }
  get autor() { return this.#autor; }

  toString() {
    return `${this.#tipo} (${this.#uri})`;
  }
}
