import Usuario from "./Usuario.js";
import Mensagem from "./Mensagem.js";

export default interface Notificador {
  notificar(u: Usuario, msg: Mensagem): void;
}
