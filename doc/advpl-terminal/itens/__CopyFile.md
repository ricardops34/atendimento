---
title: "__CopyFile"
function_name: "__CopyFile"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "arquivos"
source_url: "https://terminaldeinformacao.com/knowledgebase/__copyfile/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:11:32"
---

# __CopyFile

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/__copyfile/

## Exemplo da Rotina

```advpl
__CopyFile('arq_origem.txt', 'arq_destino.txt')
```

## Exemplo 1- Copiando arquivo de qualquer diretório para a Protheus Data

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
	Local aArea := GetArea()

	//Copia o arquivo
	__CopyFile('E:\teste.txt', '\teste_copiado.txt')

	RestArea(aArea)
Return
```

## Exemplo 2- Copiando arquivo de qualquer diretório para qualquer diretório

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
	Local aArea := GetArea()

	//Copia o arquivo
	__CopyFile('E:\teste.txt', 'E:\teste_novo.txt')

	RestArea(aArea)
Return
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– Universo AdvPL

## Resumo

Função que Copia arquivos entre dois diretórios.
