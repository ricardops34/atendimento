---
title: "ConfirmSX8"
function_name: "ConfirmSX8"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/confirmsx8/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:12:47"
---

# ConfirmSX8

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/confirmsx8/

## Exemplo da Rotina

```advpl
ConfirmSX8()
```

## Exemplo 1- Pegando o próximo código do campo A1_COD da tabela SA1

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
	Local aArea   := GetArea()
	Local cCodigo := ''

	Begin Transaction
		//Pegando o último código do cliente conforme a SXE / SXF
		cCodigo := GetSXENum('SA1', 'A1_COD')

		//Perguntando se deseja confirmar esse código, para confirmar e atualizar as tabelas SXE / SXF
		If MsgYesNo("Deseja confirmar o código "+cCodigo+"?", "Atenção")
			ConfirmSX8()

		//Senão, volta a numeração onde estava
		Else
			RollBackSX8()
		EndIf
	End Transaction

	RestArea(aArea)
Return
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Função que confirma a numeração
