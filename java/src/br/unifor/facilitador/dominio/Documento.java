package br.unifor.facilitador.dominio;

import java.time.LocalDateTime;
import java.util.UUID;

/** Exame previo, laudo, receita ou atestado trafegado entre paciente e medico. */
public class Documento {

    private final UUID id = UUID.randomUUID();
    private final TipoDocumento tipo;
    private final String uri;
    private final LocalDateTime enviadoEm = LocalDateTime.now();
    private final UUID autor;

    public Documento(TipoDocumento tipo, String uri, UUID autor) {
        this.tipo = tipo;
        this.uri = uri;
        this.autor = autor;
    }

    public UUID getId() { return id; }
    public TipoDocumento getTipo() { return tipo; }
    public String getUri() { return uri; }
    public LocalDateTime getEnviadoEm() { return enviadoEm; }
    public UUID getAutor() { return autor; }

    @Override
    public String toString() {
        return tipo + " (" + uri + ")";
    }
}
