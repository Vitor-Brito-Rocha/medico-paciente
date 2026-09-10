package br.unifor.facilitador.dominio;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

/**
 * SRP: esta classe so cuida do estado de uma consulta e das regras que dependem
 * apenas dele. Nao salva em banco, nao notifica ninguem, nao chama IA.
 */
public class Consulta {

    private final UUID id = UUID.randomUUID();
    private final Paciente paciente;
    private final Medico medico;
    private LocalDateTime dataHora;
    private Modalidade modalidade;
    private StatusConsulta status = StatusConsulta.SOLICITADA;
    private String motivoCancelamento;
    private final List<Documento> anexos = new ArrayList<>();

    public Consulta(Paciente paciente, Medico medico, LocalDateTime dataHora, Modalidade modalidade) {
        this.paciente = paciente;
        this.medico = medico;
        this.dataHora = dataHora;
        this.modalidade = modalidade;
        paciente.registrarConsulta(this);
        medico.registrarConsulta(this);
    }

    public void confirmar() {
        exigirStatus(StatusConsulta.SOLICITADA, "confirmar");
        this.status = StatusConsulta.CONFIRMADA;
    }

    public void cancelar(String motivo) {
        if (status == StatusConsulta.REALIZADA) {
            throw new IllegalStateException("Consulta ja realizada nao pode ser cancelada.");
        }
        this.status = StatusConsulta.CANCELADA;
        this.motivoCancelamento = motivo;
    }

    public void remarcar(LocalDateTime nova) {
        if (status == StatusConsulta.CANCELADA || status == StatusConsulta.REALIZADA) {
            throw new IllegalStateException("So consulta ativa pode ser remarcada.");
        }
        this.dataHora = nova;
        this.status = StatusConsulta.SOLICITADA;
    }

    public void anexar(Documento d) {
        anexos.add(d);
        paciente.getProntuario().anexar(d);
    }

    public List<Documento> getAnexos() {
        return Collections.unmodifiableList(anexos);
    }

    private void exigirStatus(StatusConsulta esperado, String acao) {
        if (this.status != esperado) {
            throw new IllegalStateException("Nao e possivel " + acao + " uma consulta " + status);
        }
    }

    public UUID getId() { return id; }
    public Paciente getPaciente() { return paciente; }
    public Medico getMedico() { return medico; }
    public LocalDateTime getDataHora() { return dataHora; }
    public Modalidade getModalidade() { return modalidade; }
    public StatusConsulta getStatus() { return status; }
    public String getMotivoCancelamento() { return motivoCancelamento; }

    @Override
    public String toString() {
        return "Consulta[" + dataHora + ", " + modalidade + ", " + status + "]";
    }
}
