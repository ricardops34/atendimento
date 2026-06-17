# Fluxo de Navegacao - Agendamento

```mermaid
flowchart TD
    A[Login por usuario] --> B[Seleciona/recebe tenant ativo]
    B --> C[Carrega perfil ativo]
    C --> D[Busca modulos permitidos]
    D --> E[Renderiza menu dinamico]
    D -->|Sem modulo| Z[Acesso negado / rota indisponivel]
    E --> F[Calendario]
    E --> G[Agendamentos]

    F --> H[AppointmentsCalendarPage]
    H -->|Clique em dia| I[AppointmentFormPanel.create]
    H -->|Clique em evento| J[AppointmentFormPanel.edit]
    H -->|Arrastar/redimensionar evento| K[appointments.move]

    I --> L[Formulario lateral de agendamento]
    J --> L
    L -->|Salvar| M[Agendamento tipo A]
    L -->|Confirmar| N[Agendamento tipo R]
    L -->|Excluir| O[Remove agendamento]
    L -->|OS| P[OS placeholder]

    G --> Q[AppointmentsListPage]
    Q -->|Filtros| R[Painel lateral: Contrato / Profissional / Periodo]
    Q -->|Exportar| S[CSV placeholder]
    Q -->|Acao OS por linha| P

    M --> H
    N --> H
    O --> H
```

## Pontos de entrada

- Login por usuario autenticado.
- Tenant ativo definido no login ou no contexto inicial do usuario.
- Perfil ativo carregado para o usuario dentro do tenant.
- Menu dinamico renderizado a partir dos modulos liberados para o perfil ativo.
- `Calendario`, quando o perfil possui modulo `appointments-calendar`.
- `Agendamentos`, quando o perfil possui modulo `appointments-list`.

## Pontos de saida

- Exportacao da listagem.
- Geracao de Ordem de Servico.
- Fechamento do painel lateral apos salvar.
