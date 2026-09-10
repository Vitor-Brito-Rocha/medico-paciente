package br.unifor.facilitador.aplicacao;

import br.unifor.facilitador.dominio.*;
import br.unifor.facilitador.porta.*;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DIP puro: os tres colaboradores chegam pelo construtor como INTERFACE.
 * Trocar Postgres por memoria, ou email por whatsapp, nao mexe numa linha daqui.
 */
public class AgendamentoServiceImpl implements AgendaService {

    private final ConsultaRepository repo;
    private final Notificador notificador;
    private final PoliticaDisponibilidade politica;

    public AgendamentoServiceImpl(ConsultaRepository repo, Notificador notificador,
                                  PoliticaDisponibilidade politica) {
        this.repo = repo;
        this.notificador = notificador;
        this.politica = politica;
    }

    @Override
    public Consulta agendar(Paciente p, Medico m, LocalDateTime dt, Modalidade modalidade) {
        if (!politica.estaLivre(m, dt)) {
            throw new IllegalArgumentException("Medico indisponivel em " + dt);
        }
        Consulta c = new Consulta(p, m, dt, modalidade);
        c.confirmar();
        repo.salvar(c);
        avisar(p, "Consulta confirmada", "Sua consulta foi marcada para " + dt + ".");
        return c;
    }

    @Override
    public void cancelar(UUID id, String motivo) {
        Consulta c = repo.buscarPorId(id);
        c.cancelar(motivo);
        repo.salvar(c);
        avisar(c.getPaciente(), "Consulta cancelada", "Motivo: " + motivo);
    }

    @Override
    public void remarcar(UUID id, LocalDateTime nova) {
        Consulta c = repo.buscarPorId(id);
        if (!politica.estaLivre(c.getMedico(), nova)) {
            throw new IllegalArgumentException("Medico indisponivel em " + nova);
        }
        c.remarcar(nova);
        repo.salvar(c);
        avisar(c.getPaciente(), "Consulta remarcada", "Novo horario: " + nova);
    }

    private void avisar(Paciente p, String titulo, String corpo) {
        Usuario dono = RegistroUsuarios.donoDoPerfil(p);
        if (dono != null) {
            notificador.notificar(dono, new Mensagem(titulo, corpo));
        }
    }
}
