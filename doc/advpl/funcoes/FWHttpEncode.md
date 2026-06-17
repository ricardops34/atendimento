---
title: "FWHttpEncode"
function_name: "FWHttpEncode"
doc_type: "function"
status: "published"
page_id: 644008194
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=644008194"
tdn_last_modified: "06 jun, 2024"
exported_at: "2026-06-03 09:58:41"
has_parameters: true
has_example: true
section_keys: [parametros, sintaxe, retorno, exemplo]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# FWHttpEncode

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=644008194

## ParÃ¢metros

| Nome | Tipo | DescriÃ§Ã£o | ObrigatÃ³rio |
| --- | --- | --- | --- |
| cString | Caracter | String que receberá tratamento para ser codificada no encode correto na resposta de uma requisição | X |

## Sintaxe

```text
FWHttpEncode( <cString> )
Parâmetros:
NomeTipoDescriçãoObrigatório
cStringCaracterString que receberá tratamento para ser codificada no encode correto na resposta de uma requisiçãoX
```

## Retorno

cString → Caracter - String no encode correto da requisição

## Exemplo

```text
O exemplo abaixo mostra os possíveis problemas ao não chamar a função encodeutf8 nos fontes de serviços REST e possíveis problemas ao chamar a mesma.

FWHasGed
#Include "totvs.ch"
#Include "restful.ch"

//-------------------------------------------------------------------
/*/{Protheus.doc} MeuTeste
Serviço REST de exemplo que mostra como tratar corretamente
as respostas de mensagem.

@author  framework
@since   01/10/2021
@version 1.0
/*/
//-------------------------------------------------------------------
wsrestful meuteste description 'Classe teste de rest'

Wsdata Id as character

wsmethod GET teste1 description 'teste1' wssyntax "/api/framework/v1/meuteste/teste1/{id}";
path "/api/framework/v1/meuteste/teste1/{id}"

END WSRESTFUL

//-------------------------------------------------------------------
/*/{Protheus.doc} Teste1
Serviço (get) para testes de retorno das requisições tratando encode corretamente
No postman ou outro tipo de app para testes, podemos fazer da seguinte maneira:
Ao passar o pathparam id= 1, estamos dizendo para o sistema que não vamos fazer nada dentro do fonte
Ao passar o pathparam id=2, vamos dizer para o nosso fonte fazer encodeutf-8 na mão
ao passar o pathparam id=3, vamos dizer ao nosso fonte para fazer o tratamento correto via lib.
Desta forma, não importa se o header Accept-Charset: UTF-8 for enviado, o tratamento sempre é o correto.

@author  framework
@since   01/10/2021
@version 1.0
/*/
//-------------------------------------------------------------------
wsmethod GET teste1 WSSERVICE meuteste

Local cReturn as character

cReturn := "imã"

//não quero que faça encode. Aqui só vai retornar correto se o client enviar o header
//Accept-Charset: UTF-8
If self:id == '1'
    Conout('faz nada')

//Quero que faça encode. Aqui só vai retornar correto se o client NÃO enviar o header
//Accept-Charset: UTF-8
ElseIf self:id == '2'
    cReturn := EncodeUtf8(cReturn)

//Quero que a função de lib avalie o encode. Aqui sempre vai retonar certo, independente do
//Accept-Charset
ElseIf self:id == '3'//faz o processo certo
    cReturn := FWHttpEncode(cReturn)
Endif

Self:SetResponse(cReturn)

Return .T.

Essa função está disponível na lib 20210517 ou superior
```
