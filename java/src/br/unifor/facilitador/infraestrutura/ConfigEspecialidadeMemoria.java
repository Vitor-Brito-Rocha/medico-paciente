package br.unifor.facilitador.infraestrutura;

import br.unifor.facilitador.dominio.ConfiguracaoEspecialidade;
import br.unifor.facilitador.dominio.Especialidade;
import br.unifor.facilitador.dominio.TipoDocumento;
import br.unifor.facilitador.porta.ConfigEspecialidadeRepository;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

/**
 * Aqui fica visivel o ganho da refatoracao: cada especialidade e uma ENTRADA,
 * nao uma classe. Em producao isso vira linha de tabela no Postgres.
 */
public class ConfigEspecialidadeMemoria implements ConfigEspecialidadeRepository {

    private final Map<Especialidade, ConfiguracaoEspecialidade> tabela =
            new EnumMap<>(Especialidade.class);

    public ConfigEspecialidadeMemoria() {
        tabela.put(Especialidade.CARDIOLOGIA, new ConfiguracaoEspecialidade(
                Especialidade.CARDIOLOGIA,
                "Voce assiste um cardiologista. Resuma risco cardiovascular.",
                List.of(TipoDocumento.EXAME_PREVIO, TipoDocumento.LAUDO)));

        tabela.put(Especialidade.DERMATOLOGIA, new ConfiguracaoEspecialidade(
                Especialidade.DERMATOLOGIA,
                "Voce assiste um dermatologista. Descreva a lesao relatada.",
                List.of(TipoDocumento.EXAME_PREVIO)));
    }

    @Override
    public ConfiguracaoEspecialidade para(Especialidade e) {
        ConfiguracaoEspecialidade cfg = tabela.get(e);
        if (cfg == null) {
            throw new IllegalArgumentException("Especialidade sem configuracao: " + e);
        }
        return cfg;
    }
}
