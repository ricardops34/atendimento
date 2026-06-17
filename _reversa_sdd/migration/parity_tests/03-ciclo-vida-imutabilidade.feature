# language: pt
# spec-id: PT-003
# rastreabilidade:
#   process_flows: agendamentos/requirements.md § RN03, domain.md § RN04, state-machines.md § Seção 3
#   target_architecture: Bounded Context Agendamentos (BC-02) / Imutabilidade
#   paradigma_alvo: Validação atômica de mudança de status e regras de negócio no NestJS Controller

Funcionalidade: Imutabilidade e Ciclo de Vida do Agendamento
  Como Administrador / Profissional
  Quero garantir que atendimentos concluídos ou cancelados fiquem protegidos contra alterações acidentais
  Para assegurar a integridade e auditoria de faturamento de horas

  @paridade @critico
  Cenário: Confirmação bem-sucedida de agendamento em aberto
    Dado que existe um agendamento com status original "A" (Agendada) no banco de dados
    Quando o usuário solicita a confirmação do agendamento
    Então o sistema altera o status do agendamento para "R" (Realizada)
    E insere o faturamento associado na tabela Realizado
    E a operação é concluída com sucesso

  @paridade @critico
  Cenário: Bloqueio de alteração de dados de atendimento Realizado
    Dado que existe um agendamento com status "R" (Realizada) no banco de dados
    Quando o usuário envia uma requisição para alterar a descrição ou horários deste agendamento
    Então o sistema recusa a alteração retornando erro (HTTP 400 Bad Request)
    E a mensagem de erro informa "Registro não pode ser alterado"
    E o agendamento permanece intacto na base de dados

  @paridade
  Cenário: Bloqueio de re-confirmação de atendimento já finalizado
    Dado que existe um agendamento com status "R" (Realizada) no banco de dados
    Quando o usuário solicita uma nova confirmação deste agendamento
    Então o sistema aborta a operação emitindo erro (HTTP 400)
    E os valores históricos de faturamento não sofrem alteração ou duplicidade
