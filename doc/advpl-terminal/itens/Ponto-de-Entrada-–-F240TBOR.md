---
title: "Ponto de Entrada – F240TBOR"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f240tbor/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:16:49"
---

# Ponto de Entrada – F240TBOR

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f240tbor/

## Exemplo da Rotina

```advpl
User Function F240TBOR()
```

## Exemplo 1- Altera o Modelo do Borderô conforme Forma de Pagamento

```advpl
/* Bibliotecas */
#Include 'Protheus.ch'
#Include 'TbiConn.ch'

/*/{Protheus.doc} F240TBOR
Ponto de Entrada para alterar o Modelo do Borderô conforme Forma de Pagamento
do Título
@author Caio César Henrique
@since 29/05/2019
@version 1.0
@type function
@example U_F240TBOR()
/*/

User Function F240TBOR()

    /* Variáveis Locais */
    Local aArea := GetArea()

    /* Seleciona o Borderô recém criado e atualiza                      */
    /* Modelo deve ser igual a Forma de Pagamento do Título posicionado */
    dbSelectArea("SEA")

    If AllTrim(SEA->EA_MODELO) == "01" .or. AllTrim(SEA->EA_MODELO) == "03"
        RecLock("SEA",.F.)
        SEA->EA_MODELO := SE2->E2_FORMPAG
        SEA->(MsUnlock())
    EndIf

    /* Restaura área de trabalho */
    RestArea(aArea)

Return ( Nil )
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

– Função e documentação enviada por Caio Henrique;

## Referências

– TDN

## Resumo

Ponto de Entrada para alterar dados do Borderô
