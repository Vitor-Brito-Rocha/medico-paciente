package br.unifor.facilitador.dominio;

import java.util.List;

/**
 * OCP na pratica: adicionar uma especialidade ao motor de IA e criar um registro
 * deste tipo, nao uma classe nova.
 */
public class ConfiguracaoEspecialidade {

    private final Especialidade especialidade;
    private final String promptBase;
    private final List<TipoDocumento> docsEsperados;

    public ConfiguracaoEspecialidade(Especialidade especialidade, String promptBase,
                                     List<TipoDocumento> docsEsperados) {
        this.especialidade = especialidade;
        this.promptBase = promptBase;
        this.docsEsperados = docsEsperados;
    }

    public Especialidade getEspecialidade() { return especialidade; }
    public String getPromptBase() { return promptBase; }
    public List<TipoDocumento> getDocsEsperados() { return docsEsperados; }
}
