---
title: "Método AddIncrementField"
function_name: "Método AddIncrementField"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "mvc"
source_url: "https://terminaldeinformacao.com/knowledgebase/metodo-addincrementfield/"
has_examples: false
example_count: 0
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, resumo]
exported_at: "2026-06-03 10:15:16"
---

# Método AddIncrementField

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/metodo-addincrementfield/

## Exemplo da Rotina

```advpl
oView:AddIncrementField('VIEW_XXX', 'XXX_CAMPO')

Exemplo 1- Adicionando Incremento de um campo de uma tabela customizada:
Static Function ViewDef()
	Local oView	:= Nil
	Local oModel	:= FWLoadModel('GTCOM05')
	Local oStPai	:= FWFormStruct(2, 'Z29')
	Local oStFilho	:= FWFormStruct(2, 'Z30')
	Local aStruZ29	:= Z29->(DbStruct())
	Local aStruZ30	:= Z30->(DbStruct())

	//Criando a View
	oView := FWFormView():New()
	oView:SetModel(oModel)

	//Adicionando os campos do cabeçalho e o grid dos filhos
	oView:AddField('VIEW_Z29', oStPai,   'Z29MASTER')
	oView:AddGrid('VIEW_Z30',  oStFilho, 'Z30DETAIL')

	//Setando o dimensionamento de tamanho
	oView:CreateHorizontalBox('CABEC', 30)
	oView:CreateHorizontalBox('GRID',  70)

	//Amarrando a view com as box
	oView:SetOwnerView('VIEW_Z29', 'CABEC')
	oView:SetOwnerView('VIEW_Z30', 'GRID')

	//Habilitando título
	oView:EnableTitleView('VIEW_Z29', 'Dados')
	oView:EnableTitleView('VIEW_Z30', 'Produtos')

	//Remove os campos da grid
	oStFilho:RemoveField('Z30_FILIAL')
	oStFilho:RemoveField('Z30_COD')

	//Campo incremental
	oView:AddIncrementField('VIEW_Z30', 'Z30_ITEM')

	//Tratativa padrão para fechar a tela
	oView:SetCloseOnOk({||.T.})
Return oView

Observações:
– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

	Relacionado
```

## Resumo

Adiciona campo de auto incremento em uma grid MVC
