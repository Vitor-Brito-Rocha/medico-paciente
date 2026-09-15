import Sessao from "./Sessao.js";

export default interface AutenticacaoService {
  login(email: string, senha: string): Sessao;
  logout(s: Sessao): void;
}
