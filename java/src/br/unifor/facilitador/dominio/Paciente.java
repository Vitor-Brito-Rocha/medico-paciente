package br.unifor.facilitador.dominio;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/** Perfil de paciente. Nasce sempre acoplado a um Prontuario (composicao 1..1). */
public class Paciente {

    private final String cpf;
    private final LocalDate dataNascimento;
    private final Prontuario prontuario = new Prontuario();
    private final List<Consulta> consultas = new ArrayList<>();

    public Paciente(String cpf, LocalDate dataNascimento) {
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
    }

    void registrarConsulta(Consulta c) {
        consultas.add(c);
    }

    public List<Consulta> getConsultas() {
        return Collections.unmodifiableList(consultas);
    }

    public String getCpf() { return cpf; }
    public LocalDate getDataNascimento() { return dataNascimento; }
    public Prontuario getProntuario() { return prontuario; }
}
