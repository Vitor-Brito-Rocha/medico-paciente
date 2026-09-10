import { DocumentoUploadPort } from '../porta/DocumentoUploadPort.js';
import { DocumentoDownloadPort } from '../porta/DocumentoDownloadPort.js';
import { implementa } from '../porta/_contrato.js';

/**
 * ISP na pratica: um unico adaptador cumpre DUAS interfaces pequenas.
 * Como JS so tem heranca simples, usamos o helper implementa() para compor os
 * dois contratos — o equivalente ao "implements A, B" do Java.
 * Quem so envia depende de DocumentoUploadPort e nem sabe que baixar existe.
 */
export class ArmazenamentoS3 extends implementa(DocumentoUploadPort, DocumentoDownloadPort) {
  #bucket;
  #regiao;
  #objetos = new Map();

  constructor(bucket, regiao) {
    super();
    this.#bucket = bucket;
    this.#regiao = regiao;
  }

  enviar(documento) {
    this.#objetos.set(documento.id, documento);
    console.log(`[s3://${this.#bucket}.${this.#regiao}] upload de ${documento}`);
    return documento.id;
  }

  baixar(id) {
    const doc = this.#objetos.get(id);
    if (!doc) {
      throw new Error(`Documento inexistente: ${id}`);
    }
    return doc;
  }
}
