---
title: "ExecAuto FINA050"
function_name: "ExecAuto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "rotinas-automaticas"
source_url: "https://terminaldeinformacao.com/knowledgebase/execauto-fina050/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:13:30"
---

# ExecAuto FINA050

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/execauto-fina050/

## Exemplo da Rotina

```advpl
MSExecAuto({|x,y| FINA050(x,y)}, aVetSE2, 3)
```

## Exemplo 1- Incluindo um título financeiro a pagar

```advpl
//Prepara o array para o execauto
aVetSE2 := {}
aAdd(aVetSE2, {"E2_FILIAL",  FWxFilial("SE2"),  Nil})
aAdd(aVetSE2, {"E2_NUM",     cNumero,           Nil})
aAdd(aVetSE2, {"E2_PREFIXO", cPrefixo,          Nil})
aAdd(aVetSE2, {"E2_PARCELA", cParcela,          Nil})
aAdd(aVetSE2, {"E2_TIPO",    cTipo,             Nil})
aAdd(aVetSE2, {"E2_NATUREZ", cNatureza,         Nil})
aAdd(aVetSE2, {"E2_FORNECE", cFornece,          Nil})
aAdd(aVetSE2, {"E2_LOJA",    cLoja,             Nil})
aAdd(aVetSE2, {"E2_NOMFOR",  cNomFor,           Nil})
aAdd(aVetSE2, {"E2_EMISSAO", dEmissao,          Nil})
aAdd(aVetSE2, {"E2_VENCTO",  dVencto,           Nil})
aAdd(aVetSE2, {"E2_VENCREA", dVencReal,         Nil})
aAdd(aVetSE2, {"E2_VALOR",   nValor,            Nil})
aAdd(aVetSE2, {"E2_CONTAD",  cContad,           Nil})
aAdd(aVetSE2, {"E2_HIST",    cHist,             Nil})
aAdd(aVetSE2, {"E2_MOEDA",   1,                 Nil})

//Inicia o controle de transação
Begin Transaction
	//Chama a rotina automática
	lMsErroAuto := .F.
	MSExecAuto({|x,y| FINA050(x,y)}, aVetSE2, 3)

	//Se houve erro, mostra o erro ao usuário e desarma a transação
	If lMsErroAuto
		MostraErro()
		DisarmTransaction()
	EndIf
//Finaliza a transação
End Transaction
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Rotina automática para criação e manipulação de Contas a Pagar
