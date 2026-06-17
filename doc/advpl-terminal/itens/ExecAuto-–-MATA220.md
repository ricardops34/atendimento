---
title: "ExecAuto – MATA220"
function_name: "ExecAuto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "rotinas-automaticas"
source_url: "https://terminaldeinformacao.com/knowledgebase/execauto-mata220/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:13:27"
---

# ExecAuto – MATA220

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/execauto-mata220/

## Exemplo da Rotina

```advpl
MSExecAuto({|x, y| Mata220(x, y)}, aVetor, 3)
```

## Exemplo 1- Incluindo um saldo inicial para um produto

```advpl
//Setando valores da rotina automática
lMsErroAuto := .F.
aVetor :={;
	{"B9_FILIAL", FWxFilial('SB9'), Nil},;
	{"B9_COD",    "000001",         Nil},;
	{"B9_LOCAL",  "01",             Nil},;
	{"B9_QINI",   150,              Nil};
}

//Iniciando transação e executando saldos iniciais
Begin Transaction
	MSExecAuto({|x, y| Mata220(x, y)}, aVetor, 3)

	//Se houve erro, mostra mensagem
	If lMsErroAuto
		MostraErro()
		DisarmTransaction()
	EndIf
End Transaction
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Rotina Automática para criação de Saldos Iniciais
