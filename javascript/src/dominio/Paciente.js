import { Prontuario } from './Prontuario.js';

// Perfil de paciente. Nasce sempre acoplado a um Prontuario (composicao 1..1).
export class Paciente {
  #cpf;
  #dataNascimento;
  #prontuario = new Prontuario();
  #consultas = [];

  constructor(cpf, dataNascimento) {
    this.#cpf = cpf;
    this.#dataNascimento = dataNascimento;
  }

  registrarConsulta(c) {
    this.#consultas.push(c);
  }

  get consultas() { return Object.freeze([...this.#consultas]); }
  get cpf() { return this.#cpf; }
  get dataNascimento() { return this.#dataNascimento; }
  get prontuario() { return this.#prontuario; }
}
