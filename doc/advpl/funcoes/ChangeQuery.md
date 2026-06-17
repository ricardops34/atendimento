---
title: "ChangeQuery"
function_name: "ChangeQuery"
doc_type: "function"
status: "published"
page_id: 6814905
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=6814905"
tdn_last_modified: "14 nov, 2024"
exported_at: "2026-06-03 09:58:32"
has_parameters: false
has_example: true
section_keys: [vers_es, compatibilidade_banco, sistemas_operacionais, n_vel_de_acesso, idioma, programa_fonte, retorno, exemplo]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# ChangeQuery

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=6814905

## Versões

Todas

## Compatível Países

Todos

Todas TotvsDbAccess

## Sistemas Operacionais

Todos

## Nível de Acesso

Nível 1 (Acesso Clientes)

## Idiomas

Espanhol , Inglês

## Programa Fonte

APLIB070.PRWSintaxe:
ChangeQuery ( cQuery ) --> cNewQuery

## Retorno

cNewQuery
(caracter)
String contendo a query com os ajustes e compatibilizações necessárias para ser executada execução através da conexão com o SGDB atual.
Observações
Requisitos de sintaxe da Query a ser avaliada

A query deve ser codificada em sintaxe ANSI. Joins *= e similares não são suportados.
Utilização de SUBSTR: Caso utilizada, deve ser codificada na query chamando a função SUBSTRING, e a Changequery fará a troca para a função adequada de acordo com o Banco de Dados em uso.
Caso seja necessária uma operação de concatenação de strings em uma query, ela deve sempre ser realizada através do operador "||" (dois pipes em seqüência), e a Changequery fará a troca para o operador adequado para o banco em uso. É importante ressaltar que a concatenação de strings pode ser uma operação com alto custo para o banco de dados, podendo ser necessário para o banco a utilização de uma área temporária para armazenar os resultdos obtidos para processamentos intermediários, diminuindo a performance da operação.
A partir do Protheus 8, a Changequery() identifica e trata queries com selects internos (ou sub-selects). As adequações são realizadas para todos os sub-selects da query principal. Uma query não pode ultrapassar o limite de 99 sub-selects. Caso seja passada para Changequery uma query com mais de 99 sub-selects, a aplicação será abortada com a ocorrência de erro Advpl "Parser Query Error : TOO MANY SUB-SELECTS"
Em ChangeQuery(),  é recomendado o uso da clausula Where. Com a criação da regra de Acessos para visualização a empresa/un/filial logado, a query será alterada para incluir o filtro de acesso. A não inclusão prévia da clausula Where, associado ao uso de instruções como GroupBy, resultará em erro de execução.

Limitações: A ChangeQuery possui uma limitação quanto a algumas palavras reservadas fora do contexto delas, pois por padrão, ao encontrar certas palavras reservadas a ChangeQuery dá automaticamente um espaço, logo isso pode vir a quebrar a query.

## Exemplo

```text
SELECT ZZZ_FROM, ZZZ_TO FROM ZZZ010
Veja que no exemplo acima, existe a palavra FROM no campo ZZZ_FROM, por conta disso, essa query não será parseada corretamente na ChangeQuery e será retornada como SELECT ZZZ_ FROM, ZZZ_TO FROM ZZZ010
Essa situação ocorre com as seguintes palavras reservadas: - SELECT - FROM - WHERE - ORDER BY - UNION. Este comportamento ocorre inclusive para conteúdo de campos na query.
Essa limitação não pode ser corrigida por conta do legado do Protheus, então é necessário cuidado no momento de criar os campos, evitando assim tais nomes. Pode-se também utilizar a classe FWPreparedStatement, protegendo os campos e valores que se enquadram nesta situação.
Adequações realizadas X Banco de Dados

De acordo com o banco de dados em uso, segue abaixo uma relação das alterações mais significantes que podem ser realizadas pela ChangeQuery, além de alterações de sintaxe e operadores.
Todos os bancos :
- Ao ser recodificada, são removidos espaços em branco não significativos da query.
- Caso uma query contenha as expressões NOLOCK ou (NOLOCK), elas serão removidas da query retornada.
Informix :
- Caso a query possua a instrução ORDER BY contendo nomes de campos do select de origem, ela será remontada contendo a sequência numérica correspondente à ordem dos campos originais da query.
DB2 ( Todos, inclusive TOP2 e TOP4 no AS400 )
- Ao final da query, é acrescentada automaticamente a expressão "FOR READ ONLY".
- Queries com UNION são analisadas, para garantir que todos os selects que compõem a união apresentem o mesmo número de campos. Caso exista alguma inconsistência desta natureza, a aplicação é abortada com a ocorrência de erro advpl "Wrong number of fields in Union".
DB2 AS400 ( com TOPConnect 2 no AS400 )
- Caso a query possua a instrução ORDER BY contendo nomes de campos do select de origem, ela será remontada contendo a sequência numérica correspondente à ordem dos campos originais da query.

Boas práticas e recomendações ao codificar uma Query

O desempenho e confiabilidade de uma query começam na forma através da qual ela foi escrita. Veja abaixo alguns pontos importantes de atenção às boas práticas de uso de query :
Cada tipo de banco de dados possui funções nativas que podem ser utilizadas em query. Embora algumas sejam muito semelhantes, elas podem apresentar diferença de comportamento entre bancos diferentes, e até entre versões do mesmo banco. Caso realmente seja necessário o uso de uma função deste tipo, deve ser verificado com a equipe de DBA's se a função existe em todos os bancos homologados, e se o comportamento dela não apresenta variações entre estes bancos. Deve também ser evitado o uso de funções específicas não disponíveis em todos os bancos.
Evite a utilização de SELECT * (todos os campos) . O recurso de query pode agilizar muito o desenvolvimento de uma aplicação, e o foco original deste recurso é que sejam trazidos para a aplicação apenas os dados realmente necessários para o processo.
Ao montar uma query, caso a mesma necessite de um retorno ordenado (uso de ORDER BY) , procure verifiicar se a tabela em questão tem algum índice já montado que contenha os campos na ordem necessária. Utilizar um ORDER BY utilizando os campos na mesma ordem de um índice já existente faz o banco resolver a query utilizando o índice, sendo esta uma operação muito mais rápida. Partindo ainda de um indice já existente, ao codificar as condições para retorno (WHERE...) , codifique as comparações utiilzando os campos na ordem que eles aparecem no índice, mesmo que existam condições que envolvam campos que não existam no índice. Por exemplo: para uma condição onde 3 campos existem no índice (A, B e C), que aparecem no índice 1, na ordem A,B,C, e um campo D que nao consta no índice, codificar a expressão WHERE da seguinte forma : WHERE condição(A) and condição(B) and condição (C)  and condição (D) . Quando utilizamos em uma query condições com campos que não constam e chave de índice, ou utilizam funções de transformação de dados, o custo de processamento será efetivamente mais alto para o banco de dados, e pode afetar a performance da rotina dependendo do tamando das tabelas envolvidas na busca e com o número de linhas a serem analisadas e/ou agrupadas para a montagem do retorno.

Exemplos

#include "protheus.ch"
/*O exemplo abaixo ilustra o comportamento da função ChangeQuery para diferentes bancos de dados.
Execute este programa a partir de uma opção de Menu do ERP, em ambientes com TOPConnect e/ou TOTVSDBAccess, com diferentes bancos de dados.
Para cada tipo de banco, serão realizadas as adequações necessárias na expressão.*/
User Function TSTQry()
	Local cQuery
	cQuery := "SELECT CODIGO , (ID || SEQ) AS CHAVE FROM LIVROS "
	cQuery += "WHERE SUBSTRING(CONTROLE,5,2) = '02' AND NOME LIKE 'PROGRAMANDO%' "
	cQuery += "ORDER BY CODIGO"
	cQuery := ChangeQuery(cQuery)
	MsgInfo(cQuery,"ChangeQuery utilizando "+TCGetDB())
	MsgStop("Função ChangeQuery() não disponível neste Ambiente.")
Return

Parâmetros:

Nome

Tipo

Descrição

Default

Obrigatório

Referência

cQuery

Caracter

String contendo query de consulta de dados ( select ) a ser avaliado.

X
```
