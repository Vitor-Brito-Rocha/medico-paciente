import { UUID, DateTime } from "./Tipos.js";

export default class Sessao {
  token: string;
  usuarioId: UUID;
  expiraEm: DateTime;
}
