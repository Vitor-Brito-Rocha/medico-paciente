package br.unifor.facilitador.dominio;

import java.time.LocalDateTime;

/** Conteudo enviado ao usuario. O canal (email, push, whatsapp) nao importa aqui. */
public class Mensagem {

    private final String titulo;
    private final String corpo;
    private final LocalDateTime criadaEm = LocalDateTime.now();

    public Mensagem(String titulo, String corpo) {
        this.titulo = titulo;
        this.corpo = corpo;
    }

    public String getTitulo() { return titulo; }
    public String getCorpo() { return corpo; }
    public LocalDateTime getCriadaEm() { return criadaEm; }
}
