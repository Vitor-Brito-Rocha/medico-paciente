package br.unifor.facilitador.aplicacao;

import br.unifor.facilitador.dominio.Paciente;
import br.unifor.facilitador.dominio.Usuario;
import java.util.ArrayList;
import java.util.List;

/**
 * Faz a ponte perfil -> usuario, consequencia de termos trocado heranca por
 * composicao de papeis. Mantido simples de proposito (escopo academico).
 */
public class RegistroUsuarios {

    private static final List<Usuario> USUARIOS = new ArrayList<>();

    private RegistroUsuarios() { }

    public static void registrar(Usuario u) {
        USUARIOS.add(u);
    }

    public static Usuario donoDoPerfil(Paciente p) {
        for (Usuario u : USUARIOS) {
            if (u.getPerfilPaciente().orElse(null) == p) {
                return u;
            }
        }
        return null;
    }
}
