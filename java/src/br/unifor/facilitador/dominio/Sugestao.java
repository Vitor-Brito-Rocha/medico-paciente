package br.unifor.facilitador.dominio;

import java.time.LocalDateTime;
import java.util.List;

/** Saida da triagem por IA. E rascunho: quem decide e assina continua sendo o medico. */
public class Sugestao {

    private final String resumoClinico;
    private final String rascunhoConduta;
    private final List<TipoDocumento> examesFaltantes;
    private final LocalDateTime geradaEm = LocalDateTime.now();

    public Sugestao(String resumoClinico, String rascunhoConduta, List<TipoDocumento> examesFaltantes) {
        this.resumoClinico = resumoClinico;
        this.rascunhoConduta = rascunhoConduta;
        this.examesFaltantes = examesFaltantes;
    }

    public String getResumoClinico() { return resumoClinico; }
    public String getRascunhoConduta() { return rascunhoConduta; }
    public List<TipoDocumento> getExamesFaltantes() { return examesFaltantes; }
    public LocalDateTime getGeradaEm() { return geradaEm; }
}
