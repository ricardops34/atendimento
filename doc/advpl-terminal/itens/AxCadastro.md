---
title: "AxCadastro"
function_name: "AxCadastro"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "cadastros"
source_url: "https://terminaldeinformacao.com/knowledgebase/axcadastro/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: "doc/advpl/funcoes/AxCadastro.md"
related_tdn_title: "AxCadastro"
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:12:15"
---

# AxCadastro

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/axcadastro/
> Referencia oficial relacionada: doc/advpl/funcoes/AxCadastro.md

## Exemplo da Rotina

```advpl
AxCadastro("Alias", "Titulo", "Validacao de Exclusao", "Validacao de Inclusao e Alteracao")
```

## Exemplo 1- Função de teste para cadastro de produtos

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
	Local aArea    := GetArea()
	Local aAreaB1  := SB1->(GetArea())
	Local cDelOk   := ".T."
	Local cFunTOk  := ".T." //Pode ser colocado como "u_zVldTst()"

	//Chamando a tela de cadastros
	AxCadastro('SB1', 'Produtos - Teste', cDelOk, cFunTOk)

	RestArea(aAreaB1)
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

Função que abre um browse para cadastrar registros em uma tabela.
