import DocumentoUploadPort from "./DocumentoUploadPort.js";
import DocumentoDownloadPort from "./DocumentoDownloadPort.js";
import Documento from "./Documento.js";
import { UUID } from "./Tipos.js";

export default class ArmazenamentoS3 implements DocumentoUploadPort, DocumentoDownloadPort {
  bucket: string;
  regiao: string;

  enviar(d: Documento): UUID { return undefined as any; }
  baixar(id: UUID): Documento { return undefined as any; }
}
