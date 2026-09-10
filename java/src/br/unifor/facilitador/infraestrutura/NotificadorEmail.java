package br.unifor.facilitador.infraestrutura;

import br.unifor.facilitador.dominio.Mensagem;
import br.unifor.facilitador.dominio.Usuario;
import br.unifor.facilitador.porta.Notificador;

public class NotificadorEmail implements Notificador {

    private final String servidorSmtp;

    public NotificadorEmail(String servidorSmtp) {
        this.servidorSmtp = servidorSmtp;
    }

    @Override
    public void notificar(Usuario u, Mensagem msg) {
        System.out.println("[email via " + servidorSmtp + "] para " + u.getEmail()
                + " | " + msg.getTitulo() + ": " + msg.getCorpo());
    }
}
