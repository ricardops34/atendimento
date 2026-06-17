---
title: "cGetFile"
function_name: "cGetFile"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "arquivos"
source_url: "https://terminaldeinformacao.com/knowledgebase/cgetfile/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:12:43"
---

# cGetFile

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/cgetfile/

## Exemplo da Rotina

```advpl
cGetFile('Descrição |*.extensao', 'Titulo')
```

## Exemplo 1- Seleção de arquivo txt / xml podendo alterar pasta (local e servidor)

```advpl
//Bibliotecas
#Include 'Protheus.ch'

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
	Local cArqAux := ''

	//Chamando o cGetFile para pegar um arquivo txt ou xml, mostrando o servidor
	cArqAux := cGetFile( 'Arquivo TXT|*.txt| Arquivo XML|*.xml',; //[ cMascara],
	                     'Selecao de Arquivos',;                  //[ cTitulo],
	                     0,;                                      //[ nMascpadrao],
	                     'C:\TOTVS\',;                            //[ cDirinicial],
	                     .F.,;                                    //[ lSalvar],
	                     GETF_LOCALHARD  + GETF_NETWORKDRIVE,;    //[ nOpcoes],
	                     .T.)                                     //[ lArvore]

	MsgInfo('O arquivo escolhido é '+cArqAux, 'Atenção')
Return
```

## Exemplo 2- Seleção de arquivo txt sem opção de alterar pasta

```advpl
//Bibliotecas
#Include 'Protheus.ch'

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
	Local cArqAux := ''

	//Chamando o cGetFile sem alteração de diretório
	cArqAux := cGetFile( 'Selecione um Arquivo (*.*)|*.*',;                            //[ cMascara],
	                     'Selecao de Arquivos',;                                       //[ cTitulo],
	                     0,;                                                           //[ nMascpadrao],
	                     'C:\TOTVS\',;                                                 //[ cDirinicial],
	                     .F.,;                                                         //[ lSalvar],
	                     GETF_LOCALHARD  + GETF_NETWORKDRIVE + GETF_NOCHANGEDIR,;      //[ nOpcoes],
	                     .F.)                                                          //[ lArvore]

	MsgInfo('Arquivos escolhido: '+cArqAux, 'Atenção')
Return
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN
– Universo AdvPL
– TDN HowTo

## Resumo

Função que abre uma janela para seleção de um arquivo.
