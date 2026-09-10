package br.unifor.facilitador.dominio;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/** Perfil de medico. A especialidade e um DADO, nao um subtipo. */
public class Medico {

    private final String crm;
    private final Especialidade especialidade;
    private final List<Consulta> consultas = new ArrayList<>();

    public Medico(String crm, Especialidade especialidade) {
        this.crm = crm;
        this.especialidade = especialidade;
    }

    void registrarConsulta(Consulta c) {
        consultas.add(c);
    }

    public List<Consulta> getConsultas() {
        return Collections.unmodifiableList(consultas);
    }

    public String getCrm() { return crm; }
    public Especialidade getEspecialidade() { return especialidade; }
}
