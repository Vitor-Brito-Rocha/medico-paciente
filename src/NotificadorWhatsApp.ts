import Notificador from "./Notificador.js";
import Usuario from "./Usuario.js";
import Mensagem from "./Mensagem.js";

export default class NotificadorWhatsApp implements Notificador {
  numeroRemetente: string;

  notificar(u: Usuario, msg: Mensagem): void {}
}
