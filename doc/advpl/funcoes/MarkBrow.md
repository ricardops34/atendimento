---
title: "MarkBrow"
function_name: "MarkBrow"
doc_type: "function"
status: "published"
page_id: 236431063
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=236431063"
tdn_last_modified: "06 jun, 2024"
exported_at: "2026-06-03 09:58:53"
has_parameters: false
has_example: false
section_keys: [nome, calias, ccampo, ccpo, acampos, linverte, cmarca, cctrlm, upar8, cexpini, cexpfim, caval, bparbloco, cexprfiltop, upar14, acolors, upar16, sintaxe]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# MarkBrow

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=236431063

## Nome

Tipo

## cAlias

Character

## cCampo

Character

## cCpo

Character

## aCampos

Array

## lInverte

Logical

## cMarca

Character

## cCtrlM

Character

## uPar8

Variant

## cExpIni

Character

## cExpFim

Character

## cAval

Character

## bParBloco

Codeblock

## cExprFilTop

Character

## uPar14

Variant

## aColors

Array

## uPar16

Variant

## Sintaxe

```text
MarkBrow( [ cAlias ] [ cCampo ] [ cCpo ] [ aCampos ] [ lInverte ] [ cMarca ] [ cCtrlM ] [ uPar8 ] [ cExpIni ] [ cExpFim ] [ cAval ] [ bParBloco ] [ cExprFilTop ] [ uPar14 ] [ aColors ] [ uPar16 ] )
Observações:
A função MarkBrow instancia e trabalha com a classe FWMarkBrowse internamente, logo para ter acesso ao objeto e todos os seus métodos, é necessário fazer uso diretamente da classe FWMarkBrowse e não da função.
Para utilização da MarkBrow() é necessário declarar as variáveis cCadastro e aRotina como Private acima da chamada da função:
aRotina:
Vetor com as rotinas que serão executadas. Nele será definido o tipo de operação a ser executada (inclusão, alteração, exclusão, visualização, pesquisa, ...), sua estrutura é composta de 5 (cinco) dimensões:
[n][1] - Título
[n][2] - Rotina
[n][3] - Reservado
[n][4] - Operação (1 - pesquisa; 2 - visualização; 3 - inclusão; 4 - alteração; 5 - exclusão)
[n][5] - Acesso relacionado à rotina. Se esta posição não for informada, nenhum acesso será validado.
aCampos:
[n][1] - Nome do campo
[n][2] - Nulo (Nil);
[n][3] - Título do campo
[n][4] - Máscara (picture).
Parâmetros:
NomeTipoDescrição
cAliasCharacterAlias do arquivo a ser exibido no browse.
cCampoCharacterCampo do arquivo onde será feito o controle (gravação) da marca.
cCpoCharacterCampo onde será feita a validação para marcação e exibição do bitmap de status.
aCamposArrayArray de colunas a serem exibidas no browse. ( Para arquivo temporário, todos os campos informados serão utilizados como coluna e
no caso de tabela de dados os campos informados serão adicionados as colunas padrão do Browse.)
lInverteLogicalInverte a marcação.
cMarcaCharacterString a ser gravada no campo especificado para marcação.
cCtrlMCharacterFunção a ser executada caso deseje marcar todos os elementos.
uPar8VariantParâmetro reservado.
cExpIniCharacterFunção que retorna o conteúdo inicial do filtro baseada na chave de índice selecionada.
cExpFimCharacterFunção que retorna o conteúdo final do filtro baseada na chave de índice selecionada.
cAvalCharacterFunção a ser executada no duplo clique em um elemento no browse.
bParBlocoCodeblockBloco de código a ser executado na inicialização da janela
cExprFilTopCharacterExpressão de filtro para execução somente em ambiente TOP, a expressão deve ser SQL
uPar14VariantParâmetro reservado.
aColorsArrayLegenda da Markbrowse
uPar16VariantParâmetro reservado.
```
