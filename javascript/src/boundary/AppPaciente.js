import { Documento } from '../dominio/Documento.js';
import { TipoDocumento } from '../dominio/TipoDocumento.js';

/**
 * Fronteira do sistema (nao e entidade de dominio).
 * Repare que ela depende SO de upload: nao tem acesso a download nem a triagem.
 */
export class AppPaciente {
  #auth;
  #agenda;
  #upload;
  #sessao = null;

  constructor(auth, agenda, upload) {
    this.#auth = auth;
    this.#agenda = agenda;
    this.#upload = upload;
  }

  entrar(email, senha) {
    this.#sessao = this.#auth.login(email, senha);
    console.log(`[app-paciente] login ok, token valido ate ${this.#sessao.expiraEm.toLocaleTimeString('pt-BR')}`);
  }

  agendarConsulta(paciente, medico, dataHora, modalidade) {
    this.#exigirSessao();
    return this.#agenda.agendar(paciente, medico, dataHora, modalidade);
  }

  enviarExamePrevio(consulta, uri, autor) {
    this.#exigirSessao();
    const documento = new Documento(TipoDocumento.EXAME_PREVIO, uri, autor);
    consulta.anexar(documento);
    return this.#upload.enviar(documento);
  }

  #exigirSessao() {
    if (!this.#sessao || !this.#sessao.estaValida()) {
      throw new Error('Faca login antes.');
    }
  }
}
