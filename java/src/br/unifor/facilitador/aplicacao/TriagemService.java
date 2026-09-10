package br.unifor.facilitador.aplicacao;

import br.unifor.facilitador.dominio.Consulta;
import br.unifor.facilitador.dominio.Sugestao;
import br.unifor.facilitador.porta.AnalisadorClinico;

/** Orquestra a triagem. Depende da interface, entao aceita qualquer analisador. */
public class TriagemService {

    private final AnalisadorClinico analisador;

    public TriagemService(AnalisadorClinico analisador) {
        this.analisador = analisador;
    }

    public Sugestao triar(Consulta c) {
        return analisador.analisar(c, c.getAnexos());
    }
}
