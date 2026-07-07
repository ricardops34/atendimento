# Reversa

> Framework de Engenharia Reversa instalado neste projeto.

## Como usar

Digite `reversa` para ativar o Reversa e iniciar ou retomar a análise do projeto.

## Comportamento ao ativar

Quando o usuário digitar `reversa` sozinho em uma mensagem:

1. Ative o skill `reversa` disponível em `.agents/skills/reversa/SKILL.md`
2. Leia o SKILL.md na íntegra e siga exatamente as instruções do Reversa

## Regra não-negociável

Nunca apague, modifique ou sobrescreva arquivos pré-existentes do projeto legado.
O Reversa escreve **apenas** em `.reversa/` e `_reversa_sdd/`.

# Reversa

> Framework de Engenharia Reversa instalado neste projeto.

## Como usar

Digite `reversa` para ativar o Reversa e iniciar ou retomar a análise do projeto.

## Comportamento ao ativar

Quando o usuário digitar `reversa` sozinho em uma mensagem:

1. Ative o skill `reversa` disponível em `.agents/skills/reversa/SKILL.md`
2. Leia o SKILL.md na íntegra e siga exatamente as instruções do Reversa

## Regra não-negociável

Nunca apague, modifique ou sobrescreva arquivos pré-existentes do projeto legado.
O Reversa escreve **apenas** em `.reversa/` e `_reversa_sdd/`.

## Proteção de Banco de Dados

NUNCA execute comandos que recriem, resetem ou migrem o banco de dados (ex: `prisma migrate reset`, `prisma db push`, apagar tabelas, etc) sem ANTES avisar o usuário e pedir autorização explícita para prosseguir.

## Versão do Framework Frontend (PO UI)

O projeto utiliza a **versão 21+** do PO UI (`@po-ui/ng-components`). Nesta versão, atente-se às reestruturações de pacotes:
- Módulos base de página, como `PoPageModule` (que atende `<po-page-edit>`, `<po-page-default>`, etc.), ficam em `@po-ui/ng-components`. NÃO importe de `@po-ui/ng-templates`.
- Componentes de tabela dinâmica, como `PoPageDynamicTableModule`, ficam em `@po-ui/ng-templates`.
Sempre valide a documentação da v21 para os imports corretos, evitando quebrar o processo de build da aplicação.

## Skills e Ferramentas Obrigatórias (PO UI e Backend)

Durante o desenvolvimento (especialmente envolvendo PO UI), é obrigatório utilizar as skills e utilitários presentes nos diretórios abaixo:
- `C:\Ricardo\atendimento\.agents\skills\advpl-tlpp`
- `C:\Ricardo\atendimento\.agents\skills\superpowers`
Essas skills fornecem diretrizes avançadas de arquitetura, desenvolvimento SDD (Subagent-Driven Development), revisão de código e integração com TOTVS/Protheus.

## Documentação Local Obrigatória

Sempre que houver dúvida sobre implementação, propriedades, ou comportamentos de componentes, consulte a documentação oficial local disponibilizada pelo projeto:
- **PO UI / AdvPL:** `C:\Ricardo\atendimento\doc` (contém as pastas `po-ui`, `advpl` e `advpl-terminal`).
Procure ler os arquivos Markdown de referência desta pasta antes de tentar adivinhar a sintaxe dos componentes.

## Padrão de Telas de Listagem (Cadastros)

Para todas as telas de listagem de cadastros, é **OBRIGATÓRIO** utilizar o componente `PoPageDynamicTableModule` (do pacote `@po-ui/ng-templates`) com template inline e sem arquivo `.html` separado, seguindo o padrão minimalista (como feito nas telas de Empresas e Clientes).
**Regras adicionais para cadastros:**
1. Não utilize `<po-modal>` para formulários de criação/edição.
2. Utilize páginas de edição dedicadas com rotas próprias (ex: `/clientes/novo` e `/clientes/:id/editar`).
3. O componente de tabela dinâmica (`PoPageDynamicTable`) já gera automaticamente o botão padrão "Novo" e as ações de linha, delegando as requisições de listagem, deleção e navegação para a rota fornecida.
