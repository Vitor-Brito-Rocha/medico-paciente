import PoliticaDisponibilidade from "./PoliticaDisponibilidade.js";
import Medico from "./Medico.js";
import { DateTime, Time } from "./Tipos.js";

export default class AgendaPadraoMedico implements PoliticaDisponibilidade {
  inicioExpediente: Time;
  fimExpediente: Time;

  estaLivre(m: Medico, dt: DateTime): boolean { return undefined as any; }
}
