package br.unifor.facilitador.dominio;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

/** Historico clinico do paciente. Responsabilidade unica: guardar documentos. */
public class Prontuario {

    private final UUID id = UUID.randomUUID();
    private final List<Documento> documentos = new ArrayList<>();

    public void anexar(Documento d) {
        documentos.add(d);
    }

    public List<Documento> historico() {
        return Collections.unmodifiableList(documentos);
    }

    public UUID getId() { return id; }
}
