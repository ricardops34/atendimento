# Roadmap: Scaffold do Repositório e Workspace MVP

> Identificador: `001-scaffold-repositorio`
> Data: `2026-06-17`
> Requirements: `_reversa_forward/001-scaffold-repositorio/requirements.md`
> Confidência: 🟢 CONFIRMADO, 🟡 INFERIDO, 🔴 LACUNA

## 1. Resumo da abordagem

A abordagem escolhida para inicializar o desenvolvimento consiste na criação de um workspace composto por dois projetos independentes na raiz: `/backend` (NestJS API) e `/frontend` (Angular SPA + PO-UI). A coordenação das execuções locais de desenvolvimento e build será centralizada em scripts no `package.json` na raiz do projeto, utilizando a biblioteca `concurrently` para orquestrar a concorrência. A persistência de banco de dados no backend será mapeada usando o Prisma ORM configurado para PostgreSQL.

## 2. Princípios aplicados

*Nenhum princípio duradouro global foi detectado em `.reversa/principles.md`, portanto o scaffold se orienta pelas diretrizes técnicas e de portabilidade declaradas no requirements.*

## 3. Decisões técnicas

| ID | Decisão | Justificativa | Alternativas descartadas | Confidência |
|---|---|---|---|---|
| D-01 | **Pastas Independentes Coordenadas** | Permite o desenvolvimento desacoplado de frontend e backend de forma simples, sem a sobrecarga ou complexidade de gerenciar ferramentas de monorepo como Lerna ou NX. | npm workspaces, pnpm workspaces | 🟢 |
| D-02 | **Angular v21 + PO-UI** | Atender à especificação direta do usuário para o frontend, configurando a biblioteca PO-UI para prover a interface premium PO-UI. | Angular v17 (sugerido inicialmente) | 🟢 |
| D-03 | **NestJS com Prisma ORM no Backend** | Oferece suporte a tipagem TypeScript, modularização baseada em Injeção de Dependências e mapeamento limpo PostgreSQL (Data Mapper). | Express.js puro, TypeORM | 🟢 |

## 4. Premissas

*Nenhuma premissa ou dúvida não resolvida ativa no requirements.md.*

## 5. Delta arquitetural

Esta feature estabelece as fundações físicas do sistema novo, não alterando o monolito legado PHP. Ela apenas materializa os novos componentes da arquitetura alvo.

| Componente | Arquivo de origem no legado | Tipo de mudança | Resumo |
|------------|------------------------------|-----------------|--------|
| `NestJS API` | n/a | componente-novo | Inicialização do scaffold de backend na pasta `/backend`. |
| `Angular SPA` | n/a | componente-novo | Inicialização do scaffold de frontend na pasta `/frontend`. |
| `Prisma ORM` | n/a | componente-novo | Configuração do mapeamento e migrações no backend. |

## 6. Delta no modelo de dados

- Resumo das mudanças: Configuração do Prisma Client e mapeamento inicial no PostgreSQL. A estrutura detalhada do banco do MVP será implementada na Fase 2 do projeto.
- Detalhe completo em: `_reversa_forward/001-scaffold-repositorio/data-delta.md`

## 7. Delta de contratos externos

*Não se aplica para esta feature de scaffold.*

## 8. Plano de migração

*Não há migração de dados na etapa inicial de scaffold. O script de ETL final e carga serão tratados na Fase 2 de Database e Import.*

## 9. Riscos e mitigações

| Risco | Impacto | Probabilidade | Mitigação |
|-------|---------|---------------|-----------|
| Incompatibilidade de versões entre Angular v21 e dependências do PO-UI | médio | média | Configurar e instalar os pacotes do PO-UI compatíveis, utilizando flags de resolução de peer dependencies se necessário. |
| Portas locais ocupadas no desenvolvimento local (3000 ou 4200) | baixo | média | Mapear variáveis de ambiente no `.env` para permitir a troca fácil das portas da API e do dev server do Angular. |

## 10. Critério de pronto

- [ ] Todas as ações do `actions.md` marcadas `[X]`
- [ ] `regression-watch.md` gerado (se aplicável)
- [ ] Servidor NestJS responde com sucesso no endpoint inicial
- [ ] SPA Angular abre a tela inicial do PO-UI localmente

## 11. Histórico de alterações

| Data | Alteração | Autor |
|------|-----------|-------|
| 2026-06-17 | Versão inicial gerada por `/reversa-plan` | reversa |
