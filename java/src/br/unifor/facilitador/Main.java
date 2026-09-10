package br.unifor.facilitador;

import br.unifor.facilitador.aplicacao.*;
import br.unifor.facilitador.boundary.*;
import br.unifor.facilitador.dominio.*;
import br.unifor.facilitador.infraestrutura.*;
import br.unifor.facilitador.porta.*;
import java.time.*;
import java.util.UUID;

/**
 * COMPOSITION ROOT: e o unico lugar do sistema que conhece classes concretas.
 * Todo o resto so viu interfaces. Trocar uma linha aqui troca a tecnologia.
 */
public class Main {

    public static void main(String[] args) {

        // --- infraestrutura escolhida (poderia ser Postgres, push, whatsapp...) ---
        ConsultaRepository repo = new ConsultaRepositoryMemoria();
        Notificador notificador = new NotificadorEmail("smtp.unifor.br");
        PoliticaDisponibilidade politica = new AgendaPadraoMedico(LocalTime.of(8, 0), LocalTime.of(18, 0));
        ArmazenamentoS3 s3 = new ArmazenamentoS3("facilitador-docs", "sa-east-1");
        AutenticacaoJWT auth = new AutenticacaoJWT("chave-academica", 60);
        ProvedorIA provedor = new ClienteAPIExternaIA("https://api.exemplo.ia", "modelo-clinico-v1");
        ConfigEspecialidadeRepository configs = new ConfigEspecialidadeMemoria();

        // --- aplicacao ---
        AgendaService agenda = new AgendamentoServiceImpl(repo, notificador, politica);
        AnalisadorClinico analisador = new AnalisadorIA(configs, provedor);
        TriagemService triagem = new TriagemService(analisador);

        // --- usuarios e papeis ---
        Usuario uAna = new Usuario("Ana Souza", "ana@email.com", "85999990000", AutenticacaoJWT.hash("1234"));
        Paciente ana = new Paciente("111.111.111-11", LocalDate.of(1995, 4, 12));
        uAna.atribuirPerfilPaciente(ana);

        Usuario uCarlos = new Usuario("Dr. Carlos Lima", "carlos@email.com", "85988880000", AutenticacaoJWT.hash("abcd"));
        Medico carlos = new Medico("CRM-CE 12345", Especialidade.CARDIOLOGIA);
        uCarlos.atribuirPerfilMedico(carlos);
        // o mesmo usuario tambem pode se consultar: isso era impossivel com heranca
        uCarlos.atribuirPerfilPaciente(new Paciente("222.222.222-22", LocalDate.of(1980, 1, 30)));

        auth.cadastrar(uAna);
        auth.cadastrar(uCarlos);
        RegistroUsuarios.registrar(uAna);
        RegistroUsuarios.registrar(uCarlos);

        // --- fronteiras ---
        AppPaciente appPaciente = new AppPaciente(auth, agenda, s3);
        AppMedico appMedico = new AppMedico(auth, repo, s3, triagem);

        System.out.println("=== 1. Paciente entra e agenda ===");
        appPaciente.entrar("ana@email.com", "1234");
        LocalDateTime horario = proximaQuarta().atTime(10, 0);
        Consulta consulta = appPaciente.agendarConsulta(ana, carlos, horario, Modalidade.TELECONSULTA);
        System.out.println("Agendada: " + consulta);

        System.out.println("\n=== 2. Paciente manda exame ANTES da consulta ===");
        UUID docId = appPaciente.enviarExamePrevio(consulta, "s3://facilitador-docs/eco-ana.pdf", uAna.getId());

        System.out.println("\n=== 3. Medico entra, le o exame e pede triagem ===");
        appMedico.entrar("carlos@email.com", "abcd");
        System.out.println("Exame lido: " + appMedico.lerExame(docId));
        Sugestao s = appMedico.triar(consulta);
        System.out.println("Resumo: " + s.getResumoClinico());
        System.out.println("Rascunho: " + s.getRascunhoConduta());
        System.out.println("Exames faltantes: " + s.getExamesFaltantes());

        System.out.println("\n=== 4. Medico emite laudo (paciente nao se desloca) ===");
        Documento laudo = appMedico.emitirLaudo(consulta, "s3://facilitador-docs/laudo-ana.pdf", uCarlos.getId());
        s3.enviar(laudo);
        System.out.println("Prontuario de Ana: " + ana.getProntuario().historico());

        System.out.println("\n=== 5. DIP na pratica: troca de canal sem tocar no servico ===");
        AgendaService agendaWhats = new AgendamentoServiceImpl(
                repo, new NotificadorWhatsApp("+5585300000000"), politica);
        agendaWhats.remarcar(consulta.getId(), horario.plusDays(1));
        System.out.println("Status final: " + consulta.getStatus() + " em " + consulta.getDataHora());
    }

    private static LocalDate proximaQuarta() {
        LocalDate d = LocalDate.now();
        while (d.getDayOfWeek() != DayOfWeek.WEDNESDAY) {
            d = d.plusDays(1);
        }
        return d;
    }
}
