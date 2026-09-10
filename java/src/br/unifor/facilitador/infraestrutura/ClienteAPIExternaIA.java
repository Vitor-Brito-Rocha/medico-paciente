package br.unifor.facilitador.infraestrutura;

import br.unifor.facilitador.porta.ProvedorIA;

/** Adaptador da API de IA. Trocar de fornecedor nao afeta o AnalisadorIA. */
public class ClienteAPIExternaIA implements ProvedorIA {

    private final String urlBase;
    private final String modelo;

    public ClienteAPIExternaIA(String urlBase, String modelo) {
        this.urlBase = urlBase;
        this.modelo = modelo;
    }

    @Override
    public String completar(String prompt) {
        System.out.println("[ia " + modelo + " @ " + urlBase + "] prompt com "
                + prompt.length() + " caracteres");
        return "Rascunho de conduta gerado pelo agente. Requer revisao e assinatura do medico.";
    }
}
