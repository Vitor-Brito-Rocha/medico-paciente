package br.unifor.facilitador.porta;

import br.unifor.facilitador.dominio.Documento;
import java.util.UUID;

/** ISP: contrato separado do upload, mesmo que o adaptador implemente os dois. */
public interface DocumentoDownloadPort {
    Documento baixar(UUID id);
}
