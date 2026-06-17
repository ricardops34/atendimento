---
schemaVersion: 1
generatedAt: 2026-06-17T15:19:00Z
reversa:
  version: "1.2.43"
kind: cutover_plan
producedBy: strategist
hash: "sha256:4d70df882c5f11075677d206f68a789cd123456789abcdef0123456789abcde6"
---

# Cutover Plan — atendimento

> Plano de corte do legado para o sistema novo, alinhado à estratégia escolhida de Big Bang Localizado (MVP).

## Estratégia base
- **Estratégia confirmada**: Estratégia B: Big Bang Localizado (MVP Completo) em `migration_strategy.md`.

## Pré-requisitos
- [ ] Homologação de paridade de cálculos concluída com 100% de sucesso.
- [ ] Script de migração de dados (ETL `TM-01`) validado em base de testes (Dry Run com zero erros de chave estrangeira).
- [ ] Sanitização e preenchimento de cores hexadecimais nulas resolvidos na base de testes.
- [ ] Nova infraestrutura (PostgreSQL, NestJS API, Angular Web App) provisionada no servidor e pronta para receber tráfego.

## Janela de cutover
- **Data alvo**: Fim de semana (Sábado ou Domingo) para evitar impacto nos lançamentos diários dos profissionais.
- **Duração estimada**: 4 horas.
- **Ambiente afetado**: Produção.
- **Comunicação prévia**: Todos os consultores/profissionais e administradores notificados com 48h de antecedência sobre indisponibilidade temporária.

## Passos do cutover

| # | Passo | Owner | Duração | Reversível? |
|---|---|---|---|---|
| 1 | Congelar escritas no portal legado (desativar rotas de Agendamento PHP) | Administrador / DevOps | 15 min | Sim |
| 2 | Backup final da base de dados legada MySQL/SQLite | Administrador | 15 min | Sim |
| 3 | Executar o script de ETL final (`TM-01`) migrando empresas, profissionais, contratos (com sanitização de cores) e agendamentos históricos para o PostgreSQL moderno | Desenvolvedor Backend | 60 min | Sim |
| 4 | Validar o volume de dados importados no PostgreSQL (contagem de linhas e verificação de integridade) | Desenvolvedor Backend | 30 min | Sim |
| 5 | Atualizar variáveis de ambiente do backend NestJS e frontend Angular em produção | DevOps | 15 min | Sim |
| 6 | Apontar o link do portal legado ("Agendamentos") para a URL da nova SPA Angular | Administrador / DevOps | 15 min | Sim |
| 7 | Realizar testes de fumaça (Smoke Tests): testar inclusão, cálculo de horas líquidas, e visualização no calendário | QA / Desenvolvedor | 45 min | Sim |
| 8 | Liberar o acesso para os usuários pilotos | Product Owner | 15 min | Sim |

## Plano de rollback
- **Critérios de acionamento**: O rollback será acionado se:
  - O script de ETL de dados falhar consecutivamente por mais de 2 horas devido a corrupção oculta na base legada.
  - Testes de fumaça detectarem falhas graves na gravação de dados ou quebras críticas de layout que impeçam o uso básico da agenda.
- **Passos**:
  1. Reverter o link do menu do portal legado para apontar para a rota PHP original de agendamentos.
  2. Reativar permissão de escrita no módulo legado de agendamentos.
  3. Emitir comunicado aos usuários informando o adiamento da migração.
- **Tempo máximo aceitável até rollback**: 3 horas após o início da janela de cutover.
- **Owner do rollback**: DevOps / Desenvolvedor Backend.

## Critérios de go / no-go
- **Go**:
  - Script de migração de dados rodou com sucesso sem erros impeditivos de banco de dados.
  - Dados históricos batem em quantidade e relacionamento.
  - Testes de fumaça validaram todas as operações básicas de CRUD.
- **No-go**:
  - Erros graves de restrição de integridade referencial não resolvidos durante o ETL.
  - Incapacidade de conexão segura do frontend Angular com a API NestJS em ambiente produtivo.

## Pós-cutover
- [ ] Monitoramento estendido de logs HTTP da API e erros no console Angular por 7 dias.
- [ ] Validação diária de paridade de fechamento de horas na primeira semana.
- [ ] Decommission definitivo (remoção completa dos arquivos da unit legada em `antigo/app/control/servicos/`) após 30 dias de uso estável na stack moderna.

## Notas
- A janela de corte aos finais de semana é essencial, pois os profissionais costumam lançar atendimentos no final do dia ou na sexta-feira. Executar no sábado à tarde garante tempo adequado para intervenções ou rollback se necessário.
