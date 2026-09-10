// Perfil de medico. A especialidade e um DADO, nao um subtipo.
export class Medico {
  #crm;
  #especialidade;
  #consultas = [];

  constructor(crm, especialidade) {
    this.#crm = crm;
    this.#especialidade = especialidade;
  }

  registrarConsulta(c) {
    this.#consultas.push(c);
  }

  get consultas() { return Object.freeze([...this.#consultas]); }
  get crm() { return this.#crm; }
  get especialidade() { return this.#especialidade; }
}
