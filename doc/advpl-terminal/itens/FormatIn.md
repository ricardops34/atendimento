---
title: "FormatIn"
function_name: "FormatIn"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "manipulacao-de-texto"
source_url: "https://terminaldeinformacao.com/knowledgebase/formatin/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:14:03"
---

# FormatIn

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/formatin/

## Exemplo da Rotina

```advpl
cTexto := FormatIn([Texto], [Separador])
```

## Exemplo 1- Quebrando um texto com ponto e vírgulas e filtrando em uma query

```advpl
//Definindo os tipos que serão filtrados com ponto e vírgula
cTipos   := "MP;PI;PA;MO"

//Quebrando o texto, conforme o ponto e vírgula
cTextoOK := FormatIn(cTipos, ";")

//Montando a query, juntando com o texto já formatado
cQryAux := " SELECT "
cQryAux += " 	B1_COD, "
cQryAux += " 	B1_DESC "
cQryAux += " FROM "
cQryAux += " 	" + RetSQLName('SB1') + " SB1 "
cQryAux += " WHERE "
cQryAux += " 	B1_FILIAL = '" + FWxFilial('SB1') + "' "
cQryAux += " 	AND SB1.D_E_L_E_T_ = ' ' "
cQryAux += " 	AND B1_TIPO IN " + cTextoOk + " "
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Transforma uma string com separações em uma string pronta para ser utilizada em uma query
