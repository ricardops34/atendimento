---
title: "AllwaysTrue"
function_name: "AllwaysTrue"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "funcoes-de-validacao"
source_url: "https://terminaldeinformacao.com/knowledgebase/allwaystrue/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:11:52"
---

# AllwaysTrue

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/allwaystrue/

## Exemplo da Rotina

```advpl
AllwaysTrue()
```

## Exemplo 1- Mostrando o conteúdo do AllwaysTrue

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*/{Protheus.doc} zTeste
Função de Teste
@type function
@author Terminal de Informação
@since 13/11/2016
@version 1.0
    @example
    u_zTeste()
/*/

User Function zTeste()
    Local aArea  := GetArea()

    Alert(AllwaysTrue()) //Retorna .T.

    RestArea(aArea)
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Função que sempre retorna verdadeiro (.T.).
