---
title: "Gerando TReport em Arquivo (html, xls, etc)"
function_name: "Gerando"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "relatorios"
source_url: "https://terminaldeinformacao.com/knowledgebase/gerando-treport-em-arquivo-html-xls-etc/"
has_examples: true
example_count: 2
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:14:38"
---

# Gerando TReport em Arquivo (html, xls, etc)

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/gerando-treport-em-arquivo-html-xls-etc/

## Exemplo 1- Gerando HTML e mandando por e-Mail (job)

```advpl
//Cria as definições do relatório
oReport := fReportDef()

//Define o e-Mail de destinatário
cPara := "teste@teste.com"

//Define que será executado sem tela (job), o e-Mail destinatário, o tipo 3 (e-Mail) e gera o arquivo sem visualização
oReport:nRemoteType := NO_REMOTE
oReport:cEmail := cPara
oReport:nDevice := 3 //1-Arquivo,2-Impressora,3-email,4-Planilha e 5-Html
oReport:SetPreview(.F.)
oReport:Print(.F., "", .T.)
```

## Exemplo 2- Gerando arquivo XLS (Excel)

```advpl
//Cria as definições do relatório
oReport := fReportDef()

//Define um nome do arquivo dentro da Protheus Data - pasta 'x_arquivos'
cAnexo := '\x_arquivos\arquivo_' + dToS(dDataBase) + StrTran(Time(), ":", "-") + ".xls"

//Define para o relatório não mostrar na tela, o Device 4 (Planilha), define o arquivo, e define para imprimir
oReport:SetPreview(.F.)
oReport:SetDevice(4)
oReport:cFile := cAnexo
oReport:Print(.F.)
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

– Exemplo 2 criado conforme dica enviada por Eurai do Universo AdvPL;

## Resumo

Exemplos de geração de TReport em Arquivo
