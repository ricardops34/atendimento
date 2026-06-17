---
title: "CriaVar"
function_name: "CriaVar"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/criavar/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:12:57"
---

# CriaVar

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/criavar/

## Exemplo da Rotina

```advpl
cVariavel := CriaVar("SEU_CAMPO", lInicializaConformeIniPadrao)
```

## Exemplo 1- Exemplo de criação de variável através do C5_NUM

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
	Local cCodPed := ""

	//Chamando a criação da variável C5_NUM
	cCodPed := CriaVar("C5_NUM", .T.)

	//Mostrando a variável criada pelo CriaVar
	MsgInfo("cCodPed: "+cCodPed, "Atenção")

	RestArea(aArea)
Return
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Cria a variável conforme dados do Campo do Dicionário (SX3).
