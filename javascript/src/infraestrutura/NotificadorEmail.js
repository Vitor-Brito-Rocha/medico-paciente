import { Notificador } from '../porta/Notificador.js';

export class NotificadorEmail extends Notificador {
  #servidorSmtp;

  constructor(servidorSmtp) {
    super();
    this.#servidorSmtp = servidorSmtp;
  }

  notificar(usuario, mensagem) {
    console.log(`[email via ${this.#servidorSmtp}] para ${usuario.email} | ${mensagem.titulo}: ${mensagem.corpo}`);
  }
}
