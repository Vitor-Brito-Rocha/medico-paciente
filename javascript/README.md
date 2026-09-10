# Facilitador Medico-Paciente — implementacao em JavaScript

Traducao direta do diagrama de classes UML da disciplina Projeto e Arquitetura
de Sistemas (Unifor). ES Modules, sem dependencia externa. Testado no Node 22.

## Como rodar

    node src/main.js

(ou `npm start`)

## Estrutura (arquitetura em camadas / portas e adaptadores)

    src/
      dominio/          entidades e enums — nao dependem de nada
      porta/            contratos (o "interface" que o JS nao tem)
      aplicacao/        servicos que orquestram, dependem so de contrato
      infraestrutura/   adaptadores concretos (banco, email, s3, IA, JWT)
      boundary/         AppPaciente e AppMedico — fronteira com o usuario
      main.js           composition root: unico ponto que ve classes concretas

Regra de dependencia: as setas apontam sempre para dentro. Nenhum arquivo de
`dominio/` importa `infraestrutura/`.

## Como o JavaScript resolve o que o Java resolvia com `interface`

JS nao tem `interface` nem `implements`. As portas viram classes-contrato cujos
metodos chamam `naoImplementado()`: se o adaptador esquecer de sobrescrever,
o erro estoura em runtime (demonstrado no passo 6 do `main.js`).

Para o `ArmazenamentoS3`, que precisa cumprir DOIS contratos ao mesmo tempo
(upload e download) e JS so tem heranca simples, existe o helper
`implementa(A, B)` em `porta/_contrato.js` — equivale ao `implements A, B`.

Outras diferencas em relacao a versao Java:

| Java | JavaScript |
|---|---|
| `private String cpf` | campo privado real `#cpf` |
| `enum Especialidade` | `Object.freeze({...})` |
| `interface` + `implements` | classe-contrato + `extends` |
| `implements A, B` | helper `implementa(A, B)` |
| `LocalDateTime` | `Date` nativo |
| getters explicitos | `get prop()` |

## Onde cada principio SOLID esta no codigo

| Principio | Arquivo | O que olhar |
|---|---|---|
| S | `dominio/Consulta.js` | so mexe no proprio estado; nao salva, nao notifica |
| O | `infraestrutura/ConfigEspecialidadeMemoria.js` | nova especialidade = novo registro, nao nova classe |
| L | `infraestrutura/ConsultaRepositoryMemoria.js` | substitui a versao Postgres sem quebrar o servico |
| I | `infraestrutura/ArmazenamentoS3.js` | um adaptador, dois contratos pequenos e separados |
| D | `aplicacao/AgendamentoServiceImpl.js` | recebe tudo por construtor, so como contrato |

## Ajustes ja incorporados

- Verbos removidos das associacoes (correcao do professor)
- Autenticacao adicionada para dar uso a email/senha do `Usuario`
- Heranca `Usuario -> Paciente/Medico` trocada por **composicao de papeis**:
  no `main.js` o Dr. Carlos tem perfil de medico E de paciente ao mesmo tempo
- Nenhuma classe vazia: todo tipo citado em assinatura existe com atributos
