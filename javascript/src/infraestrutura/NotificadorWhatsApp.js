import { Notificador } from '../porta/Notificador.js';

export class NotificadorWhatsApp extends Notificador {
  #numeroRemetente;

  constructor(numeroRemetente) {
    super();
    this.#numeroRemetente = numeroRemetente;
  }

  notificar(usuario, mensagem) {
    console.log(`[whatsapp de ${this.#numeroRemetente}] para ${usuario.telefone} | ${mensagem.corpo}`);
  }
}
