import AutenticacaoService from "./AutenticacaoService.js";
import Sessao from "./Sessao.js";
import { DateTime } from "./Tipos.js";

export default class AutenticacaoJWT implements AutenticacaoService {
  chaveSecreta: string;
  validadeMin: number;

  login(email: string, senha: string): Sessao { return undefined as any; }
  logout(s: Sessao): void {}
}
