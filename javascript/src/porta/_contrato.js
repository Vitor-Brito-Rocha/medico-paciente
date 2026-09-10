/**
 * JavaScript nao tem `interface`. Estas duas funcoes recriam o contrato:
 *
 * 1. abstrato(NomeDaClasse) impede instanciar a "interface" direto.
 * 2. implementa(A, B) permite que UM adaptador cumpra DUAS interfaces
 *    (JS so tem heranca simples) — necessario para o ISP do ArmazenamentoS3.
 */

export function naoImplementado(classe, metodo) {
  throw new Error(`${classe} precisa implementar ${metodo}()`);
}

export function abstrato(alvo, instancia) {
  if (new.target === alvo || instancia.constructor === alvo) {
    throw new Error(`${alvo.name} e um contrato: nao pode ser instanciado.`);
  }
}

export function implementa(...contratos) {
  class Composta {}
  for (const contrato of contratos) {
    for (const nome of Object.getOwnPropertyNames(contrato.prototype)) {
      if (nome !== 'constructor') {
        Composta.prototype[nome] = contrato.prototype[nome];
      }
    }
  }
  return Composta;
}
