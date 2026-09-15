import Documento from "./Documento.js";
import { UUID } from "./Tipos.js";

export default interface DocumentoUploadPort {
  enviar(d: Documento): UUID;
}
