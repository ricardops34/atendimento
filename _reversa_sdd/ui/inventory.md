# Inventario de Telas

| Tela | Arquivo original | Unit | Rota observada | Estado | Proposito |
|---|---|---|---|---|---|
| AgendamentoList | `antigo/telas/AgendamentoList.png` | `agendamento` | `index.php?class=AgendamentoList&method=onShow&adianti_open_tab=1&adianti_tab_name=Agendamentos` | Preenchido | Listar, filtrar, exportar e emitir OS de agendamentos |
| AgendamentoList - Filtros | `antigo/telas/AgendamentoList Filtros.png` | `agendamento` | Painel lateral da `AgendamentoList` | Filtro aberto | Filtrar agendamentos por contrato, profissional e periodo |
| AgendamentoCalendarioFormView | `antigo/telas/AgendamentoCalendarioForm.png` | `agendamento` | `index.php?class=AgendamentoCalendarioFormView&adianti_open_tab=1&adianti_tab_name=Calendario` | Preenchido | Visualizar agenda e abrir cadastro/edicao de agendamento |
| AgendamentoCalendarioForm - Incluir | `antigo/telas/AgendamentoCalendarioForm Incluir.png` | `agendamento` | Painel lateral da `AgendamentoCalendarioFormView` | Inclusao | Lancar novo agendamento com contrato, profissional, horarios e observacoes |

## Assets copiados

- `_reversa_sdd/agendamento/screenshots/AgendamentoList.png`
- `_reversa_sdd/agendamento/screenshots/AgendamentoCalendarioForm.png`
- `_reversa_sdd/agendamento/screenshots/AgendamentoList Filtros.png`
- `_reversa_sdd/agendamento/screenshots/AgendamentoCalendarioForm Incluir.png`

## Observacoes

- A unit `agendamento` foi definida por caso de uso funcional, porque `[specs].granularity` ainda esta vazio e `.reversa/context/surface.json` ainda nao existe.
- Os prints correspondem diretamente as rotinas solicitadas: `AgendamentoList` e `AgendamentoCalendarioFormView`; o formulario `AgendamentoCalendarioForm` e acionado pela view do calendario.
- O acesso ao sistema e por usuario autenticado em um tenant ativo; as telas dependem dos modulos liberados para o perfil ativo do usuario.
- O MVP tera menu dinamico baseado em tenant, usuario, perfil e modulo, sem reutilizar permissoes `system_*` do legado.
