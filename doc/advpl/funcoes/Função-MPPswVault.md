---
title: "Função MPPswVault"
function_name: "Função MPPswVault"
doc_type: "function"
status: "published"
page_id: 606646874
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=606646874"
tdn_last_modified: "24 mar, 2021"
exported_at: "2026-06-03 09:58:33"
has_parameters: true
has_example: false
section_keys: [parametros, amessage, sintaxe, retorno]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# Função MPPswVault

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=606646874

## Parâmetro

Tipo

## aMessage

array

## Sintaxe

```text
MPPswVault(aMessage)

ParâmetroTipoDescriçãoObrigatório
aMessagearrayRetorno das mensagens de erro de políticax
```

## Retorno

Instância da FWSecretVault

Exemplo
// Chamar a função depois de abrir o ambiente ou de dentro de um menu do sistema.

User Function TstPswVault()

    Local cPass  	:= 'minhasenha'
    Local cID      	:= 'MeuID'
    Local lSucesso  := .F.
    Local aMessage  := {}
	Local oVault := MPPswVault(aMessage)

    lSucesso := oVault:Put(cID, cPass) // lSucesso := .T.
    lSucesso := oVault:Check(cID, cPass) // lSucesso := .T.
	lSucesso := oVault:Put(cID, "123456") // lSucesso := .F. quando a política não permitir sequência numérica

    if !lSucesso .And. !Empty(aMessage)
		ConOut( aMessage[1], aMessage[2] )
	endif

    lSucesso := oVault:Delete(cID) // lSucesso := .T.
    lSucesso := oVault:Check(cID) // lSucesso := .F., o registro já foi deletado

return
