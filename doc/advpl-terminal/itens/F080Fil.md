---
title: "F080Fil"
function_name: "F080Fil"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/f080fil/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:13:49"
---

# F080Fil

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/f080fil/

## Exemplo 1- Faz o filtro conforme um grupo de Perguntas

```advpl
User Function F080FIL()
	//Variaveis
	Local aArea     := GetArea()
	Local cFilRet   := ""
	Local cPrefDe   := ""
	Local cPrefAt   := ""
	Local cTipoDe   := ""
	Local cTipoAt   := ""
	Local dEmiDe    := sToD("")
	Local dEmiAt    := sToD("")
	Local cFornDe   := ""
	Local cFornAt   := ""
	Local cPerg     := PadR("XF080FIL", 10)
	Local _mv_par01 := mv_par02
	Local _mv_par02 := mv_par01
	Local _mv_par03 := mv_par03
	Local _mv_par04 := mv_par04

	//Cria o Pergunte
	fCriaPerg(cPerg)

	//Se o usuário confimar o Pergunte
	If Pergunte(cPerg,.T.)
		//Obtendo o conteúdo dos parâmetros
		cPrefDe := mv_par01
		cPrefAt := mv_par02
		cTipoDe := mv_par03
		cTipoAt := mv_par04
		dEmiDe  := mv_par05
		dEmiAt  := mv_par06
		cFornDe := mv_par07
		cFornAt := mv_par08

		//Montando o filtro para exibição dos registros
		cFilRet := "SE2->E2_PREFIXO >= '"+cPrefDe+"' .AND. SE2->E2_PREFIXO <= '"+cPrefAt+"' .AND. "
		cFilRet += "SE2->E2_TIPO >= '"+cTipoDe+"' .AND. SE2->E2_TIPO <= '"+cTipoAt+"' .AND. "
		cFilRet += 'SE2->E2_EMISSAO >= sToD("'+dToS(dEmiDe)+'") .AND. SE2->E2_EMISSAO <= sToD("'+dToS(dEmiAt)+'") .AND. '
		cFilRet += "SE2->E2_FORNECE >= '"+cFornDe+"' .AND. SE2->E2_FORNECE <= '"+cFornAt+"' "
	EndIf

	//Recuperando o conteudo dos mv_par da rotina padrão
	mv_par01 := _mv_par01
	mv_par02 := _mv_par02
	mv_par03 := _mv_par03
	mv_par04 := _mv_par04

	Pergunte("FIN080",.F.)

	//Restaura a area
	RestArea(aArea)

Return cFilRet
```

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

P.E. executado para filtrar as baixas por lote – Contas a Pagar
