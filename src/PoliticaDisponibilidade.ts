import Medico from "./Medico.js";
import { DateTime } from "./Tipos.js";

export default interface PoliticaDisponibilidade {
  estaLivre(m: Medico, dt: DateTime): boolean;
}
