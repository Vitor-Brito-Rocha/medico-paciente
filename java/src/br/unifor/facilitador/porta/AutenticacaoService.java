package br.unifor.facilitador.porta;

import br.unifor.facilitador.dominio.Sessao;

public interface AutenticacaoService {
    Sessao login(String email, String senha);
    void logout(Sessao s);
}
