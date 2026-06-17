---
title: "FWMsgRun"
function_name: "FWMsgRun"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "reguas-de-processamento"
source_url: "https://terminaldeinformacao.com/knowledgebase/fwmsgrun/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: "doc/advpl/funcoes/FWMsgRun.md"
related_tdn_title: "FWMsgRun"
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:14:26"
---

# FWMsgRun

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/fwmsgrun/
> Referencia oficial relacionada: doc/advpl/funcoes/FWMsgRun.md

## Exemplo da Rotina

```advpl
FWMsgRun(, {|oSay| fSuaFuncao(oSay) }, "Processando", "Processando a rotina")
```

## Exemplo 1- Chamando uma rotina de processamento

```advpl
User Function zTstA()
	Local aArea := GetArea()

	FWMsgRun(, {|oSay| fMontaRel(oSay) }, "Processando", "Processando dados para o relatório XPTO")

	RestArea(aArea)
Return

Static Function fMontaRel(oSay)
	Local nAtual := 0
	Local nTotal := 0

	oSay:SetText("Iniciando processamento...")

	//Contando o total de registros da tabela
	DbSelectArea("SBM")
	SBM->(DbGoTop())
	Count To nTotal

	//Enquanto houver dados na SBM, muda a mensagem de processamento
	SBM->(DbGoTop())
	While ! SBM->(EoF())
		nAtual++
		oSay:SetText("Analisando registro " + cValToChar(nAtual) + " de " + cValToChar(nTotal) + "...")

		SBM->(DbSkip())
	EndDo
Return
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

- TDN

## Resumo

Cria uma tela de processamento que fica com um círculo girando
