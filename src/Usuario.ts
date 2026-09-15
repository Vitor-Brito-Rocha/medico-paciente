import Paciente from "./Paciente.js";
import Medico from "./Medico.js";
import { UUID } from "./Tipos.js";

export default class Usuario {
  id: UUID;
  nome: string;
  email: string;
  telefone: string;
  senhaHash: string;

  /** Usuario "1" *-- "0..1" Paciente */
  paciente?: Paciente;

  /** Usuario "1" *-- "0..1" Medico */
  medico?: Medico;
}
