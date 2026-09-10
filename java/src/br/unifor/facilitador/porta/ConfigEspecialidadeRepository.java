package br.unifor.facilitador.porta;

import br.unifor.facilitador.dominio.ConfiguracaoEspecialidade;
import br.unifor.facilitador.dominio.Especialidade;

public interface ConfigEspecialidadeRepository {
    ConfiguracaoEspecialidade para(Especialidade e);
}
