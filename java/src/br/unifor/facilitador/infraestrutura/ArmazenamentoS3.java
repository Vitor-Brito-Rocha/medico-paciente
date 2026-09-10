package br.unifor.facilitador.infraestrutura;

import br.unifor.facilitador.dominio.Documento;
import br.unifor.facilitador.porta.DocumentoDownloadPort;
import br.unifor.facilitador.porta.DocumentoUploadPort;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * ISP na pratica: um unico adaptador implementa DUAS interfaces pequenas.
 * Quem so envia depende de DocumentoUploadPort e nem sabe que baixar existe.
 */
public class ArmazenamentoS3 implements DocumentoUploadPort, DocumentoDownloadPort {

    private final String bucket;
    private final String regiao;
    private final Map<UUID, Documento> objetos = new HashMap<>();

    public ArmazenamentoS3(String bucket, String regiao) {
        this.bucket = bucket;
        this.regiao = regiao;
    }

    @Override
    public UUID enviar(Documento d) {
        objetos.put(d.getId(), d);
        System.out.println("[s3://" + bucket + "." + regiao + "] upload de " + d);
        return d.getId();
    }

    @Override
    public Documento baixar(UUID id) {
        Documento d = objetos.get(id);
        if (d == null) {
            throw new IllegalArgumentException("Documento inexistente: " + id);
        }
        return d;
    }
}
