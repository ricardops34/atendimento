---
title: "Método SetColumns"
function_name: "Método SetColumns"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "mvc"
source_url: "https://terminaldeinformacao.com/knowledgebase/metodo-setcolumns/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:15:28"
---

# Método SetColumns

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/metodo-setcolumns/

## Exemplo da Rotina

```advpl
oMrkBrowse:SetColumns(aColumns)
```

## Exemplo 1- Define as colunas

```advpl
//Pegando a estrutura da tabela SB1
aStruSB1 := SB1->(DbStruct())
aColumns := {}
nUltCol  := 0

//Percorrendo a estrutura de campos
For nAtual := 1 To Len(aStruSB1)

	//Se o campo estiver contido na string
	If	Alltrim(aStruSB1[nAtual][1]) $ "B1_COD,B1_DESC,B1_POSIPI,B1_CEST"

		//Adiciona no array, a coluna
		aAdd(aColumns,FWBrwColumn():New())
		nUltCol := Len(aColumns)

		//Define os atributos das colunas
		aColumns[nUltCol]:SetData( &("{||"+aStruSB1[nAtual][1]+"}") )
		aColumns[nUltCol]:SetTitle(RetTitle(aStruSB1[nAtual][1]))
		aColumns[nUltCol]:SetSize(aStruSB1[nAtual][3])
		aColumns[nUltCol]:SetDecimal(aStruSB1[nAtual][4])
		aColumns[nUltCol]:SetPicture(PesqPict("SB1",aStruSB1[nAtual][1]))
	EndIf
Next nAtual

//Define as colunas do MarkBrowse
oMrkBrowse:SetColumns(aColumns)
```

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Define as colunas que serão mostradas no Browse
