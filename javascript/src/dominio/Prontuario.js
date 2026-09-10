import { randomUUID } from 'node:crypto';

// Historico clinico do paciente. Responsabilidade unica: guardar documentos.
export class Prontuario {
  #id = randomUUID();
  #documentos = [];

  anexar(documento) {
    this.#documentos.push(documento);
  }

  historico() {
    return Object.freeze([...this.#documentos]);
  }

  get id() { return this.#id; }
}
