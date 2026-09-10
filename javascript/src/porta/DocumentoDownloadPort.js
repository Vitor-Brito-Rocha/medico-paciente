import { naoImplementado } from './_contrato.js';

// ISP: contrato separado do upload, mesmo que o adaptador implemente os dois.
export class DocumentoDownloadPort {
  baixar(id) {
    naoImplementado(this.constructor.name, 'baixar');
  }
}
