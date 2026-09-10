package br.unifor.facilitador.infraestrutura;

import br.unifor.facilitador.dominio.Medico;
import br.unifor.facilitador.porta.PoliticaDisponibilidade;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;

/** Politica simples: dia util dentro do expediente. */
public class AgendaPadraoMedico implements PoliticaDisponibilidade {

    private final LocalTime inicioExpediente;
    private final LocalTime fimExpediente;

    public AgendaPadraoMedico(LocalTime inicioExpediente, LocalTime fimExpediente) {
        this.inicioExpediente = inicioExpediente;
        this.fimExpediente = fimExpediente;
    }

    @Override
    public boolean estaLivre(Medico m, LocalDateTime dt) {
        DayOfWeek dia = dt.getDayOfWeek();
        boolean diaUtil = dia != DayOfWeek.SATURDAY && dia != DayOfWeek.SUNDAY;
        LocalTime hora = dt.toLocalTime();
        boolean dentroExpediente = !hora.isBefore(inicioExpediente) && hora.isBefore(fimExpediente);
        return diaUtil && dentroExpediente;
    }
}
