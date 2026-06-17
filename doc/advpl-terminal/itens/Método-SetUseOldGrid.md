---
title: "Método SetUseOldGrid"
function_name: "Método SetUseOldGrid"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "mvc"
source_url: "https://terminaldeinformacao.com/knowledgebase/metodo-setuseoldgrid/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:15:29"
---

# Método SetUseOldGrid

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/metodo-setuseoldgrid/

## Exemplo da Rotina

```advpl
oModel:GetModel('XXX_DETAIL'):SetUseOldGrid(.T.)
```

## Exemplo 1- Definindo no Modelo de Dados

```advpl
Static Function ModelDef()
	Local oModel    := Nil
	Local oStPai    := FWFormStruct(1, 'Z29')
	Local oStFilho  := FWFormStruct(1, 'Z30')
	Local aZ30Rel   := {}

	//Criando o modelo e os relacionamentos
	oModel := MPFormModel():New('XPTOM')
	oModel:AddFields('Z29MASTER', /*cOwner*/, oStPai)
	oModel:AddGrid('Z30DETAIL', 'Z29MASTER', oStFilho, /*bLinePre*/, /*bLinePost*/, /*bPre - Grid Inteiro*/, /*bPos - Grid Inteiro*/, /*bLoad - Carga do modelo manualmente*/)

	//Fazendo o relacionamento entre o Pai e Filho
	aAdd(aZ30Rel, {'Z30_FILIAL', 'Z29_FILIAL'})
	aAdd(aZ30Rel, {'Z30_COD',    'Z29_COD'})
	oModel:SetRelation('Z30DETAIL', aZ30Rel, Z30->(IndexKey(1)))

	//Setando as descrições
	oModel:SetDescription("Entrega de Peças")
	oModel:GetModel('Z29MASTER'):SetDescription('Dados')
	oModel:GetModel('Z30DETAIL'):SetDescription('Produtos')

	//Definindo que usará a grid no formato antigo
	oModel:GetModel('Z30DETAIL'):SetUseOldGrid(.T.)
Return oModel
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Define se a rotina em MVC usará grids do formato antigo (com aHeader e aCols).
