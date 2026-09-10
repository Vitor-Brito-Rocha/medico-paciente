package br.unifor.facilitador.porta;

import br.unifor.facilitador.dominio.Consulta;
import br.unifor.facilitador.dominio.Documento;
import br.unifor.facilitador.dominio.Sugestao;
import java.util.List;

/** Evolucao futura do sistema: triagem assistida por IA. */
public interface AnalisadorClinico {
    Sugestao analisar(Consulta c, List<Documento> docs);
}
