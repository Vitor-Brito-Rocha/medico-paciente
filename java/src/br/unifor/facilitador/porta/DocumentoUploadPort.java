package br.unifor.facilitador.porta;

import br.unifor.facilitador.dominio.Documento;
import java.util.UUID;

/** ISP: o app do paciente depende so disto. Nao enxerga metodo de leitura. */
public interface DocumentoUploadPort {
    UUID enviar(Documento d);
}
