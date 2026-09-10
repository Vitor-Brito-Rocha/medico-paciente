import { randomUUID } from 'node:crypto';

/**
 * Identidade unica da pessoa no sistema.
 *
 * COMPOSICAO DE PAPEIS (nao heranca): a mesma pessoa pode ter perfil de
 * paciente, de medico, ou os dois. Se Paciente e Medico herdassem de Usuario,
 * um medico que precisa se consultar exigiria dois cadastros.
 *
 * Os campos usam # (private fields do JS): encapsulamento real, nao convencao.
 */
export class Usuario {
  #id;
  #nome;
  #email;
  #telefone;
  #senhaHash;
  #perfilPaciente = null;
  #perfilMedico = null;

  constructor(nome, email, telefone, senhaHash) {
    this.#id = randomUUID();
    this.#nome = nome;
    this.#email = email;
    this.#telefone = telefone;
    this.#senhaHash = senhaHash;
  }

  atribuirPerfilPaciente(p) {
    this.#perfilPaciente = p;
  }

  atribuirPerfilMedico(m) {
    this.#perfilMedico = m;
  }

  get perfilPaciente() { return this.#perfilPaciente; }
  get perfilMedico() { return this.#perfilMedico; }
  get id() { return this.#id; }
  get nome() { return this.#nome; }
  get email() { return this.#email; }
  get telefone() { return this.#telefone; }
  get senhaHash() { return this.#senhaHash; }

  toString() {
    return `${this.#nome} <${this.#email}>`;
  }
}
