package br.unifor.facilitador.infraestrutura;

import br.unifor.facilitador.dominio.Sessao;
import br.unifor.facilitador.dominio.Usuario;
import br.unifor.facilitador.porta.AutenticacaoService;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/** Consome email + senhaHash do Usuario. Era o "uso" que faltava no diagrama. */
public class AutenticacaoJWT implements AutenticacaoService {

    private final String chaveSecreta;
    private final int validadeMin;
    private final List<Usuario> base = new ArrayList<>();

    public AutenticacaoJWT(String chaveSecreta, int validadeMin) {
        this.chaveSecreta = chaveSecreta;
        this.validadeMin = validadeMin;
    }

    public void cadastrar(Usuario u) {
        base.add(u);
    }

    @Override
    public Sessao login(String email, String senha) {
        for (Usuario u : base) {
            if (u.getEmail().equals(email) && u.getSenhaHash().equals(hash(senha))) {
                String token = UUID.randomUUID() + "." + chaveSecreta.hashCode();
                return new Sessao(token, u.getId(), LocalDateTime.now().plusMinutes(validadeMin));
            }
        }
        throw new SecurityException("Credenciais invalidas.");
    }

    @Override
    public void logout(Sessao s) {
        System.out.println("[auth] sessao encerrada: " + s.getToken());
    }

    public static String hash(String senha) {
        return Integer.toHexString(senha.hashCode());
    }
}
