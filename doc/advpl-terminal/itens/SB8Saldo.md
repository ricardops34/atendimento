---
title: "SB8Saldo"
function_name: "SB8Saldo"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "funcoes-internas"
source_url: "https://terminaldeinformacao.com/knowledgebase/sb8saldo/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:20:06"
---

# SB8Saldo

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/sb8saldo/

## Exemplo da Rotina

```advpl
nSaldo := SB8Saldo(Nil, Nil, Nil, Nil, "SEU_ALIAS", lQtdPrev, .T.)
```

## Exemplo 1- Pegando o saldo do Produto

```advpl
//Pegando conteúdo do parâmetro
lQtdPrev := (GetMV("MV_QTDPREV") == "S")

//Buscando a estrutura da SB8
DbSelectArea("SB8")
aStruSB8 := SB8->(DbStruct())

//Criando a consulta que irá buscar os dados do Produto
cQuery := " SELECT "
cQuery += "		* "
cQuery += " FROM "
cQuery += "		" + RetSqlName('SB8') + " SB8 "
cQuery += " WHERE "
cQuery += "		B8_FILIAL  = '" + FWxFilial('SB8') + "' "
cQuery += "		AND B8_PRODUTO = 'PROD001' "
cQuery += "		AND B8_LOTECTL = 'LOTE001' "
cQuery += "		AND SB8.D_E_L_E_T_ = ' ' "
TCQuery cQuery New Alias 'QRY_SB8'

//Se houver dados da consulta
If ! QRY_SB8->(EoF())

	//Percorrendo os campos da estrutura
	For nAtual := 1 To Len(aStruSB8)

		//Se o tipo for diferente de Caracter, transforma o campo (por causa dos campos de Data)
		If aStruSB8[nAtual][2] <> "C"
			TcSetField("QRY_SB8", aStruSB8[nAtual][1], aStruSB8[nAtual][2], aStruSB8[nAtual][3], aStruSB8[nAtual][4])
		EndIf

	Next nAtual

	//Percorre todas as linhas da query
	While ! QRY_SB8->(EoF())
		//Pega o saldo e mostra um alert
		nSaldo := SB8Saldo(Nil, Nil, Nil, Nil, "QRY_SB8", lEmpPrev, .T.)
		Alert(nSaldo)

		QRY_SB8->(DbSkip())
	EndDo

EndIf
QRY_SB8->(DbCloseArea())
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Função que retorna o Saldo por Lote do produto (SB8)
