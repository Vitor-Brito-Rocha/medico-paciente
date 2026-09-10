import { naoImplementado } from './_contrato.js';

// ISP: o app do paciente depende so disto. Nao enxerga metodo de leitura.
export class DocumentoUploadPort {
  enviar(documento) {
    naoImplementado(this.constructor.name, 'enviar');
  }
}
