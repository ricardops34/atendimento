---
title: "Calculadora"
function_name: "Calculadora"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "s-o-e-funcionalidades"
source_url: "https://terminaldeinformacao.com/knowledgebase/calculadora/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:12:38"
---

# Calculadora

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/calculadora/

## Exemplo da Rotina

```advpl
Calculadora()
```

## Exemplo 1- Pergunta se deseja abrir a Calculadora, caso seja confirmada será aberta

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
	//Se a pergunta for confirmada, abre a calculadora
	If MsgYesNo("Deseja abrir a calculadora? (MV_WNCALC: "+Alltrim(GetMV("MV_WNCALC"))+")", "Atenção")
		Calculadora()
	EndIf
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Função que abre a calculadora do sistema operacional (ou conforme o parâmetro MV_WNCALC).
