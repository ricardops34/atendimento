---
title: "Rotina Automática - MsGetDAuto"
function_name: "Rotina"
doc_type: "function"
status: "published"
page_id: 795110543
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=795110543"
tdn_last_modified: "16 out, 2023"
exported_at: "2026-06-03 09:59:01"
has_parameters: true
has_example: false
section_keys: [parametros, sintaxe]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# Rotina Automática - MsGetDAuto

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=795110543

## ParÃ¢metros

| Nome | Tipo | DescriÃ§Ã£o | ObrigatÃ³rio |
| --- | --- | --- | --- |
| aField | Vetor | Informe o array com os dados a serem simulados/validados pelo modelo de interface GetDados. | X |
| uLinhaOk | Bloco de código | Informe o bloco de código (codeblock) ou a função (string) que será responsavel pela validação da LinhaOk da interface GetDados. | N |
| uTudoOk | Bloco de código | Informe o bloco de código (codeblock) ou a função (string) que será responsavel pela validação da TudoOk da interface GetDados. | N |
| aEnchAuto | Vetor | Informe o array com os dados a serem simulados/validados pelo EnchAuto, quando utiliza-se o modelo de interface 3. | N |
| nOpc | Numérico | Informe o quarto elemento do aRotina, que será considerado pela função, para saber a operação que esta sendo utilizada. | N |
| lClear | Lógico | Não utilizar | N |

## Sintaxe

```text
MsGetDAuto ( aField [ uLinhaOk ] [ uTudoOk ] [ aEnchAuto ] [ nOpc ] [ lClear ] ) --> lVALIDO
Parâmetros
NomeTipoDescriçãoObrigatório
aFieldVetorInforme o array com os dados a serem simulados/validados pelo modelo de interface GetDados.X
uLinhaOkBloco de códigoInforme o bloco de código (codeblock) ou a função (string) que será responsavel pela validação da LinhaOk da interface GetDados.

uTudoOkBloco de códigoInforme o bloco de código (codeblock) ou a função (string) que será responsavel pela validação da TudoOk da interface GetDados.

aEnchAutoVetorInforme o array com os dados a serem simulados/validados pelo EnchAuto, quando utiliza-se o modelo de interface 3.

nOpcNuméricoInforme o quarto elemento do aRotina, que será considerado pela função, para saber a operação que esta sendo utilizada.

lClearLógicoNão utilizar

Retorno
lRet→ Retorno se conseguiu ou não realizar o procedimento

Observações
A inicialização padrão dos campos da grid funcionam da seguinte forma:
Campo com Inicializador Padrão: Seguirá o processo definido no inicializador padrão do campo;
Campo tipo Caracter Sem Inicializador Padrão: Será inicializado em branco;
Campo tipo Numérico Sem Inicializador Padrão: Será inicializado como 0;
Campo tipo Lógico Sem Inicializador Padrão: Será inicializado como Falso;
Campo Tipo Data Sem Inicializador Padrão: Será inicializado com a database do sistema.
```
