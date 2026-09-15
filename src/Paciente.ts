import Documento from "./Documento.js";
import Consulta from "./Consulta.js";
import Prontuario from "./Prontuario.js";

export default class Paciente {
  cpf: string;
  dataNascimento: Date;

  /** Paciente "1" --> "0..*" Consulta */
  consultas: Consulta[] = [];

  /** Paciente "1" *-- "1" Prontuario */
  prontuario: Prontuario;

  arquivar(d: Documento): void {}
  historicoClinico(): Documento[] { return undefined as any; }
}
