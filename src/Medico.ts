import Especialidade from "./Especialidade.js";
import Consulta from "./Consulta.js";

export default class Medico {
  crm: string;
  especialidade: Especialidade;

  /** Medico "1" --> "0..*" Consulta */
  consultas: Consulta[] = [];
}
