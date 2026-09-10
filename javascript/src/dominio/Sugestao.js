// Saida da triagem por IA. E rascunho: quem decide e assina continua sendo o medico.
export class Sugestao {
  #resumoClinico;
  #rascunhoConduta;
  #examesFaltantes;
  #geradaEm = new Date();

  constructor(resumoClinico, rascunhoConduta, examesFaltantes) {
    this.#resumoClinico = resumoClinico;
    this.#rascunhoConduta = rascunhoConduta;
    this.#examesFaltantes = examesFaltantes;
  }

  get resumoClinico() { return this.#resumoClinico; }
  get rascunhoConduta() { return this.#rascunhoConduta; }
  get examesFaltantes() { return this.#examesFaltantes; }
  get geradaEm() { return this.#geradaEm; }
}
