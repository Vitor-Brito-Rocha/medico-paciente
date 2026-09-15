import Documento from "./Documento.js";
import { UUID } from "./Tipos.js";

export default interface DocumentoDownloadPort {
  baixar(id: UUID): Documento;
}
