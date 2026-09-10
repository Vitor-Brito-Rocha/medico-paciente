package br.unifor.facilitador.porta;

/** DIP: o analisador nao conhece qual API de IA esta do outro lado. */
public interface ProvedorIA {
    String completar(String prompt);
}
