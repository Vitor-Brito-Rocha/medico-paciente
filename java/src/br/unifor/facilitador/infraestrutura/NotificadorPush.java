package br.unifor.facilitador.infraestrutura;

import br.unifor.facilitador.dominio.Mensagem;
import br.unifor.facilitador.dominio.Usuario;
import br.unifor.facilitador.porta.Notificador;

public class NotificadorPush implements Notificador {

    private final String chaveFirebase;

    public NotificadorPush(String chaveFirebase) {
        this.chaveFirebase = chaveFirebase;
    }

    @Override
    public void notificar(Usuario u, Mensagem msg) {
        System.out.println("[push:" + chaveFirebase + "] para " + u.getNome()
                + " | " + msg.getTitulo());
    }
}
