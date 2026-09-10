# Facilitador Medico-Paciente — implementacao em Java

Traducao direta do diagrama de classes UML da disciplina Projeto e Arquitetura
de Sistemas (Unifor). Compilado e executado com JDK 21.

## Como rodar

    javac -d bin $(find src -name "*.java")
    java -cp bin br.unifor.facilitador.Main

## Estrutura (arquitetura em camadas / portas e adaptadores)

    src/br/unifor/facilitador/
      dominio/          entidades e enums — nao dependem de nada
      porta/            interfaces (contratos)
      aplicacao/        servicos que orquestram, dependem so de interface
      infraestrutura/   adaptadores concretos (banco, email, s3, IA, JWT)
      boundary/         AppPaciente e AppMedico — fronteira com o usuario
      Main.java         composition root: unico ponto que ve classes concretas

Regra de dependencia: as setas apontam sempre para dentro. `dominio` nao
importa `infraestrutura` em nenhum arquivo.

## Onde cada principio SOLID esta no codigo

| Principio | Arquivo | O que olhar |
|---|---|---|
| S | `dominio/Consulta.java` | so mexe no proprio estado; nao salva, nao notifica |
| O | `infraestrutura/ConfigEspecialidadeMemoria.java` | nova especialidade = novo registro, nao nova classe |
| L | `infraestrutura/ConsultaRepositoryMemoria.java` | substitui a versao Postgres sem quebrar o servico |
| I | `infraestrutura/ArmazenamentoS3.java` | um adaptador, duas interfaces pequenas e separadas |
| D | `aplicacao/AgendamentoServiceImpl.java` | recebe tudo por construtor, so como interface |

## Ajustes ja incorporados

- Verbos removidos das associacoes (correcao do professor)
- Autenticacao adicionada para dar uso a email/senha do `Usuario`
- Heranca `Usuario -> Paciente/Medico` trocada por **composicao de papeis**:
  no `Main` o Dr. Carlos tem perfil de medico E de paciente ao mesmo tempo
- Nenhuma classe vazia: todo tipo citado em assinatura existe com atributos
