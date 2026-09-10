# Facilitador Médico-Paciente

### O sistema que resolve a vida do paciente e o exercício da medicina brasileira

Projeto da disciplina **Projeto e Arquitetura de Sistemas** — Universidade de Fortaleza (Unifor).

Sistema que aproxima paciente e médico à distância: agendamento de consultas,
envio de exames **antes** do atendimento, recebimento de laudos sem deslocamento
e, como evolução futura, triagem assistida por IA por especialidade.

## Diagrama-Base do sistema

<img width="9104" height="4660" alt="mermaid-diagram-1788267272760" src="https://github.com/user-attachments/assets/f2567574-50a4-456e-9f81-872f6ba30d8a" />

## Conteúdo do repositório

| Pasta | O que é |
|---|---|
| `diagrama/` | Diagrama de classes UML (Mermaid) |
| `java/` | Implementação em Java 21 |
| `javascript/` | Implementação em JavaScript (Node 22, ES Modules) |

As duas implementações são traduções do **mesmo** diagrama e produzem a mesma
saída, o que permite comparar como cada linguagem resolve os mesmos contratos.

## Como rodar

**Java**

```bash
cd java
javac -d bin $(find src -name "*.java")
java -cp bin br.unifor.facilitador.Main
```

**JavaScript**

```bash
cd javascript
node src/main.js
```

## Arquitetura

Camadas em portas e adaptadores. A regra de dependência aponta sempre para
dentro: `dominio` não conhece banco, e-mail nem IA.

```
dominio/          entidades e enums
porta/            contratos (interfaces)
aplicacao/        serviços que orquestram
infraestrutura/   adaptadores concretos
boundary/         fronteira com o usuário (AppPaciente, AppMedico)
Main / main.js    composition root
```

## Princípios SOLID

| Princípio | Onde ver |
|---|---|
| **S** — Responsabilidade única | `Consulta` cuida só do próprio estado |
| **O** — Aberto/fechado | Nova especialidade de IA é um registro, não uma classe |
| **L** — Substituição de Liskov | Repositório em memória troca com o Postgres |
| **I** — Segregação de interface | Upload e download de documento são contratos separados |
| **D** — Inversão de dependência | Serviços recebem tudo por construtor, só como interface |

## Decisões de modelagem

- **Composição de papéis no lugar de herança**: `Usuario` *tem* perfil de
  paciente e/ou de médico. Com herança, um médico que precisasse se consultar
  exigiria dois cadastros.
- **Especialidade é dado, não subtipo**: o motor de IA é único e configurável.
- **IA como porta**: `AnalisadorClinico` isola a evolução futura sem contaminar
  o domínio atual.
