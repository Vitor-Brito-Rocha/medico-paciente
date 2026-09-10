package br.unifor.facilitador.boundary;

import br.unifor.facilitador.aplicacao.TriagemService;
import br.unifor.facilitador.dominio.*;
import br.unifor.facilitador.porta.*;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

/**
 * Fronteira do medico. Cada metodo apenas DELEGA para uma porta diferente,
 * por isso concentrar as tres acoes na mesma tela nao fere o SRP: a
 * responsabilidade de verdade esta nos servicos, nao aqui.
 */
public class AppMedico {

    private final AutenticacaoService auth;
    private final ConsultaRepository repo;
    private final DocumentoDownloadPort download;
    private final TriagemService triagem;
    private Sessao sessao;

    public AppMedico(AutenticacaoService auth, ConsultaRepository repo,
                     DocumentoDownloadPort download, TriagemService triagem) {
        this.auth = auth;
        this.repo = repo;
        this.download = download;
        this.triagem = triagem;
    }

    public void entrar(String email, String senha) {
        this.sessao = auth.login(email, senha);
        System.out.println("[app-medico] login ok");
    }

    public List<Consulta> verAgenda(Medico m, LocalDate dia) {
        exigirSessao();
        return repo.buscarPorMedicoNoDia(m, dia);
    }

    public Documento lerExame(UUID documentoId) {
        exigirSessao();
        return download.baixar(documentoId);
    }

    public Sugestao triar(Consulta c) {
        exigirSessao();
        return triagem.triar(c);
    }

    public Documento emitirLaudo(Consulta c, String uri, UUID autor) {
        exigirSessao();
        Documento laudo = new Documento(TipoDocumento.LAUDO, uri, autor);
        c.anexar(laudo);
        return laudo;
    }

    private void exigirSessao() {
        if (sessao == null || !sessao.estaValida()) {
            throw new SecurityException("Faca login antes.");
        }
    }
}
