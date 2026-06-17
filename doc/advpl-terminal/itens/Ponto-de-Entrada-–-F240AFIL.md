---
title: "Ponto de Entrada – F240AFIL"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f240afil/"
has_examples: true
example_count: 2
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:16:46"
---

# Ponto de Entrada – F240AFIL

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f240afil/

## Exemplo da Rotina

```advpl
User Function F240AFIL()
	//...
Return cFiltro
```

## Exemplo 1- Filtrando de modo simples

```advpl
/* Bibliotecas */
#Include 'Protheus.ch'
#Include 'TbiConn.ch'

/*/{Protheus.doc} F240AFIL
Ponto de Entrada para alterar o filtro de retorno dos Títulos conforme Modelo
@author Caio César Henrique
@since 29/05/2019
@version 1.0
@type function
@example U_F240AFIL()
/*/

User Function F240AFIL()

    /* Variáveis Locais */
    Local cFiltro := PARAMIXB[1]
    Local aArea   := GetArea()

    /* Realiza o filtro na SE2 */
    cFiltro := cFiltro + " AND E2_CAMPO = 'XPTO' "

    /* Restaura área de trabalho */
    RestArea(aArea)

Return ( cFiltro )
```

## Exemplo 2- Alterando o filtro de retorno dos Títulos conforme Modelo

```advpl
/* Bibliotecas */
#Include 'Protheus.ch'
#Include 'TbiConn.ch'

/*/{Protheus.doc} F240AFIL
Ponto de Entrada para alterar o filtro de retorno dos Títulos conforme Modelo
@author Caio César Henrique
@since 29/05/2019
@version 1.0
@type function
@example U_F240AFIL()
/*/

User Function F240AFIL()

    /* Variáveis Locais */
    Local cFiltro := PARAMIXB[1]
    Local aArea   := GetArea()

    /* Desabilita o parâmetro de Validação da Forma de Pagamento */
    If MV_PAR09 == 1
        MV_PAR09 := 2
    EndIf

    /* Se for modelo '01 - CREDITO EM CONTA CORRENTE'
       Adiciono '03 - DOC' e '05 - CREDITO EM CONTA POUPANÇA' */
    If AllTrim(cModPgto) == "01"
        cFiltro := cFiltro + " AND E2_FORMPAG IN ('03','05') "
    EndIf

    /* Se for modelo '41 - TED Outro Titular'
       Adiciono '43 - TED Mesmo TItular' */
    If AllTrim(cModPgto) == "41"
        cFiltro := cFiltro + " AND E2_FORMPAG = '43"
    EndIf

    /* Habilita o parâmetro de Validação da Forma de Pagamento */
    If MV_PAR09 == 2
        MV_PAR09 := 1
    EndIf

    /* Restaura área de trabalho */
    RestArea(aArea)

Return ( cFiltro )
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

– Função e documentação enviada por Caio Henrique;

## Referências

– TDN

## Resumo

Ponto de Entrada para alterar o filtro de retorno dos Títulos
