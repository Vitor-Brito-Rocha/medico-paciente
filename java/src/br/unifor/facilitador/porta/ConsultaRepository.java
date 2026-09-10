package br.unifor.facilitador.porta;

import br.unifor.facilitador.dominio.Consulta;
import br.unifor.facilitador.dominio.Medico;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

/** DIP: a aplicacao fala com esta abstracao, nunca com Postgres direto. */
public interface ConsultaRepository {
    void salvar(Consulta c);
    Consulta buscarPorId(UUID id);
    List<Consulta> buscarPorMedicoNoDia(Medico m, LocalDate dia);
}
