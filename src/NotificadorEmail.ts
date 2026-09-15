import Notificador from "./Notificador.js";
import Usuario from "./Usuario.js";
import Mensagem from "./Mensagem.js";

export default class NotificadorEmail implements Notificador {
  servidorSmtp: string;

  notificar(u: Usuario, msg: Mensagem): void {}
}
