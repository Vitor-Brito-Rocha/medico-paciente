package br.unifor.facilitador.porta;

import br.unifor.facilitador.dominio.Mensagem;
import br.unifor.facilitador.dominio.Usuario;

/** OCP: novo canal de notificacao = nova implementacao, zero alteracao no servico. */
public interface Notificador {
    void notificar(Usuario u, Mensagem msg);
}
