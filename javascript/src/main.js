import { Usuario } from './dominio/Usuario.js';
import { Paciente } from './dominio/Paciente.js';
import { Medico } from './dominio/Medico.js';
import { Especialidade } from './dominio/Especialidade.js';
import { Modalidade } from './dominio/Modalidade.js';

import { AgendamentoServiceImpl } from './aplicacao/AgendamentoServiceImpl.js';
import { AnalisadorIA } from './aplicacao/AnalisadorIA.js';
import { TriagemService } from './aplicacao/TriagemService.js';
import { RegistroUsuarios } from './aplicacao/RegistroUsuarios.js';

import { ConsultaRepositoryMemoria } from './infraestrutura/ConsultaRepositoryMemoria.js';
import { NotificadorEmail } from './infraestrutura/NotificadorEmail.js';
import { NotificadorWhatsApp } from './infraestrutura/NotificadorWhatsApp.js';
import { AgendaPadraoMedico } from './infraestrutura/AgendaPadraoMedico.js';
import { ArmazenamentoS3 } from './infraestrutura/ArmazenamentoS3.js';
import { AutenticacaoJWT } from './infraestrutura/AutenticacaoJWT.js';
import { ClienteAPIExternaIA } from './infraestrutura/ClienteAPIExternaIA.js';
import { ConfigEspecialidadeMemoria } from './infraestrutura/ConfigEspecialidadeMemoria.js';

import { AppPaciente } from './boundary/AppPaciente.js';
import { AppMedico } from './boundary/AppMedico.js';

/**
 * COMPOSITION ROOT: e o unico arquivo do sistema que conhece classes concretas.
 * Todo o resto so viu contratos. Trocar uma linha aqui troca a tecnologia.
 */

// --- infraestrutura escolhida (poderia ser Postgres, push, whatsapp...) ---
const repo = new ConsultaRepositoryMemoria();
const notificador = new NotificadorEmail('smtp.unifor.br');
const politica = new AgendaPadraoMedico(8, 18);
const s3 = new ArmazenamentoS3('facilitador-docs', 'sa-east-1');
const auth = new AutenticacaoJWT('chave-academica', 60);
const provedor = new ClienteAPIExternaIA('https://api.exemplo.ia', 'modelo-clinico-v1');
const configs = new ConfigEspecialidadeMemoria();

// --- aplicacao ---
const agenda = new AgendamentoServiceImpl(repo, notificador, politica);
const analisador = new AnalisadorIA(configs, provedor);
const triagem = new TriagemService(analisador);

// --- usuarios e papeis ---
const uAna = new Usuario('Ana Souza', 'ana@email.com', '85999990000', AutenticacaoJWT.hash('1234'));
const ana = new Paciente('111.111.111-11', new Date(1995, 3, 12));
uAna.atribuirPerfilPaciente(ana);

const uCarlos = new Usuario('Dr. Carlos Lima', 'carlos@email.com', '85988880000', AutenticacaoJWT.hash('abcd'));
const carlos = new Medico('CRM-CE 12345', Especialidade.CARDIOLOGIA);
uCarlos.atribuirPerfilMedico(carlos);
// o mesmo usuario tambem pode se consultar: isso era impossivel com heranca
uCarlos.atribuirPerfilPaciente(new Paciente('222.222.222-22', new Date(1980, 0, 30)));

auth.cadastrar(uAna);
auth.cadastrar(uCarlos);
RegistroUsuarios.registrar(uAna);
RegistroUsuarios.registrar(uCarlos);

// --- fronteiras ---
const appPaciente = new AppPaciente(auth, agenda, s3);
const appMedico = new AppMedico(auth, repo, s3, triagem);

function proximaQuarta() {
  const d = new Date();
  while (d.getDay() !== 3) {
    d.setDate(d.getDate() + 1);
  }
  d.setHours(10, 0, 0, 0);
  return d;
}

console.log('=== 1. Paciente entra e agenda ===');
appPaciente.entrar('ana@email.com', '1234');
const horario = proximaQuarta();
const consulta = appPaciente.agendarConsulta(ana, carlos, horario, Modalidade.TELECONSULTA);
console.log(`Agendada: ${consulta}`);

console.log('\n=== 2. Paciente manda exame ANTES da consulta ===');
const docId = appPaciente.enviarExamePrevio(consulta, 's3://facilitador-docs/eco-ana.pdf', uAna.id);

console.log('\n=== 3. Medico entra, le o exame e pede triagem ===');
appMedico.entrar('carlos@email.com', 'abcd');
console.log(`Exame lido: ${appMedico.lerExame(docId)}`);
const sugestao = appMedico.triar(consulta);
console.log(`Resumo: ${sugestao.resumoClinico}`);
console.log(`Rascunho: ${sugestao.rascunhoConduta}`);
console.log(`Exames faltantes: ${sugestao.examesFaltantes}`);

console.log('\n=== 4. Medico emite laudo (paciente nao se desloca) ===');
const laudo = appMedico.emitirLaudo(consulta, 's3://facilitador-docs/laudo-ana.pdf', uCarlos.id);
s3.enviar(laudo);
console.log(`Prontuario de Ana: ${ana.prontuario.historico()}`);

console.log('\n=== 5. DIP na pratica: troca de canal sem tocar no servico ===');
const agendaWhats = new AgendamentoServiceImpl(repo, new NotificadorWhatsApp('+5585300000000'), politica);
const novoHorario = new Date(horario);
novoHorario.setDate(novoHorario.getDate() + 1);
agendaWhats.remarcar(consulta.id, novoHorario);
console.log(`Status final: ${consulta.status} em ${consulta.dataHora.toLocaleString('pt-BR')}`);

console.log('\n=== 6. O contrato e cobrado em runtime ===');
try {
  const { Notificador } = await import('./porta/Notificador.js');
  class NotificadorQuebrado extends Notificador {}
  new NotificadorQuebrado().notificar(uAna, { titulo: 'x', corpo: 'y' });
} catch (erro) {
  console.log(`Erro esperado: ${erro.message}`);
}
