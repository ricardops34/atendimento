---
title: "Class"
function_name: "Class"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "exemplos-de-comandos"
source_url: "https://terminaldeinformacao.com/knowledgebase/class/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:12:46"
---

# Class

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/class/

## Exemplo da Rotina

```advpl
Class SUA_CLASSE
	//Atributos
	Data xAtributo1
	Data xAtributo2

	//Métodos
	Method New() CONSTRUCTOR
	Method xMetodo1()
	Method xMetodo2()
EndClass
```

## Exemplo 1- Construção de uma classe (zPessoa) e de como utilizar (zTeste)

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*/{Protheus.doc} zPessoa
Criação da classe Pessoa
@author Terminal de Informação
@since 13/11/2016
@version 1.0
	@example
	oObjeto := zPessoa():New()
	@obs Verifique a função zTeste para ver como instanciar a Classe em um Objeto
/*/

Class zPessoa
	//Atributos
	Data cNome
	Data nIdade
	Data dNascimento

	//Métodos
	Method New() CONSTRUCTOR
	Method MostraIdade()
EndClass

/*/{Protheus.doc} New
Método que cria a instância com a classe zPessoa
@author Terminal de Informação
@since 13/11/2016
@version 1.0
	@param cNome, Caracter, Nome da Pessoa
	@param dNascimento, Data, Data de Nascimento da Pessoa
	@example
	oObjeto := zPessoa():New("João", sToD("19800712"))
/*/

Method New(cNome, dNascimento) Class zPessoa
	//Atribuindo valores nos atributos do objeto instanciado
	::cNome		:= cNome
	::dNascimento	:= dNascimento
	::nIdade		:= fCalcIdade(dNascimento)
Return Self

/*/{Protheus.doc} MostraIdade
Método que mostra a idade da pessoa
@author Terminal de Informação
@since 13/11/2016
@version 1.0
	@example
	oObjeto:MostraIdade()
/*/

Method MostraIdade() Class zPessoa
	Local cMsg := ""

	//Criando e mostrando a mensagem
	cMsg := "A <b>pessoa</b> "+::cNome+" tem "+cValToChar(::nIdade)+" anos!"
	MsgInfo(cMsg, "Atenção")
Return

/*-------------------------------------------------*
 | Função: fCalcIdade                              |
 | Descr.: Função que calcula a idade da Pessoa    |
 *-------------------------------------------------*/

Static Function fCalcIdade(dNascimento)
	Local nIdade

	//Chamando a função YearSub para subtrair os anos de uma data
	nIdade := DateDiffYear(dDataBase, dNascimento)
Return nIdade

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
	Local oPessoa
	Local cNome		:= "José"
	Local dNascimento	:= sToD("19850712")

	//Instanciando o objeto através da classe Pessoa
	oPessoa := zPessoa():New(cNome, dNascimento)

	//Chamando um método da classe
	oPessoa:MostraIdade()
Return
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Exemplo de criação de classe.
