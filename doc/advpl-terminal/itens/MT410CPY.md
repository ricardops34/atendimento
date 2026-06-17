---
title: "MT410CPY"
function_name: "MT410CPY"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/mt410cpy/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:15:56"
---

# MT410CPY

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/mt410cpy/

## Exemplo 1- Altera alguns campos ao fazer a cópia do pedido de venda

```advpl
//Bibliotecas
#Include "Totvs.ch"

/*/{Protheus.doc} User Function MT410CPY
Ponto de entrada ao copiar um pedido de venda, para zerar alguns valores
@type  Function
@author Atilio
@since 16/03/2020
@version version
@see https://tdn.totvs.com/pages/releaseview.action?pageId=6784349
/*/

User Function MT410CPY()
    Local aArea    := GetArea()
    Local aAreaSC5 := SC5->(GetArea())

    //Zerando os campos de data, deixando igual a data base do sistema
    M->C5_X_DTAUX  := dDataBase
    M->C5_X_USCPY  := RetCodUsr()

    RestArea(aAreaSC5)
    RestArea(aArea)
Return
```

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

P.E. ao copiar um pedido de venda
