import { Notificador } from '../porta/Notificador.js';

export class NotificadorPush extends Notificador {
  #chaveFirebase;

  constructor(chaveFirebase) {
    super();
    this.#chaveFirebase = chaveFirebase;
  }

  notificar(usuario, mensagem) {
    console.log(`[push:${this.#chaveFirebase}] para ${usuario.nome} | ${mensagem.titulo}`);
  }
}
