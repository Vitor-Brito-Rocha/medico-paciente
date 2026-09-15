import Notificador from "./Notificador.js";
import Usuario from "./Usuario.js";
import Mensagem from "./Mensagem.js";

export default class NotificadorPush implements Notificador {
  chaveFirebase: string;

  notificar(u: Usuario, msg: Mensagem): void {}
}
