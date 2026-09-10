package br.unifor.facilitador.porta;

import br.unifor.facilitador.dominio.Medico;
import java.time.LocalDateTime;

/** Regra de horario isolada: muda a politica sem tocar no servico de agendamento. */
public interface PoliticaDisponibilidade {
    boolean estaLivre(Medico m, LocalDateTime dt);
}
