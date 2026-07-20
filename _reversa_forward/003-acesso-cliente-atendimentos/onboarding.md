# Onboarding: Acesso do Cliente aos Atendimentos

> Identificador: `003-acesso-cliente-atendimentos`
> Data: `2026-07-20`
> Público-alvo: quem for testar esta feature manualmente pela primeira vez, após o `/reversa-coding`.

## Pré-requisitos

- Backend e frontend rodando localmente (ver `docker-compose.local.yml` / scripts do projeto).
- Migração `2026-07-2x_add_cliente_id_to_users.sql` aplicada no banco local **com autorização prévia** (não aplicar em ambiente compartilhado sem avisar).
- Ao menos dois Clientes cadastrados (ex.: "Cliente A" e "Cliente B"), cada um com Contratos e Agendamentos próprios já lançados (podem ser reaproveitados os dados de teste da feature `002-agendamento-list`).

## Passo a passo

1. **Configurar a superfície de acesso (dado, via script, não telas):**
   1. Rodar `npx tsx prisma/seed-portal-cliente.ts` para criar o Module "Clientes", as 3 Routines, o Menu "Portal do Cliente" e o Profile "Cliente".
   2. Conferir em Configurações → Módulos/Rotinas/Menus/Perfis que os registros foram criados corretamente.
2. **Criar o usuário de portal e vincular ao Cliente:**
   1. Em Configurações → Usuários (tela existente, sem alteração), criar um usuário normal com perfil "Cliente".
   2. Abrir o cadastro do "Cliente A" (Clientes → editar) e, no campo combo "Usuário" (seção "Acesso ao Portal do Cliente" da aba Dados Cadastrais), selecionar o usuário recém-criado. Salvar.
   3. Tentar vincular esse mesmo usuário a um segundo cliente ("Cliente B") e confirmar que o sistema bloqueia com uma mensagem clara (RN-03, 1:1).
3. **Validar o isolamento (RF-06):**
   1. Logar com o usuário do "Cliente A".
   2. Abrir a tela de Lista de Atendimentos do portal e confirmar que só aparecem atendimentos de contratos do "Cliente A" (nunca do "Cliente B").
   3. Repetir no Calendário do portal.
4. **Validar a visibilidade completa (RN-04/RN-05):**
   1. Confirmar que atendimentos em todos os status (Agendada, Realizada, Cancelada, Feriado) aparecem.
   2. Confirmar que os campos de valor do contrato e observação do atendimento aparecem normalmente (não estão ocultos).
5. **Validar o bloqueio de escrita (RF-07):**
   1. Com o token do usuário "Cliente A", tentar chamar diretamente (via ferramenta de API, ex.: `curl`/Postman) um endpoint de escrita interno, como `PATCH /agendamentos/:id/confirmar` ou `POST /agendamentos`.
   2. Confirmar que a resposta é de acesso negado (403) e que nenhum dado foi alterado.
   3. Confirmar também que o menu do usuário "Cliente A" não exibe nenhuma rotina de cadastro/administração.
6. **Validar o extrato em PDF (RF-08):**
   1. Na tela de extrato do portal, gerar o PDF para um período com atendimentos do "Cliente A".
   2. Conferir que o PDF contém apenas atendimentos do "Cliente A", com valores e observações visíveis.
7. **Validar que nada mudou para o backoffice (RF-09, critério de pronto):**
   1. Logar com um usuário interno normal (perfil de backoffice já existente).
   2. Confirmar que o Calendário e a Lista de Agendamentos internos continuam funcionando exatamente como antes (criar, editar, confirmar, cancelar, exportar CSV/XLS/PDF/XML, extrato interno).
