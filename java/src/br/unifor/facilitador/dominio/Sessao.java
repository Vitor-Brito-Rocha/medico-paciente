package br.unifor.facilitador.dominio;

import java.time.LocalDateTime;
import java.util.UUID;

/** Sessao autenticada. Da uso concreto ao email e a senha do Usuario. */
public class Sessao {

    private final String token;
    private final UUID usuarioId;
    private final LocalDateTime expiraEm;

    public Sessao(String token, UUID usuarioId, LocalDateTime expiraEm) {
        this.token = token;
        this.usuarioId = usuarioId;
        this.expiraEm = expiraEm;
    }

    public boolean estaValida() {
        return LocalDateTime.now().isBefore(expiraEm);
    }

    public String getToken() { return token; }
    public UUID getUsuarioId() { return usuarioId; }
    public LocalDateTime getExpiraEm() { return expiraEm; }
}
