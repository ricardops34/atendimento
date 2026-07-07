# PoDatetimepickerComponent

**Seletor:** `po-datetimepicker`
**Tipo:** Componente / Diretiva
**Pacote:** `@po-ui/ng-components`
**Referência:** https://po-ui.io/documentation/po-datetimepicker

O `po-datetimepicker` é um componente para manipulação de data e hora, permitindo a digitação e/ou seleção
por meio de um calendário integrado com um painel de horários.

O formato de exibição da data é determinado automaticamente pelo locale configurado, podendo ser alterado
pela propriedade `p-format-date`. O formato de hora pode ser 24h ou 12h (AM/PM), configurável via `p-format-time`.

O idioma padrão do calendário será exibido de acordo com o navegador, caso tenha necessidade de alterar
use a propriedade `p-locale`.

O componente aceita os seguintes formatos de entrada:

- ISO 8601 com timezone: `'2026-05-12T14:30:00-03:00'`
- ISO 8601 UTC: `'2026-05-12T14:30:00Z'`
- ISO 8601 sem timezone: `'2026-05-12T14:30:00'`
- ISO 8601 apenas data: `'2026-05-12'`
- JavaScript Date Object: `new Date(2026, 4, 12, 14, 30)`

O formato de saída do *model* é sempre ISO 8601 com timezone local: `'yyyy-mm-ddTHH:mm+/-HH:mm'`
(ou `'yyyy-mm-ddTHH:mm:ss+/-HH:mm'` quando `p-show-seconds` está ativo).
*Importante:**

- O valor emitido no model inclui o offset do timezone local do navegador.
- Ao receber um valor com timezone, o componente converte automaticamente para horário local.
- Caso a data/hora esteja inválida, o `model` receberá a mensagem de erro localizada.
- Caso o `input` esteja passando um `[(ngModel)]`, mas não tenha um `name`, então irá ocorrer um erro
do próprio Angular (`[ngModelOptions]="{standalone: true}"`).

Exemplo:

```
<po-datetimepicker
  [(ngModel)]="agendamento"
  [ngModelOptions]="{standalone: true}"
</po-datetimepicker>
```

> Não esqueça de importar o `FormsModule` em seu módulo, tal como para utilizar o `input default`.

#### Tokens customizáveis

É possível alterar o estilo do componente usando os seguintes tokens (CSS):

Obs: Só é possível realizar alterações ao adicionar a classe `.po-input`

> Para maiores informações, acesse o guia [Personalizando o Tema Padrão com Tokens CSS](https://po-ui.io/guides/theme-customization).

| Propriedade | Descrição | Valor Padrão |
|----------------------------------------|-------------------------------------------------------|--------------------------------------------------|
| **Default Values** | | |
| `--font-family` | Família tipográfica usada | `var(--font-family-theme)` |
| `--font-size` | Tamanho da fonte | `var(--font-size-default)` |
| `--text-color-placeholder` | Cor principal do texto do placeholder | `var(--color-neutral-light-30)` |
| `--color` | Cor principal do datetimepicker | `var(--color-neutral-dark-70)` |
| `--background` | Cor de background | `var(--color-neutral-light-05)` |
| `--padding` | Preenchimento | `0 0.5rem` |
| `--text-color` | Cor do texto | `var(--color-neutral-dark-90)` |
| `--field-container-title-justify` | Alinhamento horizontal do título (`justify-content`) | `space-between` |
| `--field-container-title-flex` | Flex do título (`flex`) | `1 auto` |
| **Hover** | | |
| `--color-hover` | Cor principal no estado hover | `var(--color-brand-01-dark)` |
| `--background-hover` | Cor de background no estado hover | `var(--color-brand-01-lightest)` |
| **Focused** | | |
| `--color-focused` | Cor principal no estado de focus | `var(--color-action-default)` |
| `--outline-color-focused` | Cor do outline do estado de focus | `var(--color-action-focus)` |
| **Disabled** | | |
| `--color-disabled` | Cor principal no estado disabled | `var(--color-neutral-light-30)` |
| `--background-disabled` | Cor de background no estado disabled | `var(--color-neutral-light-20)` |
| `--text-color-disabled` | Cor do texto no estado disabled | `var(--color-neutral-dark-70)` |

## Inputs

| Propriedade | Alias | Tipo | Opcional | Padrão | Descrição |
|---|---|---|---|---|---|
| `appendBox` | `p-append-in-body` | `boolean` | sim | `false` | Define que o `calendar` e/ou tooltip serão incluídos no body da página e não dentro do componente. |
| `autoFocus` | `p-auto-focus` | `boolean` | sim | `false` | Aplica foco no elemento ao ser iniciado. |
| `clean` | `p-clean` | `boolean | string` | sim | `false` | Habilita ação para limpar o campo. |
| `compactLabel` | `p-compact-label` | `boolean` | sim | `false` | Define se o título do campo será exibido de forma compacta. |
| `dateFormat` | `p-format-date` | `string` | sim | Determinado pelo locale | Define o formato de exibição da data. |
| `disabled` | `p-disabled` | `boolean | string` | sim | `false` | Desabilita o campo. |
| `errorLimit` | `p-error-limit` | `boolean` | sim | `false` | Limita a exibição da mensagem de erro a duas linhas e exibe um tooltip com o texto completo. |
| `errorPattern` | `p-error-pattern` | `string` | sim | - | Mensagem apresentada quando a data/hora for inválida ou fora do período. |
| `help` | `p-help` | `string` | sim | - | Texto de apoio do campo. |
| `label` | `p-label` | `string` | sim | - | Rótulo do campo. |
| `labelTextWrap` | `p-label-text-wrap` | `boolean` | sim | `false` | Habilita a quebra automática do texto da propriedade `p-label`. |
| `loading` | `p-loading` | `boolean | string` | sim | `false` | Exibe um ícone de carregamento no lado direito do campo. |
| `localeInput` | `p-locale` | `string` | sim | - | Idioma do componente. |
| `maxDateInput` | `p-max-date` | `string | Date` | sim | - | Define uma data máxima para o `po-datetimepicker`. |
| `maxTime` | `p-max-time` | `string` | sim | - | Define o horário máximo permitido para seleção no timer. |
| `minDateInput` | `p-min-date` | `string | Date` | sim | - | Define uma data mínima para o `po-datetimepicker`. |
| `minTime` | `p-min-time` | `string` | sim | - | Define o horário mínimo permitido para seleção no timer. |
| `minuteInterval` | `p-minute-interval` | `number` | sim | `5` | Define o intervalo entre os minutos exibidos no painel do timer. |
| `name` | `name` | `string` | sim | - | Nome do componente. |
| `noAutocomplete` | `p-no-autocomplete` | `boolean | string` | sim | `false` | Define a propriedade nativa `autocomplete` do campo como `off`. |
| `optional` | `p-optional` | `boolean` | sim | `false` | Define se a indicação de campo opcional será exibida. |
| `placeholder` | `p-placeholder` | `string` | sim | - | Mensagem que aparecerá enquanto o campo não estiver preenchido. |
| `poHelperComponent` | `p-helper` | `PoHelperOptions | string` | sim | - | Define as opções do componente de ajuda (po-helper). |
| `readonly` | `p-readonly` | `boolean | string` | sim | `false` | Torna o componente somente leitura. |
| `required` | `p-required` | `boolean | string` | sim | `false` | Define que o campo será obrigatório. |
| `secondInterval` | `p-second-interval` | `number` | sim | `1` | Define o intervalo entre os segundos exibidos no painel do timer. |
| `showErrorMessageRequired` | `p-required-field-error-message` | `boolean` | sim | `false` | Exibe a mensagem setada na propriedade `p-error-pattern` se o campo estiver vazio e for requerido. |
| `showRequired` | `p-show-required` | `boolean` | sim | `false` | Define se a indicação de campo obrigatório será exibida. |
| `showSeconds` | `p-show-seconds` | `boolean` | sim | `false` | Exibe a coluna de segundos no painel de seleção do timer. |
| `size` | `p-size` | `string` | sim | `medium` | Define o tamanho do componente: |
| `timerFormat` | `p-format-time` | `PoTimerFormat` | sim | Determinado pelo locale | Define o formato de exibição do timer. |

## Outputs

| Evento | Alias | Tipo | Descrição |
|---|---|---|---|
| `keydown` | `'p-keydown'` | `EventEmitter` | Evento disparado quando uma tecla é pressionada enquanto o foco está no componente. |
| `onblur` | `'p-blur'` | `EventEmitter` | Evento disparado ao sair do campo (blur). |
| `onchange` | `'p-change'` | `EventEmitter` | Evento disparado ao alterar valor do campo. |

## Métodos

### `showAdditionalHelp()`

Método que exibe `p-helper` ou executa a ação definida em `p-helper{eventOnClick}`.
Para isso, será necessário configurar uma tecla de atalho utilizando o evento `p-keydown`.

> Exibe ou oculta o conteúdo do componente `po-helper` quando o componente estiver com foco.

```
// Exemplo com p-label e p-helper
<po-datetimepicker
 #datetimepicker
 ...
 p-label="Label"
 [p-helper]="helperOptions"
 (p-keydown)="onKeyDown($event, datetimepicker)"
></po-datetimepicker>
```
```
onKeyDown(event: KeyboardEvent, inp: PoDatetimepickerComponent): void {
 if (event.code === 'F9') {
   inp.showAdditionalHelp();
 }
}
```
