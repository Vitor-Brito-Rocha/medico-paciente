package br.unifor.facilitador.boundary;

import br.unifor.facilitador.dominio.*;
import br.unifor.facilitador.porta.*;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Fronteira do sistema (nao e entidade de dominio).
 * Repare que ela depende SO de upload: nao tem acesso a download nem a triagem.
 */
public class AppPaciente {

    private final AutenticacaoService auth;
    private final AgendaService agenda;
    private final DocumentoUploadPort upload;
    private Sessao sessao;

    public AppPaciente(AutenticacaoService auth, AgendaService agenda, DocumentoUploadPort upload) {
        this.auth = auth;
        this.agenda = agenda;
        this.upload = upload;
    }

    public void entrar(String email, String senha) {
        this.sessao = auth.login(email, senha);
        System.out.println("[app-paciente] login ok, token valido ate " + sessao.getExpiraEm());
    }

    public Consulta agendarConsulta(Paciente p, Medico m, LocalDateTime dt, Modalidade mod) {
        exigirSessao();
        return agenda.agendar(p, m, dt, mod);
    }

    public UUID enviarExamePrevio(Consulta c, String uri, UUID autor) {
        exigirSessao();
        Documento d = new Documento(TipoDocumento.EXAME_PREVIO, uri, autor);
        c.anexar(d);
        return upload.enviar(d);
    }

    private void exigirSessao() {
        if (sessao == null || !sessao.estaValida()) {
            throw new SecurityException("Faca login antes.");
        }
    }
}
