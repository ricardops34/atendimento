---
title: "TCSetField"
function_name: "TCSetField"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/tcsetfield/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:20:22"
---

# TCSetField

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/tcsetfield/

## Exemplo da Rotina

```advpl
TCSetField("Alias", "Campo", "Tipo")
```

## Exemplo 1- Alterando o tipo da coluna para data após executar uma query

```advpl
//Montando a consulta
cQry := " SELECT "
cQry += "     B1_COD,  "
cQry += "     B1_DESC,  "
cQry += "     B1_UCOM  "
cQry += " FROM  "
cQry += "     " + RetSQLName('SB1') + " SB1  "
cQry += " WHERE  "
cQry += "     B1_FILIAL = '" + FWxFilial('SB1') + "' "
cQry += "     AND B1_UCOM != ' ' "
cQry += "     AND B1_MSBLQL != '1' "
cQry += "     AND SB1.D_E_L_E_T_ = ' ' "

//Executando a consulta
TCQuery cQry New Alias "QRY_AUX"

//Transformando coluna no tipo Date
TCSetField("QRY_AUX", "B1_UCOM", "D")
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Define o tipo de campo de um Alias temporário
