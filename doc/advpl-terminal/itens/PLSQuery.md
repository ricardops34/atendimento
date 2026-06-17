---
title: "PLSQuery"
function_name: "PLSQuery"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/plsquery/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:16:08"
---

# PLSQuery

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/plsquery/

## Exemplo 1- Monta uma query e executa com PLSQuery

```advpl
cQry := " SELECT " + CRLF
cQry += " 	C7_ITEM, " + CRLF
cQry += " 	C7_PRODUTO, " + CRLF
cQry += " 	B1_DESC, " + CRLF
cQry += " 	A5_CODPRF, " + CRLF
cQry += " 	C7_QUANT, " + CRLF
cQry += " 	C7_PRECO, " + CRLF
cQry += " 	C7_IPI, " + CRLF
cQry += " 	C7_TOTAL, " + CRLF
cQry += " 	B1_POSIPI, " + CRLF
cQry += " 	B2_QPEDVEN, " + CRLF
cQry += " 	B2_RESERVA " + CRLF
cQry += " FROM " + CRLF
cQry += " 	" + RetSQLName('SC7') + " SC7 " + CRLF
cQry += " 	INNER JOIN " + RetSQLName('SB1') + " SB1 ON ( " + CRLF
cQry += " 		B1_FILIAL = '" + FWxFilial('SB1') +  "' " + CRLF
cQry += " 		AND B1_COD = C7_PRODUTO " + CRLF
cQry += " 		AND SB1.D_E_L_E_T_ = ' ' " + CRLF
cQry += "  	) " + CRLF
cQry += " 	LEFT JOIN " + RetSQLName('SB2') + " SB2 ON ( " + CRLF
cQry += " 		B2_FILIAL = '" + FWxFilial('SB2') +  "' " + CRLF
cQry += " 		AND B2_COD = C7_PRODUTO " + CRLF
cQry += " 		AND B2_LOCAL IN ('01', '05') " + CRLF
cQry += " 		AND SB2.D_E_L_E_T_ = ' ' " + CRLF
cQry += "  	) " + CRLF
cQry += "   LEFT JOIN " + RetSQLName("SA5") + " SA5 ON ( "  + CRLF
cQry += "       A5_FILIAL = '" + FWxFilial("SA5") + "' "    + CRLF
cQry += "       AND A5_PRODUTO = SC7.C7_PRODUTO "           + CRLF
cQry += "       AND A5_FORNECE = SC7.C7_FORNECE "           + CRLF
cQry += "       AND A5_LOJA = SC7.C7_LOJA "                 + CRLF
cQry += "       AND SA5.D_E_L_E_T_ = ' ' "                  + CRLF
cQry += "   ) "                                             + CRLF
cQry += " WHERE " + CRLF
cQry += " 	C7_FILIAL = '" + FWxFilial('SC7') + "' " + CRLF
cQry += " 	AND C7_NUM = '" + SC7->C7_NUM + "' " + CRLF
cQry += " 	AND SC7.D_E_L_E_T_ = ' ' " + CRLF
cQry += " ORDER BY " + CRLF
cQry += " 	C7_ITEM " + CRLF

//Executando a query
oSay:SetText("Executando a consulta")
PLSQuery(cQry, "QRY_SC7")
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Executa uma query SQL
