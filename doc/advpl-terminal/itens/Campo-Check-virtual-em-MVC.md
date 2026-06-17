---
title: "Campo Check virtual em MVC"
function_name: "Campo"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "mvc"
source_url: "https://terminaldeinformacao.com/knowledgebase/campo-check-virtual-em-mvc/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:12:39"
---

# Campo Check virtual em MVC

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/campo-check-virtual-em-mvc/

## Exemplo da Rotina

```advpl
oStruct:AddField( " ", " ", "OK", "L", 1, 0, FwBuildFeature(STRUCT_FEATURE_VALID, "AlwaysTrue()"), FwBuildFeature(STRUCT_FEATURE_WHEN, "AlwaysTrue()"), Nil, .F., Nil, .F., .F., .T.)
```

## Exemplo 1- Adicionando campo na Estrutura

```advpl
//... Dentro das configurações da sua estrutura de tabela ...
	// Adiciona campo do tipo lógico a estrutura do SZ2
	oStructXXX:AddField( ;
		" ",;                                                     // [01] C Titulo do campo
		" ",;                                                     // [02] C ToolTip do campo
		"OK",;                                                    // [03] C identificador (ID) do Field
		"L",;                                                     // [04] C Tipo do campo
		1,;                                                       // [05] N Tamanho do campo
		0,;                                                       // [06] N Decimal do campo
		FwBuildFeature(STRUCT_FEATURE_VALID, "AlwaysTrue()"),;    // [07] B Code-block de validação do campo
		FwBuildFeature(STRUCT_FEATURE_WHEN, "AlwaysTrue()"),;     // [08] B Code-block de validação When do campo
		Nil,;                                                     // [09] A Lista de valores permitido do campo
		.F.,;                                                     // [10] L Indica se o campo tem preenchimento obrigatório
		Nil,;                                                     // [11] B Code-block de inicializacao do campo
		.F.,;                                                     // [12] L Indica se trata de um campo chave
		.F.,;                                                     // [13] L Indica se o campo pode receber valor em uma operação de update.
		.T.;                                                      // [14] L Indica se o campo é virtual
	)

//-----------------------------------------------------------------

//... Dentro de qualquer função para validar se o valor está marcado

//Percorre as linhas da grid
For nAtual := 1 To oModelXXX:Length()

	//Posiciona na linha atual
	oModelXXX:GoLine(nAtual)

	//Se o valor da coluna OK for true e a linha não estiver deletada
	If oModelXXX:GetValue("OK") .And. ! oModelXXX:IsDeleted()

		MsgInfo("Linha " + cValToChar(nAtual) + " marcada!", "Atenção")

	EndIf
Next
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Adiciona um campo de Check virtual em uma tela MVC (se o campo for real do tipo Lógico não precisa)
