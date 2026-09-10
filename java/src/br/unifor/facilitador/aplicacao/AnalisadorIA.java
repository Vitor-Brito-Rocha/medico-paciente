package br.unifor.facilitador.aplicacao;

import br.unifor.facilitador.dominio.*;
import br.unifor.facilitador.porta.*;
import java.util.ArrayList;
import java.util.List;

/**
 * UM analisador para TODAS as especialidades.
 * O que muda entre cardiologia e dermatologia e o prompt e a lista de exames
 * esperados, e isso vem do banco como DADO. Nova especialidade = novo registro.
 */
public class AnalisadorIA implements AnalisadorClinico {

    private final ConfigEspecialidadeRepository configs;
    private final ProvedorIA provedor;

    public AnalisadorIA(ConfigEspecialidadeRepository configs, ProvedorIA provedor) {
        this.configs = configs;
        this.provedor = provedor;
    }

    @Override
    public Sugestao analisar(Consulta c, List<Documento> docs) {
        ConfiguracaoEspecialidade cfg = configs.para(c.getMedico().getEspecialidade());

        List<TipoDocumento> faltantes = new ArrayList<>();
        for (TipoDocumento esperado : cfg.getDocsEsperados()) {
            boolean achou = docs.stream().anyMatch(d -> d.getTipo() == esperado);
            if (!achou) {
                faltantes.add(esperado);
            }
        }

        String prompt = montarPrompt(cfg, docs);
        String resposta = provedor.completar(prompt);

        return new Sugestao(
                "Triagem de " + cfg.getEspecialidade() + " com " + docs.size() + " documento(s).",
                resposta,
                faltantes);
    }

    private String montarPrompt(ConfiguracaoEspecialidade cfg, List<Documento> docs) {
        StringBuilder sb = new StringBuilder(cfg.getPromptBase());
        sb.append("\nDocumentos recebidos:");
        for (Documento d : docs) {
            sb.append("\n- ").append(d.getTipo());
        }
        return sb.toString();
    }
}
