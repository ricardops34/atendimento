---
title: "MemoWrite"
function_name: "MemoWrite"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "arquivos"
source_url: "https://terminaldeinformacao.com/knowledgebase/memowrite/"
has_examples: true
example_count: 4
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, exemplo, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:15:13"
---

# MemoWrite

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/memowrite/

## Exemplo da Rotina

```advpl
MemoWrite("Diretório", "Conteúdo")
```

## Exemplo 1- Gerando um log simples

```advpl
cArquivo  := "C:\teste\arquivo.txt"
cMensagem := "Log de Teste"

MemoWrite(cArquivo, cMensagem)
```

## Exemplo 2- Gerando um log simples na temporária do sistema operacional

```advpl
cArquivo  := GetTempPath() + "arquivo.txt"
cMensagem := "Log de Teste"

MemoWrite(cArquivo, cMensagem)
```

## Exemplo 3- Gerando um log simples dentro de uma pasta da Protheus Data

```advpl
cArquivo  := "\x_pasta\arquivo.txt"
cMensagem := "Log de Teste"

MemoWrite(cArquivo, cMensagem)
```

## Exemplo 4- Gerando um log de uma query SQL

```advpl
//Criando a consulta
cQuery := " SELECT "
cQuery += " 	BM_GRUPO, "
cQuery += " 	BM_DESC "
cQuery += " FROM "
cQuery += " 	SBM010 SBM "
cQuery += " WHERE "
cQuery += " 	SBM.D_E_L_E_T_ = ' ' "
TCQuery cQuery New Alias "QRY_SBM"

//Gerando o arquivo de log
cArquivo  := "C:\teste\query_sql.txt"
MemoWrite(cArquivo, cQuery)
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Grava um conteúdo em um arquivo texto
