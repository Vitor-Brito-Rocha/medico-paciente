# Sistema Facilitador Médico-Paciente

Projeto da disciplina **Projeto e Arquitetura de Sistemas** — Universidade de Fortaleza (Unifor).

Sistema que aproxima paciente e médico à distância: agendamento de consultas,
envio de exames **antes** do atendimento, recebimento de laudos sem deslocamento
e, como evolução futura, triagem assistida por IA por especialidade.




![Diagrama de Classes](diagram(2).png)

## Princípios SOLID

| Princípio | Onde ver |
|---|---|
| **S** — Responsabilidade única | `Consulta` cuida só do próprio estado |
| **O** — Aberto/fechado | Nova especialidade de IA é um registro, não uma classe |
| **L** — Substituição de Liskov | Repositório em memória troca com o Postgres |
| **I** — Segregação de interface | Upload e download de documento são contratos separados |
| **D** — Inversão de dependência | Serviços recebem tudo por construtor, só como interface |

## Padrões GRASP

Os 9 padrões foram aplicados com as três refatorações que eles motivaram: camada de controladores, realocação de `examesFaltantes()` e criação de `Documento` pela `Consulta`.
