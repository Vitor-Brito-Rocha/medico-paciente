import { AutenticacaoService } from '../porta/AutenticacaoService.js';
import { Sessao } from '../dominio/Sessao.js';
import { createHash, randomUUID } from 'node:crypto';

// Consome email + senhaHash do Usuario. Era o "uso" que faltava no diagrama.
export class AutenticacaoJWT extends AutenticacaoService {
  #chaveSecreta;
  #validadeMin;
  #base = [];

  constructor(chaveSecreta, validadeMin) {
    super();
    this.#chaveSecreta = chaveSecreta;
    this.#validadeMin = validadeMin;
  }

  cadastrar(usuario) {
    this.#base.push(usuario);
  }

  login(email, senha) {
    const usuario = this.#base.find(
      (u) => u.email === email && u.senhaHash === AutenticacaoJWT.hash(senha),
    );
    if (!usuario) {
      throw new Error('Credenciais invalidas.');
    }
    const token = `${randomUUID()}.${createHash('sha256').update(this.#chaveSecreta).digest('hex').slice(0, 8)}`;
    const expiraEm = new Date(Date.now() + this.#validadeMin * 60_000);
    return new Sessao(token, usuario.id, expiraEm);
  }

  logout(sessao) {
    console.log(`[auth] sessao encerrada: ${sessao.token}`);
  }

  static hash(senha) {
    return createHash('sha256').update(senha).digest('hex');
  }
}
