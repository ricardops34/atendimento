# language: pt
# spec-id: PT-002
# rastreabilidade:
#   process_flows: agendamentos/requirements.md § RN02, domain.md § RN03
#   target_architecture: Bounded Context Agendamentos (BC-02) / duracao_minutos
#   paradigma_alvo: Conversão de Tipagem de Tempo (textual para minutos inteiros)

Funcionalidade: Cálculo de Duração Líquida de Atendimento
  Como Consultor / Profissional
  Quero preencher meus horários de trabalho e intervalos
  Para que o sistema compute meu tempo líquido trabalhado e fature as horas decimais corretas

  @paridade @critico
  Esquema do Cenário: Lançamento de agendamento com cálculo de tempo líquido e conversão decimal
    Dado que existe um Contrato e um Profissional cadastrados
    Quando o profissional lança um agendamento com data, hora de início <hora_ini>, hora de fim <hora_fim>, intervalo de início <int_ini> e intervalo de fim <int_fim>
    Então o sistema calcula e persiste a duração líquida interna como <minutos_líquidos> minutos no banco de dados
    E o componente visual exibe a duração formatada em horas textuais como <duracao_textual>
    E ao confirmar o agendamento, o faturamento gerado na tabela Realizado armazena <horas_decimais> horas decimais

    Exemplos:
      | hora_ini | hora_fim | int_ini | int_fim | minutos_líquidos | duracao_textual | horas_decimais |
      | "08:30"  | "17:30"  | "11:30" | "13:00" | 450              | "07:30"         | 7.50           |
      | "09:00"  | "18:00"  | "12:00" | "13:00" | 480              | "08:00"         | 8.00           |
      | "13:00"  | "17:00"  | "00:00" | "00:00" | 240              | "04:00"         | 4.00           |
      | "08:00"  | "12:15"  | "10:00" | "10:15" | 240              | "04:00"         | 4.00           |
      | "08:00"  | "08:45"  | "00:00" | "00:00" | 45               | "00:45"         | 0.75           |
