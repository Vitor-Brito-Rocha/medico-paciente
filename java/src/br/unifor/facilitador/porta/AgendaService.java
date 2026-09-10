package br.unifor.facilitador.porta;

import br.unifor.facilitador.dominio.*;
import java.time.LocalDateTime;
import java.util.UUID;

/** Ciclo de vida do agendamento. Os tres metodos giram em torno do mesmo objeto. */
public interface AgendaService {
    Consulta agendar(Paciente p, Medico m, LocalDateTime dt, Modalidade modalidade);
    void cancelar(UUID id, String motivo);
    void remarcar(UUID id, LocalDateTime nova);
}
