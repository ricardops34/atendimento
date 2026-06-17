---
title: "Método AddTrigger"
function_name: "Método AddTrigger"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "mvc"
source_url: "https://terminaldeinformacao.com/knowledgebase/metodo-addtrigger/"
has_examples: false
example_count: 0
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, resumo]
exported_at: "2026-06-03 10:15:21"
---

# Método AddTrigger

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/metodo-addtrigger/

## Exemplo da Rotina

```advpl
oStruct:AddTrigger("Campo Origem", "Campo Destino", "Bloco de código na validação da execução do gatilho", "Bloco de código na execução do gatilho")

Exemplo 1- Adicionando uma função estática a um gatilho no ModelDef:
/*---------------------------------------------------------------------*
 | Func:  ModelDef                                                     |
 | Desc:  Criação do modelo de dados MVC                               |
 *---------------------------------------------------------------------*/

Static Function ModelDef()
	Local oModel    := Nil
	Local oStSBM    := FWFormStruct(1, "SBM")
	Local aGatilhos := {}
	Local nAtual    := 0

	//Adicionando um gatilho, do BM_GRUPO para o BM_DESC
	aAdd(aGatilhos, FWStruTriggger(	"BM_GRUPO",;                                //Campo Origem
									"BM_DESC",;                                 //Campo Destino
									"u_zfGrupo()",;             //Regra de Preenchimento
									.F.,;                                       //Irá Posicionar?
									"",;                                        //Alias de Posicionamento
									0,;                                         //Índice de Posicionamento
									'',;                                        //Chave de Posicionamento
									NIL,;                                       //Condição para execução do gatilho
									"01");                                      //Sequência do gatilho
	)

	//Percorrendo os gatilhos e adicionando na Struct
	For nAtual := 1 To Len(aGatilhos)
		oStSBM:AddTrigger(	aGatilhos[nAtual][01],; //Campo Origem
							aGatilhos[nAtual][02],; //Campo Destino
							aGatilhos[nAtual][03],; //Bloco de código na validação da execução do gatilho
							aGatilhos[nAtual][04])  //Bloco de código de execução do gatilho
	Next

	//Instanciando o modelo
	oModel := MPFormModel():New("zGatMVCM",/*bPre*/, /*bPos*/,/*bCommit*/,/*bCancel*/)
	oModel:AddFields("FORMSBM",/*cOwner*/,oStSBM)
	oModel:SetPrimaryKey({'BM_FILIAL', 'BM_GRUPO'})
	oModel:SetDescription("Modelo de Dados do Cadastro "+cTitulo)
	oModel:GetModel("FORMSBM"):SetDescription("Formulário do Cadastro "+cTitulo)
Return oModel

/*---------------------------------------------------------------------*
 | Func:  fGrupo                                                       |
 | Desc:  Função para preencher zeros a esquerda                       |
 *---------------------------------------------------------------------*/

User Function zfGrupo()
	Local cRetorno  := 'Grupo Teste'
Return cRetorno

Exemplo 2- Adicionando um gatilho que atualiza além de outro campo, o próprio campo:
/*---------------------------------------------------------------------*
 | Func:  ModelDef                                                     |
 | Desc:  Criação do modelo de dados MVC                               |
 *---------------------------------------------------------------------*/

Static Function ModelDef()
	Local oModel    := Nil
	Local oStSBM    := FWFormStruct(1, "SBM")
	Local aGatilhos := {}
	Local nAtual    := 0

	//Adicionando um gatilho, dele para ele mesmo
	aAdd(aGatilhos, FWStruTriggger(	"BM_GRUPO",;                                //Campo Origem
									"BM_DESC",;                                 //Campo Destino
									"u_zfGrupo()",;             //Regra de Preenchimento
									.F.,;                                       //Irá Posicionar?
									"",;                                        //Alias de Posicionamento
									0,;                                         //Índice de Posicionamento
									'',;                                        //Chave de Posicionamento
									NIL,;                                       //Condição para execução do gatilho
									"01");                                      //Sequência do gatilho
	)

	//Percorrendo os gatilhos e adicionando na Struct
	For nAtual := 1 To Len(aGatilhos)
		oStSBM:AddTrigger(	aGatilhos[nAtual][01],; //Campo Origem
							aGatilhos[nAtual][02],; //Campo Destino
							aGatilhos[nAtual][03],; //Bloco de código na validação da execução do gatilho
							aGatilhos[nAtual][04])  //Bloco de código de execução do gatilho
	Next

	//Instanciando o modelo
	oModel := MPFormModel():New("zGatMVCM",/*bPre*/, /*bPos*/,/*bCommit*/,/*bCancel*/)
	oModel:AddFields("FORMSBM",/*cOwner*/,oStSBM)
	oModel:SetPrimaryKey({'BM_FILIAL', 'BM_GRUPO'})
	oModel:SetDescription("Modelo de Dados do Cadastro "+cTitulo)
	oModel:GetModel("FORMSBM"):SetDescription("Formulário do Cadastro "+cTitulo)
Return oModel

/*---------------------------------------------------------------------*
 | Func:  fGrupo                                                       |
 | Desc:  Função para preencher zeros a esquerda                       |
 *---------------------------------------------------------------------*/

User Function zfGrupo()
	Local cCampo    := "BM_GRUPO"
	Local nTamanho  := TamSX3(cCampo)[1]
	Local cConteudo := PadL(AllTrim(FwFldGet(cCampo)), nTamanho, '0')
	Local cRetorno  := 'Grupo Teste'

	//Você pode usar o mesmo gatilho para atualizar outros campos com o FwFldPut, como
	FwFldPut(cCampo, cConteudo,,,, .T.)
Return cRetorno

Observações:
– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;
– Esse fonte foi montado com a ajuda do Eurai do Universo AdvPL, confira o trabalho dele acessando universoadvpl.com.br;

	Relacionado
```

## Resumo

Método para adicionar um gatilho direto no ModelDef
