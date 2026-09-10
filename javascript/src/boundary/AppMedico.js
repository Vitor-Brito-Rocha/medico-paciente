import { Documento } from '../dominio/Documento.js';
import { TipoDocumento } from '../dominio/TipoDocumento.js';

/**
 * Fronteira do medico. Cada metodo apenas DELEGA para uma porta diferente,
 * por isso concentrar as tres acoes na mesma tela nao fere o SRP: a
 * responsabilidade de verdade esta nos servicos, nao aqui.
 */
export class AppMedico {
  #auth;
  #repo;
  #download;
  #triagem;
  #sessao = null;

  constructor(auth, repo, download, triagem) {
    this.#auth = auth;
    this.#repo = repo;
    this.#download = download;
    this.#triagem = triagem;
  }

  entrar(email, senha) {
    this.#sessao = this.#auth.login(email, senha);
    console.log('[app-medico] login ok');
  }

  verAgenda(medico, dia) {
    this.#exigirSessao();
    return this.#repo.buscarPorMedicoNoDia(medico, dia);
  }

  lerExame(documentoId) {
    this.#exigirSessao();
    return this.#download.baixar(documentoId);
  }

  triar(consulta) {
    this.#exigirSessao();
    return this.#triagem.triar(consulta);
  }

  emitirLaudo(consulta, uri, autor) {
    this.#exigirSessao();
    const laudo = new Documento(TipoDocumento.LAUDO, uri, autor);
    consulta.anexar(laudo);
    return laudo;
  }

  #exigirSessao() {
    if (!this.#sessao || !this.#sessao.estaValida()) {
      throw new Error('Faca login antes.');
    }
  }
}
