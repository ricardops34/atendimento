---
title: "MSCBPrinter"
function_name: "MSCBPrinter"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "relatorios"
source_url: "https://terminaldeinformacao.com/knowledgebase/mscbprinter/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:15:37"
---

# MSCBPrinter

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/mscbprinter/

## Exemplo da Rotina

```advpl
MSCBPrinter()
```

## Exemplo 1- Gera uma etiqueta de 80mm de largura

```advpl
//Variáveis de controle
cPorta     := "LPT1"
nQtdCopias := 1
nVolIniPvt := 1
nVolFimPvt := 1

//Cria a etiqueta com configuração de etiqueta de 80mm
MSCBPrinter("S600", cPorta, , , .F.)
MSCBChkStatus(.F.) //Alguns modelos exigem esse comando
MSCBInfoEti("ETIQUETA", "ROTULO")
MSCBBegin(nQtdCopias, 6, 81) //Qtde de copias, velocidade (1 a 6) e tamanho da etiqueta em mm
MSCBBox(02, 03, 98, 78, 3)

//Dados da Empresa com linha de separação
MSCBSay(005, 006, "Remet.: ",                           "N", "0", "029, 036")
MSCBSay(026, 006, "Nome da Empresa",                    "N", "0", "043, 053", .F.)
MSCBSay(005, 013, "Rua Teste 123, Fone: 014 0000-1111", "N", "0", "024, 034")
MSCBSay(023, 017, "CEP 17000-111, Bauru-SP",            "N", "0", "024, 034")
MSCBLineH(02, 21, 98, 3)

//Dados do Cliente com linha de separação
MSCBSay(005, 022, "Codigo: " + SC5->C5_CLIENTE,                                             "N", "0", "029, 036")
MSCBSay(005, 026, "Cliente: " + SubStr(SA1->A1_NOME, 1, 40),                                "N", "0", "029, 036")
MSCBSay(005, 030, "End.: " + Alltrim(SA1->A1_END),                                          "N", "0", "024, 034")
MSCBSay(005, 034, "Bairro: " + Alltrim(SA1->A1_BAIRRO) + "   CEP: " + Alltrim(SA1->A1_CEP), "N", "0", "029, 036")
MSCBSay(005, 038, "Cidade: " + Alltrim(SA1->A1_MUN) + "   UF: " + Alltrim(SA1->A1_EST),     "N", "0", "026, 036")
MSCBSay(005, 042, "Telefone: (" + Alltrim(SA1->A1_DDD) +  ") " + Alltrim(SA1->A1_TEL),      "N", "0", "029, 036")
MSCBLineH(02, 46, 98, 3)

//Dados da Transportadora com linha de separação
MSCBSay(005, 048, "Transp.: " + Alltrim(SA4->A4_NOME),                                                 "N", "0", "029, 036")
MSCBSay(005, 052, "Munic.:  " + Alltrim(SA4->A4_MUN),                                                  "N", "0", "021, 031")
MSCBSay(005, 056, "Redesp.: " + SubStr(SA4->A4_NOME, 1, 20) + " (" + SA4->A4_DDD + ") " + SA4->A4_TEL, "N", "0", "021, 031")
MSCBSay(005, 060, Alltrim(SA4->A4_END),                                                                "N", "0", "021, 031")
MSCBSay(005, 064, "Munic.: " + AllTrim(SubStr(SA4->A4_MUN, 1, 20)) + "/" + SA4->A4_EST,                "N", "0", "021, 031")
MSCBLineH(02, 68, 98, 3)

//Dados da NF
MSCBSay(005, 069, "Nota Fiscal: " + SC5->C5_NOTA,                                      "N", "0", "024, 034")
MSCBSay(005, 069, "Pedido n.: " + Alltrim(SC5->C5_NUM) + " (Consta no DANFe)",         "N", "0", "024, 034")
MSCBSay(037, 073, cValToChar(SC5->C5_VOLUME1) + " " + Upper(Alltrim(SC5->C5_ESPECI1)), "N", "0", "043, 053")
MSCBSay(005, 073, "Volume: " + cValToChar(nVolIniPvt) + "/" + cValToChar(nVolFimPvt),  "N", "0", "024, 034")

//Finaliza a etiqueta
MSCBEnd()
MSCBClosePrinter()
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Impressão Térmica
