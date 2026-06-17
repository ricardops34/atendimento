---
title: "Estrut2"
function_name: "Estrut2"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "funcoes-internas"
source_url: "https://terminaldeinformacao.com/knowledgebase/estrut2/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:13:23"
---

# Estrut2

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/estrut2/

## Exemplo da Rotina

```advpl
Local oTempTable    := Nil
Private nEstru := 0

Estrut2(cCodProd, nQuantid, cAliasTmp, @oTempTable)

FimEstrut2(Nil, @oTempTable)
```

## Exemplo 1- Executando a estrutura e percorrendo os dados

```advpl
Local oTempTable    := Nil

//Variáveis Private para utilização da função Estrut2
Private cAliasTmp   := "ESTRUT"
Private nEstru      := 0

//Cria a estrutura temporária
Estrut2(cCodProd, nQuant, cAliasTmp, @oTempTable)

//Se houver dados
(cAliasTmp)->(DbGoTop())
If ! (cAliasTmp)->(EoF())

	//Enquanto houver dados, mostra uma mensagem do produto, componente e quantidade
	While ! (cAliasTmp)->(EoF())

		Alert("Produto: " + (cAliasTmp)->CODIGO + ", Componente: " + (cAliasTmp)->COMP + ", Quantidade: " + cValToChar((cAliasTmp)->QUANT))

		(cAliasTmp)->(DbSkip())
	EndDo

Else
	MsgStop("Estrutura não encontrada!", "Atenção")
EndIf

//Finaliza a função de estrutura
FimEstrut2(Nil, @oTempTable)
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

– Função aprimorada com correções enviada por Thiago.Andrrade;

## Referências

– TDN

## Resumo

Função que carrega a Estrutura de um Produto (SG1) em uma tabela temporária
