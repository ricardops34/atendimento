---
title: "OpenSXs"
function_name: "OpenSXs"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/opensxs/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:16:01"
---

# OpenSXs

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/opensxs/

## Exemplo 1- Abrindo a SX3 e adicionando em uma antiga tela que usa aHeader e aCols (para validar no Code Analysis)

```advpl
//Abre a temporaria ja filtrando a tabela que preciso
cEmpresa := "02"
cAliasTmp := "SX3TST"
cFiltro   := "X3_ARQUIVO == 'AIB'"
OpenSXs(NIL, NIL, NIL, NIL, cEmpresa, cAliasTmp, "SX3", NIL, .F.)
(cAliasTmp)->(DbSetFilter({|| &(cFiltro)}, cFiltro))
(cAliasTmp)->(DbGoTop())

While ! (cAliasTmp)->(Eof())
	If X3Uso( &("(cAliasTmp)->X3_USADO")) .And. cNivel >= &("(cAliasTmp)->X3_NIVEL")

		Aadd(aHeader, {&("(cAliasTmp)->X3_TITULO"),;
			&("(cAliasTmp)->X3_CAMPO"),;
			&("(cAliasTmp)->X3_PICTURE"),;
			&("(cAliasTmp)->X3_TAMANHO"),;
			&("(cAliasTmp)->X3_DECIMAL"),;
			&("(cAliasTmp)->X3_VALID"),;
			&("(cAliasTmp)->X3_USADO"),;
			&("(cAliasTmp)->X3_TIPO"),;
			&("(cAliasTmp)->X3_F3"),;
			&("(cAliasTmp)->X3_CONTEXT"),;
			&("(cAliasTmp)->X3_CBOX"),;
			&("(cAliasTmp)->X3_RELACAO"),;
			".T."})
		nUsado++
	EndIf

	(cAliasTmp)->(dbSkip())
EndDo
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Abre uma tabela do dicionário de dados
