package br.unifor.facilitador.infraestrutura;

import br.unifor.facilitador.dominio.Mensagem;
import br.unifor.facilitador.dominio.Usuario;
import br.unifor.facilitador.porta.Notificador;

public class NotificadorWhatsApp implements Notificador {

    private final String numeroRemetente;

    public NotificadorWhatsApp(String numeroRemetente) {
        this.numeroRemetente = numeroRemetente;
    }

    @Override
    public void notificar(Usuario u, Mensagem msg) {
        System.out.println("[whatsapp de " + numeroRemetente + "] para " + u.getTelefone()
                + " | " + msg.getCorpo());
    }
}
