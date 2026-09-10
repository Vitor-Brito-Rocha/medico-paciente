package br.unifor.facilitador.dominio;

import java.util.Optional;
import java.util.UUID;

/**
 * Identidade unica da pessoa no sistema.
 *
 * COMPOSICAO DE PAPEIS (nao herança): a mesma pessoa pode ter perfil de
 * paciente, de medico, ou os dois. Se Paciente e Medico herdassem de Usuario,
 * um medico que precisa se consultar exigiria dois cadastros.
 */
public class Usuario {

    private final UUID id;
    private String nome;
    private String email;
    private String telefone;
    private String senhaHash;

    private Paciente perfilPaciente;
    private Medico perfilMedico;

    public Usuario(String nome, String email, String telefone, String senhaHash) {
        this.id = UUID.randomUUID();
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.senhaHash = senhaHash;
    }

    public void atribuirPerfilPaciente(Paciente p) {
        this.perfilPaciente = p;
    }

    public void atribuirPerfilMedico(Medico m) {
        this.perfilMedico = m;
    }

    public Optional<Paciente> getPerfilPaciente() {
        return Optional.ofNullable(perfilPaciente);
    }

    public Optional<Medico> getPerfilMedico() {
        return Optional.ofNullable(perfilMedico);
    }

    public UUID getId() { return id; }
    public String getNome() { return nome; }
    public String getEmail() { return email; }
    public String getTelefone() { return telefone; }
    public String getSenhaHash() { return senhaHash; }

    @Override
    public String toString() {
        return nome + " <" + email + ">";
    }
}
