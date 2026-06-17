---
title: "ParamBox"
function_name: "ParamBox"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "telas-objetos"
source_url: "https://terminaldeinformacao.com/knowledgebase/parambox/"
has_examples: true
example_count: 6
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, exemplo, exemplo, exemplo, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:16:02"
---

# ParamBox

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/parambox/

## Exemplo da Rotina

```advpl
...
aAdd(aPergs, {...})

If ParamBox(aPergs, "Informe os parâmetros")
...
```

## Exemplo 1- ParamBox com parâmetros texto

```advpl
Local aPergs   := {}
Local cArquivo := Space(100)
Local cProdDe  := Space(TamSX3("B1_COD")[01])
Local cProdAt  := Space(TamSX3("B1_COD")[01])

aAdd(aPergs, {1, "Arquivo",     cArquivo, "", ".T.", "",    ".T.", 120, .T.})
aAdd(aPergs, {1, "Produto De",  cProdDe,  "", ".T.", "SB1", ".T.", 80,  .F.})
aAdd(aPergs, {1, "Produto Até", cProdAt,  "", ".T.", "SB1", ".T.", 80,  .T.})

If ParamBox(aPergs, "Informe os parâmetros")
	Alert(MV_PAR01)
	Alert(MV_PAR02)
	Alert(MV_PAR03)
EndIf
```

## Exemplo 2- ParamBox com parâmetros data

```advpl
Local aPergs   := {}
Local dDataDe  := FirstDate(Date())
Local dDataAt  := LastDate(Date())

aAdd(aPergs, {1, "Data De",  dDataDe,  "", ".T.", "", ".T.", 80,  .F.})
aAdd(aPergs, {1, "Data Até", dDataAt,  "", ".T.", "", ".T.", 80,  .T.})

If ParamBox(aPergs, "Informe os parâmetros")
	Alert(MV_PAR01)
	Alert(MV_PAR02)
EndIf
```

## Exemplo 3- ParamBox com parâmetros numérico

```advpl
Local aPergs   := {}
Local nQuant   := 0
Local nValor   := 0

aAdd(aPergs, {1, "Qtde",  nQuant,  "@E 9,999",     "Positivo()", "", ".T.", 80,  .F.})
aAdd(aPergs, {1, "Valor", nValor,  "@E 99,999.99", "Positivo()", "", ".T.", 80,  .F.})

If ParamBox(aPergs, "Informe os parâmetros")
	Alert(MV_PAR01)
	Alert(MV_PAR02)
EndIf
```

## Exemplo 4- ParamBox com parâmetros do tipo Combo

```advpl
Local aPergs   := {}
Local nTipo    := 1
Local nVinc    := 1

aAdd(aPergs, {2, "Tipo Importação",               nTipo, {"1=Pré Nota",              "2=Classificação em Documento de Entrada"},     122, ".T.", .F.})
aAdd(aPergs, {2, "Vincula Pedido de Compra",      nVinc, {"1=Sim (Automaticamente)", "2=Não"},                                       090, ".T.", .F.})

If ParamBox(aPergs, "Informe os parâmetros")
	Alert(cValToChar(MV_PAR01))
	Alert(cValToChar(MV_PAR02))
EndIf
```

## Exemplo 5- ParamBox sem o salvamento de dados

```advpl
Local aPergs   := {}
Local cArquivo := Space(100)
Local cProdDe  := Space(TamSX3("B1_COD")[01])
Local cProdAt  := Space(TamSX3("B1_COD")[01])

aAdd(aPergs, {1, "Arquivo",     cArquivo, "", ".T.", "",    ".T.", 120, .T.})
aAdd(aPergs, {1, "Produto De",  cProdDe,  "", ".T.", "SB1", ".T.", 80,  .F.})
aAdd(aPergs, {1, "Produto Até", cProdAt,  "", ".T.", "SB1", ".T.", 80,  .T.})

If ParamBox(aPergs, "Informe os parâmetros", /*aRet*/, /*bOk*/, /*aButtons*/, /*lCentered*/, /*nPosx*/, /*nPosy*/, /*oDlgWizard*/, /*cLoad*/, .F., .F.)
	Alert(MV_PAR01)
	Alert(MV_PAR02)
	Alert(MV_PAR03)
EndIf
```

## Exemplo 6- ParamBox com inúmeros parâmetros diferentes

```advpl
Local aPergs   := {}
Local cArquivo := Space(100)
Local cProdDe  := Space(TamSX3("B1_COD")[01])
Local cProdAt  := Space(TamSX3("B1_COD")[01])
Local dDataDe  := FirstDate(Date())
Local dDataAt  := LastDate(Date())
Local nQuant   := 0
Local nValor   := 0
Local nTipo    := 1
Local nVinc    := 1

aAdd(aPergs, {1, "Arquivo",     cArquivo, "",             ".T.",        "",    ".T.", 120, .T.})
aAdd(aPergs, {1, "Produto De",  cProdDe,  "",             ".T.",        "SB1", ".T.", 80,  .F.})
aAdd(aPergs, {1, "Produto Até", cProdAt,  "",             ".T.",        "SB1", ".T.", 80,  .T.})
aAdd(aPergs, {1, "Data De",  dDataDe,  "",             ".T.",        "",    ".T.", 80,  .F.})
aAdd(aPergs, {1, "Data Até", dDataAt,  "",             ".T.",        "",    ".T.", 80,  .T.})
aAdd(aPergs, {1, "Qtde",        nQuant,   "@E 9,999",     "Positivo()", "",    ".T.", 80,  .F.})
aAdd(aPergs, {1, "Valor",       nValor,   "@E 99,999.99", "Positivo()", "",    ".T.", 80,  .F.})
aAdd(aPergs, {2, "Tipo Importação",               nTipo, {"1=Pré Nota",              "2=Classificação em Documento de Entrada"},     122, ".T.", .F.})
aAdd(aPergs, {2, "Vincula Pedido de Compra",      nVinc, {"1=Sim (Automaticamente)", "2=Não"},                                       090, ".T.", .F.})

If ParamBox(aPergs, "Informe os parâmetros")
	Alert(MV_PAR01)
	Alert(MV_PAR02)
	Alert(MV_PAR03)
	Alert(MV_PAR04)
	Alert(MV_PAR05)
	Alert(MV_PAR06)
	Alert(MV_PAR07)
	Alert(MV_PAR08)
	Alert(MV_PAR09)
EndIf
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Mostra uma tela de parâmetros para o usuário preencher
