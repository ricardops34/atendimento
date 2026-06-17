---
title: "Ponto de Entrada – MBLKCOLOR"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mblkcolor/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:18:05"
---

# Ponto de Entrada – MBLKCOLOR

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mblkcolor/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

//Constantes
#Define CLR_RGB_BRANCO		RGB(254,254,254)	//Cor Branca em RGB
#Define CLR_RGB_VERMELHO		RGB(255,000,000)	//Cor Vermelha em RGB
#Define CLR_RGB_PRETO		RGB(000,000,000)	//Cor Preta em RGB

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  MBlkColor                                                                                     |
 | Desc:  Altera a cor da linha bloqueada                                                               |
 | Links: http://tdn.totvs.com/display/public/mp/MBlkColor+-+Retorna+cores+a+utilizar                   |
 |        http://tdn.totvs.com/display/public/mp/Campo+Reservado+_MSBLQD+e+_MSBLQL                      |
 *------------------------------------------------------------------------------------------------------*/

User Function MBlkColor()
	Local aRet := {}	//Se deixar assim tem o retorno padrão

	//Adicionando as cores
	aAdd(aRet, (CLR_RGB_PRETO)   ) //Cor do texto
	aAdd(aRet, (CLR_RGB_VERMELHO)) //Cor de fundo
Return aRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada MBLKCOLOR.
