-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql:3306
-- Tempo de geração: 01/07/2026 às 19:02
-- Versão do servidor: 8.0.41
-- Versão do PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `bjsoft18_portal`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `agendamento`
--

CREATE TABLE `agendamento` (
  `contrato_id` int DEFAULT NULL,
  `id` int NOT NULL,
  `profissional_id` int DEFAULT NULL,
  `descricao` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `horario_inicial` datetime NOT NULL,
  `intervalo_inicial` datetime DEFAULT NULL,
  `intervalo_final` datetime DEFAULT NULL,
  `horario_final` datetime NOT NULL,
  `cor` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `observacao` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `tipo` varchar(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `data_agenda` date DEFAULT NULL,
  `hora_inicio` time DEFAULT NULL,
  `hora_fim` time DEFAULT NULL,
  `hora_intervalo_inicial` time DEFAULT NULL,
  `hora_intervalo_final` time DEFAULT NULL,
  `hora_total` time DEFAULT NULL,
  `local` char(1) COLLATE utf8mb3_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Despejando dados para a tabela `agendamento`
--

INSERT INTO `agendamento` (`contrato_id`, `id`, `profissional_id`, `descricao`, `horario_inicial`, `intervalo_inicial`, `intervalo_final`, `horario_final`, `cor`, `observacao`, `tipo`, `data_agenda`, `hora_inicio`, `hora_fim`, `hora_intervalo_inicial`, `hora_intervalo_final`, `hora_total`, `local`) VALUES
(3, 1, 1, 'FUNLEC', '2022-04-04 08:30:00', NULL, NULL, '2022-04-04 11:30:00', '#4CAF50', '<ul><li>E-Social Multiplos Vinculos<ul><li>Codigo da ocorrência: 724. Nao foi localizado um evento de remuneracao do trabalhador para o periodo e com mesmo demonstrativo de pagamento.Acao Sugerida:Deve ser um valor atribuido pela fonte pagadora em S-1200, S-1202 ou S-1207 no campo \"Identificador de Recibo de Pagamento\", obedecendo a relacao:.Se Tipo de Pagamento = [1], em S-1200;.Se Tipo de Pagamento = [4], em S-1202;.Se Tipo de Pagamento = [5], em S-1207.</li><li>Aberto Chamado 13985836</li><li>Ajuste de Eventos</li><li>Envio de Enventos S-1210 ao ESocial&nbsp;</li></ul></li></ul>', 'A', '2022-04-04', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 2, 1, 'FUNLEC', '2022-04-07 08:30:00', '2022-04-07 11:30:00', '2022-04-07 13:00:00', '2022-04-07 17:30:00', '#4CAF50', '<ul><li>API de integração de Titulos a RECEBER<ul><li>Baixa CEBAS 50%</li><li>Alteração de Titulos (Vencimento)</li><li>Cancelamento de Titulos</li></ul></li><li>Suporte a Sra Lindalva Folha de Pagamente<ul><li>Ajuste em cadastro de funcionario(Professores) na quantidade de horas semana para atender RAIS X Evento S 2206 E-Social</li></ul></li><li>Suporte a Sra Marcela Contabiliade<ul><li>Lancemento de Notas de Serviço de Pessoa Fisica fora do mes 02/2022</li><li>Esclareciment de etada para avertura de folha no Sisteme e E-Social para lançamento de INSS de pessoa Fisica</li></ul></li></ul>', 'A', '2022-04-07', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 9, 1, 'FUNLEC', '2022-04-01 08:30:00', '2022-04-01 11:30:00', '2022-04-01 13:00:00', '2022-04-01 17:30:00', '#4CAF50', '<ul><li>Ajuste API Financeiro<ul><li><span style=\"font-family: inherit; font-size: inherit;\">Alteração de titulo</span></li></ul></li></ul><ul><li><span style=\"font-family: inherit; font-size: inherit;\">Suporte Financeiro Referente a Cancelamento de Desdobramento.</span><ul><li><span style=\"font-family: inherit; font-size: inherit;\">Orientação a Sra I</span>zabelle:<ul><li>Referente ao processo de cancelamento de Desdobramento</li><li>Referente ao processo de cancelamento e exclusão de baixa de titulos</li><li>Reflexo de&nbsp;&nbsp;cancelamento e exclusão de baixa na conciliação bancária</li></ul></li></ul></li></ul>', 'A', '2022-04-01', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 10, 1, 'FUNLEC', '2022-04-05 19:00:00', NULL, NULL, '2022-04-05 21:00:00', '#4CAF50', '<font face=\"Source Sans Pro\"><ul><li>﻿Reinf 03-2022<ul><li>Analise de documento fiscal de entrada, com renteção de INSS, para verificar se todos campos necessarios para o REINF esta preenchidos. </li><li>Analise de Cadatros de Produtos para verificar se todos campos necessarios para o REINF esta preenchidos.</li><li>Analise Cadatros de relacionamento de protuto com tipos de Serviço para verificar se todos campos necessarios para o REINF esta preenchidos.</li><li>Executada Rotina de Extrator fiscal para analise de Log de integração.</li><li>Verificada falta de indice nas tabela T96 E T97.</li><li>Ajuste de Indices-Executada Rotina de Extrator fiscal.</li><li>Executada Apuração de Evento 2010 Reinf.</li><li>Conferencia de dados.</li></ul></li></ul></font>', 'A', '2022-04-05', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 11, 1, 'FUNLEC REMOTO', '2022-03-02 19:00:00', NULL, NULL, '2022-03-02 21:00:00', '#4CAF50', '<ul><li>Atualização de Pacote Acumulados 12.1.27:<ul><li>RH EXPEDICAO CONTINUA</li><li>BACKOFFICE EXPEDICAO CONTINUA</li><li>MDT EXPEDICAO CONTINUA<br></li></ul></li></ul>', 'A', '2022-03-02', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 12, 1, 'FUNLEC', '2022-03-03 08:30:00', '2022-04-07 11:30:00', '2022-04-07 13:30:00', '2022-03-03 17:30:00', '#4CAF50', '<ul><li>Folha de pagamento<ul><li>Correção de inconsistencia de envio da S1200 02-2022</li><li>Correção de inconsistencia de envio da S1210 02-2022<br><br></li></ul></li><li>Api de Integração Financeiro<ul><li>Tratamento de Dados recebido em JSON</li></ul></li></ul>', 'A', '2022-03-03', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 13, 1, 'FUNLEC', '2022-03-07 08:30:00', NULL, NULL, '2022-03-07 11:30:00', '#4CAF50', '<ul><li><span style=\"font-family: inherit; font-size: inherit;\">Folha de Pagamento:</span><ul><li>Calculo de IR roteiro ADI</li></ul></li><li>Compras<ul><li>Ajustem em base de dados Compras( Recriar tabelas de Solicitação e Contação)</li></ul></li></ul>', 'A', '2022-03-07', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 14, 1, 'FUNLEC', '2022-03-10 08:30:00', NULL, NULL, '2022-03-10 17:30:00', '#4CAF50', '<ul><li>API para integração Funlec Online (Financeiro)<ul><li>Tratamento de Retorno JSON</li></ul></li></ul>', 'A', '2022-03-10', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 15, 1, 'FUNLEC REMOTO', '2022-03-11 17:30:00', NULL, NULL, '2022-03-11 19:00:00', '#4CAF50', '<ul><li>Backup Sistema - Atualização Release 33<span style=\"white-space:pre\">	</span><br></li></ul>', 'A', '2022-03-11', '17:30:00', '19:00:00', '00:00:00', '00:00:00', '01:30:00', NULL),
(3, 16, 1, 'FUNLEC REMOTO', '2022-03-12 09:00:00', NULL, NULL, '2022-03-12 18:00:00', '#4CAF50', '<ul><li>Atualização Release 33<ul><li>Atualização de APPSERVER</li><li>UpdDistr Release 33</li><li>UpdDistr Folha de Pagamento</li><li>UpdDistr BackOffice</li><li>Teste de Acesso</li></ul></li></ul>', 'A', '2022-03-12', '09:00:00', '18:00:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 17, 1, 'FUNLEC', '2022-03-14 08:00:00', NULL, NULL, '2022-03-14 17:30:00', '#4CAF50', '<ul><li>Suporte Atualização Release 33</li><li>API para integração Funlec Online (Financeiro)<ul><li>Inclusão de Cliente</li><li>Inclusão de Aluno</li></ul></li></ul>', 'A', '2022-03-14', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(3, 18, 1, 'FUNLEC', '2022-03-17 08:30:00', NULL, NULL, '2022-03-17 17:30:00', '#4CAF50', '<ul><li>Criação de Base Teste 33 para movimentação de Titulos<ul><li>Criação de Titulos a Receber</li><li>Ajuste de Cadastro de Clientes</li></ul></li></ul>', 'A', '2022-03-17', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 19, 1, 'FUNLEC', '2022-03-18 08:30:00', NULL, NULL, '2022-03-18 17:30:00', '#4CAF50', '<ul><li>API de integração de Titulos a RECEBER<ul><li>Integração de Titulos a RECEBER</li><li>Tratamento de Baixas Referente a Bolsa CEBAS 50%</li></ul></li><li>Suporte a Contabilidade<ul><li>Criação de Regra Contabil para Devolução de ME/MD<br></li></ul></li></ul>', 'A', '2022-03-18', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 20, 1, 'FUNLEC REMOTO', '2022-03-23 19:00:00', NULL, NULL, '2022-03-23 21:00:00', '#4CAF50', '<ul><li>Atualização de Pacotes acumulados<ul><li>MDT EXPEDICAO CONTINUA de 11/03/22</li><li>BACKOFFICE EXPEDICAO CONTINUA de&nbsp; 09/03/22</li><li>RH EXPEDICAO CONTINUA de 08/03/22</li><li>UPDDISTR(MDT,BACKOFFICE e RH)</li></ul></li></ul>', 'A', '2022-03-23', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 21, 1, 'FUNLEC REMOTO', '2022-03-24 19:00:00', NULL, NULL, '2022-03-24 21:00:00', '#4CAF50', '<ul><li><span style=\"font-family: inherit; font-size: inherit;\">Ajuste em Regra Contabil para Devolução de ME/MD</span></li><li>Ajuste de Tamanho e posisção de Campo NF. Compras<br></li></ul>', 'A', '2022-03-24', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 22, 1, 'FUNLEC', '2022-03-25 13:00:00', NULL, NULL, '2022-03-25 17:30:00', '#4CAF50', '<ul><li>Geração do Evento E-Social S 2206<br></li></ul>', 'A', '2022-03-25', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(3, 23, 1, 'FUNLEC', '2022-03-28 08:30:00', NULL, NULL, '2022-03-28 11:30:00', '#4CAF50', '<ul><li>Ajuste em Regra Contabil para Devolução de ME/MD</li><li>API de integração de Titulos a RECEBER<ul><li>Tramento de Natureza</li></ul></li></ul>', 'A', '2022-03-28', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 24, 1, 'FUNLEC REMOTO', '2022-03-30 19:00:00', NULL, NULL, '2022-03-30 21:00:00', '#4CAF50', '<ul><li>CÁLCULO DA RCT DE ESTAGIÁRIOS QUE NÃO ESTAVA INCLUINDO O VALOR DO AUX.TRANSPORTE MENSAL<ul><li><span style=\"font-family: inherit; font-size: inherit;\">Ajustado o Mnemonico M_VLAUXTES de: 66.82 para: 86.87</span><br></li></ul></li></ul>', 'A', '2022-03-30', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(5, 25, 1, 'RCG', '2022-04-04 13:00:00', NULL, NULL, '2022-04-04 17:30:00', '#3a87ad', NULL, 'A', '2022-04-04', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 26, 1, 'RCG', '2022-04-05 08:30:00', NULL, NULL, '2022-04-05 17:30:00', '#3a87ad', NULL, 'A', '2022-04-05', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 27, 1, 'RCG', '2022-04-06 08:30:00', NULL, NULL, '2022-04-06 17:30:00', '#3a87ad', NULL, 'A', '2022-04-06', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(4, 28, 1, 'MSGAS', '2022-03-31 13:30:00', NULL, NULL, '2022-03-31 17:30:00', '#3a87ad', NULL, 'A', '2022-03-31', '13:30:00', '17:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 29, 1, 'RCG', '2022-03-29 08:30:00', NULL, NULL, '2022-03-29 17:30:00', '#3a87ad', NULL, 'A', '2022-03-29', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 30, 1, 'RCG', '2022-03-30 08:30:00', NULL, NULL, '2022-03-30 17:30:00', '#3a87ad', NULL, 'A', '2022-03-30', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 31, 1, 'FUNLEC', '2022-04-11 09:00:00', NULL, NULL, '2022-04-11 11:30:00', '#4CAF50', '<ul><li>Reunião para definir ajuste de Integração Financeior para tratamento desconto em folha<ul><li>Ajuste na API para adcionar o TAG, com S e N para desconto em folha, para filtro, inclusão e baixa de Titulos</li><li>Ajuste na Rotina para tratamento da TAG no Protheus</li><li>Reunião Contabilidade Sra Marcela e Financeiro Sra Izabelle Referente a tratamento desconto em folha.</li></ul></li></ul>', 'R', '2022-04-11', '09:00:00', '11:30:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(5, 32, 1, 'RCG', '2022-04-11 13:00:00', NULL, NULL, '2022-04-11 17:30:00', '#3a87ad', NULL, 'A', '2022-04-11', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 33, 1, 'RCG', '2022-04-12 08:30:00', NULL, NULL, '2022-04-12 17:00:00', '#3a87ad', NULL, 'A', '2022-04-12', '08:30:00', '17:00:00', '11:30:00', '13:00:00', '07:00:00', NULL),
(5, 34, 1, 'RCG', '2022-04-13 08:30:00', NULL, NULL, '2022-04-13 18:00:00', '#3a87ad', NULL, 'A', '2022-04-13', '08:30:00', '18:00:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(3, 39, 1, 'FUNLEC', '2022-04-18 08:30:00', NULL, NULL, '2022-04-18 17:30:00', '#4CAF50', '<ul><li>Calculo de Adiantamento Folha</li><li>Ajuste em documento Folha de Pagamento referente a LGPD<ul><li>Contrato de trabalho</li><li>Aditivo de Contrato de Trabalho</li></ul></li><li>Financeiro:<ul><li>Duvida referente a estorno de transferencia</li></ul></li></ul>', 'A', '2022-04-18', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 40, 1, 'RCG', '2022-04-19 08:30:00', NULL, NULL, '2022-04-19 19:00:00', '#000000', NULL, 'A', '2022-04-19', '08:30:00', '19:00:00', '11:30:00', '13:00:00', '09:00:00', NULL),
(5, 41, 1, 'RCG', '2022-04-20 08:30:00', NULL, NULL, '2022-04-20 16:30:00', '#000000', NULL, 'A', '2022-04-20', '08:30:00', '16:30:00', '11:30:00', '14:00:00', '05:30:00', NULL),
(3, 42, 1, 'FUNLEC', '2022-04-22 09:00:00', NULL, NULL, '2022-04-22 17:30:00', '#4CAF50', '<ul><li>API de integração Financeiro X Funlec Online<ul><li>Importação de Faturamento&nbsp;</li><li>Baixa de Bolsas CEBAS</li><li>Baixa de desconto comercial</li><li>Exclusão de Baixas</li><li>Exclusão de Titulos</li></ul></li></ul>', 'A', '2022-04-22', '09:00:00', '17:30:00', '11:30:00', '13:00:00', '07:00:00', NULL),
(3, 43, 1, 'FUNLEC', '2022-04-25 09:30:00', NULL, NULL, '2022-04-25 11:30:00', '#4CAF50', '<ul><li>API de integração Financeiro X Funlec Online<ul><li>Validação de dados importados.<ul><li>Ajuste de Item contabil.</li><li>Ajuste de Data de Contabilização.</li><li>Ajuste de Historico</li></ul></li></ul></li></ul>', 'A', '2022-04-25', '09:30:00', '11:30:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 44, 1, 'FUNLEC', '2022-04-27 08:00:00', NULL, NULL, '2022-04-27 17:30:00', '#4CAF50', '<ul><li>Reunião com Diretor Administrativo<ul><li>Descritivo de funcionamento de integração Funlec Online Protheus.</li></ul></li><li>Integração de API Financeiro:<ul><li>Integração mes 04/2022 em base de testes.</li><li>Ajuste em tratamento de Vencimento, Emissão e Competencia conforme orientação da Contabilidade.</li></ul></li></ul><p><br></p>', 'A', '2022-04-27', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(5, 46, 1, 'RCG', '2022-04-25 13:00:00', NULL, NULL, '2022-04-25 17:30:00', '#000000', NULL, 'A', '2022-04-25', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 47, NULL, 'RCG', '2022-04-26 10:00:00', NULL, NULL, '2022-04-26 11:30:00', '#000000', NULL, 'A', '2022-04-26', '10:00:00', '11:30:00', '00:00:00', '00:00:00', '01:30:00', NULL),
(5, 48, 1, 'RCG', '2022-04-26 13:00:00', NULL, NULL, '2022-04-26 18:00:00', '#000000', NULL, 'A', '2022-04-26', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 49, 1, 'RCG', '2022-04-28 09:30:00', NULL, NULL, '2022-04-28 17:30:00', '#000000', NULL, 'A', '2022-04-28', '09:30:00', '17:30:00', '11:30:00', '13:00:00', '06:30:00', NULL),
(6, 50, 1, 'GUATOS', '2022-04-23 09:00:00', NULL, NULL, '2022-04-23 17:00:00', '#FFC107', '<ul><li>Atualização de Sistema para Release 33</li></ul>', 'A', '2022-04-23', '09:00:00', '17:00:00', '12:00:00', '13:00:00', '07:00:00', NULL),
(4, 51, 1, 'MSGAS', '2022-04-23 09:00:00', NULL, NULL, '2022-04-23 11:30:00', '#000000', '<div><br></div><ul><li>Atualização de Sistema<ul><li>Aplicados pacotes acumulados dos modulos CTB&nbsp; e Contabilidade<ul><li>22-03-18_ATUALIZACAO_12.1.33_CTB_EXPEDICAO_CONTINUA</li><li>22-03-29_ATUALIZACAO_12.1.33_TAF_EXPEDICAO_CONTINUA </li><li>Executado UPDDISTR e a autocontidas no TAF</li></ul></li></ul></li></ul>', 'A', '2022-04-23', '09:00:00', '11:30:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(6, 52, 1, 'GUATOS', '2022-04-24 11:00:00', NULL, NULL, '2022-04-24 13:00:00', '#FFC107', '<ul><li>Atualização de Sistema para Release 33</li></ul>', 'A', '2022-04-24', '11:00:00', '13:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(5, 54, 1, 'RCG', '2022-04-29 07:30:00', NULL, NULL, '2022-04-29 08:00:00', '#000000', NULL, 'A', '2022-04-29', '07:30:00', '08:00:00', '00:00:00', '00:00:00', '00:30:00', NULL),
(4, 55, 1, 'MSGAS', '2022-04-08 09:00:00', NULL, NULL, '2022-04-08 11:00:00', '#000000', '<ul><li>Configuração de API BB<ul><li>Criação de Credenciais para utilização da API</li><li>Teste de consumo via POSTMAN</li></ul></li></ul>', 'A', '2022-04-08', '09:00:00', '11:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 56, 1, 'FUNLEC', '2022-04-29 08:00:00', NULL, NULL, '2022-04-29 17:30:00', '#4CAF50', '<ul><li>Folha de Pagamente:<ul><li>Base de IR multiplos vinculos</li></ul></li><li>Api de integração Financeiro<ul><li>Ajustes na gravação de Titulos do TIPO RA</li></ul></li></ul>', 'A', '2022-04-29', '08:00:00', '17:30:00', '11:30:00', '15:15:00', '05:45:00', NULL),
(4, 57, 1, 'MSGAS', '2022-04-29 13:00:00', NULL, NULL, '2022-04-29 17:30:00', '#000000', '<ul><li><span style=\"color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small;\">&nbsp;API&nbsp;&nbsp;</span><b style=\"color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small;\">movictb&nbsp;</b>balancete completo, para usar funções&nbsp; CTBR040R4 e CTBGerClean()</li></ul>', 'A', '2022-04-29', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(3, 58, 1, 'FUNLEC', '2022-05-02 08:30:00', NULL, NULL, '2022-05-02 11:30:00', '#4CAF50', '<ul><li>Api de Titulos<ul><li>Baixa de titulos recebido</li><li>Reunição para definição de tratamento de competências na inclusão de Titulos</li></ul></li></ul><p><br></p>', 'A', '2022-05-02', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 59, 1, 'RCG', '2022-05-02 10:30:00', NULL, NULL, '2022-05-02 11:30:00', '#000000', '<ul><li>Nfe Cuiaba X Alfa</li></ul>', 'A', '2022-05-02', '10:30:00', '11:30:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(3, 60, 1, 'FUNLEC', '2022-05-06 08:30:00', NULL, NULL, '2022-05-06 17:30:00', '#4CAF50', '<ul><li>Api de Titulos<ul><li>Ajuste na importação de Negociação de Titulos(PD)</li><li>Criação de Rotina Automatica para liquidação de titulos</li><li>Ajuste de data de credito nas baixas de BOLSA e Desconto Comercial</li></ul></li></ul><p><br></p>', 'A', '2022-05-06', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 61, 1, 'FUNLEC', '2022-05-09 08:30:00', NULL, NULL, '2022-05-09 11:30:00', '#4CAF50', '<ul><li>Api de Titulos<ul><li>Ajuste na importação de Negociação de Titulos(PD)</li><li>Criação de Rotina Automatica para liquidação de titulos</li></ul></li></ul>', 'A', '2022-05-09', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 62, 1, 'FUNLEC', '2022-05-12 08:30:00', NULL, NULL, '2022-05-12 17:30:00', '#4CAF50', '<ul><li>Api de Titulos<ul><li>Criação de regras de contabilização de&nbsp; Faturamento de ME e MD</li><li>Criação de regras de contabilização de&nbsp; Baixa&nbsp; de ME: CEBAS e Desconto Comercial</li><li>Contabilização de Unidade HJ mes 05 e 06/2022</li></ul></li></ul>', 'A', '2022-05-12', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 63, 1, 'FUNLEC', '2022-05-13 09:00:00', NULL, NULL, '2022-05-13 17:30:00', '#4CAF50', '<p>Api de Titulos</p><ul style=\"margin-bottom: 0px;\"><li>Consumo de API de baixa de titulos com pagamento via boleto.</li><li>Gravação de Baixa Protheus</li></ul>', 'A', '2022-05-13', '09:00:00', '17:30:00', '11:30:00', '13:00:00', '07:00:00', NULL),
(3, 64, 1, 'FUNLEC', '2022-05-17 10:00:00', NULL, NULL, '2022-05-17 11:30:00', '#4CAF50', '<p>Api de Titulos</p><ul style=\"margin-bottom: 0px;\"><li><span style=\"font-size: 1rem;\">Gravação de Baixa Protheus</span><br></li></ul>', 'A', '2022-05-17', '10:00:00', '11:30:00', '00:00:00', '00:00:00', '01:30:00', NULL),
(3, 65, 1, 'FUNLEC', '2022-05-19 09:00:00', NULL, NULL, '2022-05-19 17:30:00', '#4CAF50', '<p>Api de Titulos</p><ul style=\"margin-bottom: 0px;\"><li><span style=\"font-size: 1rem;\">Gravação de Baixa Protheus</span></li></ul><p><span style=\"font-size: 1rem;\">Reunião com Contabilidade e Financeiro, referente a procedimento de compras com cartão Corporativo:</span><br></p><ul><li><span style=\"font-size: 1rem;\">Inclusão de Naturezas</span></li><li><span style=\"font-size: 1rem;\">Inclusão de Notas Fiscais</span></li><li>Baixa e Titulos e fatura do Cartão</li></ul>', 'A', '2022-05-19', '09:00:00', '17:30:00', '11:30:00', '13:00:00', '07:00:00', NULL),
(3, 66, 1, 'FUNLEC', '2022-05-23 09:00:00', NULL, NULL, '2022-05-23 11:30:00', '#4CAF50', '<p>Api de Titulos</p><ul style=\"margin-bottom: 0px;\"><li><span style=\"font-size: 1rem;\">Gravação de Baixa Protheus(Boletos).</span></li></ul>', 'R', '2022-05-23', '09:00:00', '11:30:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(3, 67, 1, 'FUNLEC', '2022-05-26 13:00:00', NULL, NULL, '2022-05-26 17:30:00', '#4CAF50', '<p>Api de Titulos</p><ul style=\"margin-bottom: 0px;\"><li><span style=\"font-size: 1rem;\">Gravação de Baixa Protheus(Boletos).</span></li><li>Importação titulos escola OT<ul><li>Conferencia de dados importados</li></ul></li></ul>', 'A', '2022-05-26', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(3, 68, 1, 'FUNLEC', '2022-05-30 09:00:00', NULL, NULL, '2022-05-30 11:30:00', '#4CAF50', '<ul><li>Api de Titulos<ul><li>\r\nGravação de Baixa Protheus(Boletos).\r\n</li><li>Importação titulos escola OT\r\nConferencia de dados importados</li></ul></li><li>Geração de ECD<ul><li>Atualização de Sistema, aplicado&nbsp;22-05-18 ATUALIZACAO 12.1.33 CTB EXPEDICAO CONTINUA</li><li>Validação de Arquivo ECD 2021</li></ul></li></ul>', 'A', '2022-05-30', '09:00:00', '11:30:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(3, 69, 1, 'FUNLEC', '2022-06-02 09:00:00', NULL, NULL, '2022-06-02 17:30:00', '#4CAF50', '<ul><li>Api de Titulos<ul><li>Gravação de Baixa Protheus(Boletos).</li><li>Importação titulos escola OT Conferencia de dados importados</li></ul></li><li>Demonstração para Contabilidade de Passos para identificar \"erro\" apontados pelo PVA do SPED Contabil</li></ul>', 'A', '2022-06-02', '09:00:00', '17:30:00', '11:30:00', '13:30:00', '06:30:00', NULL),
(7, 70, 1, 'GAO MSGAS', '2022-05-30 14:00:00', NULL, NULL, '2022-05-30 16:00:00', '#2196F3', '<ul><li>Demotrançao de Funcionalidade MeuRH&nbsp;</li><li>Demotrançao de Funcionalidade Ponto Eletronico</li><li>Revisão de Menus MeuRH com Sr Claudimar</li></ul>', 'A', '2022-05-30', '14:00:00', '16:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 71, 1, 'FUNLEC', '2022-06-06 09:00:00', NULL, NULL, '2022-06-06 11:30:00', '#4CAF50', '<p>Importação de Titulos (API)</p><ul><li>Contas a Receber ME e MD em produção</li></ul>', 'A', '2022-06-06', '09:00:00', '11:30:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(7, 72, 1, 'GAO MSGAS', '2022-05-27 08:30:00', NULL, NULL, '2022-05-27 11:30:00', '#2196F3', '<ul><li>Revisão de Configurações MeuRH</li><li>Recriado Menu MeuRH</li></ul>', 'A', '2022-05-27', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 73, 1, 'FUNLEC', '2022-06-09 09:00:00', NULL, NULL, '2022-06-09 17:30:00', '#4CAF50', '<p>Importação de Titulos (API)</p><ul><li>Contas a Receber ME e MD em produção</li><li>Ajustes em API de retorno Funlec Online para marcar titulos como contabilizados(update)<br></li></ul>', 'A', '2022-06-09', '09:00:00', '17:30:00', '11:30:00', '13:15:00', '06:45:00', NULL),
(3, 74, 1, 'FUNLEC', '2022-06-13 09:00:00', NULL, NULL, '2022-06-13 11:30:00', '#4CAF50', '<p>Importação de Titulos (API)</p><ul><li>Contas a Receber ME e MD em produção</li><li>Ajustes em API de retorno Funlec Online para marcar titulos como contabilizados(update)</li></ul>', 'A', '2022-06-13', '09:00:00', '11:30:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(3, 75, 1, 'FUNLEC', '2022-06-20 09:00:00', NULL, NULL, '2022-06-20 11:30:00', '#4CAF50', '<p>Importação de Titulos (API)</p><ul><li>Contas a Receber ME e MD em produção</li><li>Ajustes em API de retorno Funlec Online para marcar titulos como contabilizados(update)</li></ul>', 'A', '2022-06-20', '09:00:00', '11:30:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(3, 76, 1, 'FUNLEC', '2022-06-23 09:00:00', NULL, NULL, '2022-06-23 17:30:00', '#4CAF50', '<ul><li>Revisão de configuraçoes MeuRH</li><li><span style=\"font-size: 1rem;\">Suporte a Contabilidade Geração de ECD</span><ul><li><span style=\"font-size: 1rem;\">Revisão de DRE</span></li><li><span style=\"font-size: 1rem;\">Revisão de DMPL</span></li></ul></li><li><span style=\"font-size: 1rem;\">Suporte Financeiro</span><ul><li><span style=\"font-size: 1rem;\">Correção de Cadastro de Fornecedores, que não utilizaram recurso de codigo e loja</span></li><li><span style=\"font-size: 1rem;\">Ajuste em notas fiscais, titulos e movimentações de titulos.</span></li></ul></li></ul><p>-&nbsp;</p>', 'A', '2022-06-23', '09:00:00', '17:30:00', '11:30:00', '13:00:00', '07:00:00', NULL),
(7, 77, 1, 'GAO MSGAS', '2022-06-14 14:00:00', NULL, NULL, '2022-06-14 17:00:00', '#2196F3', '<ul><li><span style=\"font-size: 1rem;\">Ajuste&nbsp;&nbsp;dos parametros</span><br></li><li>Ajuste&nbsp;&nbsp;de Acessos meuRH</li><li><span style=\"font-size: 1rem;\">Ajuste em Hierarquia&nbsp;</span><br></li></ul>', 'A', '2022-06-14', '14:00:00', '17:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(7, 78, 1, 'GAO MSGAS', '2022-06-17 09:00:00', NULL, NULL, '2022-06-17 11:00:00', '#2196F3', '<ul><li>Hierarquia para as aprovações<br></li></ul>', 'A', '2022-06-17', '09:00:00', '11:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 79, 1, 'FUNLEC', '2022-06-27 08:30:00', NULL, NULL, '2022-06-27 11:30:00', '#4CAF50', '<p>Importação de Titulos (API)</p><ul><li><span style=\"font-size: 1rem;\">Ajustes em API de retorno Funlec Online para marcar titulos como contabilizados(update)</span><br></li></ul>', 'A', '2022-06-27', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(6, 80, 1, 'GUATOS', '2022-06-27 09:30:00', NULL, NULL, '2022-06-27 11:00:00', '#FFC107', '<ul><li>ECD 2021</li></ul>', 'A', '2022-06-27', '09:30:00', '11:00:00', '00:00:00', '00:00:00', '01:30:00', NULL),
(5, 81, 1, 'RCG', '2022-06-27 13:00:00', NULL, NULL, '2022-06-27 17:30:00', '#00BCD4', NULL, 'A', '2022-06-27', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(6, 82, 1, 'GUATOS', '2022-06-27 15:00:00', NULL, NULL, '2022-06-27 16:00:00', '#FFC107', '<ul><li>ECD 2021</li></ul>', 'A', '2022-06-27', '15:00:00', '16:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(5, 83, NULL, 'RCG', '2022-06-28 08:30:00', NULL, NULL, '2022-06-28 17:00:00', '#00BCD4', NULL, 'A', '2022-06-28', '08:30:00', '17:00:00', '11:30:00', '13:00:00', '07:00:00', NULL),
(3, 84, 1, 'FUNLEC', '2022-06-30 08:30:00', NULL, NULL, '2022-06-30 17:30:00', '#4CAF50', '<ul><li>Salario base para Auxilio Maternidade de Auxilio Seguro</li><li>Consulta no Banco de Dados para Serviços Pessoa Jurídica</li><li>Calculo de Rescisão - Antencipação de contrato de trabalho com desconto</li></ul>', 'A', '2022-06-30', '08:30:00', '17:30:00', '11:30:00', '13:10:00', '07:20:00', NULL),
(4, 85, 1, 'MSGAS', '2022-06-29 08:30:00', NULL, NULL, '2022-06-29 17:30:00', '#2196F3', '<ul><li>Ajuste LOG SMS</li><li>Criação de BASE SMS em produção</li></ul>', 'A', '2022-06-29', '08:30:00', '17:30:00', '11:30:00', '14:00:00', '06:30:00', NULL),
(4, 86, 1, 'MSGAS', '2022-06-27 13:30:00', NULL, NULL, '2022-06-27 15:30:00', '#2196F3', '<ul><li>Ajustes Log SMS</li></ul>', 'A', '2022-06-27', '13:30:00', '15:30:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(4, 87, 1, 'MSGAS', '2022-06-28 09:30:00', NULL, NULL, '2022-06-28 11:00:00', '#2196F3', '<ul><li>Ajustes LOG SMS</li></ul>', 'A', '2022-06-28', '09:30:00', '11:00:00', '00:00:00', '00:00:00', '01:30:00', NULL),
(5, 88, 1, 'RCG', '2022-07-01 08:30:00', NULL, NULL, '2022-07-01 17:30:00', '#00BCD4', NULL, 'A', '2022-07-01', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(4, 89, 1, 'MSGAS', '2022-06-22 09:00:00', NULL, NULL, '2022-06-22 17:30:00', '#2196F3', '<ul><li>SMS&nbsp;</li></ul>', 'A', '2022-06-22', '09:00:00', '17:30:00', '11:30:00', '14:00:00', '06:00:00', NULL),
(4, 90, 1, 'MSGAS', '2022-06-15 08:30:00', NULL, NULL, '2022-06-15 17:30:00', '#2196F3', '<ul><li>Boleto Online BB&nbsp;</li></ul>', 'A', '2022-06-15', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(4, 91, 1, 'MSGAS', '2022-06-13 10:00:00', NULL, NULL, '2022-06-13 11:00:00', '#2196F3', '<ul><li>Efd Reinf</li></ul>', 'A', '2022-06-13', '10:00:00', '11:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(5, 92, 1, 'RCG', '2022-06-21 08:30:00', NULL, NULL, '2022-06-21 17:30:00', '#00BCD4', NULL, 'A', '2022-06-21', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 93, 1, 'RCG', '2022-06-20 13:10:00', NULL, NULL, '2022-06-20 17:30:00', '#00BCD4', NULL, 'A', '2022-06-20', '13:10:00', '17:30:00', '00:00:00', '00:00:00', '04:20:00', NULL),
(5, 94, 1, 'RCG', '2022-06-24 08:00:00', NULL, NULL, '2022-06-24 17:30:00', '#00BCD4', NULL, 'A', '2022-06-24', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(5, 95, 1, 'RCG', '2022-06-14 08:30:00', NULL, NULL, '2022-06-14 17:30:00', '#00BCD4', NULL, 'A', '2022-06-14', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 96, 1, 'RCG', '2022-06-13 13:00:00', NULL, NULL, '2022-06-13 17:30:00', '#00BCD4', NULL, 'A', '2022-06-13', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 97, NULL, 'RCG', '2022-06-17 08:30:00', NULL, NULL, '2022-06-17 18:00:00', '#00BCD4', NULL, 'A', '2022-06-17', '08:30:00', '18:00:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(4, 98, 1, 'MSGAS', '2022-06-08 08:30:00', NULL, NULL, '2022-06-08 17:30:00', '#2196F3', '<ul><li>API BB Boleto</li></ul>', 'A', '2022-06-08', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(4, 99, 1, 'MSGAS', '2022-06-01 08:30:00', NULL, NULL, '2022-06-01 17:30:00', '#2196F3', '<ul><li>API&nbsp; BB Boleto</li></ul>', 'A', '2022-06-01', '08:30:00', '17:30:00', '11:30:00', '13:10:00', '07:20:00', NULL),
(8, 100, 1, 'Health', '2022-06-14 18:00:00', NULL, NULL, '2022-06-14 22:00:00', '#9E9E9E', '<ul><li><div style=\"color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small;\">Atualização de LIB</div></li><li style=\"color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small;\">Atualização módulos:<ul><li style=\"color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small;\">22-06-01_ATUALIZACAO_12.1.33_<wbr style=\"color: rgb(102, 102, 102); font-family: &quot;Roboto Condensed&quot;, Roboto, sans-serif; font-size: 16px; letter-spacing: -0.2px;\"><span style=\"color: rgb(102, 102, 102); font-family: &quot;Roboto Condensed&quot;, Roboto, sans-serif; font-size: 16px; letter-spacing: -0.2px;\">BACKOFFICE_EXPEDICAO_CONTINUA</span></li><li style=\"color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small;\">22-06-06_ATUALIZACAO_12.1.33_<wbr style=\"color: rgb(102, 102, 102); font-family: &quot;Roboto Condensed&quot;, Roboto, sans-serif; font-size: 16px; letter-spacing: -0.2px;\"><span style=\"color: rgb(102, 102, 102); font-family: &quot;Roboto Condensed&quot;, Roboto, sans-serif; font-size: 16px; letter-spacing: -0.2px;\">CTB_ECF_EXPEDICAO_CONTINUA</span></li><li style=\"color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small;\">22-06-07_ATUALIZACAO_12.1.33_<wbr style=\"color: rgb(102, 102, 102); font-family: &quot;Roboto Condensed&quot;, Roboto, sans-serif; font-size: 16px; letter-spacing: -0.2px;\"><span style=\"color: rgb(102, 102, 102); font-family: &quot;Roboto Condensed&quot;, Roboto, sans-serif; font-size: 16px; letter-spacing: -0.2px;\">RH_EXPEDICAO_CONTINUA</span></li><li style=\"color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small;\">22-05-27_ATUALIZACAO_12.1.33_<wbr style=\"color: rgb(102, 102, 102); font-family: &quot;Roboto Condensed&quot;, Roboto, sans-serif; font-size: 16px; letter-spacing: -0.2px;\"><span style=\"color: rgb(102, 102, 102); font-family: &quot;Roboto Condensed&quot;, Roboto, sans-serif; font-size: 16px; letter-spacing: -0.2px;\">TAF_EXPEDICAO_CONTINUA</span></li></ul></li></ul>', 'A', '2022-06-14', '18:00:00', '22:00:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(8, 101, 1, 'Health', '2022-06-20 08:00:00', NULL, NULL, '2022-06-20 10:00:00', '#9E9E9E', '<ul><li>Suporte</li></ul>', 'A', '2022-06-20', '08:00:00', '10:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(8, 102, 1, 'Health', '2022-06-21 08:00:00', NULL, NULL, '2022-06-21 10:00:00', '#9E9E9E', '<ul><li>Suporte&nbsp;</li></ul>', 'A', '2022-06-21', '08:00:00', '10:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(8, 103, 1, 'Health', '2022-06-22 08:00:00', NULL, NULL, '2022-06-22 10:00:00', '#9E9E9E', '<ul><li>Suporte</li></ul>', 'A', '2022-06-22', '08:00:00', '10:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(8, 104, 1, 'Health', '2022-06-23 08:00:00', NULL, NULL, '2022-06-23 10:00:00', '#9E9E9E', '<ul><li>Suporte</li></ul>', 'A', '2022-06-23', '08:00:00', '10:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(4, 105, 1, 'MSGAS', '2022-06-07 20:00:00', NULL, NULL, '2022-06-07 23:00:00', '#2196F3', '<ul><li>Atualização Sistema<ul><li>22-06-01_ATUALIZACAO_12.1.33_BACKOFFICE_EXPEDICAO_CONTINUA</li><li>2﻿2-06-06_ATUALIZACAO_12.1.33_CTB_ECF_EXPEDICAO_CONTINUA</li><li><span style=\"font-size: 1rem;\">22-06-07_ATUALIZACAO_12.1.33_RH_EXPEDICAO_CONTINUA</span></li><li>22-05-27_ATUALIZACAO_12.1.33_TAF_EXPEDICAO_CONTINUA</li></ul></li></ul>', 'A', '2022-06-07', '20:00:00', '23:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 106, 1, 'RCG', '2022-06-07 08:30:00', NULL, NULL, '2022-06-07 17:30:00', '#00BCD4', NULL, 'A', '2022-06-07', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 107, 1, 'RCG', '2022-06-10 09:00:00', NULL, NULL, '2022-06-10 17:30:00', '#00BCD4', NULL, 'A', '2022-06-10', '09:00:00', '17:30:00', '11:30:00', '13:00:00', '07:00:00', NULL),
(5, 108, 1, 'RCG', '2022-06-06 13:00:00', NULL, NULL, '2022-06-06 17:30:00', '#00BCD4', NULL, 'A', '2022-06-06', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(3, 109, 1, 'FUNLEC', '2022-07-04 08:30:00', NULL, NULL, '2022-07-04 11:30:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento<ul><li>Calculo de Rescisão em contrato de experiencia</li><li>Calculo de Folha de Pagamento de Professor(INSS)</li></ul></li></ul>', 'A', '2022-07-04', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 110, 1, 'RCG', '2022-07-04 13:00:00', NULL, NULL, '2022-07-04 17:30:00', '#00BCD4', NULL, 'A', '2022-07-04', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 111, 1, 'RCG', '2022-07-05 08:30:00', NULL, NULL, '2022-07-05 17:30:00', '#00BCD4', NULL, 'A', '2022-07-05', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(4, 112, 1, 'MSGAS', '2022-07-06 08:30:00', NULL, NULL, '2022-07-06 17:30:00', '#2196F3', '<ul><li>Manisfesto de Destinatario<ul><li>Atualização Ambiente DEV</li><li>Teste Rotina de Manifesto</li></ul></li></ul>', 'A', '2022-07-06', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(3, 113, 1, 'FUNLEC', '2022-07-07 08:30:00', NULL, NULL, '2022-07-07 17:30:00', '#4CAF50', '<ul><li>Correção de Erro em gravação de LOG de exclusão em lancamento contabil</li><li>Ajuste em rotina de geração de ECF</li></ul>', 'A', '2022-07-07', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 114, 1, 'FUNLEC', '2022-07-11 09:00:00', NULL, NULL, '2022-07-11 11:30:00', '#4CAF50', '<ul><li>Ajuste em regra de contabilização de Cancelamento de Baixa de Titulos a Receber com Bolsa</li><li>Ajuste em regra de contabilização de Cancelamento de Baixa de Titulos a Receber com Desconto Comercial</li></ul>', 'A', '2022-07-11', '09:00:00', '11:30:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(3, 115, 1, 'FUNLEC', '2022-07-14 09:45:00', NULL, NULL, '2022-07-14 17:30:00', '#4CAF50', '<ul><li>Api de Titulos<ul><li>Gravação de FLAG de integração FunlecOnline</li></ul></li></ul>', 'A', '2022-07-14', '09:45:00', '17:30:00', '11:30:00', '13:00:00', '06:15:00', NULL),
(4, 116, 1, 'MSGAS', '2022-07-13 08:30:00', NULL, NULL, '2022-07-13 17:30:00', '#2196F3', '<ul><li>Api Boleto BB</li></ul>', 'A', '2022-07-13', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(5, 117, 1, 'RCG', '2022-07-11 13:00:00', NULL, NULL, '2022-07-11 18:00:00', '#00BCD4', NULL, 'A', '2022-07-11', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 118, 1, 'RCG', '2022-07-12 08:30:00', NULL, NULL, '2022-07-12 18:00:00', '#00BCD4', NULL, 'A', '2022-07-12', '08:30:00', '18:00:00', '12:00:00', '14:30:00', '07:00:00', NULL),
(5, 119, 1, 'RCG', '2022-07-15 08:30:00', NULL, NULL, '2022-07-15 18:00:00', '#00BCD4', NULL, 'A', '2022-07-15', '08:30:00', '18:00:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(3, 120, 1, 'FUNLEC', '2022-07-18 08:30:00', NULL, NULL, '2022-07-18 11:30:00', '#4CAF50', '<ul><li>Api de Titulos<ul><li>Baixa de Titulos recebidos via Boleto</li></ul></li></ul>', 'A', '2022-07-18', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 121, 1, 'MSGAS', '2022-07-20 08:30:00', NULL, NULL, '2022-07-20 17:30:00', '#2196F3', '<ul><li>Suporte Atualização</li><li>MDF-e Produção</li><li>JOB MDF-e</li><li>Chamado 14794863 referente a lentidão na abertura do sistema por conta do TOTVSNEWS</li></ul>', 'A', '2022-07-20', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(4, 122, 1, 'MSGAS', '2022-07-19 20:00:00', NULL, NULL, '2022-07-19 22:30:00', '#2196F3', '<ul><li>Atualização do sistema. Pacotes aplicados:<ul><li>22-06-13-LIB_LABEL_13062022_P12_HARPIA</li><li>22-07-07_ATUALIZACAO_12.1.33_TSS_PROTHEUS_EXPEDICAO_CONTINUA</li><li>22-07-13_ATUALIZACAO_12.1.33_BACKOFFICE_EXPEDICAO_CONTINUA</li><li>22-07-12_ATUALIZACAO_12.1.33_RH_EXPEDICAO_CONTINUA</li><li>22-07-15_ATUALIZACAO_12.1.33_TAF_EXPEDICAO_CONTINUA</li><li>22-07-12_ATUALIZACAO_12.1.33_PCO_EXPEDICAO_CONTINUA</li></ul></li></ul><p><ul></ul></p><ul><li>UpdDistr Aplicados:<ul><li>RH, TAF e BACKOFFICE</li></ul></li></ul><p><ul></ul></p><ul><li>Atualização de Binarios Appserver e Dbaccess</li></ul>', 'A', '2022-07-19', '20:00:00', '22:30:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(5, 123, 1, 'RCG', '2022-07-19 08:30:00', NULL, NULL, '2022-07-19 19:00:00', '#00BCD4', NULL, 'A', '2022-07-19', '08:30:00', '19:00:00', '12:00:00', '13:00:00', '09:30:00', NULL),
(5, 124, 1, 'RCG', '2022-07-18 13:00:00', NULL, NULL, '2022-07-18 18:00:00', '#00BCD4', NULL, 'A', '2022-07-18', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(3, 125, 1, 'FUNLEC', '2022-07-21 08:30:00', NULL, NULL, '2022-07-21 17:30:00', '#4CAF50', '<ul><li>Configuração de Manifesto de destinario para baixar XML</li><li>Relatorio de Justificativa de Ponto</li><li><span style=\"font-size: 1rem;\">Configuração para Redução de Base de cálculo do ISS</span><br></li></ul>', 'A', '2022-07-21', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 126, 1, 'FUNLEC', '2022-07-25 08:30:00', NULL, NULL, '2022-07-25 11:30:00', '#4CAF50', '<ul><li>Demonstração Modulo de Compras</li></ul>', 'A', '2022-07-25', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 127, 1, 'FUNLEC', '2022-07-28 08:30:00', NULL, NULL, '2022-07-28 17:30:00', '#4CAF50', '<ul><li>Amaração Produto Fornecedor&nbsp;</li><li>Manisfesto do destinario, para baixa de XML</li><li>Impressão de Danfe de Fornecedor</li><li>Ajuste de Folha - Salario Professor(U_FOR011)</li></ul>', 'A', '2022-07-28', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(4, 128, 1, 'MSGAS', '2022-07-27 08:30:00', NULL, NULL, '2022-07-27 17:30:00', '#2196F3', '<ul><li>Manifesto de Destinatorio - Baixa de XML</li><li>Ajuste na Impressão de Danfe</li></ul>', 'A', '2022-07-27', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(4, 129, 1, 'MSGAS', '2022-07-27 19:00:00', NULL, NULL, '2022-07-27 21:00:00', '#2196F3', '<ul><li>Ajuste na Impressão de Danfe(XML)</li></ul>', 'A', '2022-07-27', '19:00:00', '21:00:00', NULL, NULL, '02:00:00', NULL),
(5, 130, 1, 'RCG', '2022-07-26 08:30:00', NULL, NULL, '2022-07-26 17:30:00', '#00BCD4', NULL, 'A', '2022-07-26', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 131, 1, 'RCG', '2022-07-25 13:00:00', NULL, NULL, '2022-07-25 18:00:00', '#00BCD4', NULL, 'A', '2022-07-25', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 132, 1, 'RCG', '2022-07-29 08:30:00', NULL, NULL, '2022-07-29 17:30:00', '#00BCD4', NULL, 'A', '2022-07-29', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(4, 133, 1, 'MSGAS', '2022-07-28 19:30:00', NULL, NULL, '2022-07-28 21:00:00', '#2196F3', '<ul><li>Boleto API BB</li></ul>', 'A', '2022-07-28', '19:30:00', '21:00:00', '00:00:00', '00:00:00', '01:30:00', NULL),
(5, 134, 1, 'RCG', '2022-07-08 08:30:00', NULL, NULL, '2022-07-08 17:30:00', '#00BCD4', NULL, 'A', '2022-07-08', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 135, 1, 'RCG', '2022-07-22 08:30:00', NULL, NULL, '2022-07-22 17:30:00', '#00BCD4', NULL, 'A', '2022-07-22', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 136, 1, 'FUNLEC', '2022-08-01 09:00:00', NULL, NULL, '2022-08-01 11:30:00', '#4CAF50', '<ul><li>Amaração Produto Fornecedor&nbsp;</li><li>Importação de XML</li></ul>', 'A', '2022-08-01', '09:00:00', '11:30:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(4, 137, 1, 'MSGAS', '2022-08-03 09:00:00', NULL, NULL, '2022-08-03 17:30:00', '#2196F3', '<ul><li>Api de Registro Boleto BB</li><li>Chamado(<span style=\"color: rgb(0, 0, 0); font-family: Arial, Helvetica, sans-serif; font-size: 15px;\">14896961</span>) para Registro de boleto com PIX</li></ul>', 'A', '2022-08-03', '09:00:00', '17:30:00', '11:30:00', '13:30:00', '06:30:00', NULL),
(3, 138, 1, 'FUNLEC', '2022-08-04 08:30:00', NULL, NULL, '2022-08-04 17:30:00', '#4CAF50', '<ul><li>Analise de movimento contabil</li><li>Geração de Evento s2240&nbsp;</li></ul>', 'A', '2022-08-04', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 139, 1, 'RCG', '2022-08-02 08:30:00', NULL, NULL, '2022-08-02 18:00:00', '#00BCD4', NULL, 'A', '2022-08-02', '08:30:00', '18:00:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(5, 140, 1, 'RCG', '2022-08-01 13:00:00', NULL, NULL, '2022-08-01 17:30:00', '#00BCD4', NULL, 'A', '2022-08-01', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(3, 141, 1, 'FUNLEC', '2022-08-08 08:30:00', NULL, NULL, '2022-08-08 11:30:00', '#4CAF50', '<ul><li>Revisão de Lancamento Pradrão - Compras - Referente a Compras com cartão coorporativo.</li></ul>', 'A', '2022-08-08', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 142, 1, 'MSGAS', '2022-08-10 09:00:00', NULL, NULL, '2022-08-10 17:30:00', '#2196F3', '<ul><li>Registro de Titulos via API</li></ul>', 'A', '2022-08-10', '09:00:00', '17:30:00', '11:30:00', '14:30:00', '05:30:00', NULL),
(3, 143, 1, 'FUNLEC', '2022-08-11 08:30:00', NULL, NULL, '2022-08-11 17:30:00', '#4CAF50', '<ul><li>Ajuste Importacao XML</li></ul>', 'A', '2022-08-11', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 144, 1, 'FUNLEC', '2022-08-15 08:30:00', NULL, NULL, '2022-08-15 11:30:00', '#4CAF50', '<ul><li>Revisão de LP 532 - Para devolução de ME/MD</li><li>Demonstração de Processo de Contação -&gt; Compras</li></ul>', 'A', '2022-08-15', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 145, 1, 'RCG', '2022-08-15 13:00:00', NULL, NULL, '2022-08-15 17:30:00', '#00BCD4', NULL, 'A', '2022-08-15', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 146, 1, 'RCG', '2022-08-16 08:40:00', NULL, NULL, '2022-08-16 18:00:00', '#00BCD4', NULL, 'A', '2022-08-16', '08:40:00', '18:00:00', '11:30:00', '13:25:00', '07:25:00', NULL),
(4, 147, 1, 'MSGAS', '2022-08-17 08:30:00', NULL, NULL, '2022-08-17 17:30:00', '#2196F3', '<ul><li>API de registro de Cobrança BB</li><li>Reunião com Elizena para alinhamento de processo</li><li>Teste de PE para filtro de Titulos no Bordero</li></ul>', 'A', '2022-08-17', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(3, 148, 1, 'FUNLEC', '2022-08-18 08:30:00', NULL, NULL, '2022-08-18 17:30:00', '#4CAF50', '<ul><li>Ajustes Modulo de compras</li><li>Ajuste XML</li></ul>', 'A', '2022-08-18', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 149, 1, 'RCG', '2022-08-08 13:25:00', NULL, NULL, '2022-08-08 17:30:00', '#00BCD4', NULL, 'A', '2022-08-08', '13:25:00', '17:30:00', '00:00:00', '00:00:00', '04:05:00', NULL),
(5, 150, 1, 'RCG', '2022-08-09 08:30:00', NULL, NULL, '2022-08-09 18:00:00', '#00BCD4', NULL, 'A', '2022-08-09', '08:30:00', '18:00:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(5, 151, 1, 'RCG', '2022-08-05 08:30:00', NULL, NULL, '2022-08-05 17:30:00', '#00BCD4', NULL, 'A', '2022-08-05', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 152, 1, 'RCG', '2022-08-12 08:30:00', NULL, NULL, '2022-08-12 17:30:00', '#00BCD4', NULL, 'A', '2022-08-12', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 153, 1, 'RCG', '2022-08-19 08:30:00', NULL, NULL, '2022-08-19 17:30:00', '#00BCD4', NULL, 'A', '2022-08-19', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(4, 154, 1, 'MSGAS', '2022-08-18 13:30:00', NULL, NULL, '2022-08-18 17:00:00', '#2196F3', '<ul><li>Importação Arquivo AFD ponto eletronico</li></ul>', 'A', '2022-08-18', '13:30:00', '17:00:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(4, 155, 1, 'MSGAS', '2022-08-19 09:00:00', NULL, NULL, '2022-08-19 17:00:00', '#2196F3', '<ul><li>Importação Arquivo AFD ponto eletronico</li></ul>', 'A', '2022-08-19', '09:00:00', '17:00:00', '11:30:00', '13:00:00', '06:30:00', NULL),
(3, 156, 1, 'FUNLEC', '2022-08-22 08:30:00', NULL, NULL, '2022-08-22 11:30:00', '#4CAF50', '<ul><li>Revisão de Cadastro de Departamentos</li><li>Automação Centro de Custo -&gt; Sede / Unidade(Cadastro de Produtos)</li><li>Controle de Obra(Nota Fiscal - Campo Informativo para numero do Chamado )</li></ul>', 'A', '2022-08-22', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 157, 1, 'MSGAS', '2022-08-24 08:30:00', NULL, NULL, '2022-08-24 17:30:00', '#2196F3', '<ul><li>Ajuste em modulo Ponto eletronica para leitura de Arquivo AFD</li><li>Api BB de registro de boletos<ul><li>PE na gravação de Bordero</li></ul></li></ul>', 'A', '2022-08-24', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(3, 158, 1, 'FUNLEC', '2022-08-25 08:10:00', NULL, NULL, '2022-08-25 17:30:00', '#4CAF50', '<ul><li>Ajustes em regra de contabilização de movimento de importação de caixa escola para transferencia de valores cartão (Banco VS) natureza 649999</li><li>Ajustes em regra de contabilização de movimento de importação de caixa escola para transferencia de valores Dinheiro (Banco CX) natureza 649999</li></ul>', 'A', '2022-08-25', '08:10:00', '17:30:00', '11:30:00', '13:20:00', '07:30:00', NULL),
(5, 159, 1, 'RCG', '2022-08-22 13:20:00', NULL, NULL, '2022-08-22 17:30:00', '#00BCD4', NULL, 'A', '2022-08-22', '13:20:00', '17:30:00', '00:00:00', '00:00:00', '04:10:00', NULL),
(5, 160, 1, 'RCG', '2022-08-23 08:30:00', NULL, NULL, '2022-08-23 18:00:00', '#00BCD4', NULL, 'A', '2022-08-23', '08:30:00', '18:00:00', '11:30:00', '13:10:00', '07:50:00', NULL),
(5, 161, 1, 'RCG', '2022-08-26 08:00:00', NULL, NULL, '2022-08-26 17:30:00', '#00BCD4', NULL, 'A', '2022-08-26', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(3, 162, 1, 'FUNLEC', '2022-08-29 08:30:00', NULL, NULL, '2022-08-29 11:30:00', '#4CAF50', '<ul><li>Revisão Lancamento Contabil - Compras cartão coorporativo Escola</li></ul>', 'A', '2022-08-29', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 163, 1, 'MSGAS', '2022-08-30 20:00:00', NULL, NULL, '2022-08-30 22:00:00', '#2196F3', '<ul><li>Api Pedido de Vendas</li></ul>', 'A', '2022-08-30', '20:00:00', '22:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(5, 164, 1, 'RCG', '2022-08-29 13:15:00', NULL, NULL, '2022-08-29 17:30:00', '#00BCD4', NULL, 'A', '2022-08-29', '13:15:00', '17:30:00', '00:00:00', '00:00:00', '04:15:00', NULL),
(5, 165, 1, 'RCG', '2022-08-30 08:30:00', NULL, NULL, '2022-08-30 18:00:00', '#00BCD4', NULL, 'A', '2022-08-30', '08:30:00', '18:00:00', '11:30:00', '13:10:00', '07:50:00', NULL),
(5, 166, 1, 'RCG', '2022-08-31 08:30:00', NULL, NULL, '2022-08-31 18:00:00', '#00BCD4', NULL, 'A', '2022-08-31', '08:30:00', '18:00:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(3, 167, 1, 'FUNLEC', '2022-09-01 09:00:00', NULL, NULL, '2022-09-01 17:30:00', '#4CAF50', '<ul><li>Lancamento de Nota de Serviço - Com redução de Base de ISS</li><li>Lancamento de Devolução de Compras(Titulo de NCF).</li><li>Revisão Lancamento Contabil - Importação de Caixa SEDE/Escola</li></ul>', 'A', '2022-09-01', '09:00:00', '17:30:00', '11:30:00', '13:00:00', '07:00:00', NULL),
(4, 168, 1, 'MSGAS', '2022-09-02 08:00:00', NULL, NULL, '2022-09-02 17:30:00', '#2196F3', '<ul><li>Api BB de registro de boletos<ul><li>PE na gravação de Bordero</li></ul></li></ul>', 'A', '2022-09-02', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(3, 169, 1, 'FUNLEC', '2022-09-05 08:30:00', NULL, NULL, '2022-09-05 11:30:00', '#4CAF50', '<ul><li>Ajuste em contabilização de movimento de Caixa 04,05 e 06/2022</li></ul>', 'A', '2022-09-05', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 170, 1, 'RCG', '2022-09-05 13:00:00', NULL, NULL, '2022-09-05 18:00:00', '#00BCD4', NULL, 'A', '2022-09-05', '13:00:00', '18:00:00', NULL, '00:00:00', '01:00:00', NULL),
(3, 171, 1, 'FUNLEC(REMOTO)', '2022-09-05 14:00:00', NULL, NULL, '2022-09-05 17:30:00', '#4CAF50', '<ul><li>Ajuste em contabilização de movimento de Caixa 04,05 e 06/2022</li></ul>', 'A', '2022-09-05', '14:00:00', '17:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(3, 172, 1, 'FUNLEC(REMOTO)', '2022-09-05 19:00:00', NULL, NULL, '2022-09-05 22:00:00', '#4CAF50', '<ul><li>Ajuste em contabilização de movimento de Caixa 04,05 e 06/2022</li></ul>', 'A', '2022-09-05', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 173, 1, 'RCG', '2022-09-06 08:30:00', NULL, NULL, '2022-09-06 18:00:00', '#00BCD4', NULL, 'A', '2022-09-06', '08:30:00', '18:00:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(3, 174, 1, 'FUNLEC(REMOTO)', '2022-09-06 14:00:00', NULL, NULL, '2022-09-06 17:00:00', '#4CAF50', '<ul><li>Ajuste em contabilização de movimento de Caixa 04,05 e 06/2022</li></ul>', 'A', '2022-09-06', '14:00:00', '17:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 175, 1, 'FUNLEC', '2022-09-08 08:00:00', NULL, NULL, '2022-09-08 17:30:00', '#4CAF50', '<ul><li>Ajuste em contabilização de movimento de Caixa 04,05 e 06/2022</li></ul>', 'A', '2022-09-08', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL);
INSERT INTO `agendamento` (`contrato_id`, `id`, `profissional_id`, `descricao`, `horario_inicial`, `intervalo_inicial`, `intervalo_final`, `horario_final`, `cor`, `observacao`, `tipo`, `data_agenda`, `hora_inicio`, `hora_fim`, `hora_intervalo_inicial`, `hora_intervalo_final`, `hora_total`, `local`) VALUES
(3, 176, 1, 'FUNLEC', '2022-09-12 08:00:00', NULL, NULL, '2022-09-12 11:30:00', '#4CAF50', '<ul><li>Ajuste em contabilização movimento bancario 04,05 e 06/2022</li><li>Ajuste em contabilização de Visa 04,05 e 06/2022</li><li>Ajuste em contabilização de movimento de Caixa 04,05 e 06/2022</li></ul>', 'A', '2022-09-12', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(5, 177, 1, 'RCG', '2022-09-09 08:30:00', NULL, NULL, '2022-09-09 17:30:00', '#00BCD4', NULL, 'A', '2022-09-09', '08:30:00', '17:30:00', '11:30:00', '13:10:00', '07:20:00', NULL),
(5, 178, 1, 'RCG', '2022-09-12 13:10:00', NULL, NULL, '2022-09-12 17:30:00', '#00BCD4', NULL, 'A', '2022-09-12', '13:10:00', '17:30:00', '00:00:00', '00:00:00', '04:20:00', NULL),
(5, 179, NULL, 'RCG', '2022-09-13 08:30:00', NULL, NULL, '2022-09-13 18:00:00', '#00BCD4', NULL, 'A', '2022-09-13', '08:30:00', '18:00:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(4, 180, 1, 'MSGAS', '2022-09-13 19:20:00', NULL, NULL, '2022-09-13 22:00:00', '#2196F3', '<ul><li>Atualização de Sistema</li></ul>', 'A', '2022-09-13', '19:20:00', '22:00:00', '00:00:00', '00:00:00', '02:40:00', NULL),
(4, 181, 1, 'MSGAS', '2022-09-14 08:30:00', NULL, NULL, '2022-09-14 17:30:00', '#2196F3', '<ul><li>PE para API de Boleto BB</li></ul>', 'A', '2022-09-14', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(3, 182, 1, 'FUNLEC', '2022-09-15 10:30:00', NULL, NULL, '2022-09-15 17:30:00', '#4CAF50', '<ul><li>Ajuste evento S-2240 - E-Social</li><li>Ajuste JOB para evento S-2206</li><li>Ajuste em contabilização de movimento de Caixa Visa 04,05 e 06/2022</li></ul><p><br></p>', 'A', '2022-09-15', '10:30:00', '17:30:00', '11:30:00', '13:00:00', '05:30:00', NULL),
(5, 183, 1, 'RCG', '2022-09-16 08:30:00', NULL, NULL, '2022-09-16 17:30:00', '#00BCD4', NULL, 'A', '2022-09-16', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(4, 184, 1, 'MSGAS', '2022-09-16 13:15:00', NULL, NULL, '2022-09-16 14:00:00', '#2196F3', '<ul><li>Importação de ADF Ponto</li></ul>', 'A', '2022-09-16', '13:15:00', '14:00:00', '00:00:00', '00:00:00', '00:45:00', NULL),
(3, 185, 1, 'FUNLEC', '2022-09-19 08:30:00', NULL, NULL, '2022-09-19 11:30:00', '#4CAF50', '<ul><li>Revisão de Contabilização VisaNet Caixa sede unidades</li></ul>', 'A', '2022-09-19', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 186, 1, 'MSGAS', '2022-09-21 08:30:00', NULL, NULL, '2022-09-21 17:30:00', '#2196F3', '<ul><li>Fechamento de Ponto</li><li>Ajuste de impressão de Holerite meu rh</li><li>Cadastro de API BB em produção</li></ul>', 'A', '2022-09-21', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(3, 187, 1, 'FUNLEC', '2022-09-23 09:00:00', NULL, NULL, '2022-09-23 17:30:00', '#4CAF50', '<ul><li>Atualização de IMPGRFC.PRX<br></li><li>Calculo de Rescisão complementar&nbsp;</li><li>Geração de Verba de substituição</li><li>Geração de 2240 na adimissão</li></ul>', 'A', '2022-09-23', '09:00:00', '17:30:00', '11:30:00', '13:00:00', '07:00:00', NULL),
(5, 188, 1, 'RCG', '2022-09-22 08:30:00', NULL, NULL, '2022-09-22 18:00:00', '#00BCD4', NULL, 'A', '2022-09-22', '08:30:00', '18:00:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(5, 189, 1, 'RCG', '2022-09-20 08:30:00', NULL, NULL, '2022-09-20 17:30:00', '#00BCD4', NULL, 'A', '2022-09-20', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 190, 1, 'RCG', '2022-09-19 13:00:00', NULL, NULL, '2022-09-19 17:30:00', '#00BCD4', NULL, 'A', '2022-09-19', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(3, 191, 1, 'FUNLEC', '2022-09-26 08:30:00', NULL, NULL, '2022-09-26 11:30:00', '#4CAF50', '<p>Ajuste em cadastro de Funcionario para gerar o S2240</p><ul><li>SAMILY GONÇALVES DE CARVALHO OLIVEIRA - HAG</li><li>FLAVIA DE BRITES OLIVEIRA - LMF</li></ul><p>Conferencia de lancamentos na conta&nbsp;&nbsp;11020801&nbsp; contra movimento bancario da conta VS VISANET SEDE</p>', 'A', '2022-09-26', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 192, 1, 'MSGAS', '2022-09-28 08:30:00', NULL, NULL, '2022-09-28 15:30:00', '#2196F3', '<ul><li>Api BB Produção</li></ul>', 'A', '2022-09-28', '08:30:00', '15:30:00', '11:30:00', '13:30:00', '05:00:00', NULL),
(3, 193, 1, 'FUNLEC', '2022-09-29 08:30:00', NULL, NULL, '2022-09-29 17:30:00', '#4CAF50', '<ul><li>Conferencia de IR em folha de Funcionario com Ferias</li><li>Contabilização movimento VISA mes 07/2022, para ajustes</li></ul>', 'A', '2022-09-29', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 194, 1, 'RCG', '2022-09-26 13:00:00', NULL, NULL, '2022-09-26 17:30:00', '#00BCD4', NULL, 'A', '2022-09-26', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 195, 1, 'RCG', '2022-09-27 08:30:00', NULL, NULL, '2022-09-27 18:00:00', '#00BCD4', NULL, 'A', '2022-09-27', '08:30:00', '18:00:00', '11:30:00', '13:15:00', '07:45:00', NULL),
(5, 196, 1, 'RCG', '2022-09-30 08:30:00', NULL, NULL, '2022-09-30 17:30:00', '#00BCD4', NULL, 'A', '2022-09-30', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(NULL, 197, NULL, 'Feriado', '2022-09-07 08:00:00', NULL, NULL, '2022-09-07 18:00:00', '#F44336', NULL, 'A', '2022-09-07', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(NULL, 198, NULL, 'Feriado', '2022-10-11 08:00:00', NULL, NULL, '2022-10-11 18:00:00', '#F44336', NULL, 'A', '2022-10-11', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(NULL, 199, NULL, 'Feriado', '2022-10-12 08:00:00', NULL, NULL, '2022-10-12 18:00:00', '#F44336', NULL, 'A', '2022-10-12', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(NULL, 200, NULL, 'Feriado', '2022-11-15 08:00:00', NULL, NULL, '2022-11-15 18:00:00', '#F44336', NULL, 'A', '2022-11-15', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(NULL, 201, NULL, 'Feriado', '2022-12-25 08:00:00', NULL, NULL, '2022-12-25 18:00:00', '#F44336', NULL, 'A', '2022-12-25', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(NULL, 202, NULL, 'Feriado', '2023-01-01 08:00:00', NULL, NULL, '2023-01-01 18:00:00', '#F44336', NULL, 'A', '2023-01-01', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(3, 203, 1, 'FUNLEC', '2022-10-03 08:30:00', NULL, NULL, '2022-10-03 11:30:00', '#4CAF50', '<ul><li>Contabilização movimento VISA mes 07/2022, para ajustes</li></ul>', 'A', '2022-10-03', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 204, 1, 'FUNLEC', '2022-10-06 08:30:00', NULL, NULL, '2022-10-06 17:30:00', '#4CAF50', '<ul><li>Contabilização movimento VISA mes 07/2022, para ajustes</li><li>Calculo de previsão de Impostos 13 Salario</li></ul>', 'A', '2022-10-06', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(4, 205, 1, 'MSGAS', '2022-10-05 08:30:00', NULL, NULL, '2022-10-05 17:30:00', '#2196F3', '<ul><li>Ajustes API BB de boletos.</li></ul>', 'A', '2022-10-05', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(5, 206, 1, 'RCG', '2022-10-03 13:00:00', NULL, NULL, '2022-10-03 17:30:00', '#00BCD4', NULL, 'A', '2022-10-03', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 207, 1, 'RCG', '2022-10-04 08:30:00', NULL, NULL, '2022-10-04 18:00:00', '#00BCD4', NULL, 'A', '2022-10-04', '08:30:00', '18:00:00', '11:30:00', '13:15:00', '07:45:00', NULL),
(5, 208, 1, 'RCG', '2022-10-10 08:30:00', NULL, NULL, '2022-10-10 17:20:00', '#00BCD4', NULL, 'A', '2022-10-10', '08:30:00', '17:20:00', '11:30:00', '13:00:00', '07:20:00', NULL),
(3, 209, 1, 'FUNLEC', '2022-10-13 13:00:00', NULL, NULL, '2022-10-13 17:30:00', '#4CAF50', '<ul><li>Contabilização movimento VISA mes 07/2022, para ajustes</li></ul>', 'A', '2022-10-13', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(NULL, 210, NULL, 'FERIADO', '2022-11-02 08:00:00', NULL, NULL, '2022-11-02 17:30:00', '#F44336', NULL, 'A', '2022-11-02', '08:00:00', '17:30:00', '00:00:00', '00:00:00', '09:30:00', NULL),
(5, 211, NULL, 'RCG', '2022-10-14 13:00:00', NULL, NULL, '2022-10-14 17:30:00', '#00BCD4', NULL, 'A', '2022-10-14', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 212, 1, 'RCG', '2022-10-07 08:30:00', NULL, NULL, '2022-10-07 17:30:00', '#00BCD4', NULL, 'A', '2022-10-07', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 213, 1, 'FUNLEC', '2022-10-17 08:30:00', NULL, NULL, '2022-10-17 11:30:00', '#4CAF50', '<ul><li>Sistema para solicitação de compras</li></ul>', 'A', '2022-10-17', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 214, 1, 'RCG', '2022-10-17 13:00:00', NULL, NULL, '2022-10-17 17:30:00', '#00BCD4', NULL, 'A', '2022-10-17', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(4, 215, 1, 'MSGAS', '2022-10-17 16:30:00', NULL, NULL, '2022-10-17 17:00:00', '#2196F3', '<ul><li>Importação de Arquivo relogio de ponto</li></ul>', 'A', '2022-10-17', '16:30:00', '17:00:00', '00:00:00', '00:00:00', '00:30:00', NULL),
(4, 216, 1, 'MSGAS', '2022-10-19 08:30:00', NULL, NULL, '2022-10-19 17:30:00', '#2196F3', '<ul><li>Api BB</li></ul>', 'A', '2022-10-19', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(3, 217, 1, 'FUNLEC', '2022-10-19 19:30:00', NULL, NULL, '2022-10-19 22:00:00', '#4CAF50', '<ul><li>Atualização de Sistema</li></ul>', 'A', '2022-10-19', '19:30:00', '22:00:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(3, 218, 1, 'FUNLEC', '2022-10-20 08:30:00', NULL, NULL, '2022-10-20 17:30:00', '#4CAF50', '<ul><li>Ajustes Compras</li></ul>', 'A', '2022-10-20', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 219, 1, 'RCG', '2022-10-18 08:30:00', NULL, NULL, '2022-10-18 17:30:00', '#00BCD4', NULL, 'A', '2022-10-18', '08:30:00', '17:30:00', '11:30:00', '13:10:00', '07:20:00', NULL),
(4, 220, 1, 'MSGAS', '2022-10-18 14:00:00', NULL, NULL, '2022-10-18 17:00:00', '#2196F3', '<ul><li>Importação de Arquivo relogio de ponto</li></ul>', 'A', '2022-10-18', '14:00:00', '17:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 221, 1, 'RCG', '2022-10-21 08:30:00', NULL, NULL, '2022-10-21 17:30:00', '#00BCD4', NULL, 'A', '2022-10-21', '08:30:00', '17:30:00', '00:00:00', '00:00:00', '09:00:00', NULL),
(3, 222, 1, 'FUNLEC', '2022-10-24 08:30:00', NULL, NULL, '2022-10-24 11:30:00', '#4CAF50', '<ul><li>Revisão de Roteiro personalizado para calculo de DSR folha Professor</li></ul>', 'A', '2022-10-24', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 223, 1, 'MSGAS', '2022-10-26 09:00:00', NULL, NULL, '2022-10-26 17:30:00', '#2196F3', '<ul><li>Api para Pedido de Venda</li></ul>', 'A', '2022-10-26', '09:00:00', '17:30:00', '11:30:00', '13:30:00', '06:30:00', NULL),
(5, 224, 1, 'RCG', '2022-10-24 13:10:00', NULL, NULL, '2022-10-24 18:00:00', '#00BCD4', NULL, 'A', '2022-10-24', '13:10:00', '18:00:00', '00:00:00', '00:00:00', '04:50:00', NULL),
(5, 225, 1, 'RCG', '2022-10-25 08:30:00', NULL, NULL, '2022-10-25 17:30:00', '#00BCD4', NULL, 'A', '2022-10-25', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 226, 1, 'FUNLEC', '2022-10-27 08:30:00', NULL, NULL, '2022-10-27 17:30:00', '#4CAF50', '<ul><li>Revisão de Roteiro personalizado para calculo de DSR folha Professor</li></ul>', 'A', '2022-10-27', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 227, 1, 'RCG', '2022-10-28 09:00:00', NULL, NULL, '2022-10-28 17:30:00', '#00BCD4', NULL, 'A', '2022-10-28', '09:00:00', '17:30:00', '11:30:00', '13:10:00', '06:50:00', NULL),
(3, 228, 1, 'FUNLEC', '2022-10-31 08:30:00', NULL, NULL, '2022-10-31 11:30:00', '#4CAF50', '<ul><li>Revisão de Roteiro personalizado para calculo de DSR folha Professor</li></ul>', 'A', '2022-10-31', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 229, 1, 'RCG', '2022-10-31 13:00:00', NULL, NULL, '2022-10-31 17:30:00', '#00BCD4', NULL, 'A', '2022-10-31', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(4, 230, 1, 'MSGAS', '2022-11-01 08:00:00', NULL, NULL, '2022-11-01 17:30:00', '#2196F3', '<ul><li>Consulta para saldo contabil de visão gerencial DRE</li></ul>', 'A', '2022-11-01', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(3, 231, 1, 'FUNLEC', '2022-11-03 08:30:00', NULL, NULL, '2022-11-03 17:30:00', '#4CAF50', '<ul><li>Apoio envio 1200 e&nbsp; 1210</li><li>Ajustes em relatorio de cotações.</li></ul>', 'A', '2022-11-03', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 232, 1, 'RCG', '2022-11-04 08:30:00', NULL, NULL, '2022-11-04 17:30:00', '#00BCD4', NULL, 'A', '2022-11-04', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 233, 1, 'FUNLEC', '2022-11-07 08:30:00', NULL, NULL, '2022-11-07 11:30:00', '#4CAF50', '<ul><li>E-Social 10/2022</li></ul>', 'A', '2022-11-07', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 234, 1, 'FUNLEC(Remoto)', '2022-11-07 19:00:00', NULL, NULL, '2022-11-07 23:30:00', '#4CAF50', '<ul><li>Atualização Sistema</li><li>E-Social 10/2022</li></ul>', 'A', '2022-11-07', '19:00:00', '23:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(3, 235, 1, 'FUNLEC(Remoto)', '2022-11-05 10:00:00', NULL, NULL, '2022-11-05 15:00:00', '#4CAF50', '<ul><li>E-Social 10/2022</li></ul>', 'A', '2022-11-05', '10:00:00', '15:00:00', '12:00:00', '13:00:00', '04:00:00', NULL),
(5, 236, 1, 'RCG', '2022-11-07 13:00:00', NULL, NULL, '2022-11-07 17:30:00', '#00BCD4', NULL, 'A', '2022-11-07', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 237, 1, 'RCG', '2022-11-08 08:30:00', NULL, NULL, '2022-11-08 18:00:00', '#00BCD4', NULL, 'A', '2022-11-08', '08:30:00', '18:00:00', '11:30:00', '13:15:00', '07:45:00', NULL),
(4, 238, 1, 'MSGAS', '2022-11-09 09:00:00', NULL, NULL, '2022-11-09 17:30:00', '#2196F3', '<ul><li>Ajuste em API rest para consulta e inclusão de pedido de vendas.</li></ul>', 'A', '2022-11-09', '09:00:00', '17:30:00', '11:30:00', '13:30:00', '06:30:00', NULL),
(3, 239, 1, 'FUNLEC', '2022-11-10 09:00:00', NULL, NULL, '2022-11-10 17:30:00', '#4CAF50', '<ul><li>Relatorio compras</li><li>Calculo de Ferias (Mensalista)</li></ul>', 'A', '2022-11-10', '09:00:00', '17:30:00', '11:30:00', '13:00:00', '07:00:00', NULL),
(3, 240, 1, 'FUNLEC(Remoto)', '2022-11-14 09:00:00', NULL, NULL, '2022-11-14 11:30:00', '#4CAF50', '<ul><li>Folha de Pagamento</li></ul>', 'R', '2022-11-14', '09:00:00', '11:30:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(5, 241, 1, 'RCG', '2022-11-14 13:00:00', NULL, NULL, '2022-11-14 18:00:00', '#00BCD4', NULL, 'A', '2022-11-14', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(4, 242, 1, 'MSGAS', '2022-11-16 09:00:00', NULL, NULL, '2022-11-16 17:30:00', '#2196F3', '<ul><li>Importação de Ponto</li><li>Api de Pedido de Venda</li></ul>', 'A', '2022-11-16', '09:00:00', '17:30:00', '11:30:00', '13:30:00', '06:30:00', NULL),
(5, 243, 1, 'RCG', '2022-11-11 08:30:00', NULL, NULL, '2022-11-11 17:30:00', '#00BCD4', NULL, 'A', '2022-11-11', '08:30:00', '17:30:00', '11:30:00', '13:10:00', '07:20:00', NULL),
(3, 244, 1, 'FUNLEC', '2022-11-17 08:30:00', NULL, NULL, '2022-11-17 17:30:00', '#4CAF50', '<ul><li>Calculo de 1ª parcela 13 Salario</li></ul>', 'A', '2022-11-17', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(5, 245, 1, 'RCG', '2022-11-18 08:30:00', NULL, NULL, '2022-11-18 17:30:00', '#00BCD4', NULL, 'A', '2022-11-18', '08:30:00', '17:30:00', '12:00:00', '13:30:00', '07:30:00', NULL),
(3, 246, 1, 'FUNLEC', '2022-11-21 08:30:00', NULL, NULL, '2022-11-21 11:30:00', '#4CAF50', '<ul><li>Calculo de 1ª parcela 13 Salario</li></ul>', 'A', '2022-11-21', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 247, 1, 'RCG', '2022-11-21 13:15:00', NULL, NULL, '2022-11-21 17:30:00', '#00BCD4', NULL, 'A', '2022-11-21', '13:15:00', '17:30:00', '00:00:00', '00:00:00', '04:15:00', NULL),
(5, 248, 1, 'RCG', '2022-11-22 08:30:00', NULL, NULL, '2022-11-22 18:00:00', '#00BCD4', NULL, 'A', '2022-11-22', '08:30:00', '18:00:00', '11:30:00', '13:20:00', '07:40:00', NULL),
(4, 249, 1, 'MSGAS', '2022-11-23 08:30:00', NULL, NULL, '2022-11-23 17:30:00', '#2196F3', '<ul><li><span style=\"color: var(--text-color); font-family: var(--font-family); font-size: var(--font-size);\">Interação chamados API BB Solicitação n°: 15730525</span><br></li><li>Api de Importação de Pedidos Protheus</li></ul>', 'A', '2022-11-23', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(3, 250, 1, 'FUNLEC', '2022-11-24 08:30:00', NULL, NULL, '2022-11-24 14:00:00', '#4CAF50', '<ul><li>SALARIO SUBSTITUIÇÃO para o calculo do 13º Salario.</li><li>ACUMULO DE FUNÇÃO para o calculo do 13º Salario.</li></ul><div><br></div>', 'A', '2022-11-24', '08:30:00', '14:00:00', '11:00:00', '12:00:00', '04:30:00', NULL),
(5, 251, 1, 'RCG', '2022-11-25 08:30:00', NULL, NULL, '2022-11-25 17:30:00', '#00BCD4', NULL, 'A', '2022-11-25', '08:30:00', '17:30:00', '11:30:00', '13:10:00', '07:20:00', NULL),
(3, 252, 1, 'FUNLEC', '2022-11-28 08:30:00', NULL, NULL, '2022-11-28 11:30:00', '#4CAF50', '<ul><li>Revisão LP&nbsp; 562 - 008<br></li></ul>', 'A', '2022-11-28', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 253, 1, 'RCG', '2022-11-28 14:00:00', NULL, NULL, '2022-11-28 18:00:00', '#00BCD4', '<ul><li><br></li></ul>', 'A', '2022-11-28', '14:00:00', '18:00:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 254, 1, 'RCG', '2022-11-29 08:30:00', NULL, NULL, '2022-11-29 18:00:00', '#00BCD4', '<ul><li><br></li></ul>', 'A', '2022-11-29', '08:30:00', '18:00:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(4, 255, 1, 'MSGAS', '2022-11-30 08:30:00', NULL, NULL, '2022-11-30 17:30:00', '#2196F3', '<ul><li>Interação chamados API BB</li><li>Api de Importação de Pedidos Protheus</li></ul>', 'A', '2022-11-30', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(3, 256, 1, 'FUNLEC', '2022-12-01 08:30:00', NULL, NULL, '2022-12-01 17:30:00', '#4CAF50', '<ul><li>Ferias Multiplos Vinculos</li><li>13 Salario</li></ul>', 'A', '2022-12-01', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 257, 1, 'RCG', '2022-12-02 08:00:00', NULL, NULL, '2022-12-02 17:30:00', '#00BCD4', NULL, 'A', '2022-12-02', '08:00:00', '17:30:00', '11:30:00', '13:10:00', '07:50:00', NULL),
(3, 258, 1, 'FUNLEC', '2022-12-05 08:00:00', NULL, NULL, '2022-12-05 11:30:00', '#4CAF50', '<ul><li>13 Salario pago na rescisão.</li></ul>', 'A', '2022-12-05', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(3, 259, 1, 'FUNLEC(Remoto)', '2022-12-03 10:00:00', NULL, NULL, '2022-12-03 12:00:00', '#4CAF50', '<ul><li>13 Salario pago na rescisão.</li></ul>', 'A', '2022-12-03', '10:00:00', '12:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(5, 260, NULL, 'RCG', '2022-12-05 13:00:00', NULL, NULL, '2022-12-05 18:00:00', '#00BCD4', NULL, 'A', '2022-12-05', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(8, 261, NULL, 'Health', '2022-12-05 15:00:00', NULL, NULL, '2022-12-05 19:00:00', '#9E9E9E', '<ul><li>Atualização de Base de TESTES</li></ul>', 'A', '2022-12-05', '15:00:00', '19:00:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 262, NULL, 'RCG', '2022-12-06 08:00:00', NULL, NULL, '2022-12-06 18:00:00', '#00BCD4', NULL, 'A', '2022-12-06', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(8, 263, 1, 'Health', '2022-12-06 18:00:00', NULL, NULL, '2022-12-06 19:00:00', '#9E9E9E', '<ul><li>Ajuste de Menu</li></ul>', 'A', '2022-12-06', '18:00:00', '19:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(4, 264, 1, 'MSGAS', '2022-12-07 08:00:00', NULL, NULL, '2022-12-07 17:30:00', '#2196F3', '<ul><li>Complemento chamado n°: 15626208</li><li>Api Pedido Venda</li></ul>', 'A', '2022-12-07', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(3, 265, 1, 'FUNLEC', '2022-12-08 09:00:00', NULL, NULL, '2022-12-08 17:30:00', '#4CAF50', '<ul><li>Calculos de Ferias - Multiplos Vinculos</li></ul>', 'A', '2022-12-08', '09:00:00', '17:30:00', '11:30:00', '13:00:00', '07:00:00', NULL),
(4, 266, NULL, 'MSGAS(REMOTO)', '2022-12-08 08:20:00', NULL, NULL, '2022-12-08 08:50:00', '#2196F3', '<ul><li>Complemento chamado n°: 15626208</li></ul>', 'A', '2022-12-08', '08:20:00', '08:50:00', '00:00:00', '00:00:00', '00:30:00', NULL),
(5, 267, 1, 'RCG', '2022-12-09 08:00:00', NULL, NULL, '2022-12-09 18:00:00', '#00BCD4', NULL, 'A', '2022-12-09', '08:00:00', '18:00:00', '10:30:00', '14:00:00', '06:30:00', NULL),
(4, 268, 1, 'MSGAS', '2022-12-16 08:00:00', NULL, NULL, '2022-12-16 17:30:00', '#2196F3', '<ul><li>Falha TOTVS License Server Virtual</li><li>Ajuste no SX5NOTA.PRW para tratar chamada pela rotina MATA460A</li></ul>', 'A', '2022-12-16', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(4, 269, 1, 'MSGAS', '2022-12-19 08:00:00', NULL, NULL, '2022-12-19 17:30:00', '#2196F3', '<ul><li>Suporte a sistema</li><li>Ajustes API Pedido</li></ul>', 'A', '2022-12-19', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(5, 270, 1, 'RCG', '2022-12-14 08:00:00', NULL, NULL, '2022-12-14 18:00:00', '#00BCD4', NULL, 'A', '2022-12-14', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(3, 271, 1, 'FUNLEC', '2022-12-21 08:00:00', NULL, NULL, '2022-12-21 11:30:00', '#4CAF50', '<ul><li>Ajustes LP 563 001,005 e 006</li><li>Integração Compras</li></ul>', 'A', '2022-12-21', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(5, 272, 1, 'RCG', '2022-12-21 13:00:00', NULL, NULL, '2022-12-21 18:00:00', '#00BCD4', NULL, 'A', '2022-12-21', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(8, 273, 1, 'Health', '2022-12-12 19:00:00', NULL, NULL, '2022-12-12 22:30:00', '#9E9E9E', '<ul><li>Atualização de base de teste</li></ul>', 'A', '2022-12-12', '19:00:00', '22:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(9, 274, 1, 'JFS', '2022-12-13 19:00:00', NULL, NULL, '2022-12-13 22:30:00', '#FF5722', '<ul><li>Atualização Sistema</li></ul>', 'A', '2022-12-13', '19:00:00', '22:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(9, 275, 1, 'JFS', '2022-12-13 14:00:00', NULL, NULL, '2022-12-13 17:30:00', '#FF5722', '<ul><li>Analise erro Bloco K</li></ul>', 'A', '2022-12-13', '14:00:00', '17:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(5, 276, 1, 'RCG', '2022-12-13 08:00:00', NULL, NULL, '2022-12-13 18:00:00', '#00BCD4', NULL, 'A', '2022-12-13', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(3, 277, 1, 'FUNLEC', '2022-12-12 07:30:00', NULL, NULL, '2022-12-12 11:30:00', '#4CAF50', '<ul><li>Ferias Multiplos Vinculos</li><li>13 Salario</li></ul>', 'A', '2022-12-12', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 278, 1, 'RCG', '2022-12-12 13:00:00', NULL, NULL, '2022-12-12 18:00:00', '#00BCD4', NULL, 'A', '2022-12-12', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(3, 279, 1, 'FUNLEC', '2022-12-15 08:00:00', NULL, NULL, '2022-12-15 17:30:00', '#4CAF50', '<ul><li>Revisão de LP Contabil</li></ul>', 'A', '2022-12-15', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(9, 280, NULL, 'JFS', '2022-12-14 19:00:00', NULL, NULL, '2022-12-14 21:00:00', '#FF5722', '<ul><li>Conferencia Bloco K</li></ul>', 'A', '2022-12-14', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(9, 281, NULL, 'JFS', '2022-12-14 09:00:00', NULL, NULL, '2022-12-14 11:00:00', '#FF5722', '<ul><li>Conferencia Bloco K</li></ul>', 'A', '2022-12-14', '09:00:00', '11:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(8, 282, 1, 'Health', '2022-12-15 19:00:00', NULL, NULL, '2022-12-15 21:00:00', '#9E9E9E', '<ul><li>Ajuste em Municiopio cadastros de Cliente e Fornecedores</li><li>Exclusão de Titulos</li></ul>', 'A', '2022-12-14', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(5, 283, 1, 'RCG', '2022-12-20 08:00:00', NULL, NULL, '2022-12-20 18:00:00', '#00BCD4', NULL, 'A', '2022-12-20', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(5, 284, 1, 'RCG', '2022-12-23 08:00:00', NULL, NULL, '2022-12-23 14:30:00', '#00BCD4', NULL, 'A', '2022-12-22', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(3, 285, NULL, 'FUNLEC', '2022-12-22 08:00:00', NULL, NULL, '2022-12-22 17:30:00', '#4CAF50', '<ul><li>Integração Compras</li></ul>', 'A', '2022-12-22', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(8, 286, 1, 'Health', '2022-12-21 19:00:00', NULL, NULL, '2022-12-21 22:00:00', '#9E9E9E', '<ul><li>Atualização de Sistema</li></ul>', 'A', '2022-12-21', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(6, 287, 1, 'GUATOS', '2022-12-22 09:00:00', NULL, NULL, '2022-12-22 10:00:00', '#FFC107', '<ul><li>NFE Devolução DELL</li></ul>', 'A', '2022-12-22', '09:00:00', '10:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(4, 288, 1, 'MSGAS', '2022-12-20 15:00:00', NULL, NULL, '2022-12-20 17:00:00', '#2196F3', '<ul><li>Erro Meu RH</li></ul>', 'A', '2022-12-20', '15:00:00', '17:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 289, 1, 'FUNLEC', '2022-12-26 08:30:00', NULL, NULL, '2022-12-26 11:30:00', '#4CAF50', '<ul><li>DSR Professor</li><li>API Compras</li></ul>', 'A', '2022-12-26', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 290, 1, 'RCG', '2022-12-26 13:00:00', NULL, NULL, '2022-12-26 18:00:00', '#00BCD4', NULL, 'A', '2022-12-26', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 291, 1, 'RCG', '2022-12-27 08:30:00', NULL, NULL, '2022-12-27 18:00:00', '#00BCD4', NULL, 'A', '2022-12-27', '08:30:00', '18:00:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(4, 292, 1, 'MSGAS', '2022-12-28 08:30:00', NULL, NULL, '2022-12-28 17:30:00', '#2196F3', '<ul><li>Inclusão de Titulo e registro via API BB(Base Teste)</li><li>Replicado titulos para base de Produção</li><li>Atualização Solicitação atualizada nº 15626208 (Erro Registro Online para o BB)<br></li></ul>', 'A', '2022-12-28', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(3, 293, 1, 'FUNLEC', '2022-12-29 08:30:00', NULL, NULL, '2022-12-29 17:30:00', '#4CAF50', '<ul><li>Calculo de Folha de pagamento</li><li>Calculo de ferias Multiplos Vinculos</li></ul>', 'A', '2022-12-29', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 294, NULL, 'RCG', '2022-12-30 08:00:00', NULL, NULL, '2022-12-30 14:00:00', '#00BCD4', NULL, 'A', '2022-12-30', '08:00:00', '14:00:00', '00:00:00', '00:00:00', '06:00:00', NULL),
(3, 295, NULL, 'FUNLEC', '2023-01-02 08:30:00', NULL, NULL, '2023-01-02 11:30:00', '#4CAF50', '<ul><li>Backup Base de TESTE</li><li>Folha de Pagamento</li><li>Api Compras</li></ul>', 'A', '2023-01-02', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 296, 1, 'FUNLEC', '2022-12-27 19:00:00', NULL, NULL, '2022-12-27 22:00:00', '#4CAF50', '<ul><li>Atualização base</li></ul>', 'A', '2022-12-27', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 297, 1, 'RCG', '2023-01-02 13:00:00', NULL, NULL, '2023-01-02 18:00:00', '#00BCD4', NULL, 'A', '2023-01-02', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 298, 1, 'RCG', '2023-01-03 08:00:00', NULL, NULL, '2023-01-03 18:00:00', '#00BCD4', NULL, 'A', '2023-01-03', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(4, 299, 1, 'MSGAS', '2023-01-04 08:30:00', NULL, NULL, '2023-01-04 17:30:00', '#2196F3', '<ul><li>Consumi de API BB para registro de PIX</li></ul>', 'A', '2023-01-04', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(3, 300, 1, 'FUNLEC', '2023-01-05 08:30:00', NULL, NULL, '2023-01-05 17:30:00', '#4CAF50', '<ul><li>Ajustes Contabilidade</li><li>Portal Compras</li></ul>', 'A', '2023-01-05', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 301, 1, 'RCG', '2023-01-06 08:30:00', NULL, NULL, '2023-01-06 18:00:00', '#00BCD4', NULL, 'A', '2023-01-06', '08:30:00', '18:00:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(3, 302, 1, 'FUNLEC', '2023-01-04 19:00:00', NULL, NULL, '2023-01-04 22:00:00', '#4CAF50', '<ul><li>Atualização de sistema</li></ul>', 'A', '2023-01-04', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 303, 1, 'RCG', '2023-01-05 19:00:00', NULL, NULL, '2023-01-05 23:00:00', '#00BCD4', '<ul><li>Atualização de Sistema</li></ul>', 'A', '2023-01-05', '19:00:00', '23:00:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(9, 304, NULL, 'JFS', '2022-12-27 15:00:00', NULL, NULL, '2022-12-27 17:00:00', '#FF5722', '<ul><li>Importaçao de Pedido POLIBRAS</li></ul>', 'A', '2022-12-27', '15:00:00', '17:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(9, 305, NULL, 'JFS', '2022-12-27 19:00:00', NULL, NULL, '2022-12-27 21:00:00', '#FF5722', '<ul><li>Correção de sequencia de NF-e canceladas</li></ul>', 'A', '2022-12-27', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 306, 1, 'FUNLEC', '2023-01-09 08:30:00', NULL, NULL, '2023-01-09 11:30:00', '#4CAF50', '<ul><li>Calculo de Plano de Saude.</li><li>Portal de Compras</li></ul>', 'A', '2023-01-09', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 307, 1, 'RCG', '2023-01-09 13:00:00', NULL, NULL, '2023-01-09 18:00:00', '#00BCD4', NULL, 'A', '2023-01-09', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(4, 308, 1, 'MSGAS', '2023-01-11 08:40:00', NULL, NULL, '2023-01-11 17:30:00', '#2196F3', '<ul><li>Api para PIX BB</li></ul>', 'A', '2023-01-11', '08:40:00', '17:30:00', '11:30:00', '13:30:00', '06:50:00', NULL),
(9, 309, 1, 'JFS', '2023-01-09 19:00:00', NULL, NULL, '2023-01-09 20:00:00', '#FF5722', '<ul><li>Atualização EFD ICMS</li></ul>', 'A', '2023-01-09', '19:00:00', '20:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(5, 310, 1, 'RCG', '2023-01-10 08:30:00', NULL, NULL, '2023-01-10 18:00:00', '#00BCD4', NULL, 'A', '2023-01-10', '08:30:00', '18:00:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(3, 311, 1, 'FUNLEC', '2023-01-12 08:30:00', NULL, NULL, '2023-01-12 17:30:00', '#4CAF50', '<ul><li>Portal Compras</li></ul>', 'A', '2023-01-12', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 312, 1, 'RCG', '2023-01-16 08:30:00', NULL, NULL, '2023-01-16 18:00:00', '#00BCD4', NULL, 'A', '2023-01-16', '08:30:00', '18:00:00', '12:00:00', '13:00:00', '08:30:00', NULL),
(3, 313, 1, 'FUNLEC', '2023-01-17 08:00:00', NULL, NULL, '2023-01-17 11:30:00', '#4CAF50', '<ul><li>Ajuste de Regras Contabeis</li><li>Ajuste e Criação de Classe de Valor</li><li>Criação de Rotina para Bloqueio de Perido.</li></ul>', 'A', '2023-01-17', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(4, 314, 1, 'MSGAS', '2023-01-16 13:00:00', NULL, NULL, '2023-01-16 14:00:00', '#2196F3', '<ul><li>Espelho de Ponto 16/12/22 - 15/01/23</li><li>Periodo de Ponto</li></ul>', 'A', '2023-01-16', '13:00:00', '14:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(5, 315, 1, 'RCG', '2023-01-17 13:00:00', NULL, NULL, '2023-01-17 18:00:00', '#00BCD4', NULL, 'A', '2023-01-17', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(4, 316, 1, 'MSGAS', '2023-01-18 08:00:00', NULL, NULL, '2023-01-18 17:30:00', '#2196F3', '<ul><li>Api PIX BB</li></ul>', 'A', '2023-01-18', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(3, 317, 1, 'FUNLEC', '2023-01-19 08:30:00', NULL, NULL, '2023-01-19 11:30:00', '#4CAF50', '<ul><li>Api Compras</li></ul>', 'A', '2023-01-19', '08:30:00', '11:30:00', NULL, NULL, '03:00:00', NULL),
(8, 318, 1, 'Health', '2023-01-17 19:00:00', NULL, NULL, '2023-01-17 21:00:00', '#9E9E9E', '<p>Correção de base de notas de devolução sem financeiro:</p><div style=\"color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small;\">As&nbsp;<b>Notas de Saída 000006076,000006079 e 000006080</b>, na sua emissão foram usadas&nbsp;<b>TES com financeiro</b>. Gerando CONTAS A RECEBER<br><br>As Notas de Retorno(Devolução) tem que ser feita com TES que geram financeiro, para que o sistema gere Títulos para compensar o CONTAS A RECEBER.<br><br>As&nbsp;<b>Notas de Retorno(Devolução) 000006091,000006093 e 000006095</b>&nbsp;foram lançadas com&nbsp;<b>TES sem financeiro.</b>&nbsp;Assim não gerando títulos para a compensação.<br><br>As notas de Retorno e Devolução tem que ter TES com as &nbsp;mesmas características de Financeiro, Estoque e Fiscal das notas retornadas ou devolvidas.<b><span style=\"color: rgb(31, 73, 125); font-size: 12pt;\"><br></span></b></div><div style=\"color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small;\">Como as notas de retorno são de emissão da HealtBrasil,&nbsp;e já tem mais de 24 horas de sua emissão, não é possível&nbsp;excluir e refazer,&nbsp;<b>então inclui Títulos NCC</b>&nbsp;para estas nota para a compensação.&nbsp;<br></div><div style=\"color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small;\">A compensação de Títulos&nbsp;é feita de forma manual, e é ela que anula o contas a receber gerado pelas notas de venda.<br></div><div style=\"color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small;\">Se tiverem dúvidas&nbsp;sobres processos podemos verificar um treinamento do módulo&nbsp;financeiro.<br></div><div style=\"color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small;\">O Título&nbsp;000006079/NF para o Cliente&nbsp;000098/01 já sofreu&nbsp;baixa parcial. Não Executei a compensação com o&nbsp;000006091/NCC<br></div><div style=\"color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small;\">O Título&nbsp;000006080/NF para o Cliente&nbsp;000099/01 executei a compensação com o&nbsp;000006095/NCC<br></div><div style=\"color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small;\">O Título&nbsp;000006076/NF para o Cliente&nbsp;000097/01 executei a compensação com o&nbsp;000006093/NCC</div>', 'A', '2023-01-17', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(9, 319, 1, 'JFS', '2023-01-18 19:00:00', NULL, NULL, '2023-01-18 22:00:00', '#FF5722', '<ul><li>Conferencia de Pedido de venda</li></ul>', 'A', '2023-01-18', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 320, 1, 'FUNLEC', '2023-01-19 13:30:00', NULL, NULL, '2023-01-19 17:30:00', '#4CAF50', '<ul><li>Api de Compras</li></ul>', 'A', '2023-01-19', '13:30:00', '17:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(4, 321, 1, 'MSGAS', '2023-01-30 08:30:00', NULL, NULL, '2023-01-30 17:30:00', '#2196F3', '<ul><li>Api BB PIX&nbsp;</li></ul>', 'A', '2023-01-30', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(9, 322, 1, 'JFS', '2023-01-19 17:00:00', NULL, NULL, '2023-01-19 17:30:00', '#FF5722', '<ul><li>NF-e</li></ul>', 'A', '2023-01-19', '17:00:00', '17:30:00', '00:00:00', '00:00:00', '00:30:00', NULL),
(9, 323, 1, 'JFS', '2023-01-26 19:00:00', NULL, NULL, '2023-01-26 21:00:00', '#FF5722', '<ul><li>Conferencia de Pedido de venda&nbsp;<br></li></ul>', 'A', '2023-01-26', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(9, 324, 1, 'JFS', '2023-01-30 19:00:00', NULL, NULL, '2023-01-30 21:00:00', '#FF5722', '<ul><li>Conferencia de Pedido de venda&nbsp;<br></li></ul>', 'A', '2023-01-31', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(5, 325, NULL, 'RCG', '2023-01-31 08:30:00', NULL, NULL, '2023-01-31 17:30:00', '#00BCD4', NULL, 'A', '2023-01-31', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(9, 326, 1, 'JFS', '2023-01-31 19:00:00', NULL, NULL, '2023-01-31 21:00:00', '#FF5722', '<ul><li>Atualização sistema</li></ul>', 'A', '2023-01-31', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(4, 327, 1, 'MSGAS', '2023-02-01 08:30:00', NULL, NULL, '2023-02-01 17:30:00', '#2196F3', '<ul><li>API BB PIX</li></ul>', 'A', '2023-02-01', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(6, 328, 1, 'GUATOS', '2023-02-01 09:00:00', NULL, NULL, '2023-02-01 10:00:00', '#FFC107', '<ul><li>Relatorio de Classe de Valor</li></ul>', 'A', '2023-02-01', '09:00:00', '10:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(3, 329, 1, 'FUNLEC', '2023-01-22 09:00:00', NULL, NULL, '2023-01-22 10:30:00', '#4CAF50', '<ul><li>Atualização Dirf</li></ul>', 'A', '2023-01-22', '09:00:00', '10:30:00', '00:00:00', '00:00:00', '01:30:00', NULL),
(3, 330, 1, 'FUNLEC', '2023-01-24 17:00:00', NULL, NULL, '2023-01-24 17:30:00', '#4CAF50', '<ul><li>Atualização TSS</li></ul>', 'A', '2023-01-24', '17:00:00', '17:30:00', '00:00:00', '00:00:00', '00:30:00', NULL),
(3, 331, 1, 'FUNLEC', '2023-02-02 08:30:00', NULL, NULL, '2023-02-02 17:30:00', '#4CAF50', '<ul><li>Ajuste Contabilidade</li><li>CNAB Bradesco MultPag</li></ul>', 'A', '2023-02-02', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 332, 1, 'RCG', '2023-02-03 08:30:00', NULL, NULL, '2023-02-03 18:00:00', '#00BCD4', NULL, 'A', '2023-02-03', '08:30:00', '18:00:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(3, 333, 1, 'FUNLEC', '2023-02-06 08:30:00', NULL, NULL, '2023-02-06 11:30:00', '#4CAF50', '<ul><li>CNAB Bradesco MultPag</li></ul>', 'A', '2023-02-06', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 334, 1, 'RCG', '2023-02-06 13:00:00', NULL, NULL, '2023-02-06 17:30:00', '#00BCD4', NULL, 'A', '2023-02-06', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 335, 1, 'RCG', '2023-02-07 08:30:00', NULL, NULL, '2023-02-07 17:30:00', '#00BCD4', NULL, 'A', '2023-02-07', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(4, 336, 1, 'MSGAS', '2023-02-08 08:30:00', NULL, NULL, '2023-02-08 17:30:00', '#2196F3', '<ul><li>Api PIX</li></ul>', 'A', '2023-02-08', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(4, 337, 1, 'MSGAS(Remoto)', '2023-02-06 14:00:00', NULL, NULL, '2023-02-06 17:00:00', '#2196F3', '<ul><li>Api BB&nbsp;</li></ul>', 'A', '2023-02-07', '14:00:00', '17:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(8, 338, 1, 'Health', '2023-02-06 18:30:00', NULL, NULL, '2023-02-06 22:30:00', '#9E9E9E', '<ul><li>Atualização Base TESTE</li></ul>', 'A', '2023-02-06', '18:30:00', '22:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(4, 339, 1, 'MSGAS(Remoto)', '2023-02-07 14:00:00', NULL, NULL, '2023-02-07 16:00:00', '#2196F3', '<ul><li>Api PIX</li></ul>', 'A', '2023-02-07', '14:00:00', '16:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(8, 340, NULL, 'Health(remoto)', '2023-02-08 19:00:00', NULL, NULL, '2023-02-08 23:00:00', '#9E9E9E', '<ul><li>Atualização de Sistema</li></ul>', 'A', '2023-02-08', '19:00:00', '23:00:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(3, 341, 1, 'FUNLEC', '2023-02-09 08:30:00', NULL, NULL, '2023-02-09 17:30:00', '#4CAF50', '<ul><li>CANB Bradesco</li></ul>', 'A', '2023-02-09', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 342, 1, 'RCG', '2023-02-10 08:30:00', NULL, NULL, '2023-02-10 18:00:00', '#00BCD4', NULL, 'A', '2023-02-10', '08:30:00', '18:00:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(6, 343, 1, 'GUATOS', '2023-02-11 09:00:00', NULL, NULL, '2023-02-11 17:00:00', '#FFC107', '<ul><li>Atualização</li></ul>', 'A', '2023-02-11', '09:00:00', '17:00:00', '11:30:00', '13:00:00', '06:30:00', NULL),
(6, 344, 1, 'GUATOS', '2023-02-12 09:00:00', NULL, NULL, '2023-02-12 16:00:00', '#FFC107', '<ul><li>Atualização</li></ul>', 'A', '2023-02-12', '09:00:00', '16:00:00', '11:00:00', '14:00:00', '04:00:00', NULL),
(3, 345, 1, 'FUNLEC(Remoto)', '2023-02-12 09:00:00', NULL, NULL, '2023-02-12 12:00:00', '#4CAF50', '<ul><li>Atualização</li></ul>', 'A', '2023-02-12', '09:00:00', '12:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 346, 1, 'FUNLEC', '2023-02-13 08:30:00', NULL, NULL, '2023-02-13 11:30:00', '#4CAF50', '<ul><li>Dirf</li></ul>', 'A', '2023-02-13', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 347, 1, 'RCG', '2023-02-13 13:00:00', NULL, NULL, '2023-02-13 17:30:00', '#00BCD4', NULL, 'A', '2023-02-13', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(9, 348, NULL, 'JFS', '2023-02-14 08:30:00', NULL, NULL, '2023-02-14 17:30:00', '#FF5722', '<ul><li>Reinstalação Sistema</li></ul>', 'A', '2023-02-14', '08:30:00', '17:30:00', '12:00:00', '13:15:00', '07:45:00', NULL),
(9, 349, NULL, 'JFS(Remoto)', '2023-02-14 20:00:00', NULL, NULL, '2023-02-14 23:00:00', '#FF5722', '<ul><li>Reinstalaçaõ de Sistema</li></ul>', 'A', '2023-02-14', '20:00:00', '23:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(8, 350, NULL, 'Health', '2023-02-14 13:00:00', NULL, NULL, '2023-02-14 17:00:00', '#9E9E9E', '<ul><li>Atualização Base Teste</li></ul>', 'A', '2023-02-14', '13:00:00', '17:00:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(4, 351, 1, 'MSGAS(Remoto)', '2023-02-14 19:00:00', NULL, NULL, '2023-02-14 22:00:00', '#2196F3', '<ul><li>Atualização</li></ul>', 'A', '2023-02-14', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 352, 1, 'MSGAS', '2023-02-15 08:00:00', NULL, NULL, '2023-02-15 17:30:00', '#2196F3', '<ul><li>Ajuste pos Atualização de Sistema</li></ul>', 'A', '2023-02-15', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(3, 353, 1, 'FUNLEC', '2023-02-16 08:30:00', NULL, NULL, '2023-02-16 17:30:00', '#4CAF50', '<ul><li>Dirf</li></ul>', 'A', '2023-02-16', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(9, 354, 1, 'JFS', '2023-02-20 14:00:00', NULL, NULL, '2023-02-20 17:00:00', '#FF5722', '<ul><li>Backup Servidor</li></ul>', 'A', '2023-02-20', '14:00:00', '17:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(9, 355, 1, 'JFS', '2023-02-22 21:00:00', NULL, NULL, '2023-02-22 22:00:00', '#FF5722', '<ul><li>Backup Servidor</li></ul>', 'A', '2023-02-22', '21:00:00', '22:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(5, 356, 1, 'RCG', '2023-02-20 13:00:00', NULL, NULL, '2023-02-20 18:00:00', '#00BCD4', '<ul><li><br></li></ul>', 'A', '2023-02-20', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 357, 1, 'RCG', '2023-02-17 08:30:00', NULL, NULL, '2023-02-17 18:00:00', '#00BCD4', NULL, 'A', '2023-02-17', '08:30:00', '18:00:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(9, 358, 1, 'JFS', '2023-02-17 19:00:00', NULL, NULL, '2023-02-17 20:00:00', '#FF5722', '<ul><li>Backup</li></ul>', 'A', '2023-02-17', '19:00:00', '20:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(8, 359, 1, 'Health', '2023-02-23 08:30:00', NULL, NULL, '2023-02-23 09:30:00', '#9E9E9E', '<ul><li>Reunião diretoria</li></ul>', 'A', '2023-02-23', '08:30:00', '09:30:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(3, 360, 1, 'FUNLEC', '2023-02-23 09:30:00', NULL, NULL, '2023-02-23 17:30:00', '#4CAF50', '<ul><li>Apoio Contabilidade</li></ul>', 'A', '2023-02-23', '09:30:00', '17:30:00', '11:30:00', '13:00:00', '06:30:00', NULL),
(3, 361, 1, 'FUNLEC', '2023-02-27 08:30:00', NULL, NULL, '2023-02-27 11:30:00', '#4CAF50', '<ul><li>Documento de Entrada - Titulos a Pagar.</li></ul>', 'A', '2023-02-27', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 362, 1, 'RCG', '2023-02-27 13:05:00', NULL, NULL, '2023-02-27 17:30:00', '#00BCD4', NULL, 'A', '2023-02-27', '13:05:00', '17:30:00', '00:00:00', '00:00:00', '04:25:00', NULL),
(5, 363, 1, 'RCG', '2023-02-28 08:30:00', NULL, NULL, '2023-02-28 17:30:00', '#00BCD4', NULL, 'A', '2023-02-28', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(9, 364, 1, 'JFS', '2023-02-27 19:30:00', NULL, NULL, '2023-02-27 21:00:00', '#FF5722', '<ul><li>Backup</li></ul>', 'A', '2023-02-27', '19:30:00', '21:00:00', '00:00:00', '00:00:00', '01:30:00', NULL),
(8, 365, 1, 'Health', '2023-02-28 08:30:00', NULL, NULL, '2023-02-28 09:30:00', '#9E9E9E', '<ul><li>Exclusão de titulos de renteção, de notas de entrada lancada com natureza errada</li><li>Validação de retorno de documento</li></ul>', 'A', '2023-02-28', '08:30:00', '09:30:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(4, 366, 1, 'MSGAS', '2023-03-01 08:30:00', NULL, NULL, '2023-03-01 17:30:00', '#2196F3', '<ul><li>Boleto API - Tratamento de Protesto</li></ul>', 'A', '2023-03-01', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(9, 367, 1, 'JFS(Remoto)', '2023-03-01 21:00:00', NULL, NULL, '2023-03-01 22:30:00', '#FF5722', '<ul><li>Backup Sistema HD Externo</li><li>Atualização SO.</li></ul>', 'A', '2023-03-01', '21:00:00', '22:30:00', '00:00:00', '00:00:00', '01:30:00', NULL),
(3, 368, 1, 'FUNLEC', '2023-03-02 08:30:00', NULL, NULL, '2023-03-02 17:30:00', '#4CAF50', '<ul><li>Ajuste cadastro participante MEURH</li><li>Ajuste CNAB para TED</li></ul>', 'A', '2023-03-02', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 369, 1, 'FUNLEC', '2023-03-06 08:30:00', NULL, NULL, '2023-03-06 11:30:00', '#4CAF50', '<ul><li>CNAB Contas a Pagar</li><li>MeuRH</li></ul>', 'A', '2023-03-06', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 370, 1, 'RCG', '2023-03-03 08:30:00', NULL, NULL, '2023-03-03 18:00:00', '#00BCD4', NULL, 'A', '2023-03-03', '08:30:00', '18:00:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(5, 371, 1, 'RCG', '2023-03-06 13:00:00', NULL, NULL, '2023-03-06 17:30:00', '#00BCD4', NULL, 'A', '2023-03-06', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 372, 1, 'RCG(TOTVS)', '2023-03-07 08:00:00', NULL, NULL, '2023-03-07 11:30:00', '#00BCD4', NULL, 'A', '2023-03-07', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(5, 373, 1, 'RCG', '2023-03-07 13:00:00', NULL, NULL, '2023-03-07 17:30:00', '#00BCD4', NULL, 'A', '2023-03-07', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 374, NULL, 'RCG(Remoto)', '2023-03-07 18:30:00', NULL, NULL, '2023-03-07 19:30:00', '#00BCD4', NULL, 'A', '2023-03-07', '18:30:00', '19:30:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(4, 375, NULL, 'MSGAS(remoto)', '2023-03-07 19:00:00', NULL, NULL, '2023-03-07 23:30:00', '#2196F3', '<ul><li>Atualização de Sistema</li></ul>', 'A', '2023-03-07', '19:00:00', '23:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(4, 376, 1, 'MSGAS', '2023-03-08 08:00:00', NULL, NULL, '2023-03-08 17:30:00', '#2196F3', '<ul><li>Analise e ajuste em evento Esocial não enviados.</li><li>Configuração de E-Social s1.1</li><li>Boleto API - Tratamento de Protesto</li></ul>', 'A', '2023-03-08', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(3, 377, 1, 'FUNLEC(Remoto)', '2023-03-08 19:00:00', NULL, NULL, '2023-03-08 23:00:00', '#4CAF50', '<ul><li>Atualização de Sistema</li></ul>', 'A', '2023-03-08', '19:00:00', '23:00:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(3, 378, 1, 'FUNLEC', '2023-03-09 08:00:00', NULL, NULL, '2023-03-09 17:30:00', '#4CAF50', '<ul><li>Configuração E-Socia S1.1</li><li>Reuniao Reinf</li><li>Configuração/Geração de Arquivo MANAD</li></ul>', 'A', '2023-03-09', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(5, 379, 1, 'RCG', '2023-03-10 08:30:00', NULL, NULL, '2023-03-10 18:00:00', '#00BCD4', NULL, 'A', '2023-03-10', '08:30:00', '18:00:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(9, 380, 1, 'JFS(Remoto)', '2023-03-07 21:00:00', NULL, NULL, '2023-03-07 23:30:00', '#FF5722', '<ul><li>Ajuste configuração Backup servidor(Nuvem)</li><li>Backup HD Externo</li></ul>', 'A', '2023-03-07', '21:00:00', '23:30:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(3, 381, 1, 'FUNLEC', '2023-03-13 08:30:00', NULL, NULL, '2023-03-13 11:30:00', '#4CAF50', '<ul><li>E-Social S1.1</li><li>MeuRH</li></ul>', 'A', '2023-03-13', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 382, 1, 'RCG', '2023-03-13 13:00:00', NULL, NULL, '2023-03-13 18:00:00', '#00BCD4', NULL, 'A', '2023-03-13', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(9, 383, 1, 'JFS', '2023-03-13 18:30:00', NULL, NULL, '2023-03-13 19:30:00', '#FF5722', '<ul><li>Reunião com&nbsp;Marilene, Emerson e Tainara</li></ul>', 'A', '2023-03-13', '18:30:00', '19:30:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(8, 384, 1, 'Health(Remoto)', '2023-03-13 19:00:00', NULL, NULL, '2023-03-13 20:00:00', '#9E9E9E', '<ul><li>Atualização de MDF-e</li></ul>', 'A', '2023-03-13', '19:00:00', '20:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(5, 385, 1, 'RCG', '2023-03-14 08:30:00', NULL, NULL, '2023-03-14 17:30:00', '#00BCD4', NULL, 'A', '2023-03-14', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(4, 386, 1, 'MSGAS', '2023-03-15 08:30:00', NULL, NULL, '2023-03-15 17:30:00', '#2196F3', '<ul><li>Calculo de Hora Extra - PONTO</li></ul>', 'A', '2023-03-15', '08:30:00', '17:30:00', '11:30:00', '13:40:00', '06:50:00', NULL),
(8, 387, 1, 'Health(Remoto)', '2023-03-15 13:30:00', NULL, NULL, '2023-03-15 14:50:00', '#9E9E9E', '<ul><li>Nf-e&nbsp; PARA INTERMEDIACAO DE VENDA VEICULO</li></ul>', 'A', '2023-03-15', '13:30:00', '14:50:00', '00:00:00', '00:00:00', '01:20:00', NULL),
(9, 388, 1, 'JFS(Remoto)', '2023-03-14 19:00:00', NULL, NULL, '2023-03-14 21:00:00', '#FF5722', '<ul><li>Atualização Financeiro(Pacote Acumulado SIGAFIN).</li><li>UpdDistr</li></ul>', 'A', '2023-03-14', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(4, 389, 1, 'MSGAS(Remoto)', '2023-03-15 20:00:00', NULL, NULL, '2023-03-15 21:00:00', '#2196F3', '<ul><li>Ponto Eletronico</li></ul>', 'A', '2023-03-15', '20:00:00', '21:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(9, 390, 1, 'JFS(Remoto)', '2023-03-15 19:00:00', NULL, NULL, '2023-03-15 21:00:00', '#FF5722', '<ul><li>Atualização Estoque Custos(SIGAEST)</li><li>Atualização Compras(SIGACOM)</li><li>Atualização Livros Fiscais(SIGAFIS)</li><li>UPDDistr</li></ul>', 'A', '2023-03-15', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 391, 1, 'FUNLEC', '2023-03-16 08:30:00', NULL, NULL, '2023-03-16 17:30:00', '#4CAF50', '<ul><li>Contabilidade</li><li><br></li></ul>', 'A', '2023-03-16', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL);
INSERT INTO `agendamento` (`contrato_id`, `id`, `profissional_id`, `descricao`, `horario_inicial`, `intervalo_inicial`, `intervalo_final`, `horario_final`, `cor`, `observacao`, `tipo`, `data_agenda`, `hora_inicio`, `hora_fim`, `hora_intervalo_inicial`, `hora_intervalo_final`, `hora_total`, `local`) VALUES
(NULL, 392, NULL, 'Beatriz', '2023-03-20 08:00:00', NULL, NULL, '2023-03-20 11:30:00', '#9C27B0', NULL, 'A', '2023-03-20', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(5, 393, NULL, 'RCG', '2023-03-20 13:00:00', NULL, NULL, '2023-03-20 18:00:00', '#00BCD4', NULL, 'A', '2023-03-20', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 394, NULL, 'RCG(Remoto)', '2023-03-20 19:00:00', NULL, NULL, '2023-03-20 20:00:00', '#00BCD4', '<ul><li>Sensor Sonoff</li></ul>', 'A', '2023-03-20', '19:00:00', '20:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(5, 395, NULL, 'RCG', '2023-03-21 08:30:00', NULL, NULL, '2023-03-21 17:30:00', '#00BCD4', NULL, 'A', '2023-03-21', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(4, 396, 1, 'MSGAS', '2023-03-22 08:00:00', NULL, NULL, '2023-03-22 17:30:00', '#2196F3', '<ul><li>Ponto Eletronico</li><li>Banco de horas</li></ul>', 'A', '2023-03-22', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(3, 397, 1, 'FUNLEC', '2023-03-23 08:30:00', NULL, NULL, '2023-03-23 17:30:00', '#4CAF50', '<ul><li>Apoio Contabilidade</li><li>Ajuste MeuRH SSL</li><li>Validação de Fontes versão 2210</li></ul>', 'A', '2023-03-23', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 398, 1, 'FUNLEC', '2023-03-27 08:30:00', NULL, NULL, '2023-03-27 11:30:00', '#4CAF50', '<ul><li>Apoio a Contabilidade</li></ul>', 'A', '2023-03-27', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 399, 1, 'RCG', '2023-03-24 08:30:00', NULL, NULL, '2023-03-24 18:00:00', '#00BCD4', NULL, 'A', '2023-03-24', '08:30:00', '18:00:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(9, 400, NULL, 'JFS(Remoto)', '2023-03-25 09:00:00', NULL, NULL, '2023-03-25 12:00:00', '#FF5722', '<ul><li>Ajuste CNAB de Envio Sicredi(Hibrido)</li><li>Criação de CNAB Modelo Sicredi&nbsp;</li></ul>', 'A', '2023-03-25', '09:00:00', '12:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 401, NULL, 'RCG', '2023-03-27 13:10:00', NULL, NULL, '2023-03-27 17:30:00', '#00BCD4', NULL, 'A', '2023-03-27', '13:10:00', '17:30:00', '00:00:00', '00:00:00', '04:20:00', NULL),
(5, 402, NULL, 'RCG', '2023-03-28 08:00:00', NULL, NULL, '2023-03-28 17:30:00', '#00BCD4', NULL, 'A', '2023-03-28', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(4, 403, NULL, 'MSGAS', '2023-03-29 08:10:00', NULL, NULL, '2023-03-29 17:30:00', '#2196F3', '<ul><li>Ponto Eletronico</li><li>Banco de Horas</li></ul>', 'A', '2023-03-29', '08:10:00', '17:30:00', '11:30:00', '13:30:00', '07:20:00', NULL),
(3, 404, 1, 'FUNLEC', '2023-03-30 08:00:00', NULL, NULL, '2023-03-30 17:30:00', '#4CAF50', '<ul><li>Portal de Compras</li></ul>', 'A', '2023-03-30', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(5, 405, 1, 'RCG', '2023-03-31 08:00:00', NULL, NULL, '2023-03-31 17:30:00', '#00BCD4', '<ul><li>Portal de Compras</li></ul>', 'A', '2023-03-31', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(9, 406, NULL, 'JFS(Remoto)', '2023-03-28 19:00:00', NULL, NULL, '2023-03-28 20:00:00', '#FF5722', '<ul><li>Inclusão Menu Sigafat Cadastro de Intermediador.</li><li>Ajuste na tela de Pedido de Venda</li></ul>', 'A', '2023-03-28', '19:00:00', '20:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(9, 407, NULL, 'JFS(REMOTO)', '2023-03-27 19:00:00', NULL, NULL, '2023-03-27 20:00:00', '#FF5722', '<ul><li>Ajuste importador de XML</li></ul>', 'A', '2023-03-27', '19:00:00', '20:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(5, 408, 1, 'RCG', '2023-03-17 08:00:00', NULL, NULL, '2023-03-17 17:30:00', '#00BCD4', NULL, 'A', '2023-03-17', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(3, 409, 1, 'FUNLEC', '2023-04-03 10:30:00', NULL, NULL, '2023-04-03 11:30:00', '#4CAF50', '<ul><li>Revisão de LP</li></ul>', 'A', '2023-04-03', '10:30:00', '11:30:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(8, 410, NULL, 'Health', '2023-04-01 10:00:00', NULL, NULL, '2023-04-01 18:30:00', '#9E9E9E', '<ul><li>Instalçao de Protheus Local</li></ul>', 'A', '2023-04-01', '10:00:00', '18:30:00', '11:30:00', '13:00:00', '07:00:00', NULL),
(8, 411, 1, 'Health', '2023-04-02 16:00:00', NULL, NULL, '2023-04-02 20:00:00', '#9E9E9E', '<ul><li>Instalação Protheus Local</li></ul>', 'A', '2023-04-02', '16:00:00', '20:00:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(9, 412, NULL, 'JFS(Remoto)', '2023-03-29 09:00:00', NULL, NULL, '2023-03-29 11:00:00', '#FF5722', '<ul><li>Ajuste Configuração CNAB Modelo 2 Sicredi retorno</li></ul>', 'A', '2023-03-29', '09:00:00', '11:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(9, 413, NULL, 'JFS(Remoto)', '2023-03-30 14:00:00', NULL, NULL, '2023-03-30 16:00:00', '#FF5722', '<ul><li>Ajuste CNAB/Boleto Sicredi PIX: Leitura de registro 8.</li></ul>', 'A', '2023-03-30', '14:00:00', '16:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(9, 414, 1, 'JFS(Remoto)', '2023-03-31 09:00:00', NULL, NULL, '2023-03-31 11:00:00', '#FF5722', '<ul><li>Ajuste CNAB/Boleto Sicredi PIX: Leitura de registro 8.</li></ul>', 'A', '2023-03-31', '09:00:00', '11:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 415, 1, 'FUNLEC', '2023-03-29 19:30:00', NULL, NULL, '2023-03-29 22:00:00', '#4CAF50', '<ul><li>Atualização de Sistema</li></ul>', 'A', '2023-03-29', '19:30:00', '22:00:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(5, 416, NULL, 'RCG', '2023-04-03 13:00:00', NULL, NULL, '2023-04-03 17:30:00', '#00BCD4', NULL, 'A', '2023-04-03', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 417, NULL, 'RCG', '2023-04-04 10:00:00', NULL, NULL, '2023-04-04 17:30:00', '#00BCD4', NULL, 'A', '2023-04-04', '10:00:00', '17:30:00', '11:30:00', '13:00:00', '06:00:00', NULL),
(NULL, 418, NULL, 'Beatriz', '2023-04-04 07:00:00', NULL, NULL, '2023-04-04 10:00:00', '#3a87ad', NULL, 'A', '2023-04-04', '07:00:00', '10:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 419, 1, 'MSGAS', '2023-04-05 08:30:00', NULL, NULL, '2023-04-05 17:30:00', '#2196F3', '<ul><li>Ponto Eletronico</li></ul>', 'A', '2023-04-05', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(9, 420, 1, 'JFS(Remoto)', '2023-03-02 19:30:00', NULL, NULL, '2023-03-02 20:30:00', '#FF5722', '<ul><li>Backup manual<br></li></ul>', 'A', '2023-03-02', '19:30:00', '20:30:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(9, 421, 1, 'JFS(Remoto)', '2023-03-03 18:30:00', NULL, NULL, '2023-03-03 19:30:00', '#FF5722', '<ul><li>Backup manual<br></li></ul>', 'A', '2023-03-03', '18:30:00', '19:30:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(9, 422, 1, 'JFS(Remoto)', '2023-03-04 13:00:00', NULL, NULL, '2023-03-04 18:30:00', '#FF5722', '<ul><li>Backup Azure</li><li>Expedição</li></ul>', 'A', '2023-03-04', '13:00:00', '18:30:00', '00:00:00', '00:00:00', '05:30:00', NULL),
(9, 423, 1, 'JFS', '2023-03-06 19:00:00', NULL, NULL, '2023-03-06 20:00:00', '#FF5722', '<ul><li>Backup manual<br></li></ul>', 'A', '2023-03-06', '19:00:00', '20:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(9, 424, NULL, 'JFS(Remoto)', '2023-03-11 09:00:00', NULL, NULL, '2023-03-11 11:00:00', '#FF5722', '<ul><li>Projeto Expedição<br></li></ul>', 'A', '2023-03-11', '09:00:00', '11:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 425, NULL, 'FUNLEC', '2023-04-10 08:30:00', NULL, NULL, '2023-04-10 11:30:00', '#4CAF50', '<ul><li>ESocial - 2306</li><li>Portal Compras</li></ul>', 'A', '2023-04-10', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 426, 1, 'RCG', '2023-04-10 13:00:00', NULL, NULL, '2023-04-10 17:20:00', '#00BCD4', NULL, 'A', '2023-04-10', '13:00:00', '17:20:00', '00:00:00', '00:00:00', '04:20:00', NULL),
(5, 427, 1, 'RCG', '2023-04-11 08:10:00', NULL, NULL, '2023-04-11 17:20:00', '#00BCD4', NULL, 'A', '2023-04-11', '08:10:00', '17:20:00', '12:00:00', '13:00:00', '08:10:00', NULL),
(4, 428, 1, 'MSGAS(Remoto)', '2023-04-11 19:20:00', NULL, NULL, '2023-04-11 22:15:00', '#2196F3', '<ul><li>Atualização de Sistema:<ul><li>23-04-04-LIB_LABEL_03042023_P12_HARPIA</li><li>23-03-17_ATUALIZACAO_12.1.33_FIS_EXPEDICAO_CONTINUA</li><li>23-03-31_ATUALIZACAO_12.1.33_COM_EXPEDICAO_CONTINUA</li><li>23-03-31_ATUALIZACAO_12.1.33_CTB_EXPEDICAO_CONTINUA</li><li>23-04-05_ATUALIZACAO_12.1.33_EST_EXPEDICAO_CONTINUA</li><li>23-04-03_ATUALIZACAO_12.1.33_FAT_EXPEDICAO_CONTINUA</li><li>23-03-31_ATUALIZACAO_12.1.33_FIN_EXPEDICAO_CONTINUA</li><li>23-03-31_ATUALIZACAO_12.1.33_MDT_EXPEDICAO_CONTINUA</li><li>23-04-04_ATUALIZACAO_12.1.33_RH_EXPEDICAO_CONTINUA<br></li></ul></li></ul>', 'A', '2023-04-11', '19:20:00', '22:15:00', '00:00:00', '00:00:00', '02:55:00', NULL),
(3, 429, 1, 'FUNLEC', '2023-04-06 08:30:00', NULL, NULL, '2023-04-06 17:30:00', '#4CAF50', '<ul><li>Portal de Compras</li></ul>', 'A', '2023-04-06', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(4, 430, 1, 'MSGAS', '2023-04-12 08:00:00', NULL, NULL, '2023-04-12 17:30:00', '#2196F3', '<ul><li>Criação de documento com instrução para aparovação de solicitações via MeuRH.</li></ul>', 'A', '2023-04-12', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(3, 431, 1, 'FUNLEC(REMOTO)', '2023-04-12 20:30:00', NULL, NULL, '2023-04-12 22:30:00', '#4CAF50', '<ul><li>Atualização de Sistema:<ul><li>23-04-04-LIB_LABEL_03042023_P12_HARPIA</li><li>23-03-17_ATUALIZACAO_12.1.33_FIS_EXPEDICAO_CONTINUA</li><li>23-03-31_ATUALIZACAO_12.1.33_COM_EXPEDICAO_CONTINUA</li><li>23-03-31_ATUALIZACAO_12.1.33_CTB_EXPEDICAO_CONTINUA</li><li>23-04-05_ATUALIZACAO_12.1.33_EST_EXPEDICAO_CONTINUA</li><li><span style=\"color: var(--text-color); font-family: var(--font-family); font-size: var(--font-size);\">23-03-31_ATUALIZACAO_12.1.33_FIN_EXPEDICAO_CONTINUA</span><br></li><li>23-03-31_ATUALIZACAO_12.1.33_MDT_EXPEDICAO_CONTINUA</li><li>23-04-04_ATUALIZACAO_12.1.33_RH_EXPEDICAO_CONTINUA</li></ul></li></ul>', 'A', '2023-04-12', '20:30:00', '22:30:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 432, 1, 'FUNLEC', '2023-04-13 08:00:00', NULL, NULL, '2023-04-13 17:30:00', '#4CAF50', '<ul><li>E-Social - Alteração de Matricula S2300</li></ul>', 'A', '2023-04-13', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(5, 433, NULL, 'RCG', '2023-04-17 08:30:00', NULL, NULL, '2023-04-17 18:00:00', '#00BCD4', NULL, 'A', '2023-04-17', '08:30:00', '18:00:00', '12:00:00', '13:00:00', '08:30:00', NULL),
(3, 434, 1, 'FUNLEC', '2023-04-18 08:00:00', NULL, NULL, '2023-04-18 11:30:00', '#4CAF50', '<ul><li>Api Compras</li></ul>', 'A', '2023-04-18', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(5, 435, 1, 'RCG', '2023-04-18 13:00:00', NULL, NULL, '2023-04-18 18:00:00', '#00BCD4', NULL, 'A', '2023-04-18', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(4, 436, NULL, 'MSGAS', '2023-04-19 08:30:00', NULL, NULL, '2023-04-19 17:30:00', '#2196F3', '<ul><li>Ajustes Ponto Eletronico - Espelho de Ponto</li><li>Acompanhamento de Custos</li><li>Codeanalysis<br></li></ul>', 'A', '2023-04-19', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(4, 437, NULL, 'MSGAS(Remoto)', '2023-04-18 14:00:00', NULL, NULL, '2023-04-18 16:00:00', '#2196F3', '<ul><li>Ponto Eletronico - Espelho de ponto</li></ul>', 'A', '2023-04-18', '14:00:00', '16:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 438, NULL, 'FUNLEC(Remoto)', '2023-04-19 20:00:00', NULL, NULL, '2023-04-19 22:00:00', '#4CAF50', '<ul><li>Atualização RH</li><li>Atualização MDT</li></ul>', 'A', '2023-04-19', '20:00:00', '22:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(5, 439, NULL, 'RCG', '2023-04-20 08:00:00', NULL, NULL, '2023-04-20 10:00:00', '#00BCD4', NULL, 'A', '2023-04-20', '08:00:00', '10:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 440, NULL, 'FUNLEC', '2023-04-20 10:00:00', NULL, NULL, '2023-04-20 17:30:00', '#4CAF50', '<ul><li>Cnab SICREDI contas a pagar</li></ul>', 'A', '2023-04-20', '10:00:00', '17:30:00', '11:30:00', '13:00:00', '06:00:00', NULL),
(3, 441, 1, 'FUNLEC', '2023-04-24 08:30:00', NULL, NULL, '2023-04-24 11:30:00', '#4CAF50', '<ul><li>CNAB contas a pagar Sicredi</li></ul>', 'A', '2023-04-24', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 442, 1, 'RCG', '2023-04-24 13:00:00', NULL, NULL, '2023-04-24 17:30:00', '#00BCD4', NULL, 'A', '2023-04-24', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 443, 1, 'RCG', '2023-04-25 08:30:00', NULL, NULL, '2023-04-25 17:30:00', '#00BCD4', NULL, 'A', '2023-04-25', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(4, 444, 1, 'MSGAS', '2023-04-26 08:00:00', NULL, NULL, '2023-04-26 17:30:00', '#2196F3', '<ul><li>Atualização Release 2210</li></ul>', 'A', '2023-04-26', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(5, 445, 1, 'RCG', '2023-04-27 08:30:00', NULL, NULL, '2023-04-27 17:30:00', '#00BCD4', NULL, 'A', '2023-04-27', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(4, 446, 1, 'MSGAS', '2023-04-28 09:30:00', NULL, NULL, '2023-04-28 17:30:00', '#2196F3', '<ul><li>Atualização Release 2210</li></ul>', 'A', '2023-04-28', '09:30:00', '17:30:00', '11:30:00', '13:30:00', '06:00:00', NULL),
(4, 447, NULL, 'MSGAS(Remoto)', '2023-04-25 19:00:00', NULL, NULL, '2023-04-25 21:00:00', '#2196F3', '<ul><li>Atualização TAF/GPE</li></ul>', 'A', '2023-04-25', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 448, NULL, 'FUNLEC(Remoto)', '2023-04-25 19:00:00', NULL, NULL, '2023-04-25 21:00:00', '#4CAF50', '<ul><li>Atualização Compras</li></ul>', 'A', '2023-04-25', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(4, 449, NULL, 'MSGAS(REMOTO)', '2023-04-27 14:00:00', NULL, NULL, '2023-04-27 17:00:00', '#2196F3', '<ul><li>Atualização TAF</li></ul>', 'A', '2023-04-27', '14:00:00', '17:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 450, NULL, 'RCG', '2023-04-14 08:00:00', NULL, NULL, '2023-04-14 18:00:00', '#00BCD4', NULL, 'A', '2023-04-07', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(NULL, 451, NULL, 'feriado', '2023-04-07 08:00:00', NULL, NULL, '2023-04-07 18:00:00', '#F44336', NULL, 'A', '2023-04-07', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(NULL, 452, NULL, 'feriado', '2023-04-21 08:00:00', NULL, NULL, '2023-04-21 18:00:00', '#F44336', NULL, 'A', '2023-04-21', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(NULL, 453, NULL, 'feriado', '2023-05-01 08:00:00', NULL, NULL, '2023-05-01 18:00:00', '#3a87ad', NULL, 'A', '2023-05-01', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(5, 454, 1, 'RCG', '2023-05-02 08:30:00', NULL, NULL, '2023-05-02 17:30:00', '#00BCD4', NULL, 'A', '2023-05-02', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 455, 1, 'FUNLEC(REMOTO)', '2023-04-28 14:00:00', NULL, NULL, '2023-04-28 16:00:00', '#4CAF50', '<ul><li>Revisão de Verbas Calculo de DSR professor com afastamento</li></ul>', 'A', '2023-04-29', '14:00:00', '16:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 456, 1, 'FUNLEC(REMOTO)', '2023-04-13 19:00:00', NULL, NULL, '2023-04-13 21:00:00', '#4CAF50', '<ul><li>Atualização 2210</li></ul>', 'A', '2023-04-13', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 457, NULL, 'FUNLEC(Remoto)', '2023-04-17 19:00:00', NULL, NULL, '2023-04-17 21:00:00', '#4CAF50', '<ul><li>Atualização 2210</li></ul>', 'A', '2023-04-17', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(4, 458, 1, 'MSGAS', '2023-05-03 08:30:00', NULL, NULL, '2023-05-03 17:30:00', '#2196F3', '<ul><li>Atualização 2210</li></ul>', 'A', '2023-05-03', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(3, 459, 1, 'FUNLEC', '2023-05-04 08:00:00', NULL, NULL, '2023-05-04 17:30:00', '#4CAF50', '<ul><li>Atualização 2210</li><li>Cnab Sicredi Contas a Pagar.</li></ul>', 'A', '2023-05-04', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(5, 460, 1, 'RCG', '2023-05-05 08:30:00', NULL, NULL, '2023-05-05 17:00:00', '#00BCD4', NULL, 'A', '2023-05-05', '08:30:00', '17:00:00', '11:30:00', '13:00:00', '07:00:00', NULL),
(3, 461, 1, 'FUNLEC', '2023-05-08 08:30:00', NULL, NULL, '2023-05-08 11:30:00', '#4CAF50', '<ul><li>Ajustes Release 2210</li><li>Migração Dicionario para o Banco de Dados</li></ul>', 'A', '2023-05-08', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 462, NULL, 'RCG', '2023-05-08 13:00:00', NULL, NULL, '2023-05-08 17:30:00', '#00BCD4', NULL, 'A', '2023-05-08', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 463, NULL, 'RCG', '2023-05-09 08:20:00', NULL, NULL, '2023-05-09 17:30:00', '#00BCD4', NULL, 'A', '2023-05-09', '08:20:00', '17:30:00', '11:30:00', '13:00:00', '07:40:00', NULL),
(4, 464, NULL, 'MSGAS', '2023-05-09 19:00:00', NULL, NULL, '2023-05-09 21:30:00', '#2196F3', '<ul><li>Migração Dicionario Banco de Dados</li></ul>', 'A', '2023-05-09', '19:00:00', '21:30:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(4, 465, NULL, 'MSGAS', '2023-05-10 08:30:00', NULL, NULL, '2023-05-10 17:30:00', '#2196F3', '<ul><li>Atualização Release 2210</li></ul>', 'A', '2023-05-10', '08:30:00', '17:30:00', '11:30:00', '14:00:00', '06:30:00', NULL),
(3, 466, 1, 'FUNLEC', '2023-05-11 08:00:00', NULL, NULL, '2023-05-11 17:30:00', '#4CAF50', '<ul><li>Atualização TAF</li><li>Atualização&nbsp; Release 2210</li></ul>', 'A', '2023-05-11', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(3, 467, NULL, 'FUNLEC(Remoto)', '2023-05-10 20:00:00', NULL, NULL, '2023-05-10 21:00:00', '#4CAF50', '<ul><li>Atualização GPE</li></ul>', 'A', '2023-05-10', '20:00:00', '21:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(5, 468, NULL, 'RCG', '2023-05-12 09:00:00', NULL, NULL, '2023-05-12 17:00:00', '#00BCD4', NULL, 'A', '2023-05-12', '09:00:00', '17:00:00', '11:30:00', '13:00:00', '06:30:00', NULL),
(3, 469, NULL, 'FUNLEC', '2023-05-15 08:30:00', NULL, NULL, '2023-05-15 11:30:00', '#4CAF50', '<ul><li>Atualização 2210</li></ul>', 'A', '2023-05-15', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 470, NULL, 'FUNLEC(Remoto)', '2023-05-13 09:00:00', NULL, NULL, '2023-05-13 11:00:00', '#4CAF50', '<ul><li>Migração Dicionario Banco de dados.</li></ul>', 'A', '2023-05-13', '09:00:00', '11:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(5, 471, 1, 'RCG(Remoto)', '2023-05-13 14:00:00', NULL, NULL, '2023-05-13 17:00:00', '#00BCD4', '<ul><li>Migração Dicionario Banco</li></ul>', 'A', '2023-05-13', '14:00:00', '17:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 472, NULL, 'RCG', '2023-05-15 13:00:00', NULL, NULL, '2023-05-15 17:30:00', '#00BCD4', NULL, 'A', '2023-05-15', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(3, 473, 1, 'FUNLEC', '2023-05-15 19:00:00', NULL, NULL, '2023-05-15 21:00:00', '#4CAF50', '<ul><li>Atualização Servidor de Licencas</li><li>23-04-28_ATUALIZACAO_12.1.33_FIN_EXPEDICAO_CONTINUA<br></li></ul>', 'A', '2023-05-15', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(5, 474, NULL, 'RCG', '2023-05-16 08:30:00', NULL, NULL, '2023-05-16 16:30:00', '#00BCD4', NULL, 'A', '2023-05-16', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(4, 475, NULL, 'MSGAS(Remoto)', '2023-05-16 19:00:00', NULL, NULL, '2023-05-16 21:30:00', '#2196F3', '<ul><li>Atualização de Sistema</li><li><li>23-05-12_ATUALIZACAO_12.1.33_MDT_EXPEDICAO_CONTINUA</li><li>23-05-09_ATUALIZACAO_12.1.33_RH_EXPEDICAO_CONTINUA</li><li>23-05-08_ATUALIZACAO_12.1.33_ATF_EXPEDICAO_CONTINUA</li><li>23-05-02_ATUALIZACAO_12.1.33_PCO_EXPEDICAO_CONTINUA</li><li>23-04-28_ATUALIZACAO_12.1.33_CTB_EXPEDICAO_CONTINUA</li><li>23-04-28_ATUALIZACAO_12.1.33_EST_EXPEDICAO_CONTINUA</li><li>23-04-28_ATUALIZACAO_12.1.33_FAT_EXPEDICAO_CONTINUA</li><li>23-04-28_ATUALIZACAO_12.1.33_FIN_EXPEDICAO_CONTINUA</li><li>23-04-28_ATUALIZACAO_12.1.33_FIS_EXPEDICAO_CONTINUA</li><li>23-04-28_ATUALIZACAO_12.1.33_COM_EXPEDICAO_CONTINUA</li><li>23-05-03_ATUALIZACAO_12.1.33_BACKOFFICE_EXPEDICAO_CONTINUA</li><li>23-04-17_ATUALIZACAO_12.1.33_TAF_EXPEDICAO_CONTINUA&nbsp;</li><li>23-05-15-LIB_LABEL_15052023_P12_HARPIA</li><li>23-04-26-P12_APPSERVER_BUILD-20.3.1.5_LINUX_X64</li><li>23-04-25-PRINTER_LINUX_X64</li></li></ul>', 'A', '2023-05-16', '19:00:00', '21:30:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(4, 476, NULL, 'MSGAS', '2023-05-17 08:30:00', NULL, NULL, '2023-05-17 17:30:00', '#2196F3', '<ul><li>Atualização 2210</li></ul>', 'A', '2023-05-17', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(3, 477, NULL, 'FUNLEC', '2023-05-18 08:30:00', NULL, NULL, '2023-05-18 17:30:00', '#4CAF50', '<ul><li>Ajuste LP 562-003</li><li>Cnab Sicredi</li><li>Atualização 2210</li></ul>', 'A', '2023-05-18', '08:30:00', '17:30:00', '11:30:00', '14:00:00', '06:30:00', NULL),
(3, 478, 1, 'FUNLEC', '2023-05-22 08:20:00', NULL, NULL, '2023-05-22 11:30:00', '#4CAF50', '<ul><li>Atualização 2210</li></ul>', 'A', '2023-05-22', '08:20:00', '11:30:00', '00:00:00', '00:00:00', '03:10:00', NULL),
(5, 479, 1, 'RCG', '2023-05-22 13:00:00', NULL, NULL, '2023-05-22 17:30:00', '#00BCD4', NULL, 'A', '2023-05-22', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 480, 1, 'RCG', '2023-05-23 08:30:00', NULL, NULL, '2023-05-23 17:30:00', '#00BCD4', NULL, 'A', '2023-05-23', '08:30:00', '17:30:00', '12:00:00', '14:00:00', '07:00:00', NULL),
(4, 481, 1, 'MSGAS', '2023-05-24 08:00:00', NULL, NULL, '2023-05-24 17:30:00', '#2196F3', '<ul><li>ECD - 2022</li></ul>', 'A', '2023-05-24', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(3, 484, NULL, 'FUNLEC', '2023-06-05 08:00:00', NULL, NULL, '2023-06-05 12:00:00', '#4CAF50', '<ul><li>Atualização 2210</li></ul>', 'A', '2023-06-05', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(3, 485, 1, 'FUNLEC', '2023-05-25 08:30:00', NULL, NULL, '2023-05-25 17:30:00', '#4CAF50', '<ul><li>Atualização 2210</li></ul>', 'A', '2023-05-25', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 486, 1, 'FUNLEC', '2023-05-29 09:00:00', NULL, NULL, '2023-05-29 11:30:00', '#4CAF50', '<ul><li>Atualização 2210</li></ul>', 'A', '2023-05-29', '09:00:00', '11:30:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(3, 488, NULL, 'FUNLEC', '2023-06-01 08:00:00', NULL, NULL, '2023-06-01 17:30:00', '#4CAF50', NULL, 'A', '2023-05-30', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(4, 489, NULL, 'MSGAS', '2023-05-31 08:30:00', NULL, NULL, '2023-05-31 17:30:00', '#2196F3', '<ul><li>Atualização 2210</li></ul>', 'A', '2023-05-31', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(4, 490, NULL, 'MSGAS(Remoto)', '2023-05-30 19:00:00', NULL, NULL, '2023-05-30 21:00:00', '#2196F3', '<ul><li>Atualização servidor de Licencas</li></ul>', 'A', '2023-05-30', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(5, 491, NULL, 'RCG', '2023-05-26 08:00:00', NULL, NULL, '2023-05-26 17:30:00', '#00BCD4', NULL, 'A', '2023-05-26', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(5, 492, NULL, 'RCG', '2023-05-19 08:00:00', NULL, NULL, '2023-05-19 18:00:00', '#00BCD4', NULL, 'A', '2023-05-19', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(3, 494, NULL, 'FUNLEC(Remoto)', '2023-05-31 21:00:00', NULL, NULL, '2023-05-31 22:15:00', '#4CAF50', '<ul><li>Atualização Folha</li></ul>', 'A', '2023-05-31', '21:00:00', '22:15:00', '00:00:00', '00:00:00', '01:15:00', NULL),
(5, 495, NULL, 'RCG', '2023-05-29 13:00:00', NULL, NULL, '2023-05-29 18:00:00', '#00BCD4', NULL, 'A', '2023-05-29', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 496, NULL, 'RCG', '2023-05-30 08:30:00', NULL, NULL, '2023-05-30 17:30:00', '#00BCD4', NULL, 'A', '2023-05-30', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 497, 1, 'RCG', '2023-06-05 13:10:00', NULL, NULL, '2023-06-05 17:30:00', '#00BCD4', NULL, 'A', '2023-06-08', '13:10:00', '17:30:00', '00:00:00', '00:00:00', '04:20:00', NULL),
(5, 498, NULL, 'RCG', '2023-06-06 08:30:00', NULL, NULL, '2023-06-06 17:30:00', '#00BCD4', NULL, 'A', '2023-06-06', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(4, 499, 1, 'MSGAS', '2023-06-07 08:30:00', NULL, NULL, '2023-06-07 17:30:00', '#2196F3', '<ul><li>Atualização 2210</li></ul>', 'A', '2023-06-07', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(NULL, 500, NULL, 'Feriado', '2023-06-08 08:00:00', NULL, NULL, '2023-06-08 18:00:00', '#E91E63', NULL, 'A', '2023-06-08', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(5, 501, NULL, 'RCG(FALTA)', '2023-06-09 08:30:00', NULL, NULL, '2023-06-09 17:30:00', '#FF0101', NULL, 'A', '2023-06-09', '08:30:00', '17:30:00', '00:00:00', '00:00:00', '09:00:00', NULL),
(5, 502, NULL, 'RCG(FALTA)', '2023-06-12 13:00:00', NULL, NULL, '2023-06-12 18:00:00', '#FF0000', NULL, 'A', '2023-06-12', '09:00:00', '18:00:00', '00:00:00', '00:00:00', '09:00:00', NULL),
(NULL, 503, NULL, 'FERIADO', '2023-06-13 08:00:00', NULL, NULL, '2023-06-13 18:00:00', '#FF0000', NULL, 'A', '2023-06-13', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(3, 505, NULL, 'FUNLEC', '2023-06-14 07:30:00', NULL, NULL, '2023-06-14 17:30:00', '#4CAF50', '<ul><li>Atualização 2210 - Produção</li></ul>', 'A', '2023-06-14', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(3, 506, NULL, 'FUNLEC', '2023-06-13 09:00:00', NULL, NULL, '2023-06-13 17:00:00', '#4CAF50', '<ul><li>Atualização 2210 - Produção</li></ul>', 'A', '2023-06-13', '09:00:00', '17:00:00', '12:00:00', '13:30:00', '06:30:00', NULL),
(4, 507, NULL, 'MSGAS', '2023-06-15 08:00:00', NULL, NULL, '2023-06-15 17:30:00', '#2196F3', '<ul><li>Atualização 2210</li></ul>', 'A', '2023-06-15', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(5, 508, NULL, 'RCG', '2023-06-16 08:30:00', NULL, NULL, '2023-06-16 18:00:00', '#00BCD4', NULL, 'A', '2023-06-16', '08:30:00', '18:00:00', '12:00:00', '13:00:00', '08:30:00', NULL),
(5, 509, NULL, 'RCG(Remoto)', '2023-06-15 19:30:00', NULL, NULL, '2023-06-15 22:30:00', '#00BCD4', NULL, 'A', '2023-06-15', '19:30:00', '22:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 510, NULL, 'MSGAS(REMOTO)', '2023-06-17 09:00:00', NULL, NULL, '2023-06-17 17:00:00', '#2196F3', '<ul><li>Atualização 2210 Produção</li></ul>', 'A', '2023-06-17', '09:00:00', '17:00:00', '12:00:00', '13:30:00', '06:30:00', NULL),
(6, 511, NULL, 'GUATOS(Remoto)', '2023-06-14 19:00:00', NULL, NULL, '2023-06-14 22:00:00', '#FFC107', NULL, 'A', '2023-06-14', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 512, NULL, 'MSGAS', '2023-06-19 08:15:00', NULL, NULL, '2023-06-19 17:30:00', '#2196F3', '<ul><li>Acompanhamento pos Atualização</li><li>Correção de impressão Word</li><li>Correcação de Impressão XLX e PDF</li></ul>', 'A', '2023-06-19', '08:15:00', '17:30:00', '11:30:00', '14:00:00', '06:45:00', NULL),
(3, 513, NULL, 'FUNLEC', '2023-06-21 08:00:00', NULL, NULL, '2023-06-21 11:30:00', '#4CAF50', '<ul><li>Atualização 2210 - Produção</li></ul>', 'A', '2023-06-21', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(5, 514, NULL, 'RCG', '2023-06-21 13:00:00', NULL, NULL, '2023-06-21 17:30:00', '#00BCD4', NULL, 'A', '2023-06-21', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 515, NULL, 'RCG', '2023-06-20 08:00:00', NULL, NULL, '2023-06-20 17:30:00', '#00BCD4', NULL, 'A', '2023-06-20', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(5, 516, NULL, 'RCG', '2023-06-22 08:00:00', NULL, NULL, '2023-06-22 17:30:00', '#00BCD4', NULL, 'A', '2023-06-22', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(3, 517, NULL, 'FUNLEC', '2023-06-23 08:15:00', NULL, NULL, '2023-06-23 19:00:00', '#4CAF50', '<ul><li>Troca de Servidor</li><li>Atendimento Folha</li><li>Atendimento Compras</li></ul>', 'A', '2023-06-23', '08:15:00', '17:30:00', '11:30:00', '13:00:00', '07:45:00', NULL),
(3, 518, NULL, 'FUNLEC(Remoto)', '2023-06-24 16:30:00', NULL, NULL, '2023-06-24 23:30:00', '#4CAF50', '<ul><li>Troca de Servidor</li></ul>', 'A', '2023-06-24', '16:30:00', '23:30:00', '00:00:00', '00:00:00', '07:00:00', NULL),
(3, 519, NULL, 'FUNLEC(Remoto)', '2023-06-25 09:00:00', NULL, NULL, '2023-06-25 13:00:00', '#4CAF50', '<ul><li>Troca de Servidor</li></ul>', 'A', '2023-06-25', '09:00:00', '13:00:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(3, 520, NULL, 'FUNLEC', '2023-06-26 08:00:00', NULL, NULL, '2023-06-26 11:30:00', '#4CAF50', '<ul><li>Troca de Servidor</li></ul>', 'A', '2023-06-26', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(5, 521, NULL, 'RCG', '2023-06-26 13:10:00', NULL, NULL, '2023-06-26 17:30:00', '#00BCD4', NULL, 'A', '2023-06-26', '13:10:00', '17:30:00', '00:00:00', '00:00:00', '04:20:00', NULL),
(4, 522, NULL, 'MSGAS', '2023-06-28 08:30:00', NULL, NULL, '2023-06-28 17:30:00', '#2196F3', '<ul><li>Validação de chave CTE/NFE</li><li>Chamado 17418514 (SOLICITAÇÃO DE RESET DE SENHA DO USUÁRIO ADMINISTRADOR)</li><li>Chamado 17346773 (Error Log FINA710) - Registro e Retorno BB OnLine</li></ul><p><br></p>', 'A', '2023-06-28', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(5, 523, NULL, 'RCG', '2023-06-27 08:30:00', NULL, NULL, '2023-06-27 17:30:00', '#00BCD4', NULL, 'A', '2023-06-27', '08:30:00', '17:30:00', '11:30:00', '13:10:00', '07:20:00', NULL),
(3, 524, NULL, 'FUNLEC(Remoto)', '2023-06-28 19:00:00', NULL, NULL, '2023-06-28 21:00:00', '#4CAF50', '<ul><li>Atualização base teste</li></ul>', 'A', '2023-06-28', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 525, NULL, 'FUNLEC', '2023-06-29 08:30:00', NULL, NULL, '2023-06-29 17:30:00', '#4CAF50', '<ul><li>Regras de Firewall Protheus</li><li>Integração Sophia</li></ul>', 'A', '2023-06-29', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 526, NULL, 'RCG', '2023-06-02 08:30:00', NULL, NULL, '2023-06-02 17:10:00', '#00BCD4', NULL, 'A', '2023-06-02', '08:30:00', '17:10:00', '11:30:00', '13:00:00', '07:10:00', NULL),
(4, 527, NULL, 'MSGAS(Remoto)', '2023-06-16 09:00:00', NULL, NULL, '2023-06-16 11:00:00', '#2196F3', '<ul><li>Ponto</li><li>Atualização 2210 Produção</li></ul>', 'A', '2023-06-16', '09:00:00', '11:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(4, 528, NULL, 'MSGAS(Remoto)', '2023-06-01 19:00:00', NULL, NULL, '2023-06-01 21:00:00', '#2196F3', '<ul><li>Atualização 2210</li></ul>', 'A', '2023-06-01', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(5, 529, NULL, 'RCG', '2023-06-30 08:30:00', NULL, NULL, '2023-06-30 17:00:00', '#00BCD4', NULL, 'A', '2023-06-30', '08:30:00', '17:00:00', '11:30:00', '13:00:00', '07:00:00', NULL),
(3, 530, NULL, 'FUNLEC', '2023-07-03 08:30:00', NULL, NULL, '2023-07-03 11:30:00', '#4CAF50', '<ul><li>Suporte</li></ul>', 'A', '2023-07-03', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(6, 531, NULL, 'GUATOS(Remoto)', '2023-07-03 09:30:00', NULL, NULL, '2023-07-03 11:00:00', '#FFC107', NULL, 'A', '2023-07-03', '09:30:00', '11:00:00', '00:00:00', '00:00:00', '01:30:00', NULL),
(5, 532, NULL, 'RCG', '2023-07-03 13:00:00', NULL, NULL, '2023-07-03 17:30:00', '#00BCD4', NULL, 'A', '2023-07-03', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 533, NULL, 'RCG', '2023-07-04 08:10:00', NULL, NULL, '2023-07-04 17:30:00', '#00BCD4', NULL, 'A', '2023-07-04', '08:10:00', '17:30:00', '11:30:00', '13:00:00', '07:50:00', NULL),
(4, 534, NULL, 'MSGAS(Remoto)', '2023-07-04 19:30:00', NULL, NULL, '2023-07-04 21:00:00', '#2196F3', '<ul><li>Atualização</li><li>23-06-21_ATUALIZACAO_12.1.2210_TAF_EXPEDICAO_CONTINUA<br></li><li>23-06-27_ATUALIZACAO_12.1.2210_RH_EXPEDICAO_CONTINUA</li><li>23-06-26-LIB_LABEL_26062023_P12_HARPIA</li></ul>', 'A', '2023-07-04', '19:30:00', '21:00:00', '00:00:00', '00:00:00', '01:30:00', NULL),
(4, 535, NULL, 'MSGAS', '2023-07-05 08:30:00', NULL, NULL, '2023-07-05 17:30:00', '#2196F3', '<ul><li>Filtro de Titulos na rotina de Bordero</li></ul>', 'A', '2023-07-05', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(3, 536, 1, 'FUNLEC(Remoto)', '2023-07-05 19:00:00', NULL, NULL, '2023-07-05 23:30:00', '#4CAF50', '<ul><li>Atualização:<ul><li>23-06-28_ATUALIZACAO_12.1.2210_BACKOFFICE_EXPEDICAO_CONTINUA</li><li>23-06-23_ATUALIZACAO_12.1.2210_FIS_EXPEDICAO_CONTINUA</li><li>23-06-21_ATUALIZACAO_12.1.2210_TAF_EXPEDICAO_CONTINUA</li><li>23-06-27_ATUALIZACAO_12.1.2210_RH_EXPEDICAO_CONTINUA<br></li></ul></li></ul><ul><li>Suporte Reinf<ul><li>Atualização TSS</li><li>Chamado nº 17483263&nbsp;</li></ul></li></ul>', 'A', '2023-07-05', '19:00:00', '23:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(3, 537, 1, 'FUNLEC', '2023-07-06 08:30:00', NULL, NULL, '2023-07-06 17:30:00', '#4CAF50', '<ul><li>Suporte Reinf<ul><li>Atualização TSS</li><li>Chamado nº 17483263&nbsp;</li></ul></li></ul>', 'A', '2023-07-06', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(6, 538, 1, 'GUATOS', '2023-07-06 19:00:00', NULL, NULL, '2023-07-06 23:00:00', '#FFC107', '<ul><li>Atualização Reinf</li></ul>', 'A', '2023-07-06', '19:00:00', '23:00:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(3, 539, 1, 'FUNLEC', '2023-07-10 08:30:00', NULL, NULL, '2023-07-10 11:30:00', '#4CAF50', '<ul><li>Consumo de API Relogio de Ponto</li></ul>', 'A', '2023-07-10', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 540, NULL, 'RCG', '2023-07-10 13:00:00', NULL, NULL, '2023-07-10 18:00:00', '#00BCD4', NULL, 'A', '2023-07-10', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 541, 1, 'RCG', '2023-07-11 08:30:00', NULL, NULL, '2023-07-11 18:00:00', '#00BCD4', NULL, 'A', '2023-07-11', '08:30:00', '18:00:00', '12:00:00', '13:00:00', '08:30:00', NULL),
(4, 542, NULL, 'MSGAS', '2023-07-12 08:30:00', NULL, NULL, '2023-07-12 17:30:00', '#2196F3', '<ul><li>Registro Online BB<ul><li>Ajuste em rotina de geração de PIX</li><li>Ajuste em PE de gravação de Bordero</li><li>Atualização Retorno Cobrança Online Chamado 17346773</li></ul></li></ul>', 'A', '2023-07-12', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(3, 543, 1, 'FUNLEC', '2023-07-13 08:30:00', NULL, NULL, '2023-07-13 17:30:00', '#4CAF50', '<ul><li>Envio de Afastamento estagiario E-Social</li><li>Definição de regras arquivo contabil sistema Sophia</li><li>Atualização acumulado RH base de testes. Chamado 17215241</li></ul>', 'A', '2023-07-13', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(4, 544, 1, 'MSGAS(remoto)', '2023-07-18 19:00:00', NULL, NULL, '2023-07-18 21:00:00', '#2196F3', '<ul><li>Atualização de Sistema<ul><li>PACOTE_DE_CORRECAO_17360788_DSTFC-5747_12.1.2210</li><li>23-07-12_ATUALIZACAO_12.1.2210_BACKOFFICE_EXPEDICAO_CONTINUA</li><li>23-07-17-LIB_LABEL_26062023_P12_HARPIA</li><li>23-07-18-ARQUIVOS_PORTAL_MEU_RH<br></li></ul></li></ul>', 'A', '2023-07-18', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(5, 545, 1, 'RCG', '2023-07-17 09:00:00', NULL, NULL, '2023-07-17 18:00:00', '#00BCD4', NULL, 'A', '2023-07-17', '09:00:00', '18:00:00', '11:30:00', '14:00:00', '06:30:00', NULL),
(5, 546, NULL, 'RCG', '2023-07-18 08:30:00', NULL, NULL, '2023-07-18 18:00:00', '#00BCD4', NULL, 'A', '2023-07-18', '08:30:00', '18:00:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(4, 547, 1, 'MSGAS', '2023-07-19 09:30:00', NULL, NULL, '2023-07-19 17:30:00', '#2196F3', '<ul><li>Retorno de Registro Online</li><li>Retorno de Baixa Online</li><li>Criação de AppServer para o REST</li></ul>', 'A', '2023-07-19', '09:30:00', '17:30:00', '11:30:00', '13:30:00', '06:00:00', NULL),
(3, 548, 1, 'FUNLEC', '2023-07-20 08:30:00', NULL, NULL, '2023-07-20 17:30:00', '#4CAF50', '<ul><li>Verbas de Gratificação</li><li>Importação de Api de Ponto</li><li>Apontamento de Ponto via Agendamento</li></ul>', 'A', '2023-07-20', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 549, 1, 'RCG', '2023-07-21 08:30:00', NULL, NULL, '2023-07-21 18:00:00', '#00BCD4', NULL, 'A', '2023-07-21', '08:30:00', '18:00:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(3, 550, 1, 'FUNLEC', '2023-07-24 08:30:00', NULL, NULL, '2023-07-24 11:30:00', '#4CAF50', '<ul><li>Importação de Ponto Via API</li></ul>', 'A', '2023-07-24', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 551, 1, 'RCG', '2023-07-24 13:10:00', NULL, NULL, '2023-07-24 18:00:00', '#00BCD4', NULL, 'A', '2023-07-24', '13:10:00', '18:00:00', '00:00:00', '00:00:00', '04:50:00', NULL),
(5, 552, 1, 'RCG', '2023-07-25 08:05:00', NULL, NULL, '2023-07-25 17:30:00', '#00BCD4', NULL, 'A', '2023-07-25', '08:05:00', '17:30:00', '11:30:00', '13:00:00', '07:55:00', NULL),
(5, 553, 1, 'RCG', '2023-07-26 08:05:00', NULL, NULL, '2023-07-26 18:00:00', '#00BCD4', NULL, 'A', '2023-07-26', '08:05:00', '18:00:00', '11:30:00', '13:05:00', '08:20:00', NULL),
(3, 554, 1, 'FUNLEC', '2023-07-27 08:30:00', NULL, NULL, '2023-07-27 17:30:00', '#4CAF50', '<ul><li>Calculo de Folha</li></ul>', 'A', '2023-07-27', '08:30:00', '17:30:00', '11:30:00', '13:10:00', '07:20:00', NULL),
(4, 555, 1, 'MSGAS', '2023-07-28 08:30:00', NULL, NULL, '2023-07-28 17:30:00', '#2196F3', '<ul><li>Ajuste MeuRH</li><li>Retorno de Chamado 17602867 , Api BB</li></ul>', 'A', '2023-07-28', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(3, 556, 1, 'FUNLEC', '2023-07-31 08:30:00', NULL, NULL, '2023-07-31 11:30:00', '#4CAF50', '<ul><li>Ponto Eletronico</li><li>Erro integração TSI</li></ul>', 'A', '2023-07-31', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 557, 1, 'MSGAS', '2023-07-17 16:00:00', NULL, NULL, '2023-07-17 17:00:00', '#2196F3', '<ul><li>Espelho de ponto</li></ul>', 'A', '2023-07-17', '16:00:00', '17:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(5, 558, 1, 'RCG', '2023-07-07 08:00:00', NULL, NULL, '2023-07-07 18:00:00', '#00BCD4', NULL, 'A', '2023-07-07', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(5, 559, 1, 'RCG', '2023-07-14 08:00:00', NULL, NULL, '2023-07-14 18:00:00', '#00BCD4', NULL, 'A', '2023-07-14', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(6, 560, 1, 'GUATOS', '2023-07-31 19:00:00', NULL, NULL, '2023-07-31 20:00:00', '#FFC107', '<ul><li>Apoio Faturamento</li></ul>', 'A', '2023-07-31', '19:00:00', '20:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(5, 561, NULL, 'RCG', '2023-07-31 13:00:00', NULL, NULL, '2023-07-31 17:30:00', '#00BCD4', '<ul><li><br></li></ul>', 'A', '2023-07-31', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 562, 1, 'RCG', '2023-08-01 08:00:00', NULL, NULL, '2023-08-01 17:30:00', '#00BCD4', NULL, 'A', '2023-08-01', '08:00:00', '17:30:00', '11:30:00', '15:00:00', '06:00:00', NULL),
(4, 563, 1, 'MSGAS(Remoto)', '2023-08-01 19:00:00', NULL, NULL, '2023-08-01 21:00:00', '#2196F3', '<ul><li>Aualização<ul><li>23-07-21_ATUALIZACAO_12.1.2210_ATF_EXPEDICAO_CONTINUA</li><li>23-07-27_ATUALIZACAO_12.1.2210_BACKOFFICE_EXPEDICAO_CONTINUA</li><li>23-07-21_ATUALIZACAO_12.1.2210_FIS_EXPEDICAO_CONTINUA</li><li>23-07-21_ATUALIZACAO_12.1.2210_PCO_EXPEDICAO_CONTINUA</li><li>23-07-25_ATUALIZACAO_12.1.2210_RH_EXPEDICAO_CONTINUA</li><li>23-07-24_ATUALIZACAO_12.1.2210_TAF_EXPEDICAO_CONTINUA</li><li>23-07-26-P12_SMARTCLIENT_WEBAPP_9.0.9_LINUX_X64.TAR</li><li>23-07-26-P12-SMARTCLIENT_BUILD 20.3.1.5_WINDOWS_X64</li><li>23-07-28-P12_APPSERVER_BUILD-20.3.1.12_LINUX_X64.TAR</li><li>23-07-26-TOTVS_DBACCESS_BUILD_22.1.1.5_LINUX_X64.TAR<br></li></ul></li></ul>', 'A', '2023-08-01', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(6, 564, 1, 'GUATOS(Remoto)', '2023-08-01 19:00:00', NULL, NULL, '2023-08-01 20:00:00', '#FFC107', '<ul><li>Atualização Natureza Clientes</li></ul>', 'A', '2023-08-01', '19:00:00', '20:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(4, 565, 1, 'MSGAS', '2023-08-02 08:30:00', NULL, NULL, '2023-08-02 17:30:00', '#2196F3', '<ul><li>Analise de Job - JOBMANI Doc. Eletrônicos - Sincronização Automática da MDe via Schedule</li><li>Atualização TSS</li></ul>', 'A', '2023-08-02', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(3, 566, 1, 'FUNLEC', '2023-08-03 08:30:00', NULL, NULL, '2023-08-03 17:30:00', '#4CAF50', '<ul><li>MeuRh</li><li>Relatorios Folha</li><li>Integração XML NFx</li></ul>', 'A', '2023-08-03', '08:30:00', '17:30:00', '11:30:00', '13:10:00', '07:20:00', NULL),
(3, 567, NULL, 'FUNLEC(Remoto)', '2023-08-07 19:00:00', NULL, NULL, '2023-08-07 22:00:00', '#4CAF50', '<ul><li>Atualização</li></ul>', 'A', '2023-08-07', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 568, NULL, 'RCG', '2023-08-04 08:10:00', NULL, NULL, '2023-08-04 17:50:00', '#00BCD4', NULL, 'A', '2023-08-04', '08:10:00', '17:50:00', '11:30:00', '13:10:00', '08:00:00', NULL),
(5, 569, NULL, 'RCG', '2023-08-06 08:00:00', NULL, NULL, '2023-08-06 18:00:00', '#00BCD4', NULL, 'A', '2023-08-06', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(5, 570, NULL, 'RCG', '2023-08-07 08:00:00', NULL, NULL, '2023-08-07 18:00:00', '#00BCD4', NULL, 'A', '2023-08-07', '08:00:00', '18:00:00', '11:30:00', '12:30:00', '09:00:00', NULL),
(5, 571, NULL, 'RCG', '2023-08-08 07:30:00', NULL, NULL, '2023-08-08 18:00:00', '#00BCD4', NULL, 'A', '2023-08-08', '07:30:00', '18:00:00', '11:30:00', '12:30:00', '09:30:00', NULL),
(5, 572, NULL, 'RCG', '2023-08-09 08:00:00', NULL, NULL, '2023-08-09 18:00:00', '#00BCD4', NULL, 'A', '2023-08-09', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(3, 573, NULL, 'FUNLEC', '2023-08-10 08:30:00', NULL, NULL, '2023-08-10 17:30:00', '#4CAF50', '<ul><li>Relatorio RH</li><li>Reunião Auditoria</li><li>Importação Ponto</li></ul>', 'A', '2023-08-10', '08:30:00', '17:30:00', '11:30:00', '13:10:00', '07:20:00', NULL),
(4, 574, 1, 'MSGAS', '2023-08-11 09:30:00', NULL, NULL, '2023-08-11 17:30:00', '#2196F3', '<ul><li>Calculo de Folha</li></ul>', 'A', '2023-08-11', '09:30:00', '17:30:00', '11:30:00', '13:30:00', '06:00:00', NULL),
(6, 575, NULL, 'GUATOS(remoto)', '2023-08-10 14:00:00', NULL, NULL, '2023-08-10 17:00:00', '#FFC107', '<ul><li>Reinf - 06-2023</li></ul>', 'A', '2023-08-10', '14:00:00', '17:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(6, 576, NULL, 'GUATOS', '2023-08-11 14:00:00', NULL, NULL, '2023-08-11 17:00:00', '#FFC107', '<ul><li>Reinf - 06-2023</li></ul>', 'A', '2023-08-11', '14:00:00', '17:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 577, NULL, 'FUNLEC', '2023-08-14 08:30:00', NULL, NULL, '2023-08-14 11:30:00', '#4CAF50', '<ul><li>Folha de Pagamento</li></ul>', 'A', '2023-08-14', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 578, NULL, 'RCG', '2023-08-14 13:00:00', NULL, NULL, '2023-08-14 17:30:00', '#00BCD4', NULL, 'A', '2023-08-14', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 579, NULL, 'RCG', '2023-08-15 08:30:00', NULL, NULL, '2023-08-15 17:30:00', '#00BCD4', NULL, 'A', '2023-08-15', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(4, 580, NULL, 'MSGAS(REMOTO)', '2023-08-15 19:30:00', NULL, NULL, '2023-08-15 22:00:00', '#2196F3', '<ul><li>Atualização de Sistema:<ul><li>23-08-04_ATUALIZACAO_12.1.2210_ATF_EXPEDICAO_CONTINUA</li><li>23-08-04_ATUALIZACAO_12.1.2210_COM_EXPEDICAO_CONTINUA</li><li>23-08-04_ATUALIZACAO_12.1.2210_CTB_EXPEDICAO_CONTINUA</li><li>23-08-04_ATUALIZACAO_12.1.2210_FAT_EXPEDICAO_CONTINUA</li><li>23-08-04_ATUALIZACAO_12.1.2210_FIN_EXPEDICAO_CONTINUA</li><li>23-08-04_ATUALIZACAO_12.1.2210_FIS_EXPEDICAO_CONTINUA</li><li>23-08-04_ATUALIZACAO_12.1.2210_PCO_EXPEDICAO_CONTINUA</li><li>23-08-08_ATUALIZACAO_12.1.2210_RH_EXPEDICAO_CONTINUA</li><li>23-08-11-LIB_LABEL_07082023_P12_HARPIA<br></li></ul></li></ul>', 'A', '2023-08-15', '19:30:00', '22:00:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(4, 581, NULL, 'MSGAS', '2023-08-16 08:30:00', NULL, NULL, '2023-08-16 17:30:00', '#2196F3', '<ul><li>Calculo de Folha Duplo vinculo</li><li>Baixa de XML via manifesto</li><li><span style=\"color: var(--text-color); font-family: var(--font-family); font-size: var(--font-size);\">Espelho de ponto</span><br></li><li>Chamado 17602867 retorno de baica BB</li></ul>', 'A', '2023-08-16', '08:30:00', '17:30:00', '11:30:00', '14:00:00', '06:30:00', NULL),
(3, 582, NULL, 'FUNLEC', '2023-08-17 08:30:00', NULL, NULL, '2023-08-17 15:00:00', '#4CAF50', '<ul><li>Teste em backup Sistema</li><li>Atualização de Base de Testes</li><li>Reunião com Empresa de Apoio em processos Administrativos</li></ul>', 'A', '2023-08-17', '08:30:00', '15:00:00', '11:30:00', '13:10:00', '04:50:00', NULL),
(3, 583, NULL, 'FUNLEC', '2023-08-21 08:30:00', NULL, NULL, '2023-08-21 11:30:00', '#4CAF50', '<ul><li>Reinf Base de Teste</li><li>Importação de Ponto</li></ul>', 'A', '2023-08-21', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 584, 1, 'RCG', '2023-08-21 13:00:00', NULL, NULL, '2023-08-21 17:30:00', '#00BCD4', NULL, 'A', '2023-08-21', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 585, NULL, 'RCG', '2023-08-22 08:30:00', NULL, NULL, '2023-08-22 18:00:00', '#00BCD4', NULL, 'A', '2023-08-22', '08:30:00', '18:00:00', '12:00:00', '13:30:00', '08:00:00', NULL),
(4, 586, NULL, 'MSGAS', '2023-08-23 08:30:00', NULL, NULL, '2023-08-23 17:30:00', '#2196F3', '<ul><li>Reinf</li><li>Retorno de pagamento BB</li></ul>', 'A', '2023-08-23', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(3, 587, NULL, 'FUNLEC', '2023-08-24 08:30:00', NULL, NULL, '2023-08-24 17:30:00', '#4CAF50', '<ul><li>Reunião Contabilidade ref. Integração sistema Sophia</li><li>Reunião Sistema Sophia</li><li>Renião Contabilidade Consultor Erick</li></ul>', 'A', '2023-08-24', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(6, 588, NULL, 'GUATOS', '2023-08-24 19:00:00', NULL, NULL, '2023-08-24 22:00:00', '#FFC107', '<ul><li>Atualização Reinf Bloco 40</li></ul>', 'A', '2023-08-24', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 589, NULL, 'RCG', '2023-08-25 08:30:00', NULL, NULL, '2023-08-25 17:30:00', '#00BCD4', NULL, 'A', '2023-08-25', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 590, NULL, 'FUNLEC', '2023-08-28 08:30:00', NULL, NULL, '2023-08-28 11:30:00', '#4CAF50', '<ul><li>Atualização Base de Testes</li></ul>', 'A', '2023-08-28', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 591, 1, 'MSGAS', '2023-09-01 08:00:00', NULL, NULL, '2023-09-01 17:30:00', '#2196F3', '<ul><li>Rotina de Mapa de Ponto</li></ul>', 'A', '2023-09-01', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(5, 592, NULL, 'RCG', '2023-08-29 08:30:00', NULL, NULL, '2023-08-29 17:30:00', '#00BCD4', NULL, 'A', '2023-08-29', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 593, NULL, 'RCG', '2023-08-28 13:00:00', NULL, NULL, '2023-08-28 17:30:00', '#00BCD4', NULL, 'A', '2023-08-28', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 594, NULL, 'RCG', '2023-08-30 08:30:00', NULL, NULL, '2023-08-30 17:30:00', '#00BCD4', NULL, 'A', '2023-08-30', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 595, NULL, 'FUNLEC', '2023-08-31 08:30:00', NULL, NULL, '2023-08-31 17:30:00', '#4CAF50', '<ul><li>Suporte Reinf</li><li>Suporte Geração de Relatorios Contabilidade</li><li>Suporte Folha de Pagamento</li></ul>', 'A', '2023-08-31', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(6, 596, NULL, 'GUATOS', '2023-08-30 11:30:00', NULL, NULL, '2023-08-30 12:30:00', '#FFC107', '<ul><li>Configuração de API Rest para APP Meu Coletor&nbsp;</li></ul>', 'A', '2023-08-30', '11:30:00', '12:30:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(3, 597, NULL, 'FUNLEC(Remoto)', '2023-08-30 20:00:00', NULL, NULL, '2023-08-30 22:00:00', '#4CAF50', '<ul><li>Atualização Reinf Produção</li></ul>', 'A', '2023-08-30', '20:00:00', '22:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(4, 598, NULL, 'MSGAS(Remoto)', '2023-08-31 20:00:00', NULL, NULL, '2023-08-31 22:00:00', '#2196F3', '<ul><li>Atualização Sistema</li></ul>', 'A', '2023-08-31', '20:00:00', '22:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(4, 599, NULL, 'MSGAS', '2023-09-04 08:00:00', NULL, NULL, '2023-09-04 17:30:00', '#2196F3', '<ul><li>Rotina de Mapa de Ponto</li></ul>', 'A', '2023-09-04', '08:00:00', '17:30:00', '11:30:00', '14:30:00', '06:30:00', NULL),
(5, 600, NULL, 'RCG', '2023-09-04 12:00:00', NULL, NULL, '2023-09-04 12:30:00', '#00BCD4', '<ul><li>Internet</li></ul>', 'A', '2023-09-04', '12:00:00', '12:30:00', '00:00:00', '00:00:00', '00:30:00', NULL),
(3, 601, NULL, 'FUNLEC(Remoto)', '2023-09-04 13:00:00', NULL, NULL, '2023-09-04 14:30:00', '#4CAF50', '<ul><li>Reunião Sophia</li></ul>', 'A', '2023-09-04', '13:00:00', '14:30:00', '00:00:00', '00:00:00', '01:30:00', NULL),
(5, 602, NULL, 'RCG', '2023-09-05 08:00:00', NULL, NULL, '2023-09-05 18:00:00', '#00BCD4', NULL, 'A', '2023-09-05', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(3, 603, NULL, 'FUNLEC', '2023-09-06 08:30:00', NULL, NULL, '2023-09-06 11:30:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2023-09-06', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 604, NULL, 'FUNLEC', '2023-09-08 09:00:00', NULL, NULL, '2023-09-08 15:00:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li><li>Suporte Contabilidade</li></ul>', 'A', '2023-09-08', '09:00:00', '15:00:00', '11:30:00', '13:00:00', '04:30:00', NULL),
(5, 605, NULL, 'RCG', '2023-09-06 13:00:00', NULL, NULL, '2023-09-06 18:00:00', '#00BCD4', NULL, 'A', '2023-09-06', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(3, 606, NULL, 'FUNLEC', '2023-09-11 08:30:00', NULL, NULL, '2023-09-11 11:30:00', '#4CAF50', '<ul><li>Suporte Contabilidade</li></ul>', 'A', '2023-09-11', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL);
INSERT INTO `agendamento` (`contrato_id`, `id`, `profissional_id`, `descricao`, `horario_inicial`, `intervalo_inicial`, `intervalo_final`, `horario_final`, `cor`, `observacao`, `tipo`, `data_agenda`, `hora_inicio`, `hora_fim`, `hora_intervalo_inicial`, `hora_intervalo_final`, `hora_total`, `local`) VALUES
(6, 607, NULL, 'GUATOS', '2023-09-11 08:30:00', NULL, NULL, '2023-09-11 11:00:00', '#FFC107', '<ul><li>Reinf&nbsp;</li></ul>', 'A', '2023-09-11', '08:30:00', '11:00:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(5, 608, NULL, 'RCG', '2023-09-11 13:00:00', NULL, NULL, '2023-09-11 17:30:00', '#00BCD4', NULL, 'A', '2023-09-11', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(3, 609, 1, 'FUNLEC', '2023-09-14 08:30:00', NULL, NULL, '2023-09-14 17:30:00', '#4CAF50', '<ul><li>Chamado Folha de Pagamento</li><li>Reunião Contabilidade Integração Sophia</li></ul>', 'A', '2023-09-14', '08:30:00', '17:30:00', '11:30:00', '13:10:00', '07:20:00', NULL),
(4, 610, 1, 'MSGAS', '2023-09-13 08:30:00', NULL, NULL, '2023-09-13 17:30:00', '#2196F3', '<ul><li>Consulta Marcação de Ponto</li></ul>', 'A', '2023-09-13', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(5, 611, NULL, 'RCG', '2023-09-15 08:30:00', NULL, NULL, '2023-09-15 18:00:00', '#00BCD4', NULL, 'A', '2023-09-15', '08:30:00', '18:00:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(5, 612, 1, 'RCG', '2023-09-12 08:30:00', NULL, NULL, '2023-09-12 17:30:00', '#00BCD4', NULL, 'A', '2023-09-12', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 613, 1, 'FUNLEC', '2023-09-18 08:30:00', NULL, NULL, '2023-09-18 11:30:00', '#4CAF50', '<ul><li>Ponto Eletronico</li></ul>', 'A', '2023-09-18', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 614, 1, 'MSGAS', '2023-09-20 08:00:00', NULL, NULL, '2023-09-20 17:30:00', '#2196F3', '<ul><li>Retorno Cobrança API</li><li>Criação de Serviço para API</li></ul>', 'A', '2023-09-20', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(5, 615, NULL, 'RCG', '2023-09-19 08:10:00', NULL, NULL, '2023-09-19 17:30:00', '#00BCD4', NULL, 'A', '2023-09-19', '08:10:00', '17:30:00', '11:30:00', '13:00:00', '07:50:00', NULL),
(5, 616, NULL, 'RCG', '2023-09-18 13:00:00', NULL, NULL, '2023-09-18 17:30:00', '#00BCD4', NULL, 'A', '2023-09-18', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(3, 617, NULL, 'FUNLEC(remoto)', '2023-09-20 19:30:00', NULL, NULL, '2023-09-20 23:30:00', '#4CAF50', '<ul><li>Atualização:<ul><li>23-09-12_ATUALIZACAO_12.1.2210_RH_EXPEDICAO_CONTINUA</li><li>23-09-18-LIB_LABEL_18092023_P12_HARPIA<br></li></ul></li></ul>', 'A', '2023-09-20', '19:30:00', '23:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(3, 618, NULL, 'FUNLEC', '2023-09-21 08:30:00', NULL, NULL, '2023-09-21 17:30:00', '#4CAF50', '<ul><li>Suporte Atualização Folha</li></ul>', 'A', '2023-09-21', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 619, NULL, 'FUNLEC', '2023-09-25 08:30:00', NULL, NULL, '2023-09-25 11:30:00', '#4CAF50', '<ul><li>Api Funcionarios</li><li>REINF Bloco 40</li></ul>', 'A', '2023-09-25', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 620, NULL, 'RCG', '2023-09-22 08:30:00', NULL, NULL, '2023-09-22 18:00:00', '#00BCD4', NULL, 'A', '2023-09-22', '08:30:00', '18:00:00', '11:30:00', '13:05:00', '07:55:00', NULL),
(4, 622, 1, 'MSGAS', '2023-09-27 08:30:00', NULL, NULL, '2023-09-27 17:30:00', '#2196F3', '<ul><li>Reinf</li></ul>', 'A', '2023-09-27', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(3, 623, NULL, 'FUNLEC(Remoto)', '2023-09-25 19:00:00', NULL, NULL, '2023-09-25 21:00:00', '#4CAF50', '<ul><li>API de Funcionarios</li></ul>', 'A', '2023-09-25', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 624, NULL, 'FUNLEC(Remoto)', '2023-09-26 19:30:00', NULL, NULL, '2023-09-26 22:00:00', '#4CAF50', '<ul><li>Api de Funcionario</li><li>Reinf</li></ul>', 'A', '2023-09-26', '19:30:00', '22:00:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(5, 625, NULL, 'RCG', '2023-09-25 13:10:00', NULL, NULL, '2023-09-25 17:30:00', '#00BCD4', NULL, 'A', '2023-09-25', '13:10:00', '17:30:00', '00:00:00', '00:00:00', '04:20:00', NULL),
(5, 626, NULL, 'RCG', '2023-09-26 08:00:00', NULL, NULL, '2023-09-26 17:30:00', '#00BCD4', NULL, 'A', '2023-09-26', '08:00:00', '17:30:00', '11:30:00', '13:10:00', '07:50:00', NULL),
(3, 627, NULL, 'FUNLEC', '2023-09-28 08:30:00', NULL, NULL, '2023-09-28 17:30:00', '#4CAF50', '<ul><li>Calculo de Gatificação Folha</li></ul>', 'A', '2023-09-28', '08:30:00', '17:30:00', '11:30:00', '13:10:00', '07:20:00', NULL),
(6, 628, NULL, 'GUATOS', '2023-09-27 19:00:00', NULL, NULL, '2023-09-27 21:00:00', '#FFC107', '<ul><li>Atualização sistema</li></ul>', 'A', '2023-09-27', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 629, NULL, 'FUNLEC(Remoto)', '2023-09-28 19:00:00', NULL, NULL, '2023-09-28 21:00:00', '#4CAF50', '<ul><li>Atualização TAF</li></ul>', 'A', '2023-09-28', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(5, 630, NULL, 'RCG', '2023-09-29 08:30:00', NULL, NULL, '2023-09-29 18:00:00', '#00BCD4', NULL, 'A', '2023-09-29', '08:30:00', '18:00:00', '12:00:00', '13:00:00', '08:30:00', NULL),
(3, 631, NULL, 'FUNLEC(Remoto)', '2023-09-29 09:00:00', NULL, NULL, '2023-09-29 11:30:00', '#4CAF50', '<ul><li>Reinf R4020</li></ul>', 'A', '2023-09-29', '09:00:00', '11:30:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(NULL, 632, NULL, 'MEDICO', '2023-10-02 08:00:00', NULL, NULL, '2023-10-02 18:00:00', '#3a87ad', NULL, 'A', '2023-10-02', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(6, 633, NULL, 'GUATOS', '2023-10-02 19:00:00', NULL, NULL, '2023-10-02 20:30:00', '#FFC107', '<ul><li>reinf R4000</li></ul>', 'A', '2023-10-02', '19:00:00', '20:30:00', '00:00:00', '00:00:00', '01:30:00', NULL),
(5, 634, NULL, 'RCG', '2023-10-03 08:00:00', NULL, NULL, '2023-10-03 15:30:00', '#00BCD4', NULL, 'A', '2023-10-03', '08:00:00', '15:30:00', '11:30:00', '13:00:00', '06:00:00', NULL),
(4, 635, NULL, 'MSGAS(remoto)', '2023-10-03 18:00:00', NULL, NULL, '2023-10-03 20:30:00', '#2196F3', '<ul><li>Atualização Reinf R 4000</li></ul>', 'A', '2023-10-03', '18:00:00', '20:30:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(6, 636, NULL, 'GUATOS', '2023-10-03 19:00:00', NULL, NULL, '2023-10-03 22:00:00', '#FFC107', '<ul><li>Reinf R4000</li></ul>', 'A', '2023-10-03', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 637, NULL, 'MSGAS', '2023-10-04 08:30:00', NULL, NULL, '2023-10-04 17:30:00', '#2196F3', '<ul><li>Reinf Bloco 40</li></ul>', 'A', '2023-10-04', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(3, 638, NULL, 'FUNLEC', '2023-10-04 20:00:00', NULL, NULL, '2023-10-04 22:30:00', '#4CAF50', '<ul><li>Reinf Bloco 40</li></ul>', 'A', '2023-10-04', '20:00:00', '22:30:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(3, 639, NULL, 'FUNLEC', '2023-10-05 09:30:00', NULL, NULL, '2023-10-05 17:30:00', '#4CAF50', '<ul><li>Reinf Bloco 40</li></ul>', 'A', '2023-10-05', '09:30:00', '17:30:00', '11:30:00', '13:00:00', '06:30:00', NULL),
(6, 640, NULL, 'GUATOS', '2023-10-05 09:30:00', NULL, NULL, '2023-10-05 11:00:00', '#FFC107', '<ul><li>Reinf Bloco 40</li></ul>', 'A', '2023-10-05', '09:30:00', '11:00:00', '00:00:00', '00:00:00', '01:30:00', NULL),
(5, 641, NULL, 'RCG', '2023-10-06 08:30:00', NULL, NULL, '2023-10-06 18:00:00', '#00BCD4', NULL, 'A', '2023-10-06', '08:30:00', '18:00:00', '11:30:00', '13:10:00', '07:50:00', NULL),
(3, 642, 1, 'FUNLEC', '2023-10-09 08:30:00', NULL, NULL, '2023-10-09 11:30:00', '#4CAF50', '<ul><li>Chamado Relatorio TAF</li><li>Calculo de PIS/COFINS e CSLL compras</li></ul>', 'A', '2023-10-09', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 643, 1, 'RCG', '2023-10-09 13:10:00', NULL, NULL, '2023-10-09 17:30:00', '#00BCD4', NULL, 'A', '2023-10-09', '13:10:00', '17:30:00', '00:00:00', '00:00:00', '04:20:00', NULL),
(4, 644, NULL, 'MSGAS', '2023-10-10 08:30:00', NULL, NULL, '2023-10-10 17:30:00', '#2196F3', '<ul><li>Reinf</li></ul>', 'A', '2023-10-10', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(5, 645, NULL, 'RCG', '2023-10-13 08:30:00', NULL, NULL, '2023-10-13 18:00:00', '#00BCD4', NULL, 'A', '2023-10-13', '08:30:00', '18:00:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(3, 646, 1, 'FUNLEC', '2023-10-16 08:30:00', NULL, NULL, '2023-10-16 11:30:00', '#4CAF50', '<ul><li>Chamado Folha de pagamento</li><li>Reunião Financeiro\\Contabilidade integração Sistema Sophia</li></ul>', 'A', '2023-10-16', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 647, 1, 'MSGAS', '2023-10-18 08:30:00', NULL, NULL, '2023-10-18 17:30:00', '#2196F3', '<ul><li>Api Fornecedores</li></ul>', 'A', '2023-10-18', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(5, 648, NULL, 'RCG', '2023-10-16 13:00:00', NULL, NULL, '2023-10-16 17:30:00', '#00BCD4', NULL, 'A', '2023-10-16', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 649, NULL, 'RCG', '2023-10-17 08:30:00', NULL, NULL, '2023-10-17 17:30:00', '#00BCD4', NULL, 'A', '2023-10-17', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 650, NULL, 'FUNLEC', '2023-10-18 20:00:00', NULL, NULL, '2023-10-18 22:00:00', '#4CAF50', '<ul><li>Atualização Sistema</li></ul>', 'A', '2023-10-18', '20:00:00', '22:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 651, NULL, 'FUNLEC', '2023-10-19 08:30:00', NULL, NULL, '2023-10-19 17:30:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2023-10-19', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 652, NULL, 'RCG', '2023-10-20 08:30:00', NULL, NULL, '2023-10-20 17:30:00', '#00BCD4', NULL, 'A', '2023-10-20', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 653, 1, 'FUNLEC', '2023-10-23 08:30:00', NULL, NULL, '2023-10-23 11:30:00', '#4CAF50', '<ul><li>Integração Sistema Sophia</li><li>Atualização de Base de Teste</li></ul>', 'A', '2023-10-23', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 654, NULL, 'RCG', '2023-10-23 13:00:00', NULL, NULL, '2023-10-23 17:30:00', '#00BCD4', NULL, 'A', '2023-10-23', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 655, 1, 'RCG', '2023-10-24 08:30:00', NULL, NULL, '2023-10-24 17:30:00', '#00BCD4', NULL, 'A', '2023-10-24', '08:30:00', '17:30:00', '11:30:00', '13:10:00', '07:20:00', NULL),
(4, 656, 1, 'MSGAS', '2023-10-25 08:30:00', NULL, NULL, '2023-10-25 17:30:00', '#2196F3', '<ul><li>Api REST Fornecedor</li></ul>', 'A', '2023-10-25', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(3, 657, 1, 'FUNLEC', '2023-10-26 08:30:00', NULL, NULL, '2023-10-26 17:30:00', '#4CAF50', '<ul><li>Atualização de Sistema</li><li>Suporte Folha</li></ul>', 'A', '2023-10-26', '08:30:00', '17:30:00', '11:30:00', '13:10:00', '07:20:00', NULL),
(7, 658, NULL, 'GAO MSGAS', '2023-10-26 19:00:00', NULL, NULL, '2023-10-26 22:00:00', '#2196F3', '<ul><li>Revisão API</li></ul>', 'A', '2023-10-26', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 659, NULL, 'RCG', '2023-10-27 08:30:00', NULL, NULL, '2023-10-27 17:30:00', '#00BCD4', NULL, 'A', '2023-10-27', '08:30:00', '17:30:00', '11:30:00', '13:10:00', '07:20:00', NULL),
(3, 660, 1, 'FUNLEC', '2023-10-30 08:00:00', NULL, NULL, '2023-10-30 11:30:00', '#4CAF50', '<ul><li>Chamado Folha</li><li>Evento s-2500</li></ul>', 'A', '2023-10-30', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(5, 661, NULL, 'RCG', '2023-10-30 13:00:00', NULL, NULL, '2023-10-30 17:30:00', '#00BCD4', NULL, 'A', '2023-10-30', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 662, NULL, 'RCG', '2023-10-31 08:00:00', NULL, NULL, '2023-10-31 18:00:00', '#00BCD4', NULL, 'A', '2023-10-31', '08:00:00', '18:00:00', '11:30:00', '15:00:00', '06:30:00', NULL),
(4, 663, 1, 'MSGAS', '2023-11-01 08:00:00', NULL, NULL, '2023-11-01 17:30:00', '#2196F3', '<ul><li>Api Reservas</li></ul>', 'A', '2023-11-01', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(7, 664, NULL, 'GAO MSGAS(Reembolso)', '2023-10-30 19:00:00', NULL, NULL, '2023-10-30 22:00:00', '#2196F3', '<ul><li>Revisão API</li></ul>', 'A', '2023-10-30', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(7, 665, NULL, 'GAO MSGAS(Reembolso)', '2023-10-25 19:00:00', NULL, NULL, '2023-10-25 22:00:00', '#2196F3', '<ul><li>Atualização ambiente</li><li>Revisão API</li></ul>', 'A', '2023-10-25', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(7, 666, NULL, 'GAO MSGAS(Reembolso)', '2023-10-31 13:30:00', NULL, NULL, '2023-10-31 15:00:00', '#2196F3', '<ul><li>Simulação Via Postman</li></ul>', 'A', '2023-10-31', '13:30:00', '15:00:00', '00:00:00', '00:00:00', '01:30:00', NULL),
(6, 667, NULL, 'GUATOS', '2023-11-04 08:40:00', NULL, NULL, '2023-11-04 11:30:00', '#FFC107', '<ul><li>Re instalação Sistema</li></ul>', 'A', '2023-11-04', '08:40:00', '11:30:00', '00:00:00', '00:00:00', '02:50:00', NULL),
(5, 668, NULL, 'RCG', '2023-11-03 08:30:00', NULL, NULL, '2023-11-03 17:30:00', '#00BCD4', NULL, 'A', '2023-11-03', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 669, NULL, 'FUNLEC', '2023-11-06 08:00:00', NULL, NULL, '2023-11-06 11:30:00', '#4CAF50', '<ul><li>Atestado Medico</li></ul>', 'A', '2023-11-06', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(5, 670, NULL, 'RCG', '2023-11-06 13:30:00', NULL, NULL, '2023-11-06 17:30:00', '#00BCD4', NULL, 'A', '2023-11-06', '13:30:00', '17:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 671, NULL, 'RCG', '2023-11-07 08:20:00', NULL, NULL, '2023-11-07 17:30:00', '#00BCD4', NULL, 'A', '2023-11-07', '08:20:00', '17:30:00', '11:30:00', '13:30:00', '07:10:00', NULL),
(4, 672, 1, 'MSGAS', '2023-11-08 08:30:00', NULL, NULL, '2023-11-08 17:30:00', '#2196F3', '<ul><li>WebHook BB</li><li>API de Controle de Reservas</li></ul>', 'A', '2023-11-08', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(3, 673, NULL, 'FUNLEC', '2023-11-09 08:30:00', NULL, NULL, '2023-11-09 17:30:00', '#4CAF50', '<ul><li>RH - Processo trabalhista</li><li>Reinf</li><li>Importação Sistema Sophia</li></ul>', 'A', '2023-11-09', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(6, 674, NULL, 'GUATOS', '2023-11-09 18:00:00', NULL, NULL, '2023-11-09 19:00:00', '#FFC107', '<ul><li>Acesso externo Protheus</li></ul>', 'A', '2023-11-09', '18:00:00', '19:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(5, 675, NULL, 'RCG', '2023-11-10 09:30:00', NULL, NULL, '2023-11-10 17:30:00', '#00BCD4', NULL, 'A', '2023-11-10', '09:30:00', '17:30:00', '12:00:00', '14:00:00', '06:00:00', NULL),
(3, 676, NULL, 'FUNLEC', '2023-11-13 08:00:00', NULL, NULL, '2023-11-13 11:30:00', '#4CAF50', '<ul><li>RH Processo trabalhista</li><li>REINF Contabilidade</li><li>Integração&nbsp; Sophia</li></ul>', 'A', '2023-11-13', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(5, 677, NULL, 'RCG', '2023-11-13 13:00:00', NULL, NULL, '2023-11-13 17:30:00', '#00BCD4', NULL, 'A', '2023-11-13', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 678, NULL, 'RCG', '2023-11-14 08:30:00', NULL, NULL, '2023-11-14 17:30:00', '#00BCD4', NULL, 'A', '2023-11-14', '08:30:00', '17:30:00', '11:30:00', '13:20:00', '07:10:00', NULL),
(3, 679, NULL, 'FUNLEC(Remoto)', '2023-11-15 13:00:00', NULL, NULL, '2023-11-15 17:00:00', '#4CAF50', '<ul><li>Atualização Base de Teste</li></ul>', 'A', '2023-11-15', '13:00:00', '17:00:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(3, 680, NULL, 'FUNLEC', '2023-11-16 08:30:00', NULL, NULL, '2023-11-16 17:30:00', '#4CAF50', '<ul><li>Importação Sistema Sophia</li></ul>', 'A', '2023-11-16', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 681, NULL, 'FUNLEC', '2023-11-20 08:30:00', NULL, NULL, '2023-11-20 11:30:00', '#4CAF50', '<ul><li>Revisão Lançamento Contabil - Movimento Bancario</li></ul>', 'A', '2023-11-20', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 682, NULL, 'RCG', '2023-11-20 13:10:00', NULL, NULL, '2023-11-20 17:30:00', '#00BCD4', NULL, 'A', '2023-11-20', '13:10:00', '17:30:00', '00:00:00', '00:00:00', '04:20:00', NULL),
(5, 683, NULL, 'RCG', '2023-11-21 09:00:00', NULL, NULL, '2023-11-21 17:30:00', '#00BCD4', NULL, 'A', '2023-11-21', '09:00:00', '17:30:00', '11:30:00', '13:10:00', '06:50:00', NULL),
(4, 684, 1, 'MSGAS(Remoto)', '2023-11-21 19:30:00', NULL, NULL, '2023-11-21 23:00:00', '#2196F3', '<ul><li>Atualização Servidor de Licencas&nbsp;3.6.0</li><li>Atualização DbAcess</li><li>Atualização Appserver&nbsp;20.3.2.1</li><li>Atualização TSS 20.3.2.1</li><li>Aplicar pacotes:<ul><li>23-11-16_ATUALIZACAO_12.1.2210_BACKOFFICE_EXPEDICAO_CONTINUA</li><li>23-11-10_ATUALIZACAO_12.1.2210_PCO_EXPEDICAO_CONTINUA</li><li>23-11-15_ATUALIZACAO_12.1.2210_RH_EXPEDICAO_CONTINUA</li><li>23-11-01-LIB_LABEL_09102023_P12_HARPIA<br></li></ul></li></ul>', 'A', '2023-11-21', '19:30:00', '23:00:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(4, 685, 1, 'MSGAS', '2023-11-22 08:15:00', NULL, NULL, '2023-11-22 17:30:00', '#2196F3', '<ul><li>Api Reservas</li></ul>', 'A', '2023-11-22', '08:15:00', '17:30:00', '11:30:00', '13:30:00', '07:15:00', NULL),
(3, 686, NULL, 'FUNLEC', '2023-11-23 08:00:00', NULL, NULL, '2023-11-23 17:30:00', '#4CAF50', '<ul><li>Integração Caixa Sistema Sophia</li><li>Reunião de Alinhamento</li></ul>', 'A', '2023-11-23', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(5, 687, NULL, 'RCG', '2023-11-24 08:00:00', NULL, NULL, '2023-11-24 17:30:00', '#00BCD4', NULL, 'A', '2023-11-24', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(5, 688, NULL, 'RCG', '2023-11-17 08:00:00', NULL, NULL, '2023-11-17 18:00:00', '#00BCD4', NULL, 'A', '2023-11-17', '08:00:00', '18:00:00', '11:30:00', '00:00:00', '21:30:00', NULL),
(3, 689, NULL, 'FUNLEC', '2023-11-27 08:00:00', NULL, NULL, '2023-11-27 11:30:00', '#4CAF50', '<ul><li>Integração Financeiro Sophia</li></ul>', 'A', '2023-11-27', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(5, 690, 1, 'RCG', '2023-11-27 14:00:00', NULL, NULL, '2023-11-27 17:30:00', '#00BCD4', NULL, 'A', '2023-11-27', '14:00:00', '17:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(4, 691, 1, 'MSGAS', '2023-11-28 08:30:00', NULL, NULL, '2023-11-28 17:30:00', '#2196F3', '<ul><li>Api Controle de Reservas</li></ul>', 'A', '2023-11-28', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(4, 692, 1, 'MSGAS', '2023-11-29 08:30:00', NULL, NULL, '2023-11-29 17:30:00', '#2196F3', '<ul><li>Api Nota Fiscal</li></ul>', 'A', '2023-11-29', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(3, 693, 1, 'FUNLEC', '2023-11-30 08:30:00', NULL, NULL, '2023-11-30 17:30:00', '#4CAF50', '<ul><li>Importação de Caixa sistema Sophia</li></ul>', 'A', '2023-11-30', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 694, NULL, 'FUNLEC', '2023-12-01 08:30:00', NULL, NULL, '2023-12-01 17:30:00', '#4CAF50', '<ul><li>Importação de Caixa sistema Sophia</li></ul>', 'A', '2023-12-01', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 695, 1, 'FUNLEC', '2023-12-04 08:30:00', NULL, NULL, '2023-12-04 11:30:00', '#4CAF50', '<ul><li>Importação de Caixa sistema Sophia</li></ul>', 'A', '2023-12-04', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 696, 1, 'RCG', '2023-12-04 13:00:00', NULL, NULL, '2023-12-04 18:00:00', '#00BCD4', NULL, 'A', '2023-12-04', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(4, 697, 1, 'MSGAS', '2023-12-05 08:30:00', NULL, NULL, '2023-12-05 17:30:00', '#2196F3', '<ul><li>Api Lancamento de Pre Nota</li></ul>', 'A', '2023-12-05', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(4, 698, 1, 'MSGAS', '2023-12-06 08:30:00', NULL, NULL, '2023-12-06 17:30:00', '#2196F3', '<ul><li>Api Lancamento de Pre Nota</li></ul>', 'A', '2023-12-06', '08:30:00', '17:30:00', '11:30:00', '14:30:00', '06:00:00', NULL),
(5, 699, NULL, 'RCG', '2023-12-11 08:00:00', NULL, NULL, '2023-12-11 18:00:00', '#00BCD4', NULL, 'A', '2023-12-11', '08:00:00', '18:00:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(5, 700, 1, 'RCG', '2023-12-12 08:30:00', NULL, NULL, '2023-12-12 18:00:00', '#00BCD4', NULL, 'A', '2023-12-12', '08:30:00', '18:00:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(5, 701, NULL, 'RCG', '2023-12-13 08:30:00', NULL, NULL, '2023-12-13 18:00:00', '#00BCD4', NULL, 'A', '2023-12-13', '08:30:00', '18:00:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(5, 702, NULL, 'RCG', '2023-12-14 08:30:00', NULL, NULL, '2023-12-14 18:00:00', '#00BCD4', NULL, 'A', '2023-12-14', '08:30:00', '18:00:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(5, 703, NULL, 'RCG', '2023-12-15 08:30:00', NULL, NULL, '2023-12-15 18:00:00', '#00BCD4', NULL, 'A', '2023-12-15', '08:30:00', '18:00:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(3, 704, NULL, 'FUNLEC(Remoto)', '2023-12-14 16:00:00', NULL, NULL, '2023-12-14 17:00:00', '#4CAF50', '<ul><li>Reinf</li></ul>', 'A', '2023-12-14', '16:00:00', '17:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(3, 705, NULL, 'FUNLEC(Remoto)', '2023-12-13 19:00:00', NULL, NULL, '2023-12-13 22:00:00', '#4CAF50', '<ul><li>Api Funlec OnLine</li></ul>', 'A', '2023-12-13', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 706, NULL, 'FUNLEC', '2023-12-07 08:30:00', NULL, NULL, '2023-12-07 17:30:00', '#4CAF50', '<ul><li>Api Funlec Online</li></ul>', 'A', '2023-12-07', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 707, NULL, 'RCG', '2023-12-08 08:30:00', NULL, NULL, '2023-12-08 17:30:00', '#00BCD4', NULL, 'A', '2023-12-08', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(3, 708, NULL, 'FUNLEC', '2023-12-18 08:30:00', NULL, NULL, '2023-12-18 11:30:00', '#4CAF50', '<ul><li>Api Funlec</li></ul>', 'A', '2023-12-18', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 709, 1, 'MSGAS', '2023-12-20 08:30:00', NULL, NULL, '2023-12-20 15:00:00', '#2196F3', '<ul><li>Folha de Pagamento</li></ul>', 'A', '2023-12-20', '08:30:00', '15:00:00', '11:30:00', '13:30:00', '04:30:00', NULL),
(7, 710, 1, 'GAO MSGAS', '2023-12-20 15:00:00', NULL, NULL, '2023-12-20 17:30:00', '#2196F3', '<ul><li>Api Reembolso</li></ul>', 'A', '2023-12-20', '15:00:00', '17:30:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(3, 711, 1, 'FUNLEC', '2023-12-21 08:30:00', NULL, NULL, '2023-12-21 17:30:00', '#4CAF50', '<ul><li>Api Integração</li></ul>', 'A', '2023-12-21', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(5, 712, 1, 'RCG', '2023-12-19 08:30:00', NULL, NULL, '2023-12-19 20:00:00', '#00BCD4', NULL, 'A', '2023-12-19', '08:30:00', '20:00:00', '11:30:00', '13:00:00', '10:00:00', NULL),
(5, 713, NULL, 'RCG', '2023-12-18 13:00:00', NULL, NULL, '2023-12-18 18:00:00', '#00BCD4', NULL, 'A', '2023-12-18', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 714, 1, 'RCG', '2023-12-22 08:30:00', NULL, NULL, '2023-12-22 18:00:00', '#00BCD4', NULL, 'A', '2023-12-22', '08:30:00', '18:00:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(7, 715, NULL, 'GAO MSGAS', '2023-12-26 08:30:00', NULL, NULL, '2023-12-26 11:30:00', '#2196F3', '<ul><li>API Reembolso</li></ul>', 'A', '2023-12-26', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 716, NULL, 'MSGAS', '2023-12-26 13:30:00', NULL, NULL, '2023-12-26 17:30:00', '#2196F3', '<ul><li>Atualização E-Social</li></ul>', 'A', '2023-12-26', '13:30:00', '17:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(7, 717, NULL, 'GAO MSGAS', '2023-11-29 20:00:00', NULL, NULL, '2023-11-29 22:00:00', '#2196F3', '<ul><li>Api reembolso</li></ul>', 'A', '2023-11-29', '20:00:00', '22:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(5, 718, 1, 'RCG', '2023-12-27 08:00:00', NULL, NULL, '2023-12-27 17:30:00', '#00BCD4', NULL, 'A', '2023-12-27', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(3, 719, NULL, 'FUNLEC(Remoto)', '2023-12-27 19:00:00', NULL, NULL, '2023-12-27 22:00:00', '#4CAF50', '<ul><li>Atualização Sistema</li></ul>', 'A', '2023-12-27', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 720, 1, 'FUNLEC', '2023-12-28 08:30:00', NULL, NULL, '2023-12-28 17:30:00', '#4CAF50', '<ul><li>Api Funlec</li></ul>', 'A', '2023-12-28', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 721, 1, 'RCG', '2023-12-29 07:00:00', NULL, NULL, '2023-12-29 18:00:00', '#00BCD4', NULL, 'A', '2023-12-29', '07:00:00', '18:00:00', '11:30:00', '13:00:00', '09:30:00', NULL),
(5, 722, 1, 'RCG', '2023-12-28 19:00:00', NULL, NULL, '2023-12-28 23:00:00', '#00BCD4', NULL, 'A', '2023-12-28', '19:00:00', '23:00:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 723, 1, 'RCG', '2024-01-02 07:30:00', NULL, NULL, '2024-01-02 18:00:00', '#00BCD4', NULL, 'A', '2024-01-02', '07:30:00', '18:00:00', '00:00:00', '00:00:00', '10:30:00', NULL),
(4, 724, 1, 'MSGAS', '2024-01-02 19:00:00', NULL, NULL, '2024-01-02 23:00:00', '#2196F3', '<ul><li>Atualização Sistema<ul><li>23-12-26_ATUALIZACAO_12.1.2210_RH_EXPEDICAO_CONTINUA</li><li>23-12-27_ATUALIZACAO_12.1.2210_FAT_EXPEDICAO_CONTINUA</li><li>23-12-29_ATUALIZACAO_12.1.2210_FIS_EXPEDICAO_CONTINUA</li><li>23-12-22_ATUALIZACAO_12.1.2210_PCO_EXPEDICAO_CONTINUA</li><li>23-12-22_ATUALIZACAO_12.1.2210_CTB_EXPEDICAO_CONTINUA</li><li>23-12-22_ATUALIZACAO_12.1.2210_ATF_EXPEDICAO_CONTINUA</li><li>23-12-12_ATUALIZACAO_12.1.2210_TAF_EXPEDICAO_CONTINUA</li><li>23-12-08_ATUALIZACAO_12.1.2210_COM_EXPEDICAO_CONTINUA</li><li>23-12-08_ATUALIZACAO_12.1.2210_EST_EXPEDICAO_CONTINUA</li><li>23-12-19-RPO_TSS_12.1.2210_EXP.CONTINUA</li><li>23-12-28-LIB_LABEL_21112023_P12_HARPIA<br></li></ul></li></ul>', 'A', '2024-01-02', '19:00:00', '23:00:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(3, 725, NULL, 'FUNLEC(Remoto', '2023-12-06 19:00:00', NULL, NULL, '2023-12-06 22:00:00', '#4CAF50', '<ul><li>Api Funlec</li></ul>', 'A', '2023-12-06', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 726, NULL, 'FUNLEC(Remoto', '2023-12-12 19:00:00', NULL, NULL, '2023-12-12 22:00:00', '#4CAF50', '<ul><li>Api Funlec</li></ul>', 'A', '2023-12-12', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 727, 1, 'FUNLEC(remoto)', '2023-12-20 19:00:00', NULL, NULL, '2023-12-20 22:00:00', '#4CAF50', '<ul><li>Api Funlec</li></ul>', 'A', '2023-12-20', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 728, NULL, 'FUNLEC(Remoto)', '2023-12-26 19:00:00', NULL, NULL, '2023-12-26 22:00:00', '#4CAF50', '<ul><li>Api Funlec</li></ul>', 'A', '2023-12-26', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 729, NULL, 'MSGAS', '2024-01-03 08:30:00', NULL, NULL, '2024-01-03 17:30:00', '#2196F3', '<ul><li>Disponibilizadas APIs em produção<ul><li>Fornecedor</li><li>Saldo Conta</li><li>Nota Fiscal</li></ul></li></ul>', 'A', '2024-01-03', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(7, 730, NULL, 'GAO MSGAS', '2023-12-28 09:30:00', NULL, NULL, '2023-12-28 16:30:00', '#2196F3', '<ul><li>Ajuste em api&nbsp;GAOWSF05</li></ul>', 'A', '2023-12-28', '09:30:00', '16:30:00', '11:30:00', '13:00:00', '05:30:00', NULL),
(3, 731, NULL, 'FUNLEC(Remoto)', '2024-01-03 19:00:00', NULL, NULL, '2024-01-03 22:00:00', '#4CAF50', '<ul><li>Atualização de Sistema</li></ul>', 'A', '2024-01-03', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 732, 1, 'FUNLEC', '2024-01-08 08:30:00', NULL, NULL, '2024-01-08 11:30:00', '#4CAF50', '<ul><li>App Compras</li></ul>', 'A', '2024-01-08', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 733, 1, 'RCG', '2024-01-08 13:00:00', NULL, NULL, '2024-01-08 20:30:00', '#00BCD4', NULL, 'A', '2024-01-08', '13:00:00', '20:30:00', '00:00:00', '00:00:00', '07:30:00', NULL),
(5, 734, NULL, 'RCG', '2024-01-09 08:00:00', NULL, NULL, '2024-01-09 18:00:00', '#00BCD4', NULL, 'A', '2024-01-09', '08:00:00', '18:00:00', '12:00:00', '12:30:00', '09:30:00', NULL),
(6, 735, 1, 'GUATOS', '2024-01-09 09:00:00', NULL, NULL, '2024-01-09 20:00:00', '#FFC107', '<ul><li>Atualização Sistema</li><li>Reinf</li></ul>', 'A', '2024-01-09', '09:00:00', '20:00:00', '11:00:00', '13:30:00', '08:30:00', NULL),
(3, 736, 1, 'FUNLEC', '2024-01-09 14:00:00', NULL, NULL, '2024-01-09 17:00:00', '#4CAF50', '<ul><li>Importação UNIMED</li></ul>', 'A', '2024-01-09', '14:00:00', '17:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 737, 1, 'MSGAS', '2024-01-10 08:00:00', NULL, NULL, '2024-01-10 18:00:00', '#2196F3', '<ul><li>WebHook Banco do Brasil</li></ul>', 'A', '2024-01-10', '08:00:00', '18:00:00', '11:30:00', '12:30:00', '09:00:00', NULL),
(3, 738, 1, 'FUNLEC', '2024-01-10 19:00:00', NULL, NULL, '2024-01-10 21:00:00', '#4CAF50', '<ul><li>Atualização de Sistema</li></ul>', 'A', '2024-01-10', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 739, 1, 'FUNLEC', '2024-01-11 08:30:00', NULL, NULL, '2024-01-11 17:30:00', '#4CAF50', '<ul><li>Reinf</li></ul>', 'A', '2024-01-11', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 740, 1, 'FUNLEC', '2024-01-11 19:00:00', NULL, NULL, '2024-01-11 22:00:00', '#4CAF50', '<ul><li>Reinf</li></ul>', 'A', '2024-01-11', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 741, 1, 'FUNLEC', '2024-01-12 19:00:00', NULL, NULL, '2024-01-12 23:00:00', '#4CAF50', '<ul><li>Reinf</li></ul>', 'A', '2024-01-12', '19:00:00', '23:00:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 742, NULL, 'RCG', '2024-01-12 08:00:00', NULL, NULL, '2024-01-12 18:30:00', '#00BCD4', NULL, 'A', '2024-01-12', '08:00:00', '18:30:00', '12:00:00', '13:00:00', '09:30:00', NULL),
(3, 743, NULL, 'FUNLEC', '2024-01-13 09:00:00', NULL, NULL, '2024-01-13 20:00:00', '#4CAF50', '<ul><li>Reinf</li></ul>', 'A', '2024-01-13', '09:00:00', '20:00:00', '12:00:00', '12:30:00', '10:30:00', NULL),
(5, 744, NULL, 'RCG', '2024-01-13 09:00:00', NULL, NULL, '2024-01-13 10:00:00', '#00BCD4', NULL, 'A', '2024-01-13', '09:00:00', '10:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(3, 745, NULL, 'FUNLEC', '2024-01-22 08:30:00', NULL, NULL, '2024-01-22 11:30:00', '#4CAF50', '<ul><li>Revisão Lançamento contábil&nbsp;</li></ul>', 'A', '2024-01-22', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 746, NULL, 'RCG', '2024-01-22 13:00:00', NULL, NULL, '2024-01-22 18:00:00', '#00BCD4', NULL, 'A', '2024-01-22', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 747, NULL, 'RCG', '2024-01-23 09:00:00', NULL, NULL, '2024-01-23 19:00:00', '#00BCD4', NULL, 'A', '2024-01-23', '09:00:00', '19:00:00', '12:30:00', '13:00:00', '09:30:00', NULL),
(4, 748, NULL, 'MSGAS', '2024-01-24 08:30:00', NULL, NULL, '2024-01-24 17:30:00', '#2196F3', '<ul><li>Calculo Múltiplos Vínculos</li></ul>', 'A', '2024-01-24', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(3, 749, 1, 'FUNLEC', '2024-01-25 08:30:00', NULL, NULL, '2024-01-25 17:30:00', '#4CAF50', '<ul><li>Revisão LP Contabilidade</li><li>API integração Financeiro</li></ul>', 'A', '2024-01-25', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(3, 750, 1, 'FUNLEC(Remoto)', '2024-01-24 20:00:00', NULL, NULL, '2024-01-24 22:00:00', '#4CAF50', '<ul><li>API Compras - Solicitação</li></ul>', 'A', '2024-01-24', '20:00:00', '22:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 751, 1, 'FUNLEC(Remoto)', '2024-01-25 19:00:00', NULL, NULL, '2024-01-25 21:00:00', '#4CAF50', '<ul><li>API Financeiro</li></ul>', 'A', '2024-01-25', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(6, 752, NULL, 'GUATOS(Remoto)', '2024-01-25 19:00:00', NULL, NULL, '2024-01-25 22:00:00', '#FFC107', '<ul><li>Contabilização de Notas Fiscais</li></ul>', 'A', '2024-01-25', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 753, NULL, 'FUNLEC', '2024-01-29 08:30:00', NULL, NULL, '2024-01-29 11:30:00', '#4CAF50', '<ul><li>API&nbsp; Funlec Online</li></ul>', 'A', '2024-01-29', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 754, NULL, 'RCG', '2024-01-26 08:30:00', NULL, NULL, '2024-01-26 18:00:00', '#00BCD4', NULL, 'A', '2024-01-26', '08:30:00', '18:00:00', '00:00:00', '00:00:00', '09:30:00', NULL),
(5, 755, NULL, 'RCG', '2024-01-26 19:00:00', NULL, NULL, '2024-01-26 22:00:00', '#00BCD4', '<ul><li>App Vendas(Online)</li></ul>', 'A', '2024-01-26', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 756, NULL, 'RCG', '2024-01-29 13:00:00', NULL, NULL, '2024-01-29 19:30:00', '#00BCD4', NULL, 'A', '2024-01-29', '13:00:00', '19:30:00', '00:00:00', '00:00:00', '06:30:00', NULL),
(5, 757, NULL, 'RCG', '2024-01-30 08:30:00', NULL, NULL, '2024-01-30 18:00:00', '#00BCD4', NULL, 'A', '2024-01-30', '08:30:00', '18:00:00', '00:00:00', '00:00:00', '09:30:00', NULL),
(5, 758, 1, 'RCG', '2024-01-29 20:30:00', NULL, NULL, '2024-01-29 22:30:00', '#00BCD4', NULL, 'A', '2024-01-29', '20:30:00', '22:30:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(4, 759, NULL, 'MSGAS', '2024-01-31 07:30:00', NULL, NULL, '2024-01-31 17:30:00', '#2196F3', '<ul><li>Calculo de Múltiplos Vínculos</li></ul>', 'A', '2024-01-31', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(3, 760, 1, 'FUNLEC', '2024-01-04 08:00:00', NULL, NULL, '2024-01-04 17:30:00', '#4CAF50', '<ul><li>Api Funlec Online</li></ul>', 'A', '2024-01-04', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(5, 761, NULL, 'RCG', '2024-01-05 08:00:00', NULL, NULL, '2024-01-05 18:00:00', '#00BCD4', NULL, 'A', '2024-01-05', '08:00:00', '18:00:00', '11:30:00', '12:30:00', '09:00:00', NULL),
(NULL, 762, NULL, 'Ferias', '2024-01-15 08:00:00', NULL, NULL, '2024-01-15 18:00:00', '#3a87ad', NULL, 'A', '2024-01-15', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(NULL, 763, NULL, 'Ferias', '2024-01-16 08:00:00', NULL, NULL, '2024-01-16 18:00:00', '#3a87ad', NULL, 'A', '2024-01-16', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(NULL, 764, NULL, 'Ferias', '2024-01-17 08:00:00', NULL, NULL, '2024-01-17 18:00:00', '#3a87ad', NULL, 'A', '2024-01-17', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(NULL, 765, NULL, 'Ferias', '2024-01-18 08:00:00', NULL, NULL, '2024-01-18 18:00:00', '#3a87ad', NULL, 'A', '2024-01-18', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(NULL, 766, NULL, 'Ferias', '2024-01-19 08:00:00', NULL, NULL, '2024-01-19 18:00:00', '#3a87ad', NULL, 'A', '2024-01-19', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(5, 767, NULL, 'RCG', '2024-01-15 14:30:00', NULL, NULL, '2024-01-15 15:30:00', '#00BCD4', NULL, 'A', '2024-01-15', '14:30:00', '15:30:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(5, 768, NULL, 'RCG', '2024-01-16 08:00:00', NULL, NULL, '2024-01-16 08:30:00', '#00BCD4', NULL, 'A', '2024-01-16', '08:00:00', '08:30:00', '00:00:00', '00:00:00', '00:30:00', NULL),
(5, 769, NULL, 'RCG', '2024-01-16 13:00:00', NULL, NULL, '2024-01-16 13:30:00', '#00BCD4', NULL, 'A', '2024-01-16', '13:00:00', '13:30:00', '00:00:00', '00:00:00', '00:30:00', NULL),
(3, 770, 1, 'FUNLEC', '2024-02-01 07:30:00', NULL, NULL, '2024-02-01 17:30:00', '#4CAF50', '<ul><li><span class=\"selectable-text copyable-text\">Api Financeiro</span><br></li></ul>', 'A', '2024-02-01', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(5, 771, 1, 'RCG', '2024-02-05 08:00:00', NULL, NULL, '2024-02-05 12:30:00', '#00BCD4', NULL, 'A', '2024-02-05', '08:00:00', '12:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(3, 772, 1, 'FUNLEC', '2024-02-05 13:00:00', NULL, NULL, '2024-02-05 17:30:00', '#4CAF50', '<ul><li>Api Financeiro</li></ul>', 'A', '2024-02-05', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 773, NULL, 'RCG', '2024-02-14 07:30:00', NULL, NULL, '2024-02-14 18:00:00', '#00BCD4', NULL, 'A', '2024-02-14', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(3, 774, 1, 'FUNLEC', '2024-02-15 07:30:00', NULL, NULL, '2024-02-15 17:30:00', '#4CAF50', '<ul><li>API Funlec Online.</li></ul>', 'A', '2024-02-15', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(4, 775, NULL, 'MSGAS', '2024-02-16 07:30:00', NULL, NULL, '2024-02-16 18:00:00', '#2196F3', '<ul><li>Api RESERVAS</li></ul>', 'A', '2024-02-16', '07:30:00', '18:00:00', '11:30:00', '13:30:00', '08:30:00', NULL),
(5, 776, 1, 'RCG', '2024-02-06 08:00:00', NULL, NULL, '2024-02-06 18:00:00', '#00BCD4', NULL, 'A', '2024-02-06', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(5, 777, NULL, 'RCG', '2024-02-06 19:00:00', NULL, NULL, '2024-02-06 22:00:00', '#00BCD4', NULL, 'A', '2024-02-06', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 778, NULL, 'RCG', '2024-02-07 08:00:00', NULL, NULL, '2024-02-07 18:00:00', '#00BCD4', NULL, 'A', '2024-02-07', '08:00:00', '18:00:00', '12:00:00', '12:30:00', '09:30:00', NULL),
(3, 779, NULL, 'FUNLEC(Remoto)', '2024-02-07 19:30:00', NULL, NULL, '2024-02-07 23:30:00', '#4CAF50', '<ul><li>Atualização sistema</li></ul>', 'A', '2024-02-07', '19:30:00', '23:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(3, 780, NULL, 'FUNLEC', '2024-02-08 07:30:00', NULL, NULL, '2024-02-08 17:30:00', '#4CAF50', '<ul><li>Reinf</li></ul>', 'A', '2024-02-08', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(4, 782, NULL, 'MSGAS', '2024-02-09 07:30:00', NULL, NULL, '2024-02-09 17:30:00', '#2196F3', '<ul><li>Api RESERVAS</li></ul>', 'A', '2024-02-09', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(4, 783, 1, 'MSGAS', '2024-02-15 19:00:00', NULL, NULL, '2024-02-15 22:00:00', '#2196F3', '<ul><li>Atualização de Sistema<ul><li>24-02-09_ATUALIZACAO_12.1.2210_MDT_EXPEDICAO_CONTINUA</li><li>24-02-06_ATUALIZACAO_12.1.2210_RH_EXPEDICAO_CONTINUA</li><li>24-02-05_ATUALIZACAO_12.1.2210_PCO_EXPEDICAO_CONTINUA</li><li>24-02-05_ATUALIZACAO_12.1.2210_FIS_EXPEDICAO_CONTINUA</li><li>24-02-02_ATUALIZACAO_12.1.2210_FIN_EXPEDICAO_CONTINUA</li><li>24-02-02_ATUALIZACAO_12.1.2210_FAT_EXPEDICAO_CONTINUA</li><li>24-02-02_ATUALIZACAO_12.1.2210_EST_EXPEDICAO_CONTINUA</li><li>24-02-02_ATUALIZACAO_12.1.2210_CTB_EXPEDICAO_CONTINUA</li><li>24-02-02_ATUALIZACAO_12.1.2210_COM_EXPEDICAO_CONTINUA</li><li>24-02-02_ATUALIZACAO_12.1.2210_ATF_EXPEDICAO_CONTINUA</li><li>24-02-07_ATUALIZACAO_12.1.2210_BACKOFFICE_EXPEDICAO_CONTINUA</li><li>24-01-26-TOTVS_DBACCESS_BUILD_23.1.1.2_LINUX_X64</li><li>24-02-07-ARQUIVOS_PORTAL_MEU_RH<br></li><li>24-01-23_ATUALIZACAO_12.1.2210_TAF_EXPEDICAO_CONTINUA</li><li>24-02-05-RPO_INSTALADOR_TSS_12.1.2210_EXP.CONTINUA</li><li>24-02-02-TSS_ARQUIVOS_CONF</li><li>24-02-02-TSS_URLS</li><li>24-02-02-TSS_SCHEMAS<br></li><li>24-02-08-CENTRAL_DE_ATUALIZACOES_V2_1_2<br></li></ul></li></ul>', 'A', '2024-02-15', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 784, 1, 'RCG', '2024-02-08 19:00:00', NULL, NULL, '2024-02-08 22:00:00', '#00BCD4', '<ul><li>Cadastro de Produto</li></ul>', 'A', '2024-02-08', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 785, 1, 'FUNLEC', '2024-02-19 07:30:00', NULL, NULL, '2024-02-19 11:30:00', '#4CAF50', '<ul><li>Api Financeiro</li><li>CNAB Sicredi</li></ul>', 'A', '2024-02-19', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 786, 1, 'RCG', '2024-02-19 13:00:00', NULL, NULL, '2024-02-19 18:00:00', '#00BCD4', NULL, 'A', '2024-02-19', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 787, 1, 'RCG', '2024-02-20 07:30:00', NULL, NULL, '2024-02-20 18:00:00', '#00BCD4', NULL, 'A', '2024-02-20', '07:30:00', '18:00:00', '12:00:00', '13:00:00', '09:30:00', NULL),
(4, 788, 1, 'MSGAS', '2024-02-21 07:30:00', NULL, NULL, '2024-02-21 17:30:00', '#2196F3', '<ul><li>Api Rubrica</li><li>Api Histórico Rubrica</li><li>WebHook Contas a Receber</li></ul>', 'A', '2024-02-21', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(3, 789, 1, 'FUNLEC', '2024-02-22 07:30:00', NULL, NULL, '2024-02-22 17:30:00', '#4CAF50', '<ul><li>Dirf 2024</li></ul>', 'A', '2024-02-22', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(3, 790, NULL, 'FUNLEC', '2024-02-26 07:30:00', NULL, NULL, '2024-02-26 11:30:00', '#4CAF50', '<ul><li>Dirf 2024</li></ul>', 'A', '2024-02-26', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 791, NULL, 'RCG', '2024-02-26 13:00:00', NULL, NULL, '2024-02-26 18:00:00', '#00BCD4', NULL, 'A', '2024-02-26', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 792, 1, 'RCG', '2024-02-27 07:30:00', NULL, NULL, '2024-02-27 18:00:00', '#00BCD4', NULL, 'A', '2024-02-27', '07:30:00', '18:00:00', '12:00:00', '13:00:00', '09:30:00', NULL),
(4, 793, 1, 'MSGAS', '2024-02-27 19:00:00', NULL, NULL, '2024-02-27 22:00:00', '#2196F3', '<ul><li>Atualização 2310</li></ul>', 'A', '2024-02-27', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 794, 1, 'MSGAS', '2024-02-26 19:30:00', NULL, NULL, '2024-02-26 22:00:00', '#2196F3', '<ul><li>Atualização 2310</li></ul>', 'A', '2024-02-26', '19:30:00', '22:00:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(4, 795, 1, 'MSGAS', '2024-02-28 07:30:00', NULL, NULL, '2024-02-28 17:30:00', '#2196F3', '<ul><li>Api RESERVAS</li><li>Atualização Release 2310</li></ul>', 'A', '2024-02-28', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(3, 796, 1, 'FUNLEC(Remoto)', '2024-02-28 18:30:00', NULL, NULL, '2024-02-28 22:00:00', '#4CAF50', '<ul><li>Atualização</li></ul>', 'A', '2024-02-28', '18:30:00', '22:00:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(5, 797, 1, 'RCG', '2024-02-02 08:00:00', NULL, NULL, '2024-02-02 18:00:00', '#00BCD4', NULL, 'A', '2024-02-02', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(5, 798, NULL, 'RCG', '2024-02-23 08:00:00', NULL, NULL, '2024-02-23 16:00:00', '#00BCD4', NULL, 'A', '2024-02-23', '08:00:00', '16:00:00', '12:00:00', '13:00:00', '07:00:00', NULL),
(3, 799, 1, 'FUNLEC', '2024-02-29 07:30:00', NULL, NULL, '2024-02-29 17:30:00', '#4CAF50', '<ul><li>Configuração Recebimento PIX SIGALOJA</li><li>API Financeiro</li></ul>', 'A', '2024-02-29', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(3, 800, 1, 'FUNLEC', '2024-03-04 07:30:00', NULL, NULL, '2024-03-04 11:30:00', '#4CAF50', '<ul><li>API Financeiro</li></ul>', 'A', '2024-03-04', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 801, 1, 'RCG', '2024-03-04 13:00:00', NULL, NULL, '2024-03-04 18:30:00', '#00BCD4', NULL, 'A', '2024-03-04', '13:00:00', '18:30:00', '00:00:00', '00:00:00', '05:30:00', NULL),
(5, 802, 1, 'RCG', '2024-03-05 07:30:00', NULL, NULL, '2024-03-05 18:00:00', '#00BCD4', NULL, 'A', '2024-03-05', '07:30:00', '18:00:00', '12:00:00', '13:00:00', '09:30:00', NULL),
(4, 803, 1, 'MSGAS', '2024-03-06 07:30:00', NULL, NULL, '2024-03-06 17:30:00', '#2196F3', '<ul><li>Atualização base DEV 2310</li></ul>', 'A', '2024-03-06', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(3, 804, NULL, 'FUNLEC', '2024-03-07 07:30:00', NULL, NULL, '2024-03-07 17:30:00', '#4CAF50', '<ul><li>API Financeiro<br></li></ul>', 'A', '2024-03-07', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(5, 805, 1, 'RCG', '2024-03-08 07:30:00', NULL, NULL, '2024-03-08 18:00:00', '#00BCD4', NULL, 'A', '2024-03-08', '07:30:00', '18:00:00', '12:00:00', '13:00:00', '09:30:00', NULL),
(5, 806, 1, 'RCG', '2024-03-10 03:00:00', NULL, NULL, '2024-03-10 19:00:00', '#00BCD4', NULL, 'A', '2024-03-10', '03:00:00', '19:00:00', '00:00:00', '00:00:00', '16:00:00', NULL),
(5, 807, 1, 'RCG', '2024-03-11 07:30:00', NULL, NULL, '2024-03-11 18:00:00', '#00BCD4', NULL, 'A', '2024-03-11', '07:30:00', '18:00:00', '11:30:00', '13:00:00', '09:00:00', NULL),
(5, 808, NULL, 'RCG', '2024-03-12 07:30:00', NULL, NULL, '2024-03-12 18:00:00', '#00BCD4', NULL, 'A', '2024-03-12', '07:30:00', '18:00:00', '11:30:00', '13:00:00', '09:00:00', NULL),
(5, 809, NULL, 'RCG', '2024-03-13 07:30:00', NULL, NULL, '2024-03-13 18:00:00', '#00BCD4', NULL, 'A', '2024-03-13', '07:30:00', '18:00:00', '11:30:00', '13:00:00', '09:00:00', NULL),
(5, 810, 1, 'RCG', '2024-03-14 07:30:00', NULL, NULL, '2024-03-14 18:00:00', '#00BCD4', NULL, 'A', '2024-03-14', '07:30:00', '18:00:00', '11:30:00', '13:00:00', '09:00:00', NULL),
(4, 811, 1, 'MSGAS', '2024-03-15 07:30:00', NULL, NULL, '2024-03-15 17:30:00', '#2196F3', '<ul><li>Atualização base DEV 2310</li><li>Teste validação Folha de Pagamento</li><li>Chamado 19641301&nbsp;</li></ul>', 'A', '2024-03-15', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(3, 812, 1, 'FUNLEC', '2024-03-18 07:30:00', NULL, NULL, '2024-03-18 17:30:00', '#4CAF50', '<ul><li>Reunião Financeiro (Compensação entre Carteiras)</li><li>Api Funlec OnLine</li></ul>', 'A', '2024-03-18', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(3, 813, 1, 'FUNLEC', '2024-03-19 07:30:00', NULL, NULL, '2024-03-19 17:30:00', '#4CAF50', '<ul><li>Api Funlec OnLine</li></ul>', 'A', '2024-03-19', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(4, 814, 1, 'MSGAS', '2024-03-20 07:30:00', NULL, NULL, '2024-03-20 17:30:00', '#2196F3', '<ul><li><span style=\"color: rgb(0, 0, 0); font-family: Arial, Helvetica, sans-serif;\">Complemento Chamado 19641301</span></li><li>Atualização base DEV 2310</li><li>Ajuste API Reservas</li></ul>', 'A', '2024-03-20', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(3, 815, 1, 'FUNLEC', '2024-03-21 07:30:00', NULL, NULL, '2024-03-21 17:30:00', '#4CAF50', '<ul><li>Api Funlec OnLine</li></ul>', 'A', '2024-03-21', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(5, 816, 1, 'RCG', '2024-03-22 07:30:00', NULL, NULL, '2024-03-22 18:00:00', '#00BCD4', NULL, 'A', '2024-03-22', '07:30:00', '18:00:00', '11:30:00', '13:00:00', '09:00:00', NULL),
(3, 817, 1, 'FUNLEC', '2024-03-25 07:30:00', NULL, NULL, '2024-03-25 11:30:00', '#4CAF50', '<ul><li>Geração de Títulos a receber</li></ul>', 'A', '2024-03-25', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 818, 1, 'RCG', '2024-03-25 13:00:00', NULL, NULL, '2024-03-25 18:00:00', '#00BCD4', NULL, 'A', '2024-03-25', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 819, 1, 'RCG', '2024-03-26 07:30:00', NULL, NULL, '2024-03-26 18:30:00', '#00BCD4', NULL, 'A', '2024-03-26', '07:30:00', '18:30:00', '12:00:00', '13:00:00', '10:00:00', NULL),
(3, 820, 1, 'FUNLEC(Remoto)', '2024-03-26 19:00:00', NULL, NULL, '2024-03-26 21:00:00', '#4CAF50', '<ul><li>Atualização Base Teste</li></ul>', 'A', '2024-03-26', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(4, 821, 1, 'MSGAS', '2024-03-27 07:30:00', NULL, NULL, '2024-03-27 17:30:00', '#2196F3', '<ul><li>Atualização 2310 Base DEV</li></ul>', 'A', '2024-03-27', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(4, 822, 1, 'MSGAS', '2024-03-05 19:00:00', NULL, NULL, '2024-03-05 22:00:00', '#2196F3', '<ul><li>Atualização 2310</li></ul>', 'A', '2024-03-05', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 823, 1, 'MSGAS', '2024-03-07 20:00:00', NULL, NULL, '2024-03-07 23:00:00', '#2196F3', '<ul><li>Atualização 2310 DEV</li></ul>', 'A', '2024-03-07', '20:00:00', '23:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 824, 1, 'FUNLEC', '2024-03-28 09:00:00', NULL, NULL, '2024-03-28 17:30:00', '#4CAF50', '<ul><li>API de Integração Financeiro</li></ul>', 'A', '2024-03-28', '09:00:00', '17:30:00', '11:30:00', '15:00:00', '05:00:00', NULL),
(5, 825, 1, 'RCG', '2024-03-01 07:30:00', NULL, NULL, '2024-03-01 18:00:00', '#00BCD4', NULL, 'A', '2024-03-01', '07:30:00', '18:00:00', '12:00:00', '13:00:00', '09:30:00', NULL),
(3, 826, NULL, 'FUNLEC(Remoto)', '2024-03-18 19:00:00', NULL, NULL, '2024-03-18 22:00:00', '#4CAF50', '<ul><li>Atualização base testes</li></ul>', 'A', '2024-03-18', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(NULL, 827, NULL, 'Feriado', '2024-03-29 08:00:00', NULL, NULL, '2024-03-29 18:00:00', '#E91E63', NULL, 'A', '2024-03-29', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(3, 828, 1, 'FUNLEC', '2024-04-01 07:30:00', NULL, NULL, '2024-04-01 11:30:00', '#4CAF50', '<ul><li>Api Financeiro</li></ul>', 'A', '2024-04-01', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 829, NULL, 'RCG', '2024-04-01 13:00:00', NULL, NULL, '2024-04-01 18:00:00', '#00BCD4', NULL, 'A', '2024-04-01', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 830, 1, 'RCG', '2024-04-02 07:30:00', NULL, NULL, '2024-04-02 18:00:00', '#00BCD4', NULL, 'A', '2024-04-02', '07:30:00', '18:00:00', '12:00:00', '13:00:00', '09:30:00', NULL),
(5, 831, 1, 'RCG(Remoto)', '2024-04-02 19:00:00', NULL, NULL, '2024-04-02 22:00:00', '#00BCD4', NULL, 'A', '2024-04-02', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 832, 1, 'MSGAS', '2024-04-03 07:40:00', NULL, NULL, '2024-04-03 17:30:00', '#2196F3', '<ul><li>Atualização Base Teste</li><li>Ajuste Api Pedido de Venda</li></ul>', 'A', '2024-04-03', '07:40:00', '17:30:00', '11:30:00', '13:30:00', '07:50:00', NULL),
(4, 833, 1, 'MSGAS(Remoto)', '2024-04-01 19:00:00', NULL, NULL, '2024-04-01 22:00:00', '#2196F3', '<ul><li>Agenda de 28/04</li><li>Api Pedido de Vendas</li></ul>', 'A', '2024-04-01', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 834, NULL, 'RCG(Remoto)', '2024-04-03 19:00:00', NULL, NULL, '2024-04-03 22:00:00', '#00BCD4', NULL, 'A', '2024-04-03', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 835, NULL, 'FUNLEC', '2024-04-04 07:30:00', NULL, NULL, '2024-04-04 17:30:00', '#4CAF50', '<ul><li>Api de Bolsa\\ Desconto</li></ul>', 'A', '2024-04-04', '07:30:00', '17:30:00', '11:30:00', '13:10:00', '08:20:00', NULL),
(5, 836, NULL, 'RCG(Remoto)', '2024-04-04 19:30:00', NULL, NULL, '2024-04-04 23:30:00', '#00BCD4', NULL, 'A', '2024-04-04', '19:30:00', '23:30:00', '00:00:00', '00:00:00', '04:00:00', NULL);
INSERT INTO `agendamento` (`contrato_id`, `id`, `profissional_id`, `descricao`, `horario_inicial`, `intervalo_inicial`, `intervalo_final`, `horario_final`, `cor`, `observacao`, `tipo`, `data_agenda`, `hora_inicio`, `hora_fim`, `hora_intervalo_inicial`, `hora_intervalo_final`, `hora_total`, `local`) VALUES
(3, 837, NULL, 'FUNLEC', '2024-04-08 07:30:00', NULL, NULL, '2024-04-08 11:30:00', '#4CAF50', '<ul><li>Api de desconto</li><li>Geração de Títulos de Bolsa e Desconta incondicional</li></ul>', 'A', '2024-04-08', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 838, NULL, 'RCG', '2024-04-09 07:30:00', NULL, NULL, '2024-04-09 18:00:00', '#00BCD4', NULL, 'A', '2024-04-09', '07:30:00', '18:00:00', '00:00:00', '00:00:00', '10:30:00', NULL),
(5, 839, NULL, 'RCG', '2024-04-08 14:00:00', NULL, NULL, '2024-04-08 18:00:00', '#00BCD4', NULL, 'A', '2024-04-08', '14:00:00', '18:00:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(4, 840, NULL, 'MSGAS', '2024-04-10 07:30:00', NULL, NULL, '2024-04-10 19:30:00', '#2196F3', '<ul><li>Revisão API de Controle de Reservas, tardar rubrica bloqueada.</li><li>Importador XML</li><li>Notas Fiscais de Saída de Complemento de ICMS</li></ul>', 'A', '2024-04-10', '07:30:00', '19:30:00', '11:30:00', '13:00:00', '10:30:00', NULL),
(3, 841, 1, 'FUNLEC', '2024-04-10 20:00:00', NULL, NULL, '2024-04-10 23:00:00', '#4CAF50', '<ul><li>Atualização de Sistema<ul><li>24-04-03_ATUALIZACAO_12.1.2210_BACKOFFICE_EXPEDICAO_CONTINUA</li><li>24-04-03_ATUALIZACAO_12.1.2210_FIN_EXPEDICAO_CONTINUA</li><li>24-03-29_ATUALIZACAO_12.1.2210_FIS_EXPEDICAO_CONTINUA</li><li>24-03-29_ATUALIZACAO_12.1.2210_COM_EXPEDICAO_CONTINUA</li><li>24-04-02_ATUALIZACAO_12.1.2210_RH_EXPEDICAO_CONTINUA</li><li>24-04-08-LIB_LABEL_08042024_P12_HARPIA<br></li></ul></li></ul>', 'A', '2024-04-10', '20:00:00', '23:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 842, 1, 'FUNLEC', '2024-04-11 07:30:00', NULL, NULL, '2024-04-11 17:30:00', '#4CAF50', '<ul><li>Api de Desconto \\ Bolsa</li></ul>', 'A', '2024-04-11', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(5, 843, 1, 'RCG', '2024-04-12 08:00:00', NULL, NULL, '2024-04-12 17:30:00', '#00BCD4', NULL, 'A', '2024-04-12', '08:00:00', '17:30:00', '00:00:00', '00:00:00', '09:30:00', NULL),
(4, 844, 1, 'MSGAS', '2024-04-13 09:00:00', NULL, NULL, '2024-04-13 17:00:00', '#2196F3', '<ul><li>Atualização Release 2310</li></ul>', 'A', '2024-04-13', '09:00:00', '17:00:00', '12:00:00', '13:00:00', '07:00:00', NULL),
(4, 845, NULL, 'MSGAS', '2024-04-15 07:30:00', NULL, NULL, '2024-04-15 18:00:00', '#2196F3', '<ul><li>Acompanhamento pos atualização</li><li>Instalação SmartView</li></ul>', 'A', '2024-04-15', '07:30:00', '18:00:00', '11:30:00', '13:30:00', '08:30:00', NULL),
(5, 846, NULL, 'RCG', '2024-04-16 07:30:00', NULL, NULL, '2024-04-16 18:00:00', '#00BCD4', NULL, 'A', '2024-04-16', '07:30:00', '18:00:00', '12:00:00', '13:00:00', '09:30:00', NULL),
(3, 847, NULL, 'FUNLEC', '2024-04-17 07:30:00', NULL, NULL, '2024-04-17 11:30:00', '#4CAF50', '<p>- Api de Desconto</p>', 'A', '2024-04-17', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 848, 1, 'RCG', '2024-04-17 13:00:00', NULL, NULL, '2024-04-17 18:00:00', '#00BCD4', NULL, 'A', '2024-04-17', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(3, 849, NULL, 'FUNLEC', '2024-04-18 07:30:00', NULL, NULL, '2024-04-18 17:30:00', '#4CAF50', '<p>-Api de Desconto</p><p>-Api de Baixas</p>', 'A', '2024-04-18', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(5, 850, NULL, 'RCG', '2024-04-19 07:30:00', NULL, NULL, '2024-04-19 18:00:00', '#00BCD4', NULL, 'A', '2024-04-19', '07:30:00', '18:00:00', '12:30:00', '13:00:00', '10:00:00', NULL),
(3, 851, NULL, 'FUNLEC', '2024-04-22 07:30:00', NULL, NULL, '2024-04-22 11:30:00', '#4CAF50', '<ul><li>API de baixa.</li></ul>', 'A', '2024-04-22', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 852, NULL, 'RCG', '2024-04-22 13:00:00', NULL, NULL, '2024-04-22 18:00:00', '#00BCD4', NULL, 'A', '2024-04-22', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 853, 1, 'RCG', '2024-04-23 07:30:00', NULL, NULL, '2024-04-23 18:00:00', '#00BCD4', NULL, 'A', '2024-04-23', '07:30:00', '18:00:00', '11:30:00', '13:00:00', '09:00:00', NULL),
(5, 854, 1, 'RCG', '2024-04-22 19:00:00', NULL, NULL, '2024-04-22 22:00:00', '#00BCD4', NULL, 'A', '2024-04-22', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 855, 1, 'RCG', '2024-04-23 19:00:00', NULL, NULL, '2024-04-23 22:00:00', '#00BCD4', NULL, 'A', '2024-04-23', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 856, NULL, 'MSGAS', '2024-04-24 07:30:00', NULL, NULL, '2024-04-24 17:30:00', '#2196F3', '<ul><li>SmartView</li><li>BB Extrato</li></ul>', 'A', '2024-04-24', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(5, 857, 1, 'RCG', '2024-04-24 19:00:00', NULL, NULL, '2024-04-24 22:00:00', '#00BCD4', NULL, 'A', '2024-04-24', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 858, 1, 'FUNLEC', '2024-04-25 07:30:00', NULL, NULL, '2024-04-25 17:30:00', '#4CAF50', '<ul><li>Api de Baixa</li></ul>', 'A', '2024-04-25', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(5, 859, 1, 'RCG', '2024-04-26 07:30:00', NULL, NULL, '2024-04-26 18:00:00', '#00BCD4', NULL, 'A', '2024-04-26', '07:30:00', '18:00:00', '12:00:00', '13:00:00', '09:30:00', NULL),
(6, 860, 1, 'GUATOS', '2024-04-27 10:00:00', NULL, NULL, '2024-04-27 18:00:00', '#FFC107', '<ul><li>Atualização 2310</li></ul>', 'A', '2024-04-27', '10:00:00', '18:00:00', '12:00:00', '13:00:00', '07:00:00', NULL),
(6, 861, 1, 'GUATOS', '2024-04-28 09:00:00', NULL, NULL, '2024-04-28 13:00:00', '#FFC107', '<ol><li>Atualização 2310</li></ol>', 'A', '2024-04-28', '09:00:00', '13:00:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(3, 862, 1, 'FUNLEC', '2024-04-29 07:30:00', NULL, NULL, '2024-04-29 11:30:00', '#4CAF50', '<ul><li>Api BAIXA</li></ul>', 'A', '2024-04-29', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 863, 1, 'RCG', '2024-04-29 13:00:00', NULL, NULL, '2024-04-29 18:00:00', '#00BCD4', NULL, 'A', '2024-04-29', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(4, 864, NULL, 'MSGAS', '2024-04-30 07:30:00', NULL, NULL, '2024-04-30 17:30:00', '#2196F3', '<ul><li>Conciliadores Bancários</li></ul>', 'A', '2024-04-30', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(3, 865, NULL, 'FUNLEC', '2024-05-02 07:30:00', NULL, NULL, '2024-05-02 17:30:00', '#4CAF50', '<ul><li>Api de Titulos</li></ul>', 'A', '2024-05-02', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(5, 866, NULL, 'RCG', '2024-05-03 07:30:00', NULL, NULL, '2024-05-03 14:30:00', '#00BCD4', NULL, 'A', '2024-05-03', '07:30:00', '14:30:00', '11:30:00', '13:00:00', '05:30:00', NULL),
(5, 867, NULL, 'RCG', '2024-05-04 09:00:00', NULL, NULL, '2024-05-04 17:00:00', '#00BCD4', NULL, 'A', '2024-05-04', '09:00:00', '17:00:00', '12:00:00', '13:00:00', '07:00:00', NULL),
(5, 868, NULL, 'RCG', '2024-05-06 07:30:00', NULL, NULL, '2024-05-06 18:00:00', '#00BCD4', NULL, 'A', '2024-05-06', '07:30:00', '18:00:00', '12:00:00', '13:00:00', '09:30:00', NULL),
(3, 869, NULL, 'FUNLEC', '2024-05-07 07:30:00', NULL, NULL, '2024-05-07 11:30:00', '#4CAF50', '<ul><li>Api de Baixas</li></ul>', 'A', '2024-05-07', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 870, NULL, 'RCG', '2024-05-07 13:00:00', NULL, NULL, '2024-05-07 18:00:00', '#00BCD4', NULL, 'A', '2024-05-07', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 871, NULL, 'RCG', '2024-05-06 19:00:00', NULL, NULL, '2024-05-06 22:00:00', '#00BCD4', NULL, 'A', '2024-05-06', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 872, NULL, 'MSGAS', '2024-05-08 07:30:00', NULL, NULL, '2024-05-08 17:30:00', '#2196F3', '<ul><li>Api Reservas</li><li>SmartView</li></ul>', 'A', '2024-05-08', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(3, 873, NULL, 'FUNLEC', '2024-05-09 07:30:00', NULL, NULL, '2024-05-09 17:30:00', '#4CAF50', '<ul><li>Reinf</li><li>API Baixa</li></ul>', 'A', '2024-05-09', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(5, 874, NULL, 'RCG', '2024-05-10 07:30:00', NULL, NULL, '2024-05-10 18:00:00', '#00BCD4', NULL, 'A', '2024-05-10', '07:30:00', '18:00:00', '11:30:00', '13:00:00', '09:00:00', NULL),
(5, 875, 1, 'RCG', '2024-05-07 19:30:00', NULL, NULL, '2024-05-07 22:00:00', '#00BCD4', NULL, 'A', '2024-05-07', '19:30:00', '22:00:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(3, 876, NULL, 'FUNLEC', '2024-05-12 10:00:00', NULL, NULL, '2024-05-12 18:00:00', '#4CAF50', '<ul><li>Atualização Release</li></ul>', 'A', '2024-05-12', '10:00:00', '18:00:00', '12:00:00', '13:00:00', '07:00:00', NULL),
(3, 877, NULL, 'FUNLEC', '2024-05-13 07:30:00', NULL, NULL, '2024-05-13 17:30:00', '#4CAF50', '<ul><li>Suporte pos atualização</li></ul>', 'A', '2024-05-13', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(5, 878, NULL, 'RCG', '2024-05-14 07:30:00', NULL, NULL, '2024-05-14 18:00:00', '#00BCD4', NULL, 'A', '2024-05-14', '07:30:00', '18:00:00', '12:00:00', '13:00:00', '09:30:00', NULL),
(4, 879, NULL, 'MSGAS', '2024-05-15 07:30:00', NULL, NULL, '2024-05-15 17:30:00', '#2196F3', '<ul><li>Configuração SmartView</li><li>Solicitação 20155392</li><li>Solicitação 19980434</li></ul>', 'A', '2024-05-15', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(3, 880, NULL, 'FUNLEC', '2024-05-16 07:30:00', NULL, NULL, '2024-05-16 17:30:00', '#4CAF50', '<ul><li>Api Titulos</li></ul>', 'A', '2024-05-16', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(5, 881, 1, 'RCG', '2024-05-17 07:30:00', NULL, NULL, '2024-05-17 18:00:00', '#00BCD4', NULL, 'A', '2024-05-17', '07:30:00', '18:00:00', '12:00:00', '13:00:00', '09:30:00', NULL),
(3, 882, NULL, 'FUNLEC', '2024-05-18 09:00:00', NULL, NULL, '2024-05-18 12:00:00', '#4CAF50', '<ul><li>Troca disco Servidor</li></ul>', 'A', '2024-05-18', '09:00:00', '12:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 883, NULL, 'FUNLEC', '2024-05-18 13:00:00', NULL, NULL, '2024-05-18 19:30:00', '#4CAF50', '<ul><li>Reconfiguração de Serviços Protheus</li></ul>', 'A', '2024-05-18', '13:00:00', '19:30:00', '00:00:00', '00:00:00', '06:30:00', NULL),
(4, 884, NULL, 'MSGAS', '2024-05-18 09:00:00', NULL, NULL, '2024-05-18 10:00:00', '#2196F3', '<ul><li>Atualização Contabilidade</li></ul>', 'A', '2024-05-18', '09:00:00', '10:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(3, 885, NULL, 'FUNLEC', '2024-05-20 07:30:00', NULL, NULL, '2024-05-20 11:30:00', '#4CAF50', '<ul><li>Ajustes troca de Servidor</li><li>Ajustes regras de backup</li></ul>', 'A', '2024-05-20', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 886, NULL, 'RCG', '2024-05-20 13:00:00', NULL, NULL, '2024-05-20 18:00:00', '#00BCD4', NULL, 'A', '2024-05-20', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 887, NULL, 'RCG', '2024-05-21 07:30:00', NULL, NULL, '2024-05-21 17:45:00', '#00BCD4', NULL, 'A', '2024-05-21', '07:30:00', '17:45:00', '12:00:00', '13:00:00', '09:15:00', NULL),
(4, 888, NULL, 'MSGAS', '2024-05-22 07:30:00', NULL, NULL, '2024-05-22 17:30:00', '#2196F3', '<ul><li>Baixa de XML de NF-e</li></ul>', 'A', '2024-05-22', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(3, 889, NULL, 'FUNLEC', '2024-05-27 07:30:00', NULL, NULL, '2024-05-27 11:30:00', '#4CAF50', '<ul><li>Api de Títulos</li></ul>', 'A', '2024-05-27', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 890, NULL, 'RCG', '2024-05-27 13:00:00', NULL, NULL, '2024-05-27 18:00:00', '#00BCD4', NULL, 'A', '2024-05-27', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 891, NULL, 'RCG', '2024-05-28 07:30:00', NULL, NULL, '2024-05-28 18:00:00', '#00BCD4', NULL, 'A', '2024-05-28', '07:30:00', '18:00:00', '11:30:00', '13:00:00', '09:00:00', NULL),
(4, 892, NULL, 'MSGAS', '2024-05-29 07:30:00', NULL, NULL, '2024-05-29 17:30:00', '#2196F3', '<ul><li>Baixa de XML de NF-e</li><li>Conciliador financeiro(Base Teste)</li></ul>', 'A', '2024-05-29', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(3, 893, NULL, 'FUNLEC', '2024-05-23 07:30:00', NULL, NULL, '2024-05-23 17:30:00', '#4CAF50', '<ul><li>API de Titulos</li></ul>', 'A', '2024-05-23', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(5, 894, 1, 'RCG', '2024-05-24 07:30:00', NULL, NULL, '2024-05-24 18:00:00', '#00BCD4', NULL, 'A', '2024-05-24', '07:30:00', '18:00:00', '12:00:00', '13:00:00', '09:30:00', NULL),
(NULL, 895, NULL, 'Feriado', '2024-05-30 08:00:00', NULL, NULL, '2024-05-30 18:00:00', '#E91E63', NULL, 'A', '2024-05-30', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(5, 896, NULL, 'RCG', '2024-05-31 07:30:00', NULL, NULL, '2024-05-31 18:00:00', '#00BCD4', NULL, 'A', '2024-05-31', '07:30:00', '18:00:00', '11:30:00', '13:00:00', '09:00:00', NULL),
(4, 897, NULL, 'MSGAS', '2024-05-28 12:00:00', NULL, NULL, '2024-05-28 12:30:00', '#2196F3', '<ul><li>Patch NF-e RS</li></ul>', 'A', '2024-05-28', '12:00:00', '12:30:00', '00:00:00', '00:00:00', '00:30:00', NULL),
(3, 898, 1, 'FUNLEC', '2024-05-30 08:30:00', NULL, NULL, '2024-05-30 11:30:00', '#4CAF50', '<ul><li>Api de Titulos</li></ul>', 'A', '2024-05-30', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 899, NULL, 'FUNLEC', '2024-06-03 07:30:00', NULL, NULL, '2024-06-03 11:30:00', '#4CAF50', '<ul><li>Validação de Dados Integração</li></ul>', 'A', '2024-06-03', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(3, 900, NULL, 'FUNLEC(Remoto)', '2024-06-04 09:00:00', NULL, NULL, '2024-06-04 11:00:00', '#4CAF50', '<ul><li>Validação de Dados Integração</li></ul>', 'A', '2024-06-04', '09:00:00', '10:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(3, 901, NULL, 'FUNLEC(Remoto)', '2024-06-04 14:00:00', NULL, NULL, '2024-06-04 17:00:00', '#4CAF50', '<ul><li>Validação de Dados Integração</li></ul>', 'A', '2024-06-04', '14:00:00', '16:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 902, NULL, 'FUNLEC(Remoto)', '2024-06-04 19:00:00', NULL, NULL, '2024-06-04 22:00:00', '#4CAF50', '<ul><li>Validação de Dados Integração</li></ul>', 'A', '2024-06-04', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 903, NULL, 'RCG', '2024-06-03 13:00:00', NULL, NULL, '2024-06-03 18:00:00', '#00BCD4', NULL, 'A', '2024-06-03', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 904, NULL, 'RCG', '2024-06-04 07:30:00', NULL, NULL, '2024-06-04 18:00:00', '#00BCD4', NULL, 'A', '2024-06-04', '07:30:00', '18:00:00', '11:30:00', '13:00:00', '09:00:00', NULL),
(4, 905, NULL, 'MSGAS', '2024-06-05 07:30:00', NULL, NULL, '2024-06-05 17:30:00', '#2196F3', '<ul><li>Integração Documento de Entrada</li></ul>', 'A', '2024-06-05', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(3, 906, 1, 'FUNLEC', '2024-06-06 07:30:00', NULL, NULL, '2024-06-06 17:30:00', '#4CAF50', '<ul><li>Validação de Dados Integração</li></ul>', 'A', '2024-06-06', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(3, 907, NULL, 'FUNLEC', '2024-06-28 07:30:00', NULL, NULL, '2024-06-28 17:30:00', '#4CAF50', '<ul><li>API Financeiro</li></ul>', 'A', '2024-06-28', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(5, 908, NULL, 'RCG', '2024-06-27 07:30:00', NULL, NULL, '2024-06-27 18:00:00', '#00BCD4', NULL, 'A', '2024-06-27', '07:30:00', '18:00:00', '11:30:00', '12:30:00', '09:30:00', NULL),
(NULL, 909, NULL, 'Feriado', '2024-06-13 07:00:00', NULL, NULL, '2024-06-13 18:00:00', '#E91E63', NULL, 'A', '2024-06-13', '07:00:00', '18:00:00', '00:00:00', '00:00:00', '11:00:00', NULL),
(5, 910, NULL, 'RCG', '2024-06-07 07:30:00', NULL, NULL, '2024-06-07 18:00:00', '#00BCD4', NULL, 'A', '2024-06-07', '07:30:00', '18:00:00', '11:30:00', '13:00:00', '09:00:00', NULL),
(5, 911, NULL, 'RCG', '2024-06-05 19:00:00', NULL, NULL, '2024-06-05 22:00:00', '#00BCD4', NULL, 'A', '2024-06-05', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 912, NULL, 'RCG', '2024-06-06 19:00:00', NULL, NULL, '2024-06-06 22:00:00', '#00BCD4', NULL, 'A', '2024-06-06', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 913, NULL, 'FUNLEC', '2024-06-10 07:30:00', NULL, NULL, '2024-06-10 11:30:00', '#4CAF50', '<ul><li>Api Titulos</li></ul>', 'A', '2024-06-10', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 914, NULL, 'RCG', '2024-06-10 13:00:00', NULL, NULL, '2024-06-10 18:00:00', '#00BCD4', NULL, 'A', '2024-06-10', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 915, NULL, 'RCG', '2024-06-11 07:30:00', NULL, NULL, '2024-06-11 18:00:00', '#00BCD4', NULL, 'A', '2024-06-11', '07:30:00', '18:00:00', '12:00:00', '13:00:00', '09:30:00', NULL),
(4, 916, NULL, 'MSGAS', '2024-06-12 07:45:00', NULL, NULL, '2024-06-12 17:30:00', '#2196F3', '<ul><li>Novo Conciliador (Ambiente DEV)</li><li>API XML NF-e de entrada</li></ul>', 'A', '2024-06-12', '07:45:00', '17:30:00', '11:30:00', '13:30:00', '07:45:00', NULL),
(3, 917, NULL, 'FUNLEC', '2024-06-10 19:00:00', NULL, NULL, '2024-06-10 22:00:00', '#4CAF50', '<ul><li>Api Titulos</li></ul>', 'A', '2024-06-10', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 918, NULL, 'RCG', '2024-06-11 19:00:00', NULL, NULL, '2024-06-11 22:00:00', '#00BCD4', NULL, 'A', '2024-06-11', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 919, NULL, 'RCG', '2024-06-14 07:30:00', NULL, NULL, '2024-06-14 14:00:00', '#00BCD4', NULL, 'A', '2024-06-14', '07:30:00', '14:00:00', '00:00:00', '00:00:00', '06:30:00', NULL),
(3, 920, NULL, 'FUNLEC', '2024-06-12 19:00:00', NULL, NULL, '2024-06-12 22:00:00', '#4CAF50', '<ul><li>API Titulos</li></ul>', 'A', '2024-06-12', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 921, 1, 'FUNLEC', '2024-06-13 09:00:00', NULL, NULL, '2024-06-13 15:00:00', '#4CAF50', '<ul><li>Api de Titulos</li></ul>', 'A', '2024-06-13', '09:00:00', '15:00:00', '12:00:00', '13:00:00', '05:00:00', NULL),
(3, 922, NULL, 'FUNLEC', '2024-06-17 07:30:00', NULL, NULL, '2024-06-17 11:30:00', '#4CAF50', '<ul><li>Api Titulos</li></ul>', 'A', '2024-06-17', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 923, NULL, 'RCG', '2024-06-17 13:00:00', NULL, NULL, '2024-06-17 18:00:00', '#00BCD4', '<ul><li><br></li></ul>', 'A', '2024-06-17', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 924, 1, 'RCG', '2024-06-17 19:00:00', NULL, NULL, '2024-06-17 22:00:00', '#00BCD4', NULL, 'A', '2024-06-17', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 925, NULL, 'RCG', '2024-06-18 07:30:00', NULL, NULL, '2024-06-18 18:00:00', '#00BCD4', NULL, 'A', '2024-06-18', '07:30:00', '18:00:00', '12:00:00', '13:00:00', '09:30:00', NULL),
(5, 926, NULL, 'RCG', '2024-06-18 19:00:00', NULL, NULL, '2024-06-18 22:00:00', '#00BCD4', NULL, 'A', '2024-06-18', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 927, NULL, 'MSGAS', '2024-06-19 07:30:00', NULL, NULL, '2024-06-19 17:30:00', '#2196F3', '<ul><li>API XML NF-e de entrada<br></li></ul>', 'A', '2024-06-19', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(3, 928, 1, 'FUNLEC', '2024-06-20 07:30:00', NULL, NULL, '2024-06-20 17:30:00', '#4CAF50', '<ul><li>Api Financeiro</li></ul>', 'A', '2024-06-20', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(3, 929, NULL, 'FUNLEC(remoto)', '2024-06-20 19:00:00', NULL, NULL, '2024-06-20 23:00:00', '#4CAF50', '<ul><li>Api Financeiro</li></ul>', 'A', '2024-06-20', '19:00:00', '23:00:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(4, 930, NULL, 'MSGAS', '2024-06-25 07:30:00', NULL, NULL, '2024-06-25 17:30:00', '#2196F3', '<ul><li>Ajuste PE M460FIM para tratamento de Juros e Multa de contas a receber</li><li>Simulação de configurações de Juros e Multa contas a receber em AMBIENTE DEV</li><li>Ajuste no PE M460FIM área temporária</li><li>Ajuste API fornecedores tratamento de IE X UF</li></ul>', 'A', '2024-06-25', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(3, 931, 1, 'FUNLEC', '2024-06-24 07:30:00', NULL, NULL, '2024-06-24 11:30:00', '#4CAF50', '<ul><li>Api Titulos</li></ul>', 'A', '2024-06-24', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 932, NULL, 'RCG', '2024-06-26 14:00:00', NULL, NULL, '2024-06-26 18:00:00', '#00BCD4', NULL, 'A', '2024-06-26', '14:00:00', '18:00:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 933, NULL, 'RCG', '2024-06-24 13:00:00', NULL, NULL, '2024-06-24 18:00:00', '#00BCD4', NULL, 'A', '2024-06-24', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(NULL, 934, NULL, 'Procon', '2024-06-26 09:30:00', NULL, NULL, '2024-06-26 14:00:00', '#3a87ad', NULL, 'A', '2024-06-26', '09:00:00', '10:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(5, 935, NULL, 'RCG', '2024-06-26 07:30:00', NULL, NULL, '2024-06-26 09:30:00', '#00BCD4', NULL, 'A', '2024-06-26', '07:30:00', '09:00:00', '00:00:00', '00:00:00', '01:30:00', NULL),
(3, 936, NULL, 'FUNLEC(Remoto)', '2024-06-25 19:00:00', NULL, NULL, '2024-06-25 22:00:00', '#4CAF50', '<ul><li>Api Financeiro</li></ul>', 'A', '2024-06-25', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 937, NULL, 'RCG', '2024-06-21 07:30:00', NULL, NULL, '2024-06-21 18:00:00', '#00BCD4', NULL, 'A', '2024-06-21', '07:30:00', '18:00:00', '12:00:00', '13:00:00', '09:30:00', NULL),
(3, 938, NULL, 'FUNLEC(remoto)', '2024-06-27 19:00:00', NULL, NULL, '2024-06-27 22:00:00', '#4CAF50', '<ul><li>Api Financeiro</li></ul>', 'A', '2024-06-27', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 939, NULL, 'FUNLEC(Remoto)', '2024-06-29 10:00:00', NULL, NULL, '2024-06-29 18:00:00', '#4CAF50', '<ul><li>API Financeiro</li></ul>', 'A', '2024-06-29', '10:00:00', '18:00:00', '12:00:00', '13:00:00', '07:00:00', NULL),
(3, 940, NULL, 'FUNLEC', '2024-06-30 10:00:00', NULL, NULL, '2024-06-30 17:00:00', '#4CAF50', '<ul><li>API Financeiro</li></ul>', 'A', '2024-06-30', '10:00:00', '17:00:00', '12:00:00', '13:00:00', '06:00:00', NULL),
(3, 941, NULL, 'FUNLEC', '2024-07-01 07:30:00', NULL, NULL, '2024-07-01 11:30:00', '#4CAF50', '<ul><li>API Títulos em produção&nbsp;</li></ul>', 'A', '2024-07-01', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 942, NULL, 'RCG', '2024-07-01 13:00:00', NULL, NULL, '2024-07-01 18:00:00', '#00BCD4', NULL, 'A', '2024-07-01', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(3, 943, NULL, 'FUNLEC(Remoto)', '2024-07-01 19:00:00', NULL, NULL, '2024-07-01 22:30:00', '#4CAF50', '<ul><li>API Títulos em produção&nbsp;</li></ul>', 'A', '2024-07-01', '19:00:00', '22:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(3, 944, NULL, 'FUNLEC', '2024-07-02 07:30:00', NULL, NULL, '2024-07-02 17:30:00', '#4CAF50', '<ul><li>API Títulos em produção&nbsp;</li></ul>', 'A', '2024-07-02', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(4, 945, NULL, 'MSGAS', '2024-07-02 20:00:00', NULL, NULL, '2024-07-02 22:00:00', '#2196F3', '<ul><li>Atualização de sistema:<ul><li>24-06-26_ATUALIZACAO_12.1.2310_TAF_EXPEDICAO_CONTINUA</li><li>24-06-28_ATUALIZACAO_12.1.2310_MDT_EXPEDICAO_CONTINUA</li><li>24-06-18_ATUALIZACAO_12.1.2310_RH_EXPEDICAO_CONTINUA</li><li>24-05-29_ATUALIZACAO_12.1.2310_BACKOFFICE_EXPEDICAO_CONTINUA</li><li>24-05-17-P12_APPSERVER_BUILD-20.3.2.8_LINUX_X64</li><li>24-05-17-TOTVS_DBACCESS_BUILD_23.1.1.4_LINUX_X64</li><li>24-05-17-P12-SMARTCLIENT_BUILD 20.3.2.6_WINDOWS_X64<br></li></ul></li></ul>', 'A', '2024-07-02', '20:00:00', '22:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 946, NULL, 'FUNLEC(Remoto)', '2024-07-02 20:00:00', NULL, NULL, '2024-07-02 23:00:00', '#4CAF50', '<ul><li>API Financeiro</li></ul>', 'A', '2024-07-02', '20:00:00', '23:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 947, NULL, 'FUNLEC(Remoto)', '2024-07-03 05:00:00', NULL, NULL, '2024-07-03 06:00:00', '#4CAF50', '<ul><li>Api Financeiro</li></ul>', 'A', '2024-07-03', '05:00:00', '06:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(4, 948, NULL, 'MSGAS', '2024-07-03 07:30:00', NULL, NULL, '2024-07-03 17:30:00', '#2196F3', '<ul><li>Suporte Atualização</li><li>Ajustes de Menu SmartView</li></ul>', 'A', '2024-07-03', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(5, 949, NULL, 'RCG', '2024-07-04 07:30:00', NULL, NULL, '2024-07-04 18:00:00', '#00BCD4', NULL, 'A', '2024-07-04', '07:30:00', '18:00:00', '12:30:00', '14:00:00', '09:00:00', NULL),
(5, 950, NULL, 'RCG', '2024-07-05 07:30:00', NULL, NULL, '2024-07-05 18:00:00', '#00BCD4', NULL, 'A', '2024-07-05', '07:30:00', '18:00:00', '11:30:00', '13:00:00', '09:00:00', NULL),
(3, 951, NULL, 'FUNLEC(remoto)', '2024-07-06 09:00:00', NULL, NULL, '2024-07-06 12:00:00', '#4CAF50', '<p>Atualização Sistema</p>', 'A', '2024-07-06', '09:00:00', '12:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 952, NULL, 'FUNLEC(remoto)', '2024-07-05 13:00:00', NULL, NULL, '2024-07-05 15:00:00', '#4CAF50', '<ul><li>API Integração</li></ul>', 'A', '2024-07-05', '13:00:00', '15:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 953, NULL, 'FUNLEC(Remoto)', '2024-07-08 07:30:00', NULL, NULL, '2024-07-08 11:30:00', '#4CAF50', '<ul><li>Api Financeiro</li></ul>', 'A', '2024-07-08', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 954, NULL, 'RCG', '2024-07-08 13:00:00', NULL, NULL, '2024-07-08 18:00:00', '#00BCD4', NULL, 'A', '2024-07-08', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 955, NULL, 'RCG', '2024-07-09 07:30:00', NULL, NULL, '2024-07-09 18:00:00', '#00BCD4', NULL, 'A', '2024-07-09', '07:30:00', '18:00:00', '12:00:00', '13:00:00', '09:30:00', NULL),
(3, 956, NULL, 'FUNLEC(Remoto)', '2024-07-09 13:00:00', NULL, NULL, '2024-07-09 15:00:00', '#4CAF50', '<ul><li>API Baixas</li></ul>', 'A', '2024-07-09', '13:00:00', '15:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 957, NULL, 'FUNLEC(Remoto)', '2024-07-09 21:00:00', NULL, NULL, '2024-07-09 22:00:00', '#4CAF50', '<ul><li>Ajuste ambiente(APO)</li></ul>', 'A', '2024-07-09', '21:00:00', '22:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(4, 958, NULL, 'MSGAS', '2024-07-10 08:00:00', NULL, NULL, '2024-07-10 17:30:00', '#2196F3', '<ul><li>SmartView</li></ul>', 'A', '2024-07-10', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(5, 959, NULL, 'RCG', '2024-07-15 07:30:00', NULL, NULL, '2024-07-15 18:00:00', '#00BCD4', NULL, 'A', '2024-07-15', '07:30:00', '18:00:00', '12:00:00', '13:00:00', '09:30:00', NULL),
(5, 960, NULL, 'RCG', '2024-07-16 07:30:00', NULL, NULL, '2024-07-16 11:30:00', '#00BCD4', NULL, 'A', '2024-07-16', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(3, 961, NULL, 'FUNLEC(Remoto)', '2024-07-15 14:30:00', NULL, NULL, '2024-07-15 16:00:00', '#4CAF50', '<ul><li>Api Funlec - Recebimento Avulso</li></ul>', 'A', '2024-07-15', '14:30:00', '16:00:00', '00:00:00', '00:00:00', '01:30:00', NULL),
(3, 962, NULL, 'FUNLEC', '2024-07-16 13:00:00', NULL, NULL, '2024-07-16 17:30:00', '#4CAF50', '<ul><li>Api Funlec - Recebimento Avulso</li></ul>', 'A', '2024-07-16', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(4, 963, NULL, 'MSGAS', '2024-07-17 08:00:00', NULL, NULL, '2024-07-17 17:30:00', '#2196F3', '<ul><li>Apresentação SmartView</li></ul>', 'A', '2024-07-17', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(3, 964, NULL, 'FUNLEC', '2024-07-18 08:00:00', NULL, NULL, '2024-07-18 17:30:00', '#4CAF50', '<ul><li>Ajuste Desconto Comercial e bolsa Cebas</li></ul>', 'A', '2024-07-18', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(3, 965, NULL, 'FUNLEC', '2024-07-22 07:30:00', NULL, NULL, '2024-07-22 11:30:00', '#4CAF50', '<ul><li>Api Contas a Receber</li></ul>', 'A', '2024-07-22', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 966, NULL, 'RCG', '2024-07-22 13:00:00', NULL, NULL, '2024-07-22 18:00:00', '#00BCD4', NULL, 'A', '2024-07-22', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 967, NULL, 'RCG', '2024-07-23 07:30:00', NULL, NULL, '2024-07-23 18:00:00', '#00BCD4', NULL, 'A', '2024-07-23', '07:30:00', '18:00:00', '12:00:00', '13:00:00', '09:30:00', NULL),
(4, 968, NULL, 'MSGAS', '2024-07-24 07:30:00', NULL, NULL, '2024-07-24 17:30:00', '#2196F3', '<ul><li>API Fornecedores</li><li>PE FINA460A</li><li>Títulos a Receber</li></ul>', 'A', '2024-07-24', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(3, 969, NULL, 'FUNLEC(Remoto)', '2024-07-23 20:00:00', NULL, NULL, '2024-07-23 22:00:00', '#4CAF50', '<ul><li>Atualização DBACCESS</li><li>Atualização APPSERVER</li><li>24-07-16_ATUALIZACAO_12.1.2310_RH_EXPEDICAO_CONTINUA<br></li></ul>', 'A', '2024-07-23', '20:00:00', '22:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(5, 970, NULL, 'RCG', '2024-07-19 07:30:00', NULL, NULL, '2024-07-19 18:45:00', '#00BCD4', NULL, 'A', '2024-07-19', '07:30:00', '18:45:00', '12:00:00', '13:00:00', '10:15:00', NULL),
(5, 971, NULL, 'RCG(REMOTO)', '2024-07-24 19:00:00', NULL, NULL, '2024-07-24 22:00:00', '#00BCD4', NULL, 'A', '2024-07-24', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 972, 1, 'FUNLEC', '2024-07-25 07:30:00', NULL, NULL, '2024-07-25 18:00:00', '#4CAF50', '<ul><li>Ajuste API de Baixa</li><li>Problema na Contabilização de Títulos baixados por \"DAC\"</li></ul>', 'A', '2024-07-25', '07:30:00', '18:00:00', '11:30:00', '13:00:00', '09:00:00', NULL),
(5, 973, 1, 'RCG', '2024-07-26 07:30:00', NULL, NULL, '2024-07-26 17:45:00', '#00BCD4', '<ul><li>Migração PROVEDOR E-mail</li><li>Migração PROVEDOR Sistema de Apoio de Vendas</li><li>Ajuste de Inventario Comodato</li><li>Troca de Carteira de Vendedor</li></ul>', 'A', '2024-07-26', '07:30:00', '17:45:00', '12:00:00', '13:00:00', '09:15:00', NULL),
(3, 974, NULL, 'FUNLEC', '2024-07-29 07:30:00', NULL, NULL, '2024-07-29 11:30:00', '#4CAF50', '<ul><li>Api de Baixa&nbsp; Desconto em Folha.</li></ul>', 'A', '2024-07-29', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 975, 1, 'RCG', '2024-07-29 13:00:00', NULL, NULL, '2024-07-29 18:00:00', '#00BCD4', '<ul><li>Dados Notebook supervisor solicitado pela Alex</li><li>Ajuste E-mail lucas@rcgdist.com.br</li><li>Instalação E-mail gledison@rcgdist.com.br</li><li>Troca de base de vendedores ( Gledison e Orcidney)<br></li></ul>', 'A', '2024-07-29', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 976, NULL, 'RCG', '2024-07-30 07:30:00', NULL, NULL, '2024-07-30 18:00:00', '#00BCD4', '<ul><li>Ajuste View view_total_catogoria_mes&nbsp;<br></li></ul>', 'A', '2024-07-30', '07:30:00', '18:00:00', '12:00:00', '13:00:00', '09:30:00', NULL),
(4, 977, NULL, 'MSGAS', '2024-07-30 19:00:00', NULL, NULL, '2024-07-30 22:00:00', '#2196F3', '<ul><li>Atualização Sistema</li></ul>', 'A', '2024-07-30', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 978, NULL, 'MSGAS', '2024-07-31 07:30:00', NULL, NULL, '2024-07-31 17:30:00', '#2196F3', '<ul style=\"color: rgb(134, 148, 176); background-color: rgb(248, 249, 251);\"><li>Suporte Atualização</li></ul>', 'A', '2024-07-31', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(3, 979, NULL, 'FUNLEC', '2024-07-11 07:30:00', NULL, NULL, '2024-07-11 17:30:00', '#4CAF50', '<ul><li>Ajuste API Financeiro</li></ul>', 'A', '2024-07-11', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(5, 980, NULL, 'RCG', '2024-07-12 07:30:00', NULL, NULL, '2024-07-12 18:00:00', '#00BCD4', NULL, 'A', '2024-07-12', '07:30:00', '18:00:00', '12:00:00', '13:00:00', '09:30:00', NULL),
(3, 981, NULL, 'FUNLEC', '2024-08-01 07:30:00', NULL, NULL, '2024-08-01 17:30:00', '#4CAF50', '<ul><li>API Desconto em Folha<br></li></ul>', 'A', '2024-08-01', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(3, 982, NULL, 'FUNLEC(Remoto)', '2024-07-31 19:00:00', NULL, NULL, '2024-07-31 22:00:00', '#4CAF50', '<ul><li>Atualização Sistema</li></ul>', 'A', '2024-07-31', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 983, NULL, 'RCG', '2024-08-02 07:30:00', NULL, NULL, '2024-08-02 17:45:00', '#00BCD4', '<ul><li>Calculo de Custo RCG/CBA</li><li>Recalculo de saldo RCG/CBA</li><li>Teste de Backup&nbsp;</li><li>Procedimento de Comodato</li></ul>', 'A', '2024-08-02', '07:30:00', '17:45:00', '12:00:00', '13:00:00', '09:15:00', NULL),
(3, 984, NULL, 'FUNLEC', '2024-08-05 07:30:00', NULL, NULL, '2024-08-05 11:30:00', '#4CAF50', '<ul><li>API Desconto em Folha</li></ul>', 'A', '2024-08-05', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 985, NULL, 'RCG', '2024-08-05 13:00:00', NULL, NULL, '2024-08-05 18:00:00', '#00BCD4', '<ul><li>Backup</li><li>Atualização de Saldos e Custo RCG/CBA</li></ul>', 'A', '2024-08-05', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 986, NULL, 'RCG', '2024-08-06 07:30:00', NULL, NULL, '2024-08-06 18:00:00', '#00BCD4', '<ul><li>Fechamento de Estoque 03/2024 RCG</li><li>Inventario Armazém 02(Encerrando)</li></ul>', 'A', '2024-08-06', '07:30:00', '18:00:00', '12:00:00', '13:30:00', '09:00:00', NULL),
(5, 987, NULL, 'RCG(remoto)', '2024-08-05 19:00:00', NULL, NULL, '2024-08-05 21:00:00', '#00BCD4', '<ul><li>Atualização Sistema</li></ul>', 'A', '2024-08-05', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(4, 988, NULL, 'MSGAS', '2024-08-07 07:30:00', NULL, NULL, '2024-08-07 17:30:00', '#2196F3', '<ul><li>Novo Conciliados BackOffice</li><li>Extrato Bancário OnLine</li><li>Caixinha Financeiro</li></ul>', 'A', '2024-08-07', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(3, 989, NULL, 'FUNLEC', '2024-08-08 07:30:00', NULL, NULL, '2024-08-08 17:30:00', '#4CAF50', '<ul><li>Baixa Desconto em folha</li></ul>', 'A', '2024-08-08', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(5, 990, NULL, 'RCG', '2024-08-09 07:30:00', NULL, NULL, '2024-08-09 18:00:00', '#00BCD4', '<ul><li>Atualização Sistema</li><li>Fechamento Estoque CBA</li><li>Inventario Equipamentos armazém 12 e 14</li><li>Inventario Equipamentos armazém 02 e 04(ZERO)<br></li></ul>', 'A', '2024-08-09', '07:30:00', '18:00:00', '11:30:00', '13:00:00', '09:00:00', NULL),
(3, 991, 1, 'FUNLEC', '2024-08-12 07:30:00', NULL, NULL, '2024-08-12 11:30:00', '#4CAF50', '<ul><li>Baixas PD</li></ul>', 'A', '2024-08-12', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 992, NULL, 'RCG', '2024-08-12 13:00:00', NULL, NULL, '2024-08-12 18:00:00', '#00BCD4', '<ul><li>Ajuste Impressão de DANFE</li><li>Atualização NFESEFAZ</li></ul>', 'A', '2024-08-12', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 993, NULL, 'RCG', '2024-08-13 08:00:00', NULL, NULL, '2024-08-13 18:00:00', '#00BCD4', '<ul><li>Ajuste SISTEMA para controle de supervisores, separando carteiras!</li></ul>', 'A', '2024-08-13', '08:00:00', '18:00:00', '12:00:00', '13:30:00', '08:30:00', NULL),
(3, 994, NULL, 'FUNLEC(Remoto)', '2024-08-12 19:00:00', NULL, NULL, '2024-08-12 22:00:00', '#4CAF50', '<ul><li>Baixas Desconto em Folha!</li></ul>', 'A', '2024-08-12', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 995, NULL, 'FUNLEC(Remoto)', '2024-08-12 14:00:00', NULL, NULL, '2024-08-12 17:00:00', '#4CAF50', '<ul><li>Baixas PD</li></ul>', 'A', '2024-08-12', '14:00:00', '17:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 996, NULL, 'MSGAS', '2024-08-14 08:00:00', NULL, NULL, '2024-08-14 17:30:00', '#2196F3', '<ul><li>Apresentação Caixinha Financeiro(Fundo Fixo)</li><li>Ajuste NFESEFAZ atualizado</li></ul>', 'A', '2024-08-14', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(3, 997, NULL, 'FUNLEC', '2024-08-21 07:30:00', NULL, NULL, '2024-08-21 17:30:00', '#4CAF50', '<ul><li>Integração PD<br></li></ul>', 'A', '2024-08-21', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(4, 998, NULL, 'MSGAS', '2024-08-22 07:30:00', NULL, NULL, '2024-08-22 17:30:00', '#2196F3', '<ul><li>Configuração Totvs Transmite&nbsp;</li><li>Configuração Totvs Transmite - Integração Protheus</li></ul>', 'A', '2024-08-22', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(3, 999, NULL, 'FUNLEC', '2024-08-15 08:00:00', NULL, NULL, '2024-08-15 17:30:00', '#4CAF50', '<ul><li>API Financeiro</li></ul>', 'A', '2024-08-15', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(3, 1000, NULL, 'FUNLEC(REMOTO)', '2024-08-14 19:00:00', NULL, NULL, '2024-08-14 23:00:00', '#4CAF50', '<ul><li>Api Financeiro</li></ul>', 'A', '2024-08-14', '19:00:00', '23:00:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(3, 1001, NULL, 'FUNLEC(Remoto)', '2024-08-13 13:00:00', NULL, NULL, '2024-08-13 16:00:00', '#4CAF50', '<ul><li>Api Financeiro</li></ul>', 'A', '2024-08-13', '13:00:00', '16:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 1002, 1, 'RCG', '2024-08-16 07:30:00', NULL, NULL, '2024-08-16 17:45:00', '#00BCD4', '<ul><li>Inventario Dispenser usados armazém 14</li><li>Demonstração Sistema de Apoio vendas para novos supervisores</li><li>Demonstração Maxima para novos supervisores</li></ul>', 'A', '2024-08-16', '07:30:00', '17:45:00', '12:00:00', '13:00:00', '09:15:00', NULL),
(3, 1003, NULL, 'FUNLEC', '2024-08-19 07:30:00', NULL, NULL, '2024-08-19 11:30:00', '#4CAF50', '<ul><li>API Financeiro<br></li></ul>', 'A', '2024-08-19', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 1004, NULL, 'RCG', '2024-08-19 13:00:00', NULL, NULL, '2024-08-19 18:00:00', '#00BCD4', '<ul><li>Backup</li><li>Ajuste NF-e</li><li>Configuração de Celular Supervisor</li></ul>', 'A', '2024-08-19', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 1005, NULL, 'RCG(Remoto)', '2024-08-19 19:00:00', NULL, NULL, '2024-08-19 22:00:00', '#00BCD4', '<ul><li>Atualização</li></ul>', 'A', '2024-08-19', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 1006, NULL, 'RCG', '2024-08-20 08:00:00', NULL, NULL, '2024-08-20 18:00:00', '#00BCD4', '<ul><li>Ajuste controle de Supervisor Maxima</li><li>Atualização WIFI</li><li>Configuração Celular Supervisor</li></ul>', 'A', '2024-08-20', '08:00:00', '18:00:00', '11:45:00', '13:00:00', '08:45:00', NULL),
(4, 1007, 1, 'MSGAS', '2024-08-28 08:00:00', NULL, NULL, '2024-08-28 17:30:00', '#2196F3', '<ul><li>Configuração Totvs Transmite - Integração Protheus</li><li>Demonstração Fiscal Totvs Transmite</li></ul>', 'A', '2024-08-28', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(5, 1008, 1, 'RCG', '2024-08-23 07:30:00', NULL, NULL, '2024-08-23 18:00:00', '#00BCD4', '<ul><li>Configuração de 02 Notebook Supervisor</li><li>Backup Sistema</li><li>Impressora dona Rose</li></ul>', 'A', '2024-08-23', '07:30:00', '18:00:00', '11:30:00', '13:00:00', '09:00:00', NULL),
(NULL, 1009, NULL, 'feriado', '2024-08-26 08:00:00', NULL, NULL, '2024-08-26 18:00:00', '#E91E63', NULL, 'A', '2024-08-26', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(5, 1010, 1, 'RCG', '2024-08-27 08:00:00', NULL, NULL, '2024-08-27 18:00:00', '#00BCD4', '<ul><li>Configuração Notebook supervisores</li><li>Impressora dona Rose</li><li>Atualização AP Intelbras</li></ul>', 'A', '2024-08-27', '08:00:00', '18:00:00', '11:40:00', '13:00:00', '08:40:00', NULL),
(3, 1011, NULL, 'FUNLEC', '2024-08-29 07:30:00', NULL, NULL, '2024-08-29 17:00:00', '#4CAF50', '<ul><li>Integração recebimento Eventual</li></ul>', 'A', '2024-08-29', '07:30:00', '17:00:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(5, 1012, NULL, 'RCG(Remoto)', '2024-08-27 19:00:00', NULL, NULL, '2024-08-27 22:00:00', '#00BCD4', '<ul><li>Ajuste Sistema de indicadores&nbsp;</li></ul>', 'A', '2024-08-27', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 1013, NULL, 'RCG', '2024-08-30 08:00:00', NULL, NULL, '2024-08-30 18:00:00', '#00BCD4', '<ul><li>Ajuste SISTEMA para controle de supervisores, separando carteiras!</li></ul>', 'A', '2024-08-30', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(3, 1014, NULL, 'FUNLEC', '2024-09-02 08:00:00', NULL, NULL, '2024-09-02 11:30:00', '#4CAF50', '<ul style=\"color: rgb(134, 148, 176); background-color: rgb(236, 239, 244);\"><li>API de Baixa Pagamento eventual!</li></ul>', 'A', '2024-09-02', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(5, 1015, NULL, 'RCG', '2024-09-02 12:00:00', NULL, NULL, '2024-09-02 18:00:00', '#00BCD4', NULL, 'A', '2024-09-02', '12:00:00', '18:00:00', '00:00:00', '00:00:00', '06:00:00', NULL),
(5, 1016, NULL, 'RCG', '2024-09-03 07:30:00', NULL, NULL, '2024-09-03 16:00:00', '#00BCD4', NULL, 'A', '2024-09-03', '07:30:00', '16:00:00', '12:00:00', '13:30:00', '07:00:00', NULL),
(4, 1017, NULL, 'MSGAS', '2024-09-04 07:50:00', NULL, NULL, '2024-09-04 17:30:00', '#2196F3', '<ul><li>Api de Envio de Notas Fiscais - PROCNET</li></ul>', 'A', '2024-09-04', '07:50:00', '17:30:00', '11:30:00', '13:30:00', '07:40:00', NULL),
(3, 1018, NULL, 'FUNLEC', '2024-09-05 07:30:00', NULL, NULL, '2024-09-05 17:30:00', '#4CAF50', '<ul><li>API de Baixa Pagamento eventual!</li></ul>', 'A', '2024-09-05', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(5, 1019, NULL, 'RCG', '2024-09-06 07:30:00', NULL, NULL, '2024-09-06 17:30:00', '#00BCD4', NULL, 'A', '2024-09-06', '07:30:00', '17:30:00', '12:30:00', '13:00:00', '09:30:00', NULL),
(4, 1020, NULL, 'MSGAS', '2024-09-11 08:00:00', NULL, NULL, '2024-09-11 17:30:00', '#2196F3', '<ul><li>Api de Envio de Notas Fiscais - PROCNET</li></ul>', 'A', '2024-09-11', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(5, 1021, NULL, 'RCG', '2024-09-10 07:30:00', NULL, NULL, '2024-09-10 18:00:00', '#00BCD4', NULL, 'A', '2024-09-10', '07:30:00', '18:00:00', '12:00:00', '14:30:00', '08:00:00', NULL),
(3, 1022, NULL, 'FUNLEC', '2024-09-09 07:30:00', NULL, NULL, '2024-09-09 11:30:00', '#4CAF50', '<ul><li>API Recebimento Eventual</li></ul>', 'A', '2024-09-09', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 1023, NULL, 'RCG', '2024-09-09 13:00:00', NULL, NULL, '2024-09-09 18:00:00', '#00BCD4', NULL, 'A', '2024-09-09', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(3, 1024, NULL, 'FUNLEC', '2024-09-12 08:00:00', NULL, NULL, '2024-09-12 17:30:00', '#4CAF50', '<ul><li>Api Contas a Receber</li><li>Ajuste de SubLote</li><li>Contabilização de Faturamento</li><li>Contabilização de Baixa ME/MD</li></ul>', 'A', '2024-09-12', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(3, 1025, NULL, 'FUNLEC', '2024-09-16 08:30:00', NULL, NULL, '2024-09-16 11:30:00', '#4CAF50', '<ul><li>Contabilização Contas a Receber</li></ul>', 'A', '2024-09-16', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 1026, NULL, 'RCG', '2024-09-17 07:30:00', NULL, NULL, '2024-09-17 18:00:00', '#00BCD4', NULL, 'A', '2024-09-17', '07:30:00', '18:00:00', '11:30:00', '13:00:00', '09:00:00', NULL),
(5, 1027, NULL, 'RCG', '2024-09-16 13:00:00', NULL, NULL, '2024-09-16 18:00:00', '#00BCD4', NULL, 'A', '2024-09-16', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(3, 1028, NULL, 'FUNLEC', '2024-09-18 08:00:00', NULL, NULL, '2024-09-18 17:30:00', '#4CAF50', '<ul><li>Contabilização Contas a Receber</li></ul>', 'A', '2024-09-18', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(4, 1029, NULL, 'MSGAS', '2024-09-19 08:10:00', NULL, NULL, '2024-09-19 17:30:00', '#2196F3', '<ul><li>API Nota Fiscal</li></ul>', 'A', '2024-09-19', '08:10:00', '17:30:00', '11:30:00', '13:40:00', '07:10:00', NULL),
(5, 1030, NULL, 'RCG', '2024-09-23 08:00:00', NULL, NULL, '2024-09-23 18:00:00', '#00BCD4', NULL, 'A', '2024-09-23', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(3, 1031, NULL, 'FUNLEC', '2024-09-24 08:00:00', NULL, NULL, '2024-09-24 11:30:00', '#4CAF50', '<ul><li>Contabilização Contas a Receber</li></ul>', 'A', '2024-09-24', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(5, 1032, NULL, 'RCG', '2024-09-24 13:00:00', NULL, NULL, '2024-09-24 18:00:00', '#00BCD4', NULL, 'A', '2024-09-24', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(4, 1033, NULL, 'MSGAS', '2024-09-25 08:00:00', NULL, NULL, '2024-09-25 17:30:00', '#2196F3', '<ul><li>API Pre Nota</li></ul>', 'A', '2024-09-25', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(3, 1034, NULL, 'FUNLEC', '2024-09-26 08:00:00', NULL, NULL, '2024-09-26 17:30:00', '#4CAF50', '<ul><li>Contabilização Contas a Receber</li></ul>', 'A', '2024-09-26', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(5, 1035, NULL, 'RCG', '2024-09-20 08:00:00', NULL, NULL, '2024-09-20 18:00:00', '#00BCD4', NULL, 'A', '2024-09-20', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(3, 1036, NULL, 'FUNLEC', '2024-09-30 07:40:00', NULL, NULL, '2024-09-30 11:30:00', '#4CAF50', '<ul><li>Contabilização PD</li></ul>', 'A', '2024-09-30', '07:40:00', '11:30:00', '00:00:00', '00:00:00', '03:50:00', NULL),
(5, 1037, NULL, 'RCG', '2024-09-30 13:00:00', NULL, NULL, '2024-09-30 18:00:00', '#00BCD4', NULL, 'A', '2024-09-30', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 1038, NULL, 'RCG', '2024-09-27 08:00:00', NULL, NULL, '2024-09-27 18:00:00', '#00BCD4', NULL, 'A', '2024-09-27', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(5, 1039, NULL, 'RCG', '2024-09-13 08:00:00', NULL, NULL, '2024-09-13 18:00:00', '#00BCD4', NULL, 'A', '2024-09-13', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(5, 1040, NULL, 'RCG', '2024-10-01 07:30:00', NULL, NULL, '2024-10-01 18:00:00', '#00BCD4', NULL, 'A', '2024-10-01', '07:30:00', '18:00:00', '12:00:00', '13:30:00', '09:00:00', NULL),
(3, 1041, NULL, 'FUNLEC(Remoto)', '2024-09-30 14:00:00', NULL, NULL, '2024-09-30 17:00:00', '#4CAF50', '<ul><li>Contabilização de&nbsp; PD</li></ul>', 'A', '2024-09-30', '14:00:00', '17:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 1042, NULL, 'MSGAS(remoto)', '2024-10-01 09:00:00', NULL, NULL, '2024-10-01 15:00:00', '#2196F3', '<ul><li>Api CONTA X Centro de Custo</li></ul>', 'A', '2024-10-01', '09:00:00', '15:00:00', '11:30:00', '13:00:00', '04:30:00', NULL),
(3, 1043, NULL, 'FUNLEC(remoto)', '2024-10-01 13:30:00', NULL, NULL, '2024-10-01 15:30:00', '#4CAF50', '<ul><li>Contabilização EV, RA de ME e MD</li></ul>', 'A', '2024-10-01', '13:30:00', '15:30:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(4, 1044, NULL, 'MSGAS', '2024-10-02 07:30:00', NULL, NULL, '2024-10-02 17:30:00', '#2196F3', '<ul><li>Api CONTA X Centro de Custo</li></ul>', 'A', '2024-10-02', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(3, 1045, NULL, 'FUNLEC', '2024-10-07 08:00:00', NULL, NULL, '2024-10-07 11:30:00', '#4CAF50', '<ul><li>API Geração de Titulos - Funlec Online</li></ul>', 'A', '2024-10-07', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(5, 1046, NULL, 'RCG', '2024-10-07 13:00:00', NULL, NULL, '2024-10-07 18:00:00', '#00BCD4', NULL, 'A', '2024-10-07', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 1047, NULL, 'RCG', '2024-10-08 08:00:00', NULL, NULL, '2024-10-08 18:00:00', '#00BCD4', NULL, 'A', '2024-10-08', '08:00:00', '18:00:00', '12:00:00', '13:20:00', '08:40:00', NULL),
(4, 1048, NULL, 'MSGAS(REMOTO)', '2024-10-08 19:00:00', NULL, NULL, '2024-10-08 22:00:00', '#2196F3', '<ul><li>Atualização de Sistema:<ul><li>24-09-20_ATUALIZACAO_12.1.2310_MDT_EXPEDICAO_CONTINUA</li><li>24-09-17_ATUALIZACAO_12.1.2310_RH_EXPEDICAO_CONTINUA</li><li>24-09-05_ATUALIZACAO_12.1.2310_TAF_EXPEDICAO_CONTINUA</li><li>24-09-23-LIB_LABEL_12082024_P12_HARPIA</li><li>24-08-12-SMARTLINK-2.5.4_HARPIA</li><li>24-08-27-P12-SMARTCLIENT_BUILD 20.3.2.8_WINDOWS_X64</li><li>24-09-19-ARQUIVOS_PORTAL_MEU_RH</li><li>24-09-04-P12_APPSERVER_BUILD-20.3.2.14_LINUX_X64</li><li>24-09-04-TOTVS_DBACCESS_BUILD_23.1.1.7_LINUX_X64<br></li></ul></li></ul>', 'A', '2024-10-08', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 1049, NULL, 'RCG(REMOTO)', '2024-10-07 19:00:00', NULL, NULL, '2024-10-07 22:00:00', '#00BCD4', '<ul><li>Atualização sistema</li></ul>', 'A', '2024-10-07', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 1050, NULL, 'FUNLEC(remoto)', '2024-10-07 14:00:00', NULL, NULL, '2024-10-07 17:00:00', '#4CAF50', '<ul><li>Nova API Funlec Online</li></ul>', 'A', '2024-10-07', '14:00:00', '17:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 1051, NULL, 'FUNLEC(remoto)', '2024-10-08 09:00:00', NULL, NULL, '2024-10-08 17:00:00', '#4CAF50', '<ul><li>Baixas 2025</li></ul>', 'A', '2024-10-08', '09:00:00', '17:00:00', '12:00:00', '14:00:00', '06:00:00', NULL),
(3, 1052, NULL, 'FUNLEC(Remoto)', '2024-10-08 20:00:00', NULL, NULL, '2024-10-08 22:00:00', '#4CAF50', '<ul><li>Baixas 2025</li></ul>', 'A', '2024-10-08', '20:00:00', '22:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(4, 1053, NULL, 'MSGAS', '2024-10-09 07:30:00', NULL, NULL, '2024-10-09 17:30:00', '#2196F3', '<ul><li>Suporte pos Atualização</li></ul>', 'A', '2024-10-09', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(NULL, 1054, NULL, 'feriado', '2024-10-11 08:00:00', NULL, NULL, '2024-10-11 18:00:00', '#E91E63', NULL, 'A', '2024-10-11', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(3, 1055, NULL, 'FUNLEC(remoto)', '2024-10-09 19:00:00', NULL, NULL, '2024-10-09 22:00:00', '#4CAF50', '<ul><li>Baixas 2025</li></ul>', 'A', '2024-10-09', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 1056, NULL, 'FUNLEC', '2024-10-10 07:30:00', NULL, NULL, '2024-10-10 17:30:00', '#4CAF50', '<ul><li>Matriculas 2025</li></ul>', 'A', '2024-10-10', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL);
INSERT INTO `agendamento` (`contrato_id`, `id`, `profissional_id`, `descricao`, `horario_inicial`, `intervalo_inicial`, `intervalo_final`, `horario_final`, `cor`, `observacao`, `tipo`, `data_agenda`, `hora_inicio`, `hora_fim`, `hora_intervalo_inicial`, `hora_intervalo_final`, `hora_total`, `local`) VALUES
(3, 1057, NULL, 'FUNLEC', '2024-10-14 07:30:00', NULL, NULL, '2024-10-14 11:30:00', '#4CAF50', '<ul><li>Nova Api Titulos</li></ul>', 'A', '2024-10-14', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 1058, NULL, 'RCG', '2024-10-14 12:00:00', NULL, NULL, '2024-10-14 18:00:00', '#00BCD4', NULL, 'A', '2024-10-14', '12:00:00', '18:00:00', '00:00:00', '00:00:00', '06:00:00', NULL),
(5, 1059, NULL, 'RCG', '2024-10-15 08:00:00', NULL, NULL, '2024-10-15 18:00:00', '#00BCD4', NULL, 'A', '2024-10-15', '08:00:00', '18:00:00', '12:00:00', '13:30:00', '08:30:00', NULL),
(3, 1060, 1, 'FUNLEC(Remoto)', '2024-10-14 19:00:00', NULL, NULL, '2024-10-14 22:00:00', '#4CAF50', '<ul><li>Api Matricula</li></ul>', 'A', '2024-10-14', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 1061, NULL, 'FUNLEC(Remoto)', '2024-10-15 19:00:00', NULL, NULL, '2024-10-15 22:00:00', '#4CAF50', '<ul><li>Api Matricula</li></ul>', 'A', '2024-10-15', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 1062, NULL, 'MSGAS', '2024-10-16 07:30:00', NULL, NULL, '2024-10-16 17:30:00', '#2196F3', '<ul><li>API SCP</li></ul>', 'A', '2024-10-16', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(3, 1063, NULL, 'FUNLEC', '2024-10-17 07:30:00', NULL, NULL, '2024-10-17 17:30:00', '#4CAF50', '<ul><li>Contabilização RA 08/2024</li><li>Matriculas 2025</li></ul>', 'A', '2024-10-17', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(3, 1064, NULL, 'FUNLEC(Remoto)', '2024-10-16 19:00:00', NULL, NULL, '2024-10-16 22:00:00', '#4CAF50', '<ul><li>Atualização de Sistema</li></ul>', 'A', '2024-10-16', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 1065, NULL, 'FUNLEC', '2024-10-21 08:00:00', NULL, NULL, '2024-10-21 11:30:00', '#4CAF50', '<ul><li>Contabilização 08/2024</li></ul>', 'A', '2024-10-21', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(5, 1066, NULL, 'RCG', '2024-10-18 08:00:00', NULL, NULL, '2024-10-18 17:30:00', '#00BCD4', NULL, 'A', '2024-10-18', '08:00:00', '17:30:00', '12:00:00', '13:00:00', '08:30:00', NULL),
(5, 1067, NULL, 'RCG', '2024-10-21 13:00:00', NULL, NULL, '2024-10-21 18:00:00', '#00BCD4', NULL, 'A', '2024-10-21', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 1068, NULL, 'RCG', '2024-10-22 08:00:00', NULL, NULL, '2024-10-22 18:00:00', '#00BCD4', NULL, 'A', '2024-10-22', '08:00:00', '18:00:00', '12:00:00', '13:30:00', '08:30:00', NULL),
(3, 1069, NULL, 'FUNLEC', '2024-10-21 19:00:00', NULL, NULL, '2024-10-21 21:00:00', '#4CAF50', '<ul><li>Matricula 2025</li></ul>', 'A', '2024-10-21', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 1070, NULL, 'FUNLEC(Remoto)', '2024-10-22 09:00:00', NULL, NULL, '2024-10-22 14:00:00', '#4CAF50', '<ul><li>Contabilização 08/2024</li></ul>', 'A', '2024-10-22', '09:00:00', '14:00:00', '12:00:00', '13:30:00', '03:30:00', NULL),
(4, 1071, 1, 'MSGAS', '2024-10-23 07:30:00', NULL, NULL, '2024-10-23 17:30:00', '#2196F3', '<ul><li>API de Solicitação ao Armazem</li></ul>', 'A', '2024-10-23', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(3, 1072, NULL, 'FUNLEC(Remoto)', '2024-10-23 19:00:00', NULL, NULL, '2024-10-23 22:00:00', '#4CAF50', '<ul><li>Contabilização de Reversão de Adiantamento</li></ul>', 'A', '2024-10-23', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 1073, NULL, 'FUNLEC(Remoto)', '2024-10-22 19:00:00', NULL, NULL, '2024-10-22 21:00:00', '#4CAF50', '<ul><li>Ajuste de Recebimento via desconto em Folha</li></ul>', 'A', '2024-10-22', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 1074, NULL, 'FUNLEC', '2024-10-24 08:00:00', NULL, NULL, '2024-10-24 17:30:00', '#4CAF50', '<ul><li>Nova Api Títulos</li></ul>', 'A', '2024-10-24', '08:00:00', '17:30:00', '12:00:00', '13:00:00', '08:30:00', NULL),
(5, 1075, NULL, 'RCG', '2024-10-25 08:00:00', NULL, NULL, '2024-10-25 18:00:00', '#00BCD4', NULL, 'A', '2024-10-25', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(3, 1076, NULL, 'FUNLEC', '2024-10-28 07:30:00', NULL, NULL, '2024-10-28 11:30:00', '#4CAF50', '<ul><li>Contabilização de Reversão de Adiantamento 09/2024</li></ul>', 'A', '2024-10-28', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 1077, NULL, 'RCG', '2024-10-28 12:00:00', NULL, NULL, '2024-10-28 18:00:00', '#00BCD4', NULL, 'A', '2024-10-28', '12:00:00', '18:00:00', '00:00:00', '00:00:00', '06:00:00', NULL),
(5, 1078, NULL, 'RCG', '2024-10-29 08:00:00', NULL, NULL, '2024-10-29 18:00:00', '#00BCD4', NULL, 'A', '2024-10-29', '08:00:00', '18:00:00', '12:00:00', '13:30:00', '08:30:00', NULL),
(4, 1079, NULL, 'MSGAS', '2024-10-29 14:00:00', NULL, NULL, '2024-10-29 17:00:00', '#2196F3', '<ul><li>API SA - Documentos</li></ul>', 'A', '2024-10-29', '14:00:00', '17:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 1080, NULL, 'FUNLEC', '2024-10-28 19:00:00', NULL, NULL, '2024-10-28 21:00:00', '#4CAF50', '<ul><li>Matricula e Antecipação 2025</li></ul>', 'A', '2024-10-28', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 1081, NULL, 'FUNLEC', '2024-10-29 09:00:00', NULL, NULL, '2024-10-29 11:00:00', '#4CAF50', '<ul><li>Matricula e Antecipação 2025</li></ul>', 'A', '2024-10-29', '09:00:00', '11:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(4, 1082, NULL, 'MSGAS', '2024-10-30 08:40:00', NULL, NULL, '2024-10-30 17:30:00', '#2196F3', '<ul><li>API Solicitação Armazém - Documento</li><li>API Solicitação Armazém - Validações</li></ul>', 'A', '2024-10-30', '08:40:00', '17:30:00', '11:30:00', '13:00:00', '07:20:00', NULL),
(3, 1083, NULL, 'FUNLEC', '2024-10-31 08:00:00', NULL, NULL, '2024-10-31 14:30:00', '#4CAF50', '<ul><li>API Titulos</li></ul><p><br></p>', 'A', '2024-10-31', '08:00:00', '14:30:00', '11:30:00', '13:00:00', '05:00:00', NULL),
(5, 1084, NULL, 'RCG', '2024-11-01 08:00:00', NULL, NULL, '2024-11-01 17:30:00', '#00BCD4', NULL, 'A', '2024-11-01', '08:00:00', '17:30:00', '12:00:00', '13:30:00', '08:00:00', NULL),
(3, 1085, NULL, 'FUNLEC', '2024-10-03 08:00:00', NULL, NULL, '2024-10-03 17:30:00', '#4CAF50', '<ul><li>Contabilização PD</li></ul>', 'A', '2024-10-03', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(5, 1086, NULL, 'RCG', '2024-10-04 08:00:00', NULL, NULL, '2024-10-04 18:00:00', '#00BCD4', NULL, 'A', '2024-10-04', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(3, 1087, NULL, 'FUNLEC', '2024-11-04 07:30:00', NULL, NULL, '2024-11-04 11:30:00', '#4CAF50', '<ul><li>API Titulos a Receber</li></ul>', 'A', '2024-11-04', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(4, 1088, NULL, 'MSGAS', '2024-11-06 08:00:00', NULL, NULL, '2024-11-06 17:30:00', '#2196F3', '<ul><li>API de SA</li></ul>', 'A', '2024-11-06', '08:00:00', '17:30:00', '11:30:00', '14:00:00', '07:00:00', NULL),
(5, 1089, NULL, 'RCG', '2024-11-04 13:00:00', NULL, NULL, '2024-11-04 18:00:00', '#00BCD4', NULL, 'A', '2024-11-04', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 1090, NULL, 'RCG', '2024-11-05 07:30:00', NULL, NULL, '2024-11-05 18:00:00', '#00BCD4', NULL, 'A', '2024-11-05', '07:30:00', '18:00:00', '12:00:00', '14:00:00', '08:30:00', NULL),
(3, 1091, NULL, 'FUNLEC', '2024-11-07 07:30:00', NULL, NULL, '2024-11-07 17:30:00', '#4CAF50', '<ul><li>Contabilização de Títulos</li><li>Ajuste de Desconto Funlec em títulos</li><li>API de Inclusão de Titulo</li></ul>', 'A', '2024-11-07', '07:30:00', '17:30:00', '11:30:00', '13:20:00', '08:10:00', NULL),
(5, 1092, NULL, 'RCG', '2024-11-12 08:00:00', NULL, NULL, '2024-11-12 17:00:00', '#00BCD4', NULL, 'A', '2024-11-12', '08:00:00', '17:00:00', '12:00:00', '13:10:00', '07:50:00', NULL),
(5, 1093, NULL, 'RCG', '2024-11-08 08:00:00', NULL, NULL, '2024-11-08 18:00:00', '#00BCD4', NULL, 'A', '2024-11-08', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(5, 1094, NULL, 'RCG', '2024-11-11 12:00:00', NULL, NULL, '2024-11-11 18:00:00', '#00BCD4', NULL, 'A', '2024-11-11', '12:00:00', '18:00:00', '00:00:00', '00:00:00', '06:00:00', NULL),
(3, 1095, NULL, 'FUNLEC', '2024-11-11 07:30:00', NULL, NULL, '2024-11-11 11:30:00', '#4CAF50', '<ul><li>Api titulos</li></ul>', 'A', '2024-11-11', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(4, 1096, NULL, 'MSGAS', '2024-11-13 08:00:00', NULL, NULL, '2024-11-13 16:00:00', '#2196F3', '<ul><li>Reunião TOTVS referente a CloudTotvs</li><li>API de Saldo Estoque</li><li>API de Financeiro</li></ul>', 'A', '2024-11-13', '08:00:00', '16:00:00', '11:30:00', '13:30:00', '06:00:00', NULL),
(5, 1097, NULL, 'RCG(Remoto)', '2024-11-12 17:30:00', NULL, NULL, '2024-11-12 19:30:00', '#00BCD4', '<ul><li>ChatPro</li></ul>', 'A', '2024-11-12', '17:30:00', '19:30:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(5, 1098, NULL, 'RCG(Remoto)', '2024-11-13 17:30:00', NULL, NULL, '2024-11-13 19:00:00', '#00BCD4', '<ul><li>ChatPro</li></ul>', 'A', '2024-11-13', '17:30:00', '19:00:00', '00:00:00', '00:00:00', '01:30:00', NULL),
(5, 1099, NULL, 'RCG', '2024-11-18 08:00:00', NULL, NULL, '2024-11-18 18:00:00', '#00BCD4', NULL, 'A', '2024-11-18', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(4, 1100, NULL, 'MSGAS', '2024-11-19 08:00:00', NULL, NULL, '2024-11-19 17:30:00', '#2196F3', '<ul><li>API TITULOS</li></ul>', 'A', '2024-11-19', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(NULL, 1101, NULL, 'FERIADO', '2024-11-20 08:00:00', NULL, NULL, '2024-11-20 18:00:00', '#E91E63', NULL, 'A', '2024-11-20', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(3, 1102, NULL, 'FUNLEC', '2024-11-21 08:00:00', NULL, NULL, '2024-11-21 17:30:00', '#4CAF50', '<ul><li>Importação Ativo Fixo</li></ul>', 'A', '2024-11-21', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(5, 1103, NULL, 'RCG', '2024-11-22 08:00:00', NULL, NULL, '2024-11-22 18:00:00', '#00BCD4', NULL, 'A', '2024-11-22', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(3, 1104, NULL, 'FUNLEC', '2024-11-14 08:00:00', NULL, NULL, '2024-11-14 17:30:00', '#4CAF50', '<ul><li>Contabilização de Empréstimo&nbsp;</li></ul>', 'A', '2024-11-14', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(NULL, 1105, NULL, 'feriado', '2024-11-15 08:00:00', NULL, NULL, '2024-11-15 18:00:00', '#E91E63', NULL, 'A', '2024-11-15', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(NULL, 1106, NULL, 'Ferias', '2024-12-28 08:00:00', NULL, NULL, '2024-12-28 18:00:00', '#3a87ad', NULL, 'A', '2024-12-28', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(NULL, 1107, NULL, 'FERIAS', '2024-12-29 08:00:00', NULL, NULL, '2024-12-29 18:00:00', '#3a87ad', NULL, 'A', '2024-12-29', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(NULL, 1108, NULL, 'FERIAS', '2024-12-30 08:00:00', NULL, NULL, '2024-12-30 18:00:00', '#3a87ad', NULL, 'A', '2024-12-30', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(NULL, 1109, NULL, 'FERIAS', '2024-12-31 08:00:00', NULL, NULL, '2024-12-31 18:00:00', '#3a87ad', NULL, 'A', '2024-12-31', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(NULL, 1110, NULL, 'FERIAS', '2025-01-01 08:00:00', NULL, NULL, '2025-01-01 18:00:00', '#3a87ad', NULL, 'A', '2025-01-01', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(NULL, 1111, NULL, 'FERIAS', '2025-01-02 08:00:00', NULL, NULL, '2025-01-02 18:00:00', '#3a87ad', NULL, 'A', '2025-01-02', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(NULL, 1112, NULL, 'FERIAS', '2025-01-03 08:00:00', NULL, NULL, '2025-01-03 18:00:00', '#3a87ad', NULL, 'A', '2025-01-03', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(NULL, 1113, NULL, 'FERIAS', '2025-01-04 08:00:00', NULL, NULL, '2025-01-04 18:00:00', '#3a87ad', NULL, 'A', '2025-01-04', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(NULL, 1114, NULL, 'FERIAS', '2025-01-05 08:00:00', NULL, NULL, '2025-01-05 18:00:00', '#3a87ad', NULL, 'A', '2025-01-05', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(3, 1115, NULL, 'FUNLEC', '2024-11-25 08:00:00', NULL, NULL, '2024-11-25 11:30:00', '#4CAF50', '<ul><li>API de Titulos</li></ul>', 'A', '2024-11-25', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(5, 1116, NULL, 'RCG', '2024-11-26 08:00:00', NULL, NULL, '2024-11-26 18:00:00', '#00BCD4', NULL, 'A', '2024-11-26', '08:00:00', '18:00:00', '12:30:00', '13:00:00', '09:30:00', NULL),
(6, 1117, NULL, 'GUATOS', '2024-11-26 16:00:00', NULL, NULL, '2024-11-26 18:00:00', '#FFC107', '<ul><li>Consulta de NFS-e&nbsp;</li><li>Cancelamento de NFS-e&nbsp;046860&nbsp;&nbsp;</li></ul>', 'A', '2024-11-26', '16:00:00', '18:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(5, 1118, NULL, 'RCG', '2024-11-25 13:00:00', NULL, NULL, '2024-11-25 18:00:00', '#00BCD4', NULL, 'A', '2024-11-25', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(4, 1119, NULL, 'MSGAS', '2024-11-27 08:00:00', NULL, NULL, '2024-11-27 17:30:00', '#2196F3', '<ul><li>Api TITULOS</li></ul>', 'A', '2024-11-27', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(3, 1120, NULL, 'FUNLEC', '2024-11-28 08:00:00', NULL, NULL, '2024-11-28 17:30:00', '#4CAF50', '<ul><li>API de Titulos</li></ul>', 'A', '2024-11-28', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(3, 1121, NULL, 'FUNLEC', '2024-12-02 08:00:00', NULL, NULL, '2024-12-02 12:00:00', '#4CAF50', '<ul><li>Contabilização 10/2024</li><li>Reunião Ativo Fixo</li><li>Atualização Sistema</li></ul>', 'A', '2024-12-02', '08:00:00', '12:00:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(4, 1122, NULL, 'MSGAS(Remoto)', '2024-12-02 12:00:00', NULL, NULL, '2024-12-02 13:00:00', '#2196F3', '<ul><li>Atualização DEV</li></ul>', 'A', '2024-12-02', '12:00:00', '13:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(5, 1123, NULL, 'RCG', '2024-12-02 13:00:00', NULL, NULL, '2024-12-02 18:00:00', '#00BCD4', NULL, 'A', '2024-12-02', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(4, 1124, NULL, 'MSGAS(Remoto)', '2024-12-02 19:00:00', NULL, NULL, '2024-12-02 20:00:00', '#2196F3', '<ul><li>Atualização RH</li></ul>', 'A', '2024-12-02', '19:00:00', '20:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(3, 1125, NULL, 'FUNLEC(remoto)', '2024-12-02 19:00:00', NULL, NULL, '2024-12-02 23:00:00', '#4CAF50', '<ul><li>Contabilização 10/2024</li></ul>', 'A', '2024-12-02', '19:00:00', '23:00:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 1126, NULL, 'RCG', '2024-12-03 08:00:00', NULL, NULL, '2024-12-03 18:30:00', '#00BCD4', NULL, 'A', '2024-12-03', '08:00:00', '18:30:00', '11:00:00', '13:00:00', '08:30:00', NULL),
(4, 1127, NULL, 'MSGAS', '2024-12-04 08:00:00', NULL, NULL, '2024-12-04 17:30:00', '#2196F3', '<ul><li>API Contratos</li></ul>', 'A', '2024-12-04', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(4, 1128, NULL, 'MSGAS(Remoto)', '2024-12-03 19:00:00', NULL, NULL, '2024-12-03 20:30:00', '#2196F3', '<ul><li>Atualização DEV</li></ul>', 'A', '2024-12-03', '19:00:00', '20:30:00', '00:00:00', '00:00:00', '01:30:00', NULL),
(3, 1129, NULL, 'FUNLEC', '2024-12-05 08:00:00', NULL, NULL, '2024-12-05 17:30:00', '#4CAF50', '<ul><li><li>Atendimento de Chamado WRH-EXX-BT15</li><li>Atendimento de Chamado B34-24N-84SB</li></li></ul>', 'A', '2024-12-05', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(5, 1130, NULL, 'RCG', '2024-12-06 08:00:00', NULL, NULL, '2024-12-06 18:00:00', '#00BCD4', NULL, 'A', '2024-12-06', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(3, 1131, NULL, 'FUNLEC', '2024-12-09 08:00:00', NULL, NULL, '2024-12-09 17:30:00', '#4CAF50', '<ul><li>API Financeiro</li><li>Reunião Ativo Fixo</li></ul>', 'A', '2024-12-09', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(3, 1132, NULL, 'FUNLEC', '2024-12-12 07:30:00', NULL, NULL, '2024-12-12 11:30:00', '#4CAF50', '<ul><li>Importação 23/10/24 a 24/10/24 (RA 60505 e RA 61762)</li></ul>', 'A', '2024-12-12', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 1133, NULL, 'RCG', '2024-12-12 13:00:00', NULL, NULL, '2024-12-12 18:00:00', '#00BCD4', NULL, 'A', '2024-12-12', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 1134, NULL, 'RCG', '2024-12-10 08:00:00', NULL, NULL, '2024-12-10 18:00:00', '#00BCD4', NULL, 'A', '2024-12-10', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(4, 1135, NULL, 'MSGAS', '2024-12-11 08:00:00', NULL, NULL, '2024-12-11 17:30:00', '#2196F3', '<ul><li>API Contratos</li></ul>', 'A', '2024-12-11', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(5, 1136, NULL, 'RCG', '2024-12-13 08:00:00', NULL, NULL, '2024-12-13 18:00:00', '#00BCD4', NULL, 'A', '2024-12-13', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(NULL, 1137, NULL, 'NATAL', '2024-12-25 08:00:00', NULL, NULL, '2024-12-25 18:00:00', '#F44336', NULL, 'A', '2024-12-25', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(3, 1138, NULL, 'FUNLEC(remoto)', '2024-12-11 12:00:00', NULL, NULL, '2024-12-11 13:00:00', '#4CAF50', '<ul><li>Atualização TAF</li></ul>', 'A', '2024-12-11', '12:00:00', '13:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(6, 1139, NULL, 'GUATOS(Remoto)', '2024-12-12 11:00:00', NULL, NULL, '2024-12-12 11:30:00', '#FFC107', '<ul><li>Trocar de Certificado Appserver</li></ul>', 'A', '2024-12-12', '11:00:00', '11:30:00', '00:00:00', '00:00:00', '00:30:00', NULL),
(3, 1140, NULL, 'FUNLEC(Remoto)', '2024-12-13 14:00:00', NULL, NULL, '2024-12-13 16:00:00', '#4CAF50', '<ul><li>Contabilização 10/2024</li></ul>', 'A', '2024-12-13', '14:00:00', '16:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 1141, NULL, 'FUNLEC', '2024-12-16 08:00:00', NULL, NULL, '2024-12-16 11:30:00', '#4CAF50', '<ul><li>Contabilidade 10/2024</li><li>APi Titulos</li></ul>', 'A', '2024-12-16', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(5, 1142, NULL, 'RCG', '2024-12-16 13:00:00', NULL, NULL, '2024-12-16 18:00:00', '#00BCD4', NULL, 'A', '2024-12-16', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 1143, NULL, 'RCG', '2024-12-17 08:00:00', NULL, NULL, '2024-12-17 18:00:00', '#00BCD4', NULL, 'A', '2024-12-17', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(4, 1144, NULL, 'MSGAS', '2024-12-18 08:00:00', NULL, NULL, '2024-12-18 17:30:00', '#2196F3', '<ul><li>Ajuste API_SE1&nbsp;</li><li>Integração Sistema&nbsp;e-SFINGE</li></ul>', 'A', '2024-12-18', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(5, 1145, NULL, 'RCG', '2024-12-16 19:00:00', NULL, NULL, '2024-12-16 22:00:00', '#00BCD4', NULL, 'A', '2024-12-16', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 1146, NULL, 'FUNLEC', '2024-12-16 13:00:00', NULL, NULL, '2024-12-16 16:00:00', '#4CAF50', '<ul><li>Ajuste SE5</li></ul>', 'A', '2024-12-16', '13:00:00', '16:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 1147, NULL, 'MSGAS', '2024-12-23 08:00:00', NULL, NULL, '2024-12-23 17:30:00', '#2196F3', '<ul><li>Ajuste API_SE1&nbsp;</li><li>Integração Sistema e-SFINGE</li><li>Atualização TAF ambiente DEV</li></ul>', 'A', '2024-12-23', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(5, 1148, NULL, 'RCG', '2024-12-24 08:00:00', NULL, NULL, '2024-12-24 17:00:00', '#00BCD4', NULL, 'A', '2024-12-24', '08:00:00', '17:00:00', '12:00:00', '13:00:00', '08:00:00', NULL),
(5, 1149, NULL, 'RCG', '2024-12-26 08:00:00', NULL, NULL, '2024-12-26 18:00:00', '#00BCD4', NULL, 'A', '2024-12-26', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(3, 1150, NULL, 'FUNLEC', '2024-12-27 08:00:00', NULL, NULL, '2024-12-27 17:30:00', '#4CAF50', NULL, 'A', '2024-12-27', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(4, 1151, NULL, 'MSGAS(Remoto)', '2024-12-13 10:00:00', NULL, NULL, '2024-12-13 11:00:00', '#2196F3', '<ul><li><li>Ajuste API_SE1&nbsp;</li></li></ul>', 'A', '2024-12-13', '10:00:00', '11:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(3, 1152, NULL, 'FUNLEC', '2024-12-19 08:00:00', NULL, NULL, '2024-12-19 17:30:00', '#4CAF50', '<ul><li>Contabilização Movimento Bancário</li><li>API Recebimentos</li></ul>', 'A', '2024-12-19', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(3, 1153, NULL, 'FUNLEC(Remoto)', '2024-12-19 20:00:00', NULL, NULL, '2024-12-19 22:00:00', '#4CAF50', '<ul><li>Atualização E-Social</li></ul>', 'A', '2024-12-19', '20:00:00', '22:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 1154, NULL, 'FUNLEC', '2024-12-17 10:00:00', NULL, NULL, '2024-12-17 11:40:00', '#4CAF50', '<ul><li>Exclusão em Lote</li></ul>', 'A', '2024-12-17', '10:00:00', '11:40:00', '00:00:00', '00:00:00', '01:40:00', NULL),
(5, 1156, NULL, 'RCG', '2024-12-20 08:00:00', NULL, NULL, '2024-12-20 18:00:00', '#00BCD4', NULL, 'A', '2024-12-20', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(5, 1157, NULL, 'RCG(Remoto)', '2024-12-21 09:00:00', NULL, NULL, '2024-12-21 12:00:00', '#00BCD4', '<ul><li>Atualização Sistema</li></ul>', 'A', '2024-12-21', '09:00:00', '12:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 1158, NULL, 'FUNLEC', '2025-01-06 08:00:00', NULL, NULL, '2025-01-06 11:30:00', '#4CAF50', '<ul><li>Baixa Titulos 2025</li></ul>', 'A', '2025-01-06', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(5, 1159, NULL, 'RCG', '2025-01-06 13:00:00', NULL, NULL, '2025-01-06 18:00:00', '#00BCD4', NULL, 'A', '2025-01-06', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 1160, NULL, 'RCG', '2025-01-07 08:30:00', NULL, NULL, '2025-01-07 18:00:00', '#00BCD4', NULL, 'A', '2025-01-07', '08:30:00', '18:00:00', '12:00:00', '13:00:00', '08:30:00', NULL),
(4, 1161, NULL, 'MSGAS(Remoto)', '2025-01-07 10:00:00', NULL, NULL, '2025-01-07 16:00:00', '#2196F3', '<ul><li>Ajuste&nbsp; Cancelamento Api SZA</li></ul>', 'A', '2025-01-07', '10:00:00', '16:00:00', '11:30:00', '13:30:00', '04:00:00', NULL),
(4, 1162, NULL, 'MSGAS', '2025-01-08 08:00:00', NULL, NULL, '2025-01-08 17:30:00', '#2196F3', '<ul><li>API SCP</li></ul>', 'A', '2025-01-08', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(3, 1163, NULL, 'FUNLEC', '2025-01-09 08:00:00', NULL, NULL, '2025-01-09 19:00:00', '#4CAF50', '<ul><li>Contabilidade 11/2024</li><li>API SE1</li><li>Fechamento Folha 12/2024(PIS Empresa)</li></ul>', 'A', '2025-01-09', '08:00:00', '19:00:00', '11:30:00', '13:00:00', '09:30:00', NULL),
(4, 1164, NULL, 'MSGAS', '2025-01-09 20:00:00', NULL, NULL, '2025-01-09 22:00:00', '#2196F3', '<ul><li>API de Saldos</li></ul>', 'A', '2025-01-09', '20:00:00', '22:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(4, 1165, NULL, 'MSGAS', '2025-01-10 09:00:00', NULL, NULL, '2025-01-10 10:30:00', '#2196F3', '<ul><li>Ajuste de Saldo Api SZA</li></ul>', 'A', '2025-01-10', '09:00:00', '10:30:00', '00:00:00', '00:00:00', '01:30:00', NULL),
(5, 1166, NULL, 'RCG', '2025-01-10 08:00:00', NULL, NULL, '2025-01-10 18:00:00', '#00BCD4', NULL, 'A', '2025-01-10', '08:00:00', '18:00:00', '14:00:00', '15:30:00', '08:30:00', NULL),
(3, 1167, NULL, 'FUNLEC', '2025-01-13 08:00:00', NULL, NULL, '2025-01-13 11:30:00', '#4CAF50', '<ul><li>API Baixas</li></ul>', 'A', '2025-01-13', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(3, 1168, NULL, 'FUNLEC(Remoto)', '2025-01-14 09:00:00', NULL, NULL, '2025-01-14 13:45:00', '#4CAF50', '<ul><li>Importação de Ativos</li></ul>', 'A', '2025-01-14', '09:00:00', '13:45:00', '11:30:00', '13:00:00', '03:15:00', NULL),
(5, 1169, NULL, 'RCG', '2025-01-14 08:30:00', NULL, NULL, '2025-01-14 18:00:00', '#00BCD4', NULL, 'A', '2025-01-14', '08:30:00', '18:00:00', '12:00:00', '13:15:00', '08:15:00', NULL),
(5, 1170, NULL, 'RCG', '2025-01-13 13:00:00', NULL, NULL, '2025-01-13 18:00:00', '#00BCD4', NULL, 'A', '2025-01-13', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(4, 1171, NULL, 'MSGAS(Remoto)', '2025-01-14 19:00:00', NULL, NULL, '2025-01-14 22:00:00', '#2196F3', '<ul><li>Atualização RH</li><li>Atualização TAF</li></ul>', 'A', '2025-01-14', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 1172, NULL, 'FUNLEC(Remoto)', '2025-01-15 19:00:00', NULL, NULL, '2025-01-15 22:00:00', '#4CAF50', '<ul><li>Atualização RH</li><li>Atualização TAF</li><li>Atualização BackOffice</li><li>Atualização Servidor de Licenças</li></ul>', 'A', '2025-01-15', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 1173, NULL, 'MSGAS', '2025-01-15 08:00:00', NULL, NULL, '2025-01-15 17:30:00', '#2196F3', '<ul><li>API Solicitação de Compras</li><li>Integração Sistema e Sfinge</li></ul>', 'A', '2025-01-15', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(3, 1174, NULL, 'FUNLEC', '2025-01-16 08:00:00', NULL, NULL, '2025-01-16 18:00:00', '#4CAF50', '<ul><li>Contabilização de Empréstimos</li><li>Api de Titulos</li></ul>', 'A', '2025-01-16', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(5, 1175, NULL, 'RCG', '2025-01-17 08:00:00', NULL, NULL, '2025-01-17 17:30:00', '#00BCD4', NULL, 'A', '2025-01-17', '08:00:00', '17:30:00', '12:00:00', '13:00:00', '08:30:00', NULL),
(3, 1176, NULL, 'FUNLEC', '2025-01-20 08:00:00', NULL, NULL, '2025-01-20 17:30:00', '#4CAF50', '<ul><li>Api Títulos</li><li>Reunião Bradesco</li></ul>', 'A', '2025-01-20', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(3, 1177, NULL, 'FUNLEC', '2025-01-23 08:00:00', NULL, NULL, '2025-01-23 11:30:00', '#4CAF50', '<ul><li>API SE1</li></ul>', 'A', '2025-01-23', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(5, 1178, NULL, 'RCG', '2025-01-21 08:00:00', NULL, NULL, '2025-01-21 18:00:00', '#00BCD4', NULL, 'A', '2025-01-21', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(4, 1179, NULL, 'MSGAS', '2025-01-22 08:00:00', NULL, NULL, '2025-01-22 17:30:00', '#2196F3', '<ul><li>JOB API SCP</li></ul>', 'A', '2025-01-22', '08:00:00', '17:30:00', '11:30:00', '13:30:00', '07:30:00', NULL),
(5, 1180, NULL, 'RCG', '2025-01-23 13:00:00', NULL, NULL, '2025-01-23 18:00:00', '#00BCD4', NULL, 'A', '2025-01-23', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 1181, NULL, 'RCG', '2025-01-24 08:00:00', NULL, NULL, '2025-01-24 18:00:00', '#00BCD4', NULL, 'A', '2025-01-24', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(3, 1182, NULL, 'FUNLEC', '2025-01-27 08:00:00', NULL, NULL, '2025-01-27 11:45:00', '#4CAF50', '<ul><li>Estorno de RA Visa Net Conciliados</li></ul>', 'A', '2025-01-27', '08:00:00', '11:45:00', '00:00:00', '00:00:00', '03:45:00', NULL),
(4, 1183, NULL, 'MSGAS', '2025-01-28 19:00:00', NULL, NULL, '2025-01-28 20:00:00', '#2196F3', '<ul><li>Atualização DIRF (PACOTE_DE_CORRECAO_21482765_DSERFIS1-36637_12.1.2310)</li></ul>', 'A', '2025-01-28', '19:00:00', '20:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(5, 1184, NULL, 'RCG', '2025-01-27 13:00:00', NULL, NULL, '2025-01-27 18:00:00', '#00BCD4', NULL, 'A', '2025-01-27', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 1185, NULL, 'RCG', '2025-01-28 08:00:00', NULL, NULL, '2025-01-28 18:00:00', '#00BCD4', NULL, 'A', '2025-01-28', '08:00:00', '18:00:00', '11:00:00', '13:00:00', '08:00:00', NULL),
(4, 1186, NULL, 'MSGAS', '2025-01-29 08:00:00', NULL, NULL, '2025-01-29 17:30:00', '#2196F3', '<ul><li>Api Detalhes Parcelamentos</li></ul>', 'A', '2025-01-29', '08:00:00', '17:30:00', '10:30:00', '13:00:00', '07:00:00', NULL),
(3, 1187, NULL, 'FUNLEC', '2025-01-30 08:00:00', NULL, NULL, '2025-01-30 17:30:00', '#4CAF50', '<ul><li>Reunião Totvs Transmite</li><li>API de Titulos</li></ul>', 'A', '2025-01-30', '08:00:00', '17:30:00', '10:30:00', '13:00:00', '07:00:00', NULL),
(3, 1188, NULL, 'FUNLEC(Remoto)', '2025-01-29 19:00:00', NULL, NULL, '2025-01-29 22:00:00', '#4CAF50', '<ul><li>Atualização Medicina</li><li>Atualização RH</li><li>Atualização BackOffice</li><li>Dirf</li></ul>', 'A', '2025-01-29', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(6, 1189, NULL, 'GUATOS', '2025-01-29 19:30:00', NULL, NULL, '2025-01-29 21:20:00', '#FFC107', '<ul><li>Acesso para verificação de Falha de conexão com banco</li></ul>', 'A', '2025-01-29', '19:30:00', '21:20:00', '00:00:00', '00:00:00', '01:50:00', NULL),
(6, 1190, NULL, 'GUATOS', '2025-01-16 18:40:00', NULL, NULL, '2025-01-16 21:30:00', '#FFC107', '<ul><li>Atualização de Sistema</li></ul>', 'A', '2025-01-16', '18:40:00', '21:30:00', '00:00:00', '00:00:00', '02:50:00', NULL),
(4, 1191, NULL, 'MSGAS', '2025-01-30 19:00:00', NULL, NULL, '2025-01-30 22:00:00', '#2196F3', '<ul><li>Atualização de Sistema</li></ul>', 'A', '2025-01-30', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 1192, NULL, 'RCG', '2025-01-30 19:00:00', NULL, NULL, '2025-01-30 20:00:00', '#00BCD4', '<ul><li>Atualização de Sistema</li></ul>', 'A', '2025-01-30', '19:00:00', '20:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(3, 1193, NULL, 'FUNLEC', '2025-01-30 20:00:00', NULL, NULL, '2025-01-30 21:00:00', '#4CAF50', '<ul><li>Atualização Folha</li></ul>', 'A', '2025-01-30', '20:00:00', '21:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(5, 1194, NULL, 'RCG', '2025-01-31 08:00:00', NULL, NULL, '2025-01-31 18:00:00', '#00BCD4', NULL, 'A', '2025-01-31', '08:00:00', '18:00:00', '10:30:00', '13:00:00', '07:30:00', NULL),
(4, 1195, NULL, 'MSGAS', '2025-01-31 08:30:00', NULL, NULL, '2025-01-31 10:30:00', '#2196F3', '<ul><li>Apoio pós atualização.</li></ul>', 'A', '2025-01-31', '08:30:00', '10:30:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 1196, 1, 'FUNLEC', '2025-01-22 19:00:00', NULL, NULL, '2025-01-22 22:00:00', '#4CAF50', '<ul><li>API Titulos</li></ul>', 'A', '2025-01-22', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 1197, NULL, 'FUNLEC', '2025-01-08 19:00:00', NULL, NULL, '2025-01-08 22:00:00', '#4CAF50', '<ul><li>API Titulo</li></ul>', 'A', '2025-01-08', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 1198, NULL, 'FUNLEC', '2025-02-03 08:00:00', NULL, NULL, '2025-02-03 11:30:00', '#4CAF50', '<ul><li>API Baixas</li></ul>', 'A', '2025-02-03', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(5, 1199, NULL, 'RCG(falta)', '2025-02-03 13:00:00', NULL, NULL, '2025-02-03 18:00:00', '#E91E63', NULL, 'A', '2025-02-03', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(10, 1200, NULL, 'H2L AVULSO', '2025-02-03 13:00:00', NULL, NULL, '2025-02-03 16:00:00', '#00BCD4', '<ul><li>Revisão de Lançamento Padrão<ul><li><li>610 044, 610 051, 610 046, 610 049, 610 058</li><li>610 059, 610 066, 610 067, 610 074, 610 075</li><li>610 076, 610 086, 610 089, 610 090, 610 101</li></li></ul></li></ul>', 'A', '2025-02-03', '13:00:00', '16:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 1201, NULL, 'RCG', '2025-02-04 08:00:00', NULL, NULL, '2025-02-04 18:00:00', '#00BCD4', NULL, 'A', '2025-02-04', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(3, 1202, NULL, 'FUNLEC', '2025-02-04 19:00:00', NULL, NULL, '2025-02-04 20:00:00', '#4CAF50', '<ul><li>Analise API de Baixa</li></ul>', 'A', '2025-02-04', '19:00:00', '20:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(4, 1203, NULL, 'MSGAS', '2025-02-05 07:30:00', NULL, NULL, '2025-02-05 17:30:00', '#2196F3', '<ul><li>API de Parcelamento</li><li>Atualização de BASE DEV<ul><li>DbAccess</li><li>SmartClient WEB</li><li>WebAgent</li></ul></li></ul>', 'A', '2025-02-05', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(3, 1204, NULL, 'FUNLEC', '2025-02-06 07:30:00', NULL, NULL, '2025-02-06 17:30:00', '#4CAF50', '<ul><li>API Baixas</li></ul>', 'A', '2025-02-06', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(4, 1205, NULL, 'MSGAS', '2025-02-05 19:00:00', NULL, NULL, '2025-02-05 21:00:00', '#2196F3', '<ul><li>Atualização DBACCESS</li><li>Instalação SmartClientWEB</li><li>WebAgent</li></ul>', 'A', '2025-02-05', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(5, 1206, NULL, 'RCG', '2025-02-07 08:30:00', NULL, NULL, '2025-02-07 17:30:00', '#00BCD4', NULL, 'A', '2025-02-07', '08:30:00', '17:30:00', '12:00:00', '13:00:00', '08:00:00', NULL),
(3, 1207, NULL, 'FUNLEC', '2025-02-10 08:00:00', NULL, NULL, '2025-02-10 11:30:00', '#4CAF50', '<ul><li>Baixa de Titulos RA em aberto</li></ul>', 'A', '2025-02-10', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(5, 1208, NULL, 'RCG', '2025-02-10 13:00:00', NULL, NULL, '2025-02-10 18:00:00', '#00BCD4', NULL, 'A', '2025-02-10', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(3, 1209, NULL, 'FUNLEC', '2025-02-10 14:00:00', NULL, NULL, '2025-02-10 16:00:00', '#4CAF50', '<ul><li>Baixa de Títulos RA</li></ul>', 'A', '2025-02-10', '14:00:00', '16:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 1210, NULL, 'FUNLEC', '2025-02-06 19:00:00', NULL, NULL, '2025-02-06 21:00:00', '#4CAF50', '<ul><li>Lançamento TAF(E-Social) de plano de Saúde para funcionários sem Plano de Saúde cadastrado pelo GPE</li></ul>', 'A', '2025-02-06', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(5, 1211, NULL, 'RCG', '2025-02-11 08:00:00', NULL, NULL, '2025-02-11 19:00:00', '#00BCD4', NULL, 'A', '2025-02-11', '08:00:00', '19:00:00', '12:00:00', '14:00:00', '09:00:00', NULL),
(4, 1212, NULL, 'MSGAS', '2025-02-11 19:00:00', NULL, NULL, '2025-02-11 22:00:00', '#2196F3', '<ul><li>Atualização Sistema</li></ul>', 'A', '2025-02-11', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 1213, NULL, 'MSGAS', '2025-02-12 08:30:00', NULL, NULL, '2025-02-12 17:30:00', '#2196F3', '<ul><li>Eventos Contabeis - e-SFINGE - 2025- VERSÃO EMPRESAS PÚBLICAS</li></ul>', 'A', '2025-02-12', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(3, 1214, NULL, 'FUNLEC', '2025-02-12 19:00:00', NULL, NULL, '2025-02-12 22:00:00', '#4CAF50', '<ul><li>Conferencia de Geração de Titulos!</li></ul>', 'A', '2025-02-12', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 1215, NULL, 'FUNLEC', '2025-02-13 08:30:00', NULL, NULL, '2025-02-13 17:30:00', '#4CAF50', '<ul><li>Conferencia de Baixa dia 03/02</li><li>Conferencia de Geração de Titulos</li></ul>', 'A', '2025-02-13', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(5, 1216, NULL, 'RCG', '2025-02-14 08:00:00', NULL, NULL, '2025-02-14 18:00:00', '#00BCD4', NULL, 'A', '2025-02-14', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(4, 1217, NULL, 'MSGAS', '2025-02-28 08:00:00', NULL, NULL, '2025-02-28 17:30:00', '#2196F3', '<ul><li>Eventos Contábeis - e-SFINGE - 2025- VERSÃO EMPRESAS PÚBLICAS<ul><li>Api de Autenticação</li></ul></li></ul>', 'A', '2025-02-28', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(4, 1218, NULL, 'MSGAS', '2025-03-05 13:30:00', NULL, NULL, '2025-03-05 17:30:00', '#2196F3', '<ul><li>Suporte a Usuário</li><li>Integração Sistema e-Sfinge</li></ul>', 'A', '2025-03-05', '13:30:00', '17:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 1219, NULL, 'RCG', '2025-03-05 08:30:00', NULL, NULL, '2025-03-05 11:30:00', '#00BCD4', NULL, 'A', '2025-03-05', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(NULL, 1221, NULL, 'carnaval', '2025-03-03 08:00:00', NULL, NULL, '2025-03-03 18:00:00', '#E91E63', NULL, 'A', '2025-03-03', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(4, 1222, NULL, 'MSGAS', '2025-02-13 19:00:00', NULL, NULL, '2025-02-13 20:00:00', '#2196F3', '<ul><li>Atualização SPED Fiscal</li></ul>', 'A', '2025-02-13', '19:00:00', '20:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(3, 1223, NULL, 'FUNLEC', '2025-02-17 08:00:00', NULL, NULL, '2025-02-17 11:30:00', '#4CAF50', '<ul><li>Importação Ativo Fixo - 12/2024</li></ul>', 'A', '2025-02-17', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(3, 1224, NULL, 'FUNLEC', '2025-02-14 09:00:00', NULL, NULL, '2025-02-14 11:00:00', '#4CAF50', '<ul><li>Movimento caixas 03/02/2025</li></ul>', 'A', '2025-02-14', '09:00:00', '11:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(4, 1225, NULL, 'MSGAS', '2025-02-19 07:30:00', NULL, NULL, '2025-02-19 17:30:00', '#2196F3', '<ul><li>Eventos Contábeis - e-SFINGE - 2025- VERSÃO EMPRESAS PÚBLICAS</li></ul>', 'A', '2025-02-19', '07:30:00', '17:30:00', '11:30:00', '13:45:00', '07:45:00', NULL),
(4, 1226, NULL, 'MSGAS', '2025-02-17 13:30:00', NULL, NULL, '2025-02-17 17:00:00', '#2196F3', '<ul><li>Eventos Contábeis - e-SFINGE - 2025- VERSÃO EMPRESAS PÚBLICAS</li></ul>', 'A', '2025-02-17', '13:30:00', '17:00:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(4, 1227, NULL, 'MSGAS', '2025-02-18 13:30:00', NULL, NULL, '2025-02-18 17:00:00', '#2196F3', '<ul><li>Eventos Contábeis - e-SFINGE - 2025- VERSÃO EMPRESAS PÚBLICAS</li></ul>', 'A', '2025-02-18', '13:30:00', '17:00:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(5, 1228, NULL, 'RCG', '2025-02-17 13:00:00', NULL, NULL, '2025-02-17 18:00:00', '#00BCD4', NULL, 'A', '2025-02-17', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 1229, NULL, 'RCG', '2025-02-18 08:00:00', NULL, NULL, '2025-02-18 17:30:00', '#00BCD4', NULL, 'A', '2025-02-18', '08:00:00', '17:30:00', '11:20:00', '13:00:00', '07:50:00', NULL),
(3, 1230, NULL, 'FUNLEC', '2025-02-18 14:00:00', NULL, NULL, '2025-02-18 16:00:00', '#4CAF50', '<ul><li>Importação de Ativo Fixo - Produção</li></ul>', 'A', '2025-02-18', '14:00:00', '16:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 1231, NULL, 'FUNLEC', '2025-02-20 08:30:00', NULL, NULL, '2025-02-20 17:30:00', '#4CAF50', '<ul><li>Movimento Bancário - Escola RMS(Data de Credito e Data de Pagamento)</li><li>Conferencia de recebimentos antecipados(RA ME 01/2025)&nbsp;<ul><li>Ajuste em erros encontrados</li></ul></li><li>Conferencia de desconto em folha(ME 01/2025)<ul><li>Ajuste em erros encontrados</li></ul></li></ul>', 'A', '2025-02-20', '08:30:00', '17:30:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(NULL, 1232, NULL, 'Carnaval', '2025-03-04 08:00:00', NULL, NULL, '2025-03-04 18:00:00', '#E91E63', NULL, 'A', '2025-03-04', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(3, 1233, NULL, 'FUNLEC', '2025-02-24 08:00:00', NULL, NULL, '2025-02-24 11:30:00', '#4CAF50', '<ul><li>Ajuste em LP 520 - 039&nbsp;BAIXA - MD - DESCONTO</li><li>Analise ativo fixo</li></ul>', 'A', '2025-02-24', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(NULL, 1234, NULL, 'FALTA', '2025-02-24 13:00:00', NULL, NULL, '2025-02-24 18:00:00', '#E91E63', NULL, 'A', '2025-02-24', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 1235, NULL, 'RCG', '2025-02-25 08:00:00', NULL, NULL, '2025-02-25 18:00:00', '#00BCD4', NULL, 'A', '2025-02-25', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(5, 1236, NULL, 'RCG', '2025-02-26 08:00:00', NULL, NULL, '2025-02-26 18:00:00', '#00BCD4', NULL, 'A', '2025-02-26', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(3, 1237, NULL, 'FUNLEC', '2025-02-27 08:00:00', NULL, NULL, '2025-02-27 17:30:00', '#4CAF50', '<ul><li>Ajuste API Títulos - Movimento anterior a 2024</li><li>DIRF</li><li>Ajuste RGB<ul><li><span style=\"color: var(--text-color); font-family: var(--font-family); font-size: var(--font-size);\">729 - 07/01/2025</span></li><li><span style=\"color: var(--text-color); font-family: var(--font-family); font-size: var(--font-size);\">045719</span></li><li>102231</li><li>184704</li><li>069988</li><li>386622</li><li>902010</li><li>013612</li><li>736 - 07/01/2025</li><li>045719</li><li>102231</li><li>184704</li><li>069988</li><li>386622</li><li>902010</li></ul></li></ul>', 'A', '2025-02-27', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(4, 1238, NULL, 'MSGAS', '2025-02-25 13:30:00', NULL, NULL, '2025-02-25 17:00:00', '#2196F3', '<ul><li>Eventos Contábeis - e-SFINGE - 2025- VERSÃO EMPRESAS PÚBLICAS<ul><li>Api de Autenticação</li></ul></li></ul>', 'A', '2025-02-25', '13:30:00', '17:00:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(4, 1239, NULL, 'MSGAS', '2025-02-26 13:30:00', NULL, NULL, '2025-02-26 17:00:00', '#2196F3', '<ul><li>Eventos Contábeis - e-SFINGE - 2025- VERSÃO EMPRESAS PÚBLICAS<ul><li>Api de Autenticação</li></ul></li></ul>', 'A', '2025-02-26', '13:30:00', '17:00:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(5, 1240, NULL, 'RCG', '2025-02-21 08:00:00', NULL, NULL, '2025-02-21 17:30:00', '#00BCD4', NULL, 'A', '2025-02-21', '08:00:00', '17:30:00', '12:00:00', '13:00:00', '08:30:00', NULL),
(3, 1241, 1, 'FUNLEC(Remoto)', '2025-03-06 08:30:00', NULL, NULL, '2025-03-06 14:00:00', '#4CAF50', '<ul><li>Analise de Contabilização de NF&nbsp;000203362 Poliedro</li><li>Ajuste de Dicionário de Dados - Itens de Nota Fiscal de Entrada<ul><li>Incluída obrigatoriedade nos campos Conta Contábil e Centro de Custo</li></ul></li><li>API Exclusão de Títulos</li></ul>', 'A', '2025-03-06', '08:30:00', '14:00:00', '00:00:00', '00:00:00', '05:30:00', NULL),
(5, 1242, NULL, 'RCG(Falta)', '2025-03-07 08:00:00', NULL, NULL, '2025-03-07 18:00:00', '#F44336', NULL, 'A', '2025-03-07', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(3, 1243, NULL, 'FUNLEC', '2025-02-26 14:00:00', NULL, NULL, '2025-02-26 15:30:00', '#4CAF50', '<ul><li>Conferência DIRF.<ul><li>Demonstração de Ficha Financeira, Informe de Rendimentos e Recibo de Ferias</li></ul></li></ul>', 'A', '2025-02-26', '14:00:00', '15:30:00', '00:00:00', '00:00:00', '01:30:00', NULL),
(3, 1244, NULL, 'FUNLEC', '2025-02-25 19:00:00', NULL, NULL, '2025-02-25 21:00:00', '#4CAF50', '<ul style=\"color: rgb(134, 148, 176);\"><li>Ajustes em Títulos PM</li></ul>', 'A', '2025-02-25', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 1245, NULL, 'FUNLEC', '2025-03-06 15:00:00', NULL, NULL, '2025-03-06 17:30:00', '#4CAF50', '<ul><li>Conferencia de Títulos \"PM\"</li></ul>', 'A', '2025-03-06', '15:00:00', '17:30:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(5, 1246, NULL, 'RCG', '2025-03-10 13:00:00', NULL, NULL, '2025-03-10 18:00:00', '#00BCD4', NULL, 'A', '2025-03-10', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(3, 1247, NULL, 'FUNLEC', '2025-03-11 13:00:00', NULL, NULL, '2025-03-11 17:30:00', '#4CAF50', '<ul><li>Ajuste Folha de Pagamento mes 04/2024</li></ul>', 'A', '2025-03-11', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(3, 1248, NULL, 'FUNLEC(Remoto)', '2025-03-10 08:00:00', NULL, NULL, '2025-03-10 11:00:00', '#4CAF50', '<ul><li>Ajuste em recebimentos de Parcelamentos de Matricula (PM) de funcionários</li><li>Ajuste em recebimentos de Parcelamentos de Material Didático (M) de funcionários</li></ul>', 'A', '2025-03-10', '08:00:00', '11:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 1249, NULL, 'MSGAS', '2025-03-12 08:00:00', NULL, NULL, '2025-03-12 18:30:00', '#2196F3', '<ul><li>Ajuste API fatura/detalhes</li><li>Ajuste API fatura/titulos</li><li>Integração Sistema e-Sfinge</li></ul>', 'A', '2025-03-12', '08:00:00', '18:30:00', '11:30:00', '13:30:00', '08:30:00', NULL),
(3, 1250, NULL, 'FUNLEC(Remoto)', '2025-03-12 19:00:00', NULL, NULL, '2025-03-12 22:00:00', '#4CAF50', '<ul><li>Movimento Desconto em Folha 02/2025</li></ul>', 'A', '2025-03-12', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 1251, NULL, 'RCG', '2025-03-13 08:00:00', NULL, NULL, '2025-03-13 18:00:00', '#00BCD4', NULL, 'A', '2025-03-13', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(5, 1252, NULL, 'RCG', '2025-03-14 09:00:00', NULL, NULL, '2025-03-14 17:30:00', '#00BCD4', NULL, 'A', '2025-03-14', '09:00:00', '17:30:00', '12:30:00', '13:00:00', '08:00:00', NULL),
(4, 1253, NULL, 'MSGAS', '2025-03-17 07:30:00', NULL, NULL, '2025-03-17 11:30:00', '#2196F3', '<ul><li>Ajuste API fatura</li><li>Integração Sistema eSfinge</li></ul>', 'A', '2025-03-17', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(3, 1254, NULL, 'FUNLEC(Remoto)', '2025-03-13 19:00:00', NULL, NULL, '2025-03-13 22:00:00', '#4CAF50', '<ul><li>Analise e correção de Baixa desconto em Folha</li></ul>', 'A', '2025-03-13', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 1255, NULL, 'FUNLEC(Remoto)', '2025-03-14 10:00:00', NULL, NULL, '2025-03-14 17:00:00', '#4CAF50', '<ul><li>Solicitação Correção Importação - Erro Classe de Valor (RA Novos)</li><li>Solicitação Correção Importação (Item contábil de Mensalidade) e (Centro de Custo de Material Didático)</li><li>Conferência Desconto em Folha - Fev/25</li><li>Faltando baixa HJ - Boletos Bradesco 06/03/2025</li><li>ERRO NA CONCILIAÇÃO CEDESC -12/03/2025</li></ul>', 'A', '2025-03-14', '10:00:00', '17:00:00', '11:30:00', '13:00:00', '05:30:00', NULL),
(4, 1256, NULL, 'MSGAS', '2025-03-19 07:30:00', NULL, NULL, '2025-03-19 17:30:00', '#2196F3', '<ul><li>Integração Sistema eSfinge</li><li>Ajuste api(/fatura/titulos)</li></ul>', 'A', '2025-03-19', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(4, 1257, NULL, 'MSGAS', '2025-03-24 07:30:00', NULL, NULL, '2025-03-24 11:30:00', '#2196F3', '<ul><li>Integração Sistema eSfinge</li></ul>', 'A', '2025-03-24', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(4, 1258, NULL, 'MSGAS', '2025-03-26 07:30:00', NULL, NULL, '2025-03-26 17:30:00', '#2196F3', '<ul><li>API de Religação - Consulta situação</li><li>API de Religação - Solicitação</li></ul>', 'A', '2025-03-26', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(4, 1259, NULL, 'MSGAS', '2025-03-31 07:30:00', NULL, NULL, '2025-03-31 11:30:00', '#2196F3', '<ul><li>API de Religação - Consulta situação</li><li>API de Religação - Solicitação</li></ul>', 'A', '2025-03-31', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 1260, NULL, 'RCG', '2025-03-17 13:00:00', NULL, NULL, '2025-03-17 18:00:00', '#00BCD4', NULL, 'A', '2025-03-17', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 1261, NULL, 'RCG', '2025-03-18 08:30:00', NULL, NULL, '2025-03-18 18:00:00', '#00BCD4', NULL, 'A', '2025-03-18', '08:30:00', '18:00:00', '12:00:00', '13:00:00', '08:30:00', NULL),
(3, 1262, NULL, 'FUNLEC(Remoto)', '2025-03-17 14:30:00', NULL, NULL, '2025-03-17 16:30:00', '#4CAF50', '<ul><li>Conferência Desconto em Folha - Fev/25</li><li>Faltando baixa LMF - Boletos Bradesco 06/03/2025</li><li>ERRO NA CONCILIAÇÃO CEDESC -14/03/2025</li></ul>', 'A', '2025-03-17', '14:30:00', '16:30:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 1263, NULL, 'FUNLEC(Remoto)', '2025-03-18 14:00:00', NULL, NULL, '2025-03-18 16:00:00', '#4CAF50', '<ul><li>Conferência Desconto em Folha - Fev/25</li><li>Caixa 13/03/2025 - Erro na conciliação</li></ul>', 'A', '2025-03-18', '14:00:00', '16:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(6, 1264, NULL, 'GUATOS', '2025-03-19 19:00:00', NULL, NULL, '2025-03-19 20:35:00', '#FFC107', '<ul><li>Backup banco de Produção</li><li>Restauração em Banco Dev.</li><li>Eliminados registros apagado em Banco Dev.</li><li>Eliminados registros de LOG anteriores da 01/01/2021</li></ul>', 'A', '2025-03-19', '19:00:00', '20:35:00', '00:00:00', '00:00:00', '01:35:00', NULL),
(3, 1265, NULL, 'FUNLEC', '2025-03-20 08:00:00', NULL, NULL, '2025-03-20 17:30:00', '#4CAF50', '<ul><li>Apoio Contabilidade</li><li>Apoio Contas a Receber</li><li>Apoio Folha de Pagamento</li></ul>', 'A', '2025-03-20', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(5, 1266, NULL, 'RCG', '2025-03-21 08:00:00', NULL, NULL, '2025-03-21 17:00:00', '#00BCD4', NULL, 'A', '2025-03-21', '08:00:00', '17:00:00', '12:00:00', '13:00:00', '08:00:00', NULL),
(4, 1267, NULL, 'MSGAS', '2025-03-25 16:00:00', NULL, NULL, '2025-03-25 17:00:00', '#2196F3', '<ul><li>Ajuste API&nbsp;parcelamento</li></ul>', 'A', '2025-03-25', '16:00:00', '17:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(5, 1268, NULL, 'RCG', '2025-03-25 08:00:00', NULL, NULL, '2025-03-25 18:00:00', '#00BCD4', NULL, 'A', '2025-03-25', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(5, 1269, NULL, 'RCG', '2025-03-24 13:00:00', NULL, NULL, '2025-03-24 18:00:00', '#00BCD4', NULL, 'A', '2025-03-24', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(3, 1270, NULL, 'FUNLEC', '2025-03-27 07:30:00', NULL, NULL, '2025-03-27 17:30:00', '#4CAF50', '<ul><li>Ajustem e recebimentos ME com desconto em folha&nbsp;</li><li>Exportação de dados sistema Athenas</li></ul>', 'A', '2025-03-27', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(5, 1271, NULL, 'RCG', '2025-03-28 08:00:00', NULL, NULL, '2025-03-28 17:30:00', '#00BCD4', NULL, 'A', '2025-03-28', '08:00:00', '17:30:00', '12:00:00', '13:00:00', '08:30:00', NULL),
(NULL, 1272, NULL, 'MAXIMA', '2025-03-28 10:00:00', NULL, NULL, '2025-03-28 11:00:00', '#FF5722', NULL, 'A', '2025-03-28', '10:00:00', '11:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(4, 1273, NULL, 'MSGAS', '2025-03-27 19:00:00', NULL, NULL, '2025-03-27 22:00:00', '#2196F3', '<ul><li>API de Religação - Consulta situação</li><li>API de Religação - Solicitação</li></ul>', 'A', '2025-03-27', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 1274, NULL, 'RCG', '2025-03-31 13:00:00', NULL, NULL, '2025-03-31 18:00:00', '#00BCD4', NULL, 'A', '2025-03-31', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(3, 1275, NULL, 'FUNLEC(Remoto)', '2025-03-29 18:00:00', NULL, NULL, '2025-03-29 20:00:00', '#4CAF50', '<ul><li>Atualização RH</li></ul>', 'A', '2025-03-29', '18:00:00', '20:00:00', '00:00:00', '00:00:00', '02:00:00', NULL);
INSERT INTO `agendamento` (`contrato_id`, `id`, `profissional_id`, `descricao`, `horario_inicial`, `intervalo_inicial`, `intervalo_final`, `horario_final`, `cor`, `observacao`, `tipo`, `data_agenda`, `hora_inicio`, `hora_fim`, `hora_intervalo_inicial`, `hora_intervalo_final`, `hora_total`, `local`) VALUES
(3, 1276, NULL, 'FUNLEC(Remoto)', '2025-03-28 14:00:00', NULL, NULL, '2025-03-28 16:00:00', '#4CAF50', '<ul><li>Arquivos Sistema Athenas</li></ul>', 'A', '2025-03-28', '14:00:00', '16:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(5, 1277, NULL, 'RCG', '2025-04-01 08:00:00', NULL, NULL, '2025-04-01 18:00:00', '#00BCD4', NULL, 'A', '2025-04-01', '08:00:00', '18:00:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(4, 1278, NULL, 'MSGAS', '2025-04-02 07:30:00', NULL, NULL, '2025-04-02 17:30:00', '#2196F3', '<ul><li>API de Simulação de Negociação</li></ul>', 'A', '2025-04-02', '07:30:00', '17:30:00', '11:30:00', '14:00:00', '07:30:00', NULL),
(4, 1279, NULL, 'MSGAS', '2025-04-07 07:30:00', NULL, NULL, '2025-04-07 11:30:00', '#2196F3', '<ul><li>Api de NEGOCIAÇÂO</li></ul>', 'A', '2025-04-07', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 1280, NULL, 'RCG', '2025-04-07 13:00:00', NULL, NULL, '2025-04-07 17:30:00', '#00BCD4', NULL, 'A', '2025-04-07', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 1281, NULL, 'RCG', '2025-04-08 08:00:00', NULL, NULL, '2025-04-08 18:00:00', '#00BCD4', NULL, 'A', '2025-04-08', '08:00:00', '18:00:00', '11:00:00', '13:00:00', '08:00:00', NULL),
(4, 1282, NULL, 'MSGAS', '2025-04-07 19:00:00', NULL, NULL, '2025-04-07 20:00:00', '#2196F3', '<ul><li>Api de Reserva SZA</li></ul>', 'A', '2025-04-07', '19:00:00', '20:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(4, 1283, NULL, 'MSGAS', '2025-04-08 09:30:00', NULL, NULL, '2025-04-08 10:00:00', '#2196F3', '<ul><li>API SZA</li></ul>', 'A', '2025-04-08', '09:30:00', '10:00:00', '00:00:00', '00:00:00', '00:30:00', NULL),
(4, 1284, NULL, 'MSGAS', '2025-04-09 07:30:00', NULL, NULL, '2025-04-09 17:30:00', '#2196F3', '<ul><li>Adicionado Verbo DELETE api_sza</li><li>API de renegociação</li></ul>', 'A', '2025-04-09', '07:30:00', '17:30:00', '11:30:00', '14:00:00', '07:30:00', NULL),
(3, 1285, NULL, 'FUNLEC', '2025-04-10 08:00:00', NULL, NULL, '2025-04-10 17:30:00', '#4CAF50', '<ul><li>Correção contas a Receber</li></ul>', 'A', '2025-04-10', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(5, 1286, NULL, 'RCG', '2025-04-10 09:00:00', NULL, NULL, '2025-04-10 15:00:00', '#00BCD4', '<ul><li>Atualização OFFICE 365</li></ul>', 'A', '2025-04-10', '09:00:00', '15:00:00', '11:30:00', '13:00:00', '04:30:00', NULL),
(5, 1287, NULL, 'RCG', '2025-04-11 08:00:00', NULL, NULL, '2025-04-11 17:00:00', '#00BCD4', NULL, 'A', '2025-04-11', '08:00:00', '17:00:00', '12:00:00', '13:00:00', '08:00:00', NULL),
(3, 1288, NULL, 'FUNLEC', '2025-04-03 08:00:00', NULL, NULL, '2025-04-03 17:30:00', '#4CAF50', '<ul style=\"color: rgb(134, 148, 176); background-color: rgb(248, 249, 251);\"><li>Correção contas a Receber</li></ul>', 'A', '2025-04-03', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(5, 1289, NULL, 'RCG', '2025-04-04 08:00:00', NULL, NULL, '2025-04-04 18:00:00', '#00BCD4', NULL, 'A', '2025-04-04', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(4, 1290, NULL, 'MSGAS', '2025-04-14 07:30:00', NULL, NULL, '2025-04-14 10:00:00', '#2196F3', '<ul><li>API_FO0 Renoegociação</li></ul>', 'A', '2025-04-14', '07:30:00', '10:00:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(5, 1291, NULL, 'RCG', '2025-04-14 13:00:00', NULL, NULL, '2025-04-14 18:00:00', '#00BCD4', NULL, 'A', '2025-04-14', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 1292, NULL, 'RCG', '2025-04-15 08:00:00', NULL, NULL, '2025-04-15 18:00:00', '#00BCD4', NULL, 'A', '2025-04-15', '08:00:00', '18:00:00', '11:00:00', '13:00:00', '08:00:00', NULL),
(NULL, 1293, NULL, 'falta', '2025-04-16 08:00:00', NULL, NULL, '2025-04-16 18:00:00', '#F44336', NULL, 'A', '2025-04-16', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(NULL, 1294, NULL, 'falta', '2025-04-17 08:00:00', NULL, NULL, '2025-04-17 18:00:00', '#F44336', NULL, 'A', '2025-04-17', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(NULL, 1295, NULL, 'Feriado', '2025-04-18 08:00:00', NULL, NULL, '2025-04-18 18:00:00', '#F44336', NULL, 'A', '2025-04-18', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(NULL, 1296, NULL, 'Feriado', '2025-04-21 08:00:00', NULL, NULL, '2025-04-21 18:00:00', '#F44336', NULL, 'A', '2025-04-21', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(5, 1297, NULL, 'RCG', '2025-04-22 08:00:00', NULL, NULL, '2025-04-22 18:00:00', '#00BCD4', NULL, 'A', '2025-04-22', '08:00:00', '18:00:00', '11:30:00', '14:00:00', '07:30:00', NULL),
(3, 1298, NULL, 'FUNLEC', '2025-04-24 08:00:00', NULL, NULL, '2025-04-24 17:30:00', '#4CAF50', '<ul><li>Geração Arquivos de Exportação Athenas</li></ul>', 'A', '2025-04-24', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(4, 1299, NULL, 'MSGAS', '2025-04-23 07:30:00', NULL, NULL, '2025-04-23 17:30:00', '#2196F3', '<ul><li>Api de Negociação</li><li>Chamado&nbsp;<span data-teams=\"true\">23318081, referente a erro SmartView</span></li></ul>', 'A', '2025-04-23', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(5, 1300, NULL, 'RCG', '2025-04-25 08:00:00', NULL, NULL, '2025-04-25 18:00:00', '#00BCD4', NULL, 'A', '2025-04-25', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(5, 1301, NULL, 'RCG', '2025-04-26 10:00:00', NULL, NULL, '2025-04-26 14:00:00', '#00BCD4', NULL, 'A', '2025-04-26', '10:00:00', '14:00:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(NULL, 1302, NULL, 'Feriado', '2025-05-01 08:00:00', NULL, NULL, '2025-05-01 18:00:00', '#F44336', NULL, 'A', '2025-05-01', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(3, 1303, NULL, 'FUNLEC', '2025-04-23 19:00:00', NULL, NULL, '2025-04-23 22:00:00', '#4CAF50', '<ul><li>Atualização de Sistema</li></ul>', 'A', '2025-04-23', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 1304, NULL, 'RCG', '2025-05-05 08:00:00', NULL, NULL, '2025-05-05 18:00:00', '#00BCD4', NULL, 'A', '2025-05-05', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(5, 1305, NULL, 'RCG', '2025-05-06 08:00:00', NULL, NULL, '2025-05-06 18:00:00', '#00BCD4', NULL, 'A', '2025-05-06', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(4, 1306, NULL, 'MSGAS', '2025-05-09 07:30:00', NULL, NULL, '2025-05-09 11:30:00', '#2196F3', '<ul><li>Atualização Base DEV</li></ul>', 'A', '2025-05-09', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(4, 1307, NULL, 'MSGAS', '2025-04-28 07:30:00', NULL, NULL, '2025-04-28 11:30:00', '#2196F3', '<ul><li>Instalação de Servidor de Licenças - 3.6.1&nbsp;</li></ul>', 'A', '2025-04-28', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(4, 1308, NULL, 'MSGAS', '2025-04-30 07:30:00', NULL, NULL, '2025-04-30 17:30:00', '#2196F3', '<ul><li>Servidor de Licenças</li><li>API de renegociação</li><li>Paginação de Dados API</li></ul>', 'A', '2025-04-30', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(5, 1309, NULL, 'RCG', '2025-04-28 13:00:00', NULL, NULL, '2025-04-28 18:00:00', '#00BCD4', NULL, 'A', '2025-04-28', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 1310, NULL, 'RCG', '2025-04-29 08:00:00', NULL, NULL, '2025-04-29 18:00:00', '#00BCD4', NULL, 'A', '2025-04-29', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(3, 1311, NULL, 'FUNLEC', '2025-04-28 19:00:00', NULL, NULL, '2025-04-28 22:00:00', '#4CAF50', '<ul><li>Atualização Release 2410 - Base TESTE</li></ul>', 'A', '2025-04-28', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 1312, NULL, 'FUNLEC', '2025-04-29 19:00:00', NULL, NULL, '2025-04-29 22:00:00', '#4CAF50', '<ul><li>Atualização Release 2410 - Base TESTE</li></ul>', 'A', '2025-04-29', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 1313, NULL, 'FUNLEC', '2025-04-30 19:00:00', NULL, NULL, '2025-04-30 22:00:00', '#4CAF50', '<ul><li>Atualização Release 2410 - Base TESTE</li></ul>', 'A', '2025-04-30', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 1314, NULL, 'FUNLEC', '2025-04-14 14:00:00', NULL, NULL, '2025-04-14 16:00:00', '#4CAF50', '<ul><li>Correção contas a Receber</li></ul>', 'A', '2025-04-14', '14:00:00', '16:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(5, 1315, NULL, 'RCG', '2025-05-02 08:00:00', NULL, NULL, '2025-05-02 18:00:00', '#00BCD4', NULL, 'A', '2025-05-02', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(4, 1316, NULL, 'MSGAS', '2025-05-07 08:30:00', NULL, NULL, '2025-05-07 17:30:00', '#2196F3', '<ul><li>Atualização Base DEV</li></ul>', 'A', '2025-05-07', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', NULL),
(3, 1317, NULL, 'FUNLEC', '2025-05-08 08:00:00', NULL, NULL, '2025-05-08 17:30:00', '#4CAF50', '<ul><li>Suporte Financeiro</li></ul>', 'A', '2025-05-08', '08:00:00', '17:30:00', '11:30:00', '14:00:00', '07:00:00', NULL),
(4, 1318, NULL, 'MSGAS', '2025-05-12 07:30:00', NULL, NULL, '2025-05-12 11:30:00', '#2196F3', '<ul><li>API de consulta Quitação de Débitos</li><li>Simulação de Negociação</li></ul>', 'A', '2025-05-12', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(4, 1319, NULL, 'MSGAS', '2025-05-12 19:00:00', NULL, NULL, '2025-05-12 19:30:00', '#2196F3', '<ul><li>Atualização GPE</li></ul>', 'A', '2025-05-12', '19:00:00', '19:30:00', '00:00:00', '00:00:00', '00:30:00', NULL),
(5, 1320, NULL, 'RCG', '2025-05-12 13:00:00', NULL, NULL, '2025-05-12 18:00:00', '#00BCD4', NULL, 'A', '2025-05-12', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(3, 1321, NULL, 'FUNLEC', '2025-05-12 20:30:00', NULL, NULL, '2025-05-12 21:30:00', '#4CAF50', '<ul><li>Atualização Financeiro</li></ul>', 'A', '2025-05-12', '20:30:00', '21:30:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(5, 1322, NULL, 'RCG', '2025-05-13 08:00:00', NULL, NULL, '2025-05-13 18:00:00', '#00BCD4', NULL, 'A', '2025-05-13', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(3, 1323, NULL, 'FUNLEC', '2025-05-13 19:00:00', NULL, NULL, '2025-05-13 21:30:00', '#4CAF50', '<ul><li>Atualização de base DEV</li></ul>', 'A', '2025-05-13', '19:00:00', '21:30:00', '00:00:00', '00:00:00', '02:30:00', NULL),
(4, 1324, NULL, 'MSGAS', '2025-05-14 07:30:00', NULL, NULL, '2025-05-14 17:30:00', '#2196F3', '<ul><li>Ajuste API_SE1</li></ul>', 'A', '2025-05-14', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(3, 1325, NULL, 'FUNLEC', '2025-05-14 19:00:00', NULL, NULL, '2025-05-14 20:00:00', '#4CAF50', '<ul><li>Acesso remoto</li><li>Relatórios de Folha</li></ul>', 'A', '2025-05-14', '19:00:00', '20:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(3, 1326, NULL, 'FUNLEC', '2025-05-15 07:30:00', NULL, NULL, '2025-05-15 17:30:00', '#4CAF50', '<ul><li>Suporte Financeiro</li><li>Suporte Reinf</li></ul>', 'A', '2025-05-15', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(5, 1327, NULL, 'RCG', '2025-05-16 08:00:00', NULL, NULL, '2025-05-16 17:30:00', '#00BCD4', NULL, 'A', '2025-05-16', '08:00:00', '17:30:00', '12:00:00', '13:00:00', '08:30:00', NULL),
(4, 1328, NULL, 'MSGAS', '2025-05-19 07:30:00', NULL, NULL, '2025-05-19 11:30:00', '#2196F3', '<ul><li>Api Negociação</li></ul>', 'A', '2025-05-19', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 1329, NULL, 'RCG', '2025-05-19 13:00:00', NULL, NULL, '2025-05-19 18:00:00', '#00BCD4', NULL, 'A', '2025-05-19', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 1330, NULL, 'RCG', '2025-05-20 08:00:00', NULL, NULL, '2025-05-20 17:30:00', '#00BCD4', NULL, 'A', '2025-05-20', '08:00:00', '17:30:00', '12:00:00', '15:00:00', '06:30:00', NULL),
(4, 1331, NULL, 'MSGAS', '2025-05-21 07:30:00', NULL, NULL, '2025-05-21 17:30:00', '#2196F3', '<ul><li>API Negociação</li></ul>', 'A', '2025-05-21', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(3, 1332, NULL, 'FUNLEC', '2025-05-22 07:30:00', NULL, NULL, '2025-05-22 17:30:00', '#4CAF50', '<ol><li>ECF/ECD</li><li>Contas a Receber</li></ol>', 'A', '2025-05-22', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(5, 1333, NULL, 'RCG', '2025-05-23 08:00:00', NULL, NULL, '2025-05-23 18:00:00', '#00BCD4', NULL, 'A', '2025-05-23', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(4, 1334, NULL, 'MSGAS', '2025-05-13 14:00:00', NULL, NULL, '2025-05-13 15:00:00', '#2196F3', '<ul><li>Atualização TAF</li></ul>', 'A', '2025-05-13', '14:00:00', '15:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(4, 1335, NULL, 'MSGAS', '2025-05-26 07:30:00', NULL, NULL, '2025-05-26 11:30:00', '#2196F3', '<ul><li>Api Negociação</li></ul>', 'A', '2025-05-26', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 1336, NULL, 'RCG', '2025-05-26 13:00:00', NULL, NULL, '2025-05-26 17:30:00', '#00BCD4', NULL, 'A', '2025-05-26', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(5, 1337, NULL, 'RCG', '2025-05-27 08:00:00', NULL, NULL, '2025-05-27 17:30:00', '#00BCD4', NULL, 'A', '2025-05-27', '08:00:00', '17:30:00', '12:00:00', '14:00:00', '07:30:00', NULL),
(4, 1338, NULL, 'MSGAS', '2025-05-28 07:15:00', NULL, NULL, '2025-05-28 17:30:00', '#2196F3', '<ul><li>API Negociação</li></ul>', 'A', '2025-05-28', '07:15:00', '17:30:00', '11:30:00', '14:00:00', '07:45:00', NULL),
(5, 1339, NULL, 'RCG', '2025-05-09 13:00:00', NULL, NULL, '2025-05-09 17:30:00', '#00BCD4', NULL, 'A', '2025-05-09', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', NULL),
(4, 1340, NULL, 'MSGAS', '2025-05-08 19:30:00', NULL, NULL, '2025-05-08 22:30:00', '#2196F3', '<ul><li>Atualização Base DEV</li></ul>', 'A', '2025-05-08', '19:30:00', '22:30:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 1341, NULL, 'MSGAS', '2025-05-21 19:00:00', NULL, NULL, '2025-05-21 22:00:00', '#2196F3', '<ul><li>Atualização Base DEV</li></ul>', 'A', '2025-05-21', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 1342, NULL, 'FUNLEC', '2025-05-29 07:30:00', NULL, NULL, '2025-05-29 17:30:00', '#4CAF50', '<ul><li>ECF/ECD</li><li>Contas a RECEBER</li></ul>', 'A', '2025-05-29', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(3, 1343, NULL, 'FUNLEC', '2025-05-28 19:00:00', NULL, NULL, '2025-05-28 22:00:00', '#4CAF50', '<ul><li>Atualização ECF/ECD</li><li>Atualização TAF - ECF</li></ul>', 'A', '2025-05-28', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 1344, NULL, 'MSGAS', '2025-05-29 09:00:00', NULL, NULL, '2025-05-29 09:30:00', '#2196F3', '<ul><li>Atualização TAF</li></ul>', 'A', '2025-05-29', '09:00:00', '09:30:00', '00:00:00', '00:00:00', '00:30:00', NULL),
(5, 1345, NULL, 'RCG', '2025-05-26 19:00:00', NULL, NULL, '2025-05-26 22:00:00', '#00BCD4', '<ul><li>Atualização 2410</li></ul>', 'A', '2025-05-26', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(3, 1346, NULL, 'FUNLEC', '2025-05-20 19:00:00', NULL, NULL, '2025-05-20 22:30:00', '#4CAF50', '<ul><li>Atualização 2410</li></ul>', 'A', '2025-05-20', '19:00:00', '22:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(5, 1347, NULL, 'RCG', '2025-05-19 19:00:00', NULL, NULL, '2025-05-19 22:00:00', '#00BCD4', '<ul><li>Atualização 2410</li></ul>', 'A', '2025-05-19', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 1348, NULL, 'RCG', '2025-05-15 20:00:00', NULL, NULL, '2025-05-15 22:00:00', '#00BCD4', '<ul><li>Atualização 2410</li></ul>', 'A', '2025-05-15', '20:00:00', '22:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(5, 1349, NULL, 'RCG', '2025-05-30 08:00:00', NULL, NULL, '2025-05-30 17:30:00', '#00BCD4', NULL, 'A', '2025-05-30', '08:00:00', '17:30:00', '12:00:00', '13:00:00', '08:30:00', NULL),
(4, 1350, NULL, 'MSGAS', '2025-06-02 07:30:00', NULL, NULL, '2025-06-02 11:30:00', '#2196F3', '<ul><li>API de Negociação</li></ul>', 'A', '2025-06-02', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 1351, NULL, 'FALTA', '2025-06-02 13:00:00', NULL, NULL, '2025-06-02 18:00:00', '#E91E63', NULL, 'A', '2025-06-02', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 1352, NULL, 'RCG', '2025-06-03 08:00:00', NULL, NULL, '2025-06-03 18:00:00', '#00BCD4', NULL, 'A', '2025-06-03', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(5, 1353, NULL, 'RCG', '2025-06-03 20:00:00', NULL, NULL, '2025-06-03 21:00:00', '#00BCD4', '<ul><li>Site</li></ul>', 'A', '2025-06-03', '20:00:00', '21:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(4, 1354, NULL, 'MSGAS', '2025-06-04 07:30:00', NULL, NULL, '2025-06-04 17:30:00', '#2196F3', '<ul><li>Api de Negociação</li></ul>', 'A', '2025-06-04', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(3, 1355, NULL, 'FUNLEC', '2025-06-05 08:00:00', NULL, NULL, '2025-06-05 17:30:00', '#4CAF50', '<ul><li>Ajustes integração Caixa Funlec - Online</li></ul>', 'A', '2025-06-05', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(5, 1356, NULL, 'RCG', '2025-06-06 08:00:00', NULL, NULL, '2025-06-06 18:00:00', '#00BCD4', NULL, 'A', '2025-06-06', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(NULL, 1357, NULL, 'FERIADO', '2025-06-13 08:00:00', NULL, NULL, '2025-06-13 18:00:00', '#E91E63', NULL, 'A', '2025-06-13', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(NULL, 1358, NULL, 'FERIADO', '2025-06-19 08:00:00', NULL, NULL, '2025-06-19 18:00:00', '#E91E63', NULL, 'A', '2025-06-19', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', NULL),
(4, 1359, NULL, 'MSGAS', '2025-06-09 07:30:00', NULL, NULL, '2025-06-09 11:30:00', '#2196F3', '<ul><li>Api de Negociação</li></ul>', 'A', '2025-06-09', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 1360, 1, 'RCG', '2025-06-09 13:00:00', NULL, NULL, '2025-06-09 18:00:00', '#00BCD4', NULL, 'A', '2025-06-09', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 1361, NULL, 'RCG', '2025-06-10 08:00:00', NULL, NULL, '2025-06-10 18:00:00', '#00BCD4', NULL, 'A', '2025-06-10', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(4, 1362, NULL, 'MSGAS', '2025-06-11 07:30:00', NULL, NULL, '2025-06-11 17:30:00', '#2196F3', '<ul><li>Api de Negociação</li></ul>', 'A', '2025-06-11', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(3, 1363, NULL, 'FUNLEC', '2025-06-12 08:00:00', NULL, NULL, '2025-06-12 17:30:00', '#4CAF50', '<ul><li>Ajustes integração Caixa Funlec - Online</li></ul>', 'R', '2025-06-12', '08:00:00', '17:30:00', '11:30:00', '13:00:00', '08:00:00', NULL),
(4, 1364, NULL, 'MSGAS', '2025-06-13 09:00:00', NULL, NULL, '2025-06-13 18:00:00', '#2196F3', '<ul><li>Atualização de Release</li></ul>', 'A', '2025-06-13', '09:00:00', '18:00:00', '11:30:00', '13:00:00', '07:30:00', NULL),
(4, 1365, NULL, 'MSGAS', '2025-06-14 09:00:00', NULL, NULL, '2025-06-14 16:00:00', '#2196F3', '<ul><li>Atualização de Release</li></ul>', 'A', '2025-06-14', '09:00:00', '16:00:00', '11:00:00', '14:00:00', '04:00:00', NULL),
(4, 1366, NULL, 'MSGAS', '2025-06-16 07:30:00', NULL, NULL, '2025-06-16 17:30:00', '#2196F3', '<ul><li>Suporte Atualização de Release</li></ul>', 'A', '2025-06-16', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(4, 1367, NULL, 'MSGAS', '2025-06-18 07:30:00', NULL, NULL, '2025-06-18 11:30:00', '#2196F3', '<ul><li>Suporte Atualização de Release</li></ul>', 'A', '2025-06-18', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 1368, NULL, 'RCG', '2025-06-17 08:00:00', NULL, NULL, '2025-06-17 18:00:00', '#00BCD4', NULL, 'A', '2025-06-17', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(5, 1369, NULL, 'RCG', '2025-06-18 13:00:00', NULL, NULL, '2025-06-18 18:00:00', '#00BCD4', NULL, 'A', '2025-06-18', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 1370, NULL, 'RCG', '2025-06-20 08:00:00', NULL, NULL, '2025-06-20 18:00:00', '#00BCD4', NULL, 'A', '2025-06-20', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(3, 1371, NULL, 'FUNLEC', '2025-06-30 07:30:00', NULL, NULL, '2025-06-30 17:30:00', '#4CAF50', '<ul><li>Atualização de Release</li></ul>', 'A', '2025-06-30', '07:30:00', '17:30:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(3, 1372, NULL, 'FUNLEC', '2025-06-28 09:00:00', NULL, NULL, '2025-06-28 18:00:00', '#4CAF50', '<ul><li>Atualização de Release</li></ul>', 'A', '2025-06-28', '09:00:00', '18:00:00', '11:00:00', '14:00:00', '06:00:00', NULL),
(5, 1373, NULL, 'RCG', '2025-06-19 09:00:00', NULL, NULL, '2025-06-19 18:00:00', '#00BCD4', '<ul><li>Atualização de Release</li></ul>', 'A', '2025-06-19', '09:00:00', '18:00:00', '11:00:00', '13:00:00', '07:00:00', NULL),
(3, 1374, NULL, 'FUNLEC', '2025-06-26 10:00:00', NULL, NULL, '2025-06-26 17:30:00', '#4CAF50', '<ul><li>Ajustes integração Caixa Funlec - Online</li></ul>', 'A', '2025-06-26', '10:00:00', '17:30:00', '12:00:00', '13:00:00', '06:30:00', NULL),
(4, 1375, NULL, 'MSGAS', '2025-06-23 07:30:00', NULL, NULL, '2025-06-23 11:30:00', '#2196F3', '<ul><li>Api de Negociação</li></ul>', 'A', '2025-06-23', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(4, 1377, NULL, 'MSGAS', '2025-06-25 07:30:00', NULL, NULL, '2025-06-25 18:30:00', '#2196F3', '<ul><li>Api de Negociação</li><li>Api Cliente</li></ul>', 'A', '2025-06-25', '07:30:00', '18:30:00', '11:30:00', '13:30:00', '09:00:00', NULL),
(5, 1378, NULL, 'RCG', '2025-06-27 08:00:00', NULL, NULL, '2025-06-27 18:00:00', '#00BCD4', NULL, 'A', '2025-06-27', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(5, 1379, NULL, 'RCG', '2025-06-24 08:00:00', NULL, NULL, '2025-06-24 18:00:00', '#00BCD4', NULL, 'A', '2025-06-24', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(5, 1380, NULL, 'RCG', '2025-06-23 13:00:00', NULL, NULL, '2025-06-23 18:00:00', '#00BCD4', NULL, 'A', '2025-06-23', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 1381, NULL, 'RCG', '2025-07-01 08:00:00', NULL, NULL, '2025-07-01 18:00:00', '#00BCD4', NULL, 'A', '2025-07-01', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(5, 1383, NULL, 'RCG', '2025-06-05 19:00:00', NULL, NULL, '2025-06-05 21:00:00', '#00BCD4', '<ul><li>Site</li></ul>', 'A', '2025-06-05', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(5, 1384, NULL, 'RCG', '2025-06-04 19:00:00', NULL, NULL, '2025-06-04 21:00:00', '#00BCD4', '<ul><li>Site</li></ul>', 'A', '2025-06-04', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(4, 1385, NULL, 'MSGAS', '2025-06-12 19:00:00', NULL, NULL, '2025-06-12 21:00:00', '#2196F3', '<ul><li>Atualização de Release</li></ul>', 'A', '2025-06-12', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 1386, NULL, 'FUNLEC', '2025-06-17 19:00:00', NULL, NULL, '2025-06-17 21:00:00', '#4CAF50', '<ul><li>Contas a Receber</li></ul>', 'A', '2025-06-17', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(4, 1387, NULL, 'MSGAS', '2025-06-16 19:00:00', NULL, NULL, '2025-06-16 22:00:00', '#2196F3', '<ul><li>Suporte Atualização de Release</li></ul>', 'A', '2025-06-16', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 1388, NULL, 'MSGAS', '2025-07-02 07:30:00', NULL, NULL, '2025-07-02 17:30:00', '#2196F3', '<ul><li>Api de Negociação</li></ul>', 'A', '2025-07-02', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(4, 1389, NULL, 'MSGAS', '2025-07-03 07:30:00', NULL, NULL, '2025-07-03 11:30:00', '#2196F3', '<ul><li>Api de Negociação</li></ul>', 'A', '2025-07-03', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 1390, NULL, 'RCG', '2025-07-03 13:00:00', NULL, NULL, '2025-07-03 18:00:00', '#00BCD4', NULL, 'A', '2025-07-03', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 1391, NULL, 'RCG', '2025-07-04 08:00:00', NULL, NULL, '2025-07-04 18:00:00', '#00BCD4', NULL, 'A', '2025-07-04', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(NULL, 1392, NULL, 'Cartorio', '2025-06-26 08:00:00', NULL, NULL, '2025-06-26 10:00:00', '#E91E63', NULL, 'A', '2025-06-26', '08:00:00', '10:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(3, 1393, NULL, 'FUNLEC', '2025-06-25 19:00:00', NULL, NULL, '2025-06-25 21:00:00', '#4CAF50', '<ul><li>Ajuste contas a Receber</li></ul>', 'A', '2025-06-25', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', NULL),
(4, 1394, NULL, 'MSGAS', '2025-06-25 19:00:00', NULL, NULL, '2025-06-25 22:00:00', '#2196F3', '<ul><li>Api de Negociação</li></ul>', 'A', '2025-06-25', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(4, 1395, NULL, 'MSGAS', '2025-06-26 19:00:00', NULL, NULL, '2025-06-26 22:30:00', '#2196F3', '<ul><li>Ajuste API</li></ul>', 'A', '2025-06-26', '19:00:00', '22:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(3, 1396, NULL, 'FUNLEC', '2025-06-29 09:00:00', NULL, NULL, '2025-06-29 15:00:00', '#4CAF50', '<ul><li>Atualização de Release</li></ul>', 'A', '2025-06-29', '09:00:00', '15:00:00', '11:00:00', '13:00:00', '04:00:00', NULL),
(4, 1397, NULL, 'MSGAS', '2025-07-07 07:30:00', NULL, NULL, '2025-07-07 11:30:00', '#2196F3', '<ul><li>API de Remanejamento Orçamentário</li></ul>', 'A', '2025-07-07', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(5, 1398, NULL, 'RCG', '2025-07-07 13:00:00', NULL, NULL, '2025-07-07 18:00:00', '#00BCD4', NULL, 'A', '2025-07-07', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 1399, NULL, 'RCG', '2025-07-08 08:00:00', NULL, NULL, '2025-07-08 18:00:00', '#00BCD4', NULL, 'A', '2025-07-08', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(3, 1400, NULL, 'FUNLEC', '2025-07-07 19:00:00', NULL, NULL, '2025-07-07 22:00:00', '#4CAF50', '<ul><li>Atualização GPE</li></ul>', 'A', '2025-07-07', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(4, 1401, NULL, 'MSGAS', '2025-07-09 07:45:00', NULL, NULL, '2025-07-09 17:30:00', '#2196F3', '<ul><li>API - Remanejamento de Reservas</li></ul>', 'A', '2025-07-09', '07:45:00', '17:30:00', '11:30:00', '13:00:00', '08:15:00', NULL),
(3, 1402, NULL, 'FUNLEC', '2025-07-10 07:30:00', NULL, NULL, '2025-07-10 18:00:00', '#4CAF50', '<ul><li>Contas a Receber</li></ul>', 'A', '2025-07-10', '07:30:00', '18:00:00', '12:00:00', '13:00:00', '09:30:00', 'P'),
(5, 1403, NULL, 'RCG', '2025-07-11 08:00:00', NULL, NULL, '2025-07-11 18:00:00', '#00BCD4', NULL, 'A', '2025-07-11', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(4, 1404, NULL, 'MSGAS', '2025-07-14 07:40:00', NULL, NULL, '2025-07-14 11:30:00', '#2196F3', '<ul><li>API - Remanejamento de Reservas</li></ul>', 'A', '2025-07-14', '07:40:00', '11:30:00', '00:00:00', '00:00:00', '03:50:00', NULL),
(4, 1405, NULL, 'MSGAS', '2025-07-21 08:00:00', NULL, NULL, '2025-07-21 11:30:00', '#2196F3', '<ul><li>API - Remanejamento de Reservas</li></ul>', 'A', '2025-07-21', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', NULL),
(4, 1406, NULL, 'MSGAS', '2025-07-16 07:30:00', NULL, NULL, '2025-07-16 17:30:00', '#2196F3', '<ul><li>API - Remanejamento de Reservas</li></ul>', 'A', '2025-07-16', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', NULL),
(4, 1407, NULL, 'MSGAS', '2025-07-15 19:00:00', NULL, NULL, '2025-07-15 22:00:00', '#2196F3', '<ul><li>Atualização Sistema</li></ul>', 'A', '2025-07-15', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', NULL),
(5, 1408, NULL, 'RCG', '2025-07-14 13:00:00', NULL, NULL, '2025-07-14 18:00:00', '#00BCD4', NULL, 'A', '2025-07-14', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 1409, NULL, 'RCG', '2025-07-15 08:00:00', NULL, NULL, '2025-07-15 18:00:00', '#00BCD4', NULL, 'A', '2025-07-15', '08:00:00', '18:00:00', '12:00:00', '13:30:00', '08:30:00', NULL),
(3, 1410, NULL, 'FUNLEC', '2025-07-16 19:00:00', NULL, NULL, '2025-07-16 22:00:00', '#4CAF50', '<ul><li>Atualização Medicina</li></ul>', 'A', '2025-07-16', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(3, 1411, NULL, 'FUNLEC', '2025-07-17 07:30:00', NULL, NULL, '2025-07-17 17:30:00', '#4CAF50', '<ul><li>Folha de pagamento</li></ul>', 'A', '2025-07-17', '07:30:00', '17:30:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(5, 1412, NULL, 'RCG', '2025-07-18 08:00:00', NULL, NULL, '2025-07-18 18:00:00', '#00BCD4', NULL, 'A', '2025-07-18', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(5, 1413, NULL, 'RCG', '2025-07-21 13:00:00', NULL, NULL, '2025-07-21 18:00:00', '#00BCD4', NULL, 'A', '2025-07-21', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(5, 1414, NULL, 'RCG', '2025-07-22 08:00:00', NULL, NULL, '2025-07-22 18:00:00', '#00BCD4', NULL, 'A', '2025-07-22', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(4, 1415, NULL, 'MSGAS', '2025-07-23 08:00:00', NULL, NULL, '2025-07-23 17:20:00', '#2196F3', '<ul><li>Api Remanejamento</li></ul>', 'A', '2025-07-23', '08:00:00', '17:20:00', '11:30:00', '13:30:00', '07:20:00', NULL),
(3, 1416, NULL, 'FUNLEC', '2025-07-24 07:30:00', NULL, NULL, '2025-07-24 17:30:00', '#4CAF50', '<ul><li>Folha de pagamento - Ponto</li></ul>', 'A', '2025-07-24', '07:30:00', '17:30:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(5, 1417, NULL, 'RCG', '2025-07-25 08:00:00', NULL, NULL, '2025-07-25 18:00:00', '#00BCD4', NULL, 'A', '2025-07-25', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(3, 1418, NULL, 'FUNLEC', '2025-07-26 09:00:00', NULL, NULL, '2025-07-26 11:00:00', '#4CAF50', '<ul><li>Folha de Pagamento - Provisão</li></ul>', 'A', '2025-07-26', '09:00:00', '11:00:00', '00:00:00', '00:00:00', '02:00:00', 'R'),
(4, 1419, NULL, 'MSGAS', '2025-07-28 07:30:00', NULL, NULL, '2025-07-28 11:30:00', '#2196F3', '<ul><li>Compatibilizado nfesefaz.prw</li></ul>', 'A', '2025-07-28', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', NULL),
(4, 1420, NULL, 'MSGAS', '2025-07-30 07:30:00', NULL, NULL, '2025-07-30 17:30:00', '#2196F3', '<ul><li>Api Remanejamento</li><li>Api SE1</li></ul>', 'A', '2025-07-30', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', NULL),
(5, 1421, NULL, 'RCG', '2025-07-29 08:00:00', NULL, NULL, '2025-07-29 18:00:00', '#00BCD4', NULL, 'A', '2025-07-29', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', NULL),
(5, 1422, NULL, 'RCG', '2025-07-28 13:00:00', NULL, NULL, '2025-07-28 18:00:00', '#00BCD4', NULL, 'A', '2025-07-28', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', NULL),
(3, 1423, NULL, 'FUNLEC', '2025-07-28 19:00:00', NULL, NULL, '2025-07-28 21:00:00', '#4CAF50', '<ul><li>Folha de Pagamento - Provisão</li></ul>', 'A', '2025-07-28', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', 'R'),
(3, 1424, NULL, 'FUNLEC', '2025-07-29 09:00:00', NULL, NULL, '2025-07-29 15:00:00', '#4CAF50', '<ul><li>Folha de Pagamento - Provisão</li></ul>', 'A', '2025-07-29', '09:00:00', '15:00:00', '11:30:00', '13:00:00', '04:30:00', 'R'),
(3, 1425, NULL, 'FUNLEC', '2025-07-31 07:30:00', NULL, NULL, '2025-07-31 17:30:00', '#4CAF50', '<ul><li>Provisão de 13</li></ul>', 'A', '2025-07-31', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(3, 1426, NULL, 'FUNLEC', '2025-07-29 19:00:00', NULL, NULL, '2025-07-29 22:00:00', '#4CAF50', '<ul><li>Folha de Pagamento - Provisão</li></ul>', 'A', '2025-07-29', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(5, 1427, NULL, 'RCG', '2025-08-01 08:00:00', NULL, NULL, '2025-08-01 18:00:00', '#00BCD4', NULL, 'A', '2025-08-01', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(4, 1428, NULL, 'MSGAS', '2025-08-04 07:30:00', NULL, NULL, '2025-08-04 11:30:00', '#2196F3', '<ul><li>Api de Remanejamento de Reservas</li></ul>', 'A', '2025-08-04', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(4, 1429, NULL, 'MSGAS', '2025-08-05 07:30:00', NULL, NULL, '2025-08-05 17:30:00', '#2196F3', '<ul><li>Api de Remanejamento de Reservas</li><li>e-Sfinge TCE</li></ul>', 'A', '2025-08-05', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(5, 1430, NULL, 'RCG', '2025-08-04 13:00:00', NULL, NULL, '2025-08-04 18:00:00', '#00BCD4', NULL, 'A', '2025-08-04', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(5, 1431, NULL, 'RCG', '2025-08-06 08:00:00', NULL, NULL, '2025-08-06 18:00:00', '#00BCD4', NULL, 'A', '2025-08-06', '08:00:00', '18:00:00', '12:00:00', '15:00:00', '07:00:00', 'P'),
(3, 1432, NULL, 'FUNLEC', '2025-08-05 19:00:00', NULL, NULL, '2025-08-05 22:00:00', '#4CAF50', '<ul><li>Ponto Eletronico</li><li>Provisão Folha</li></ul>', 'A', '2025-08-05', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(3, 1433, NULL, 'FUNLEC', '2025-08-07 07:30:00', NULL, NULL, '2025-08-07 17:30:00', '#4CAF50', '<ul><li>Provisão Folha Pagamento</li><li>Contas a Receber</li></ul>', 'A', '2025-08-07', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(5, 1434, NULL, 'RCG', '2025-08-08 08:00:00', NULL, NULL, '2025-08-08 17:40:00', '#00BCD4', NULL, 'A', '2025-08-08', '08:00:00', '17:40:00', '12:00:00', '13:00:00', '08:40:00', 'P'),
(3, 1435, NULL, 'FUNLEC', '2025-08-08 14:00:00', NULL, NULL, '2025-08-08 16:00:00', '#4CAF50', '<ul><li>Ponto</li></ul>', 'A', '2025-08-08', '14:00:00', '16:00:00', '00:00:00', '00:00:00', '02:00:00', 'R'),
(4, 1436, NULL, 'MSGAS', '2025-08-11 07:30:00', NULL, NULL, '2025-08-11 11:30:00', '#2196F3', '<ul><li>e-Sfinge TCE</li></ul>', 'A', '2025-08-11', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(5, 1437, NULL, 'RCG', '2025-08-11 13:00:00', NULL, NULL, '2025-08-11 18:00:00', '#00BCD4', NULL, 'A', '2025-08-11', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(5, 1438, NULL, 'RCG', '2025-08-12 08:00:00', NULL, NULL, '2025-08-12 18:00:00', '#00BCD4', NULL, 'A', '2025-08-12', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(4, 1439, NULL, 'MSGAS', '2025-08-13 07:30:00', NULL, NULL, '2025-08-13 17:30:00', '#2196F3', '<ul><li>Ponto Eletronico</li></ul>', 'A', '2025-08-13', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(3, 1440, NULL, 'FUNLEC', '2025-08-11 19:00:00', NULL, NULL, '2025-08-11 21:00:00', '#4CAF50', '<ul><li>Ponto Eletronico</li></ul>', 'A', '2025-08-11', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', 'R'),
(3, 1441, NULL, 'FUNLEC', '2025-08-14 07:30:00', NULL, NULL, '2025-08-14 17:30:00', '#4CAF50', '<ul><li>Ponto Eletronico</li><li>PIS Sobre Folha</li></ul>', 'A', '2025-08-14', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(5, 1442, NULL, 'RCG', '2025-08-15 08:00:00', NULL, NULL, '2025-08-15 18:00:00', '#00BCD4', NULL, 'A', '2025-08-15', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(4, 1443, NULL, 'MSGAS', '2025-08-18 07:30:00', NULL, NULL, '2025-08-18 11:30:00', '#2196F3', '<ul><li>e-Sfinge TCE</li></ul>', 'A', '2025-08-18', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(4, 1444, NULL, 'MSGAS', '2025-09-05 07:30:00', NULL, NULL, '2025-09-05 17:30:00', '#2196F3', '<ul><li>Integração e-Sfinge - Contabilidade</li><li>Faturamento</li><li>Ponto Entronico</li></ul>', 'A', '2025-09-05', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(4, 1445, NULL, 'MSGAS', '2025-09-08 07:30:00', NULL, NULL, '2025-09-08 17:30:00', '#2196F3', '<ul><li>Faturamento</li><li>Ponto Entronico</li><li>Atualização Base DEV</li></ul>', 'A', '2025-09-08', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(4, 1446, NULL, 'MSGAS', '2025-08-18 19:00:00', NULL, NULL, '2025-08-18 21:00:00', '#2196F3', '<ul><li>Ponto Eletronico</li></ul>', 'A', '2025-08-18', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', 'R'),
(5, 1447, NULL, 'RCG', '2025-08-18 13:00:00', NULL, NULL, '2025-08-18 18:00:00', '#00BCD4', NULL, 'A', '2025-08-18', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(5, 1448, NULL, 'RCG', '2025-08-19 08:00:00', NULL, NULL, '2025-08-19 18:00:00', '#00BCD4', NULL, 'A', '2025-08-19', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(4, 1449, NULL, 'MSGAS', '2025-08-19 19:00:00', NULL, NULL, '2025-08-19 22:00:00', '#2196F3', '<ul><li>Atualização Sistema<ul><li>25-07-04_ATUALIZACAO_12.1.2410_BACKOFFICE</li><li>25-07-16_ATUALIZACAO_12.1.2410_TAF</li><li>25-08-12_ATUALIZACAO_12.1.2410_RH</li><li>25-08-12_ATUALIZACAO_12.1.2410_MDT</li></ul></li></ul>', 'A', '2025-08-19', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(4, 1450, NULL, 'MSGAS', '2025-08-20 07:30:00', NULL, NULL, '2025-08-20 17:30:00', '#2196F3', '<ul><li>e-Sfinge TCE</li></ul>', 'A', '2025-08-20', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(3, 1451, NULL, 'FUNLEC', '2025-08-20 19:00:00', NULL, NULL, '2025-08-20 22:00:00', '#4CAF50', '<ul><li>Atualização Sistema<ul><li>25-07-04_ATUALIZACAO_12.1.2410_BACKOFFICE</li><li>25-07-16_ATUALIZACAO_12.1.2410_TAF</li><li>25-08-12_ATUALIZACAO_12.1.2410_RH</li><li>25-08-12_ATUALIZACAO_12.1.2410_MDT</li></ul></li></ul>', 'A', '2025-08-20', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(3, 1452, 1, 'FUNLEC', '2025-08-21 07:30:00', NULL, NULL, '2025-08-21 17:30:00', '#4CAF50', '<ul><li>Provisão de Ferias</li><li>eConsiginado Ferias</li></ul>', 'A', '2025-08-21', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(5, 1453, NULL, 'RCG', '2025-08-22 08:00:00', NULL, NULL, '2025-08-22 18:00:00', '#00BCD4', NULL, 'A', '2025-08-22', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(5, 1454, NULL, 'RCG', '2025-08-21 19:00:00', NULL, NULL, '2025-08-21 22:00:00', '#00BCD4', NULL, 'A', '2025-08-21', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(5, 1455, NULL, 'RCG', '2025-08-25 08:00:00', NULL, NULL, '2025-08-25 18:00:00', '#00BCD4', NULL, 'A', '2025-08-25', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(NULL, 1456, NULL, 'FERIADO', '2025-08-26 08:00:00', NULL, NULL, '2025-08-26 18:00:00', '#F44336', NULL, 'A', '2025-08-26', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', 'P'),
(4, 1457, NULL, 'MSGAS', '2025-08-27 07:30:00', NULL, NULL, '2025-08-27 17:30:00', '#2196F3', '<ul><li>e-Sfinge TCE</li></ul>', 'A', '2025-08-27', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(4, 1458, NULL, 'MSGAS', '2025-08-29 07:30:00', NULL, NULL, '2025-08-29 11:30:00', '#2196F3', '<ul><li><font color=\"#000000\">PALESTRA CICLO DE PALESTRAS DO E-SFINGE - MÓDULO GESTÃO FISCAL E REGISTROS CONTÁBEIS - PRESENCIAL.</font></li></ul>', 'A', '2025-08-29', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'R'),
(3, 1459, NULL, 'FUNLEC', '2025-08-28 07:30:00', NULL, NULL, '2025-08-28 17:30:00', '#4CAF50', NULL, 'A', '2025-08-28', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(5, 1460, NULL, 'RCG', '2025-08-29 13:00:00', NULL, NULL, '2025-08-29 18:00:00', '#00BCD4', NULL, 'A', '2025-08-29', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(4, 1461, NULL, 'MSGAS', '2025-08-26 09:00:00', NULL, NULL, '2025-08-26 11:00:00', '#2196F3', '<ul><li>Atualização TSS (Nota Técnica 2025.001 versão 1.00)</li></ul>', 'A', '2025-08-26', '09:00:00', '11:00:00', '00:00:00', '00:00:00', '02:00:00', 'R'),
(3, 1462, NULL, 'FUNLEC', '2025-08-27 19:00:00', NULL, NULL, '2025-08-27 22:00:00', '#4CAF50', '<ul><li>Atualização<ul><li>25-08-22_ATUALIZACAO_12.1.2410_MDT</li><li>25-08-19_ATUALIZACAO_12.1.2410_RH</li></ul></li></ul>', 'A', '2025-08-27', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(NULL, 1463, NULL, 'FERIAS', '2025-10-06 08:00:00', NULL, NULL, '2025-10-06 18:00:00', '#4CAF50', NULL, 'A', '2025-10-06', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', 'P'),
(NULL, 1464, NULL, 'FERIAS', '2025-10-07 08:00:00', NULL, NULL, '2025-10-07 18:00:00', '#4CAF50', NULL, 'A', '2025-10-07', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', 'P'),
(NULL, 1465, NULL, 'FERIAS', '2025-10-08 08:00:00', NULL, NULL, '2025-10-08 18:00:00', '#4CAF50', NULL, 'A', '2025-10-08', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', 'P'),
(NULL, 1466, NULL, 'FERIAS', '2025-10-09 08:00:00', NULL, NULL, '2025-10-09 18:00:00', '#4CAF50', NULL, 'A', '2025-10-09', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', 'P'),
(NULL, 1467, NULL, 'FERIAS', '2025-10-10 08:00:00', NULL, NULL, '2025-10-10 18:00:00', '#4CAF50', NULL, 'A', '2025-10-10', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', 'P'),
(4, 1468, NULL, 'MSGAS', '2025-09-10 07:30:00', NULL, NULL, '2025-09-10 11:30:00', '#2196F3', '<ul><li>Integração e-Sfinge - Contabilidade</li></ul>', 'A', '2025-09-10', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(3, 1470, NULL, 'FUNLEC', '2025-08-12 19:00:00', NULL, NULL, '2025-08-12 21:00:00', '#4CAF50', '<ul><li>Ponto Eletronico</li></ul>', 'A', '2025-08-12', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', 'R'),
(4, 1471, NULL, 'MSGAS', '2025-09-01 07:30:00', NULL, NULL, '2025-09-01 11:30:00', '#2196F3', '<ul><li>Integração e-Sfinge - Contabilidade</li></ul>', 'A', '2025-09-01', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(3, 1472, NULL, 'FUNLEC', '2025-08-29 15:00:00', NULL, NULL, '2025-08-29 17:30:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2025-08-29', '15:00:00', '17:30:00', '00:00:00', '00:00:00', '02:30:00', 'P'),
(3, 1473, NULL, 'FUNLEC', '2025-09-04 07:30:00', NULL, NULL, '2025-09-04 17:30:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2025-09-04', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(5, 1474, NULL, 'RCG', '2025-09-01 13:00:00', NULL, NULL, '2025-09-01 18:00:00', '#00BCD4', NULL, 'A', '2025-09-01', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(5, 1475, NULL, 'RCG', '2025-09-02 08:00:00', NULL, NULL, '2025-09-02 18:00:00', '#00BCD4', NULL, 'A', '2025-09-02', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(5, 1476, NULL, 'RCG', '2025-09-03 08:00:00', NULL, NULL, '2025-09-03 18:00:00', '#00BCD4', NULL, 'A', '2025-09-03', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(5, 1477, NULL, 'RCG', '2025-09-02 19:00:00', NULL, NULL, '2025-09-02 21:00:00', '#00BCD4', '<ul><li>Bot Anivesariante</li></ul>', 'A', '2025-09-02', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', 'R'),
(5, 1478, NULL, 'RCG', '2025-09-09 08:00:00', NULL, NULL, '2025-09-09 18:00:00', '#00BCD4', NULL, 'A', '2025-09-09', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(5, 1479, NULL, 'RCG', '2025-09-10 13:00:00', NULL, NULL, '2025-09-10 18:00:00', '#00BCD4', NULL, 'A', '2025-09-10', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(3, 1480, NULL, 'FUNLEC', '2025-09-11 07:30:00', NULL, NULL, '2025-09-11 17:30:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2025-09-11', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(5, 1481, NULL, 'RCG', '2025-09-12 08:00:00', NULL, NULL, '2025-09-12 18:00:00', '#00BCD4', NULL, 'A', '2025-09-12', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(4, 1482, NULL, 'MSGAS', '2025-09-15 07:30:00', NULL, NULL, '2025-09-15 11:30:00', '#2196F3', '<ul><li>Integração&nbsp;e-Sfinge</li></ul>', 'A', '2025-09-15', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(5, 1483, NULL, 'RCG', '2025-09-15 13:00:00', NULL, NULL, '2025-09-15 18:00:00', '#00BCD4', NULL, 'A', '2025-09-15', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(5, 1484, NULL, 'RCG', '2025-09-16 08:00:00', NULL, NULL, '2025-09-16 18:00:00', '#00BCD4', NULL, 'A', '2025-09-16', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(4, 1485, NULL, 'MSGAS', '2025-09-17 07:30:00', NULL, NULL, '2025-09-17 17:30:00', '#2196F3', '<ul><li>Integração e-Sfinge - Contabilidade</li></ul>', 'A', '2025-09-17', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(8, 1486, NULL, 'Health', '2025-09-18 08:00:00', NULL, NULL, '2025-09-18 09:00:00', '#9E9E9E', NULL, 'A', '2025-09-18', '08:00:00', '09:00:00', '00:00:00', '00:00:00', '01:00:00', 'P'),
(3, 1487, NULL, 'FUNLEC', '2025-09-18 09:00:00', NULL, NULL, '2025-09-18 17:30:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2025-09-18', '09:00:00', '17:30:00', '11:30:00', '13:00:00', '07:00:00', 'P'),
(5, 1488, NULL, 'RCG', '2025-09-19 08:00:00', NULL, NULL, '2025-09-19 18:00:00', '#00BCD4', NULL, 'A', '2025-09-19', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(5, 1489, NULL, 'RCG', '2025-09-11 19:00:00', NULL, NULL, '2025-09-11 21:00:00', '#00BCD4', '<ul><li>SuperAmas2025</li></ul>', 'A', '2025-09-11', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', 'P'),
(4, 1490, NULL, 'MSGAS', '2025-09-21 17:00:00', NULL, NULL, '2025-09-21 18:00:00', '#2196F3', '<ul><li>Atualização RH dev</li></ul>', 'A', '2025-09-21', '17:00:00', '18:00:00', '00:00:00', '00:00:00', '01:00:00', 'R'),
(4, 1491, NULL, 'MSGAS', '2025-09-22 07:30:00', NULL, NULL, '2025-09-22 11:30:00', '#2196F3', '<ul><li>Integração e-Sfinge - Contabilidade</li></ul>', 'A', '2025-09-22', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(4, 1492, NULL, 'MSGAS', '2025-09-23 19:00:00', NULL, NULL, '2025-09-23 22:00:00', '#2196F3', '<ul><li>Atualização Sistema</li><li>25-09-05_ATUALIZACAO_12.1.2410_MDT</li><li>25-09-11_ATUALIZACAO_12.1.2410_TSS_PROTHEUS</li><li>25-09-09-CENTRAL_DE_ATUALIZACOES_V2_6_0</li><li>25-09-01-LIB_LABEL_11082025_P12_ONCA</li><li>25-09-16_ATUALIZACAO_12.1.2410_RH</li><li>25-08-18-TOTVS_DBACCESS_BUILD_24.1.0.7</li><li>25-08-28_ATUALIZACAO_12.1.2410_BACKOFFICE</li></ul>', 'A', '2025-09-23', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(5, 1493, NULL, 'RCG', '2025-09-22 13:00:00', NULL, NULL, '2025-09-22 18:00:00', '#00BCD4', NULL, 'A', '2025-09-22', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(5, 1494, NULL, 'RCG', '2025-09-23 08:00:00', NULL, NULL, '2025-09-23 18:00:00', '#00BCD4', NULL, 'A', '2025-09-23', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(4, 1495, NULL, 'MSGAS', '2025-09-23 10:00:00', NULL, NULL, '2025-09-23 11:30:00', '#2196F3', '<ul><li>Chamado esfinge</li></ul>', 'A', '2025-09-23', '10:00:00', '11:30:00', '00:00:00', '00:00:00', '01:30:00', 'R'),
(4, 1496, NULL, 'MSGAS', '2025-09-24 07:30:00', NULL, NULL, '2025-09-24 17:30:00', '#2196F3', '<ul><li>Integração e-Sfinge - Contabilidade</li></ul>', 'A', '2025-09-24', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(3, 1497, NULL, 'FUNLEC', '2025-09-25 07:30:00', NULL, NULL, '2025-09-25 17:30:00', '#4CAF50', '<ul><li>Provisão Ferias</li></ul>', 'A', '2025-09-25', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(3, 1498, NULL, 'FUNLEC', '2025-09-25 19:00:00', NULL, NULL, '2025-09-25 22:00:00', '#4CAF50', '<ul><li>Provisão Ferias</li></ul>', 'A', '2025-09-25', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(5, 1499, NULL, 'RCG', '2025-09-26 08:00:00', NULL, NULL, '2025-09-26 18:00:00', '#00BCD4', NULL, 'A', '2025-09-26', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(4, 1500, NULL, 'MSGAS', '2025-09-26 08:00:00', NULL, NULL, '2025-09-26 11:00:00', '#2196F3', '<ul><li>Ciclo de Palestras e-Sfinge: Módulo Atos de Pessoal</li></ul>', 'A', '2025-09-26', '08:00:00', '11:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(3, 1501, NULL, 'FUNLEC', '2025-09-29 07:30:00', NULL, NULL, '2025-09-29 11:30:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2025-09-29', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(5, 1502, NULL, 'RCG', '2025-09-30 08:00:00', NULL, NULL, '2025-09-30 18:00:00', '#00BCD4', NULL, 'A', '2025-09-30', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(5, 1503, NULL, 'RCG', '2025-09-29 13:00:00', NULL, NULL, '2025-09-29 18:00:00', '#00BCD4', NULL, 'A', '2025-09-29', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(4, 1504, NULL, 'MSGAS', '2025-09-29 13:30:00', NULL, NULL, '2025-09-29 17:00:00', '#2196F3', '<ul><li>Integração e-Sfinge - Contabilidade</li></ul>', 'A', '2025-09-29', '13:30:00', '17:00:00', '00:00:00', '00:00:00', '03:30:00', 'R'),
(3, 1505, NULL, 'FUNLEC', '2025-09-17 19:00:00', NULL, NULL, '2025-09-17 22:00:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2025-09-17', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(3, 1506, NULL, 'FUNLEC', '2025-09-30 09:00:00', NULL, NULL, '2025-09-30 16:30:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2025-09-30', '09:00:00', '16:30:00', '11:30:00', '13:00:00', '06:00:00', 'P'),
(4, 1507, NULL, 'MSGAS', '2025-10-01 07:30:00', NULL, NULL, '2025-10-01 17:30:00', '#2196F3', '<ul><li>Integração e-Sfinge - Contabilidade</li></ul>', 'A', '2025-10-01', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(4, 1508, NULL, 'MSGAS', '2025-10-02 07:30:00', NULL, NULL, '2025-10-02 17:30:00', '#2196F3', '<ul><li>Integração e-Sfinge - Contabilidade</li></ul>', 'A', '2025-10-02', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(3, 1509, NULL, 'FUNLEC', '2025-10-01 09:00:00', NULL, NULL, '2025-10-01 15:00:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2025-10-01', '09:00:00', '15:00:00', '11:30:00', '13:30:00', '04:00:00', 'R'),
(3, 1510, NULL, 'FUNLEC', '2025-10-01 19:00:00', NULL, NULL, '2025-10-01 22:00:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2025-10-01', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(5, 1511, NULL, 'RCG', '2025-10-03 08:00:00', NULL, NULL, '2025-10-03 18:00:00', '#00BCD4', NULL, 'A', '2025-10-03', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P');
INSERT INTO `agendamento` (`contrato_id`, `id`, `profissional_id`, `descricao`, `horario_inicial`, `intervalo_inicial`, `intervalo_final`, `horario_final`, `cor`, `observacao`, `tipo`, `data_agenda`, `hora_inicio`, `hora_fim`, `hora_intervalo_inicial`, `hora_intervalo_final`, `hora_total`, `local`) VALUES
(3, 1513, NULL, 'FUNLEC', '2025-10-13 07:30:00', NULL, NULL, '2025-10-13 11:30:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2025-10-13', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(5, 1514, NULL, 'RCG', '2025-10-13 13:00:00', NULL, NULL, '2025-10-13 18:00:00', '#00BCD4', NULL, 'A', '2025-10-13', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(5, 1515, NULL, 'RCG', '2025-10-13 19:00:00', NULL, NULL, '2025-10-13 22:00:00', '#00BCD4', '<ul><li>Atualização Sistema</li></ul>', 'A', '2025-10-13', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(5, 1516, NULL, 'RCG', '2025-10-14 07:30:00', NULL, NULL, '2025-10-14 18:00:00', '#00BCD4', NULL, 'A', '2025-10-14', '07:30:00', '18:00:00', '11:30:00', '15:00:00', '07:00:00', 'P'),
(4, 1517, NULL, 'MSGAS', '2025-10-14 19:00:00', NULL, NULL, '2025-10-14 22:00:00', '#2196F3', '<div>Tentativa de Atualização Ambiente: Falha de Linux</div>', 'A', '2025-10-14', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(4, 1518, NULL, 'MSGAS', '2025-10-15 07:30:00', NULL, NULL, '2025-10-15 17:30:00', '#2196F3', '<ul><li>Integração e-Sfinge - Contabilidade</li></ul><div>Atualização Ambiente DESENVOLVIMENTO</div><ul><li>25-08-27_ATUALIZACAO_12.1.2410_TAF_EXPEDICAO_CONTINUA</li><li>25-10-03_ATUALIZACAO_12.1.2410_MDT_EXPEDICAO_CONTINUA</li><li>25-10-07_ATUALIZACAO_12.1.2410_BACKOFFICE_EXPEDICAO_CONTINUA</li><li>25-10-07_ATUALIZACAO_12.1.2410_RH_EXPEDICAO_CONTINUA</li><li>25-10-08-P12_SMARTCLIENT_WEBAPP_10.1.5-LINUX_X64</li><li>25-10-07-SMARTLINK-2.6.7_ONCA</li><li>25-10-06-LIB_LABEL_06102025_P12_ONCA</li><li>25-10-06-TOTVS_DBACCESS_BUILD_24.1.1.0_LINUX_X64</li><li>25-10-06-P12_APPSERVER_BUILD-24.3.1.1_LINUX_X64</li><li>TSS</li></ul>', 'A', '2025-10-15', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(4, 1519, NULL, 'MSGAS', '2025-10-16 07:30:00', NULL, NULL, '2025-10-16 17:30:00', '#2196F3', '<ul><li>Atualização SmartView</li></ul>', 'A', '2025-10-16', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(5, 1520, NULL, 'RCG', '2025-10-17 07:30:00', NULL, NULL, '2025-10-17 18:00:00', '#00BCD4', NULL, 'A', '2025-10-17', '07:30:00', '18:00:00', '11:30:00', '13:00:00', '09:00:00', 'P'),
(4, 1521, NULL, 'MSGAS', '2025-10-15 19:30:00', NULL, NULL, '2025-10-15 22:30:00', '#2196F3', '<ul><li><div>Atualização Ambiente PRODUÇÃO</div><ul style=\"margin-bottom: 1rem;\"><li>25-08-27_ATUALIZACAO_12.1.2410_TAF_EXPEDICAO_CONTINUA</li><li>25-10-03_ATUALIZACAO_12.1.2410_MDT_EXPEDICAO_CONTINUA</li><li>25-10-07_ATUALIZACAO_12.1.2410_BACKOFFICE_EXPEDICAO_CONTINUA</li><li>25-10-07_ATUALIZACAO_12.1.2410_RH_EXPEDICAO_CONTINUA</li><li>25-10-08-P12_SMARTCLIENT_WEBAPP_10.1.5-LINUX_X64</li><li>25-10-07-SMARTLINK-2.6.7_ONCA</li><li>25-10-06-LIB_LABEL_06102025_P12_ONCA</li><li>25-10-06-TOTVS_DBACCESS_BUILD_24.1.1.0_LINUX_X64</li><li>25-10-06-P12_APPSERVER_BUILD-24.3.1.1_LINUX_X64</li><li>TSS</li></ul></li></ul>', 'A', '2025-10-15', '19:30:00', '22:30:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(4, 1522, NULL, 'MSGAS', '2025-10-16 19:00:00', NULL, NULL, '2025-10-16 20:30:00', '#2196F3', '<ul><li>Atualização SmatView</li></ul>', 'A', '2025-10-16', '19:00:00', '20:30:00', '00:00:00', '00:00:00', '01:30:00', 'R'),
(3, 1523, NULL, 'FUNLEC', '2025-10-18 09:00:00', NULL, NULL, '2025-10-18 11:30:00', '#4CAF50', '<ul><li><div>Atualização Ambiente&nbsp;</div><ul style=\"margin-bottom: 1rem;\"><li>25-08-27_ATUALIZACAO_12.1.2410_TAF_EXPEDICAO_CONTINUA</li><li>25-10-03_ATUALIZACAO_12.1.2410_MDT_EXPEDICAO_CONTINUA</li><li>25-10-07_ATUALIZACAO_12.1.2410_BACKOFFICE_EXPEDICAO_CONTINUA</li><li>25-10-07_ATUALIZACAO_12.1.2410_RH_EXPEDICAO_CONTINUA</li><li>25-10-08-P12_SMARTCLIENT_WEBAPP_10.1.5</li><li>25-10-07-SMARTLINK-2.6.7_ONCA</li><li>25-10-06-LIB_LABEL_06102025_P12_ONCA</li><li>25-10-06-TOTVS_DBACCESS_BUILD_24.1.1.0</li><li>25-10-06-P12_APPSERVER_BUILD-24.3.1.1</li><li>TSS</li></ul></li></ul>', 'A', '2025-10-18', '09:00:00', '11:30:00', '00:00:00', '00:00:00', '02:30:00', 'R'),
(3, 1524, NULL, 'FUNLEC', '2025-10-20 07:30:00', NULL, NULL, '2025-10-20 11:30:00', '#4CAF50', '<ul><li>Suporte Folha&nbsp;</li></ul>', 'A', '2025-10-20', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(5, 1525, NULL, 'RCG', '2025-10-20 13:00:00', NULL, NULL, '2025-10-20 18:00:00', '#00BCD4', NULL, 'A', '2025-10-20', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(4, 1526, NULL, 'MSGAS', '2025-10-21 07:30:00', NULL, NULL, '2025-10-21 17:30:00', '#2196F3', '<ul><li>SmartView</li><li>e-Sfine</li></ul>', 'A', '2025-10-21', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(5, 1527, NULL, 'RCG', '2025-10-21 18:10:00', NULL, NULL, '2025-10-21 20:00:00', '#00BCD4', '<ul><li>Conferencia Contas a Receber</li></ul>', 'A', '2025-10-21', '18:10:00', '20:00:00', '00:00:00', '00:00:00', '01:50:00', 'P'),
(5, 1528, NULL, 'RCG', '2025-10-22 09:00:00', NULL, NULL, '2025-10-22 18:30:00', '#00BCD4', NULL, 'A', '2025-10-22', '09:00:00', '18:30:00', '12:00:00', '13:30:00', '08:00:00', 'P'),
(4, 1529, NULL, 'MSGAS', '2025-10-23 07:30:00', NULL, NULL, '2025-10-23 17:30:00', '#2196F3', '<ul><li>Api Alteração Cliente</li><li>e-Sfinge</li></ul>', 'A', '2025-10-23', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(5, 1530, NULL, 'RCG', '2025-10-24 07:30:00', NULL, NULL, '2025-10-24 10:00:00', '#00BCD4', NULL, 'A', '2025-10-24', '07:30:00', '10:00:00', '00:00:00', '00:00:00', '02:30:00', 'P'),
(5, 1531, NULL, 'RCG', '2025-10-24 12:00:00', NULL, NULL, '2025-10-24 18:00:00', '#00BCD4', NULL, 'A', '2025-10-24', '12:00:00', '18:00:00', '00:00:00', '00:00:00', '06:00:00', 'P'),
(3, 1532, NULL, 'FUNLEC', '2025-10-27 07:30:00', NULL, NULL, '2025-10-27 11:30:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2025-10-27', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(3, 1533, NULL, 'FUNLEC', '2025-10-27 14:00:00', NULL, NULL, '2025-10-27 16:00:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2025-10-27', '14:00:00', '16:00:00', '00:00:00', '00:00:00', '02:00:00', 'R'),
(5, 1534, NULL, 'RCG', '2025-10-27 13:00:00', NULL, NULL, '2025-10-27 18:00:00', '#00BCD4', NULL, 'A', '2025-10-27', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(5, 1535, NULL, 'RCG', '2025-10-28 08:00:00', NULL, NULL, '2025-10-28 18:00:00', '#00BCD4', NULL, 'A', '2025-10-28', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(4, 1536, NULL, 'MSGAS', '2025-10-29 09:00:00', NULL, NULL, '2025-10-29 17:30:00', '#2196F3', '<ul><li>Extratos API BB</li><li>e-Sfinge</li></ul>', 'A', '2025-10-29', '09:00:00', '17:30:00', '11:30:00', '13:30:00', '06:30:00', 'P'),
(4, 1537, NULL, 'MSGAS', '2025-10-30 07:30:00', NULL, NULL, '2025-10-30 17:30:00', '#2196F3', '<ul><li>e-Sfinge</li><li>Extratos API BB</li></ul>', 'A', '2025-10-30', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(5, 1538, NULL, 'RCG', '2025-10-31 08:00:00', NULL, NULL, '2025-10-31 18:00:00', '#00BCD4', NULL, 'A', '2025-10-31', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(3, 1539, NULL, 'FUNLEC', '2025-10-31 10:00:00', NULL, NULL, '2025-10-31 16:30:00', '#4CAF50', '<ul><li>Suporte Folha de pagamento</li></ul>', 'A', '2025-10-31', '10:00:00', '16:30:00', '11:30:00', '13:00:00', '05:00:00', 'R'),
(3, 1540, NULL, 'FUNLEC', '2025-11-03 07:30:00', NULL, NULL, '2025-11-03 11:30:00', '#4CAF50', '<ul><li>Suporte Folha de pagamento</li></ul>', 'A', '2025-11-03', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(5, 1541, NULL, 'RCG', '2025-11-03 13:00:00', NULL, NULL, '2025-11-03 18:00:00', '#00BCD4', NULL, 'A', '2025-11-03', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(5, 1542, NULL, 'RCG', '2025-11-04 08:00:00', NULL, NULL, '2025-11-04 18:00:00', '#00BCD4', NULL, 'A', '2025-11-04', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(3, 1543, NULL, 'FUNLEC', '2025-11-04 09:00:00', NULL, NULL, '2025-11-04 17:00:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2025-11-04', '09:00:00', '17:00:00', '11:30:00', '13:00:00', '06:30:00', 'R'),
(4, 1544, NULL, 'MSGAS', '2025-11-04 09:00:00', NULL, NULL, '2025-11-04 10:00:00', '#2196F3', '<ul><li>Ajuste JOB&nbsp;<span style=\"color: rgb(43, 46, 47); font-family: Arial, Helvetica, sans-serif; font-size: small;\">FINA715</span></li></ul>', 'A', '2025-11-04', '09:00:00', '10:00:00', '00:00:00', '00:00:00', '01:00:00', 'R'),
(4, 1545, NULL, 'MSGAS', '2025-11-05 07:30:00', NULL, NULL, '2025-11-05 17:30:00', '#2196F3', '<ul><li>e-Sfinge</li></ul>', 'A', '2025-11-05', '07:30:00', '17:30:00', '11:30:00', '14:00:00', '07:30:00', 'P'),
(4, 1546, NULL, 'MSGAS', '2025-11-06 07:30:00', NULL, NULL, '2025-11-06 17:30:00', '#2196F3', '<ul><li>e-Sfinge</li></ul>', 'A', '2025-11-06', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(5, 1547, NULL, 'RCG', '2025-11-07 08:00:00', NULL, NULL, '2025-11-07 18:00:00', '#00BCD4', NULL, 'A', '2025-11-07', '08:00:00', '18:00:00', '12:00:00', '14:30:00', '07:30:00', 'P'),
(8, 1548, NULL, 'Health', '2025-11-07 13:00:00', NULL, NULL, '2025-11-07 14:00:00', '#9E9E9E', '<ul><li>Configurador de Tributos</li></ul>', 'A', '2025-11-07', '13:00:00', '14:00:00', '00:00:00', '00:00:00', '01:00:00', 'P'),
(4, 1549, NULL, 'MSGAS', '2025-11-05 19:00:00', NULL, NULL, '2025-11-05 22:00:00', '#2196F3', '<ul><li>Atualização Sistema<ul><li>25-10-07_ATUALIZACAO_12.1.2410_BACKOFFICE_EXPEDICAO_CONTINUA</li><li>25-10-31_ATUALIZACAO_12.1.2410_MDT_EXPEDICAO_CONTINUA</li><li>25-10-23_ATUALIZACAO_12.1.2410_TSS_PROTHEUS_EXPEDICAO_CONTINUA</li><li>25-10-22_ATUALIZACAO_12.1.2410_TAF_EXPEDICAO_CONTINUA</li><li>25-09-17-TSS_SCHEMAS</li><li>25-09-17-TSS_URLS</li><li>25-09-19-RPO_INSTALADOR_TSS_12.1.2410_EXP.CONTINUA</li></ul></li></ul>', 'A', '2025-11-05', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(3, 1550, NULL, 'FUNLEC', '2025-11-10 07:30:00', NULL, NULL, '2025-11-10 11:30:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li><li>Atualização Folha de Pagamento</li></ul>', 'A', '2025-11-10', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(5, 1551, NULL, 'RCG', '2025-11-10 13:00:00', NULL, NULL, '2025-11-10 18:00:00', '#00BCD4', NULL, 'A', '2025-11-10', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(5, 1552, NULL, 'RCG', '2025-11-11 08:00:00', NULL, NULL, '2025-11-11 17:30:00', '#00BCD4', NULL, 'A', '2025-11-11', '08:00:00', '17:30:00', '00:00:00', '00:00:00', '09:30:00', 'P'),
(3, 1553, NULL, 'FUNLEC', '2025-11-11 08:00:00', NULL, NULL, '2025-11-11 09:00:00', '#4CAF50', '<ul><li>Relatorios Folha de Pagamento</li></ul>', 'A', '2025-11-11', '08:00:00', '09:00:00', '00:00:00', '00:00:00', '01:00:00', 'R'),
(4, 1554, NULL, 'MSGAS', '2025-11-12 07:30:00', NULL, NULL, '2025-11-12 17:30:00', '#2196F3', '<ul><li>e-Sfinge - Contabil</li></ul>', 'A', '2025-11-12', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(4, 1555, NULL, 'MSGAS', '2025-11-13 07:30:00', NULL, NULL, '2025-11-13 17:30:00', '#2196F3', '<ul><li>e-Sfinge - Contabil</li></ul>', 'A', '2025-11-13', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(5, 1556, NULL, 'RCG', '2025-11-14 08:00:00', NULL, NULL, '2025-11-14 18:00:00', '#00BCD4', NULL, 'A', '2025-11-14', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(NULL, 1557, NULL, 'FERIADO', '2025-11-20 08:00:00', NULL, NULL, '2025-11-20 18:00:00', '#E91E63', NULL, 'A', '2025-11-20', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', 'P'),
(4, 1558, NULL, 'MSGAS', '2025-11-14 13:30:00', NULL, NULL, '2025-11-14 17:30:00', '#2196F3', '<ul><li>e-Sfinge - Contabil</li></ul>', 'A', '2025-11-14', '13:30:00', '17:30:00', '00:00:00', '00:00:00', '04:00:00', 'R'),
(3, 1559, NULL, 'FUNLEC', '2025-11-17 07:30:00', NULL, NULL, '2025-11-17 11:30:00', '#4CAF50', '<ul><li>Suporte a Folha de pagamento</li></ul>', 'A', '2025-11-17', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(5, 1560, NULL, 'RCG', '2025-11-18 08:00:00', NULL, NULL, '2025-11-18 18:00:00', '#00BCD4', NULL, 'A', '2025-11-18', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(5, 1561, NULL, 'RCG', '2025-11-17 13:00:00', NULL, NULL, '2025-11-17 18:00:00', '#00BCD4', NULL, 'A', '2025-11-17', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(4, 1562, NULL, 'MSGAS', '2025-11-19 07:30:00', NULL, NULL, '2025-11-19 17:30:00', '#2196F3', '<ul><li>e-Sfinge - Contabil</li></ul>', 'A', '2025-11-19', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(4, 1563, NULL, 'MSGAS', '2025-11-26 07:30:00', NULL, NULL, '2025-11-26 17:30:00', '#2196F3', '<ul><li>e-Sfinge - Contabil</li><li>Atualização ambiente HML<ul><li>25-11-13-P12_APPSERVER_BUILD-24.3.1.4_LINUX_X64</li><li>25-11-06_ATUALIZACAO_12.1.2410_TSS_PROTHEUS_EXPEDICAO_CONTINUA</li><li>25-11-07_ATUALIZACAO_12.1.2410_BACKOFFICE_EXPEDICAO_CONTINUA</li><li>PACOTE_DE_CORRECAO_000000_DSERTAF4-2669_12.1.2410</li><li>PACOTE_DE_CORRECAO_000000_DSERFAT-32698_12.1.2410</li><li>PACOTE_DE_CORRECAO_000000_DSERFIS4-2969_12.1.2410</li><li>25-11-25-CENTRAL_DE_ATUALIZACOES_V2_6_4</li></ul></li><li>TSS HML<ul><li>25-11-13-RPO_INSTALADOR_TSS_12.1.2410_EXP.CONTINUA</li><li>25-11-13-TSS_SCHEMAS</li><li>25-11-13-TSS_URLS</li></ul></li><li>RDMAKE HML<ul><li>25-11-12-RDMAKES_SPED_NF-E</li></ul></li></ul>', 'A', '2025-11-26', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(4, 1564, NULL, 'MSGAS', '2025-11-27 07:30:00', NULL, NULL, '2025-11-27 17:30:00', '#2196F3', '<ul><li>e-Sfinge - Contabil</li></ul>', 'A', '2025-11-27', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(3, 1565, NULL, 'FUNLEC', '2025-11-24 07:30:00', NULL, NULL, '2025-11-24 11:30:00', '#4CAF50', '<ul><li>Suporte Folha de Pgamento</li></ul>', 'A', '2025-11-24', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(5, 1566, NULL, 'RCG', '2025-11-24 13:00:00', NULL, NULL, '2025-11-24 18:00:00', '#00BCD4', NULL, 'A', '2025-11-24', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(5, 1567, NULL, 'RCG', '2025-11-25 08:00:00', NULL, NULL, '2025-11-25 18:00:00', '#00BCD4', NULL, 'A', '2025-11-25', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(5, 1568, NULL, 'RCG', '2025-11-28 08:00:00', NULL, NULL, '2025-11-28 18:00:00', '#00BCD4', NULL, 'A', '2025-11-28', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(5, 1569, NULL, 'RCG', '2025-11-21 08:00:00', NULL, NULL, '2025-11-21 17:00:00', '#00BCD4', NULL, 'A', '2025-11-21', '08:00:00', '17:00:00', '12:00:00', '13:00:00', '08:00:00', 'P'),
(4, 1570, NULL, 'MSGAS', '2025-11-17 14:00:00', NULL, NULL, '2025-11-17 17:00:00', '#2196F3', '<ul><li>e-Sfinge - Contabil</li></ul>', 'A', '2025-11-17', '14:00:00', '17:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(4, 1571, NULL, 'MSGAS', '2025-11-18 14:00:00', NULL, NULL, '2025-11-18 17:00:00', '#2196F3', '<ul><li>e-Sfinge - Contabil</li></ul>', 'A', '2025-11-18', '14:00:00', '17:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(4, 1573, NULL, 'MSGAS', '2025-11-25 09:00:00', NULL, NULL, '2025-11-25 17:00:00', '#2196F3', '<ul><li>e-Sfinge - Contabil</li></ul>', 'A', '2025-11-25', '09:00:00', '17:00:00', '11:30:00', '13:00:00', '06:30:00', 'R'),
(4, 1575, NULL, 'MSGAS', '2025-12-05 08:00:00', NULL, NULL, '2025-12-05 12:00:00', '#2196F3', '<ul><li><span data-olk-copy-source=\"MessageBody\">Alterações do Sistema e-Sfinge para 2026 TCE EAD</span></li></ul>', 'A', '2025-12-05', '08:00:00', '12:00:00', '00:00:00', '00:00:00', '04:00:00', 'R'),
(4, 1576, NULL, 'MSGAS', '2025-11-28 08:00:00', NULL, NULL, '2025-11-28 11:00:00', '#2196F3', '<ul><li>e-Sfinge - Contabil</li></ul>', 'A', '2025-11-28', '08:00:00', '11:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(4, 1577, NULL, 'MSGAS', '2025-12-01 07:30:00', NULL, NULL, '2025-12-01 11:30:00', '#2196F3', '<ul><li>e-Sfinge - Contabil(V2)</li></ul>', 'A', '2025-12-01', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'R'),
(4, 1578, NULL, 'MSGAS', '2025-12-03 07:30:00', NULL, NULL, '2025-12-03 17:30:00', '#2196F3', '<ul style=\"color: rgb(134, 148, 176);\"><li>e-Sfinge - Contabil(V2)</li></ul>', 'A', '2025-12-03', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(4, 1579, NULL, 'MSGAS', '2025-12-04 07:30:00', NULL, NULL, '2025-12-04 17:30:00', '#2196F3', '<ul style=\"color: rgb(134, 148, 176);\"><li>e-Sfinge - Contabil(V2)</li></ul>', 'A', '2025-12-04', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(NULL, 1580, NULL, 'FERIADO', '2025-12-25 08:00:00', NULL, NULL, '2025-12-25 18:00:00', '#F44336', NULL, 'A', '2025-12-25', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', 'P'),
(NULL, 1581, NULL, 'FERIADO', '2026-01-01 08:00:00', NULL, NULL, '2026-01-01 18:00:00', '#F44336', NULL, 'A', '2026-01-01', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', 'P'),
(3, 1586, NULL, 'FUNLEC', '2025-11-28 08:00:00', NULL, NULL, '2025-11-28 12:00:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2025-11-28', '08:00:00', '12:00:00', '00:00:00', '00:00:00', '04:00:00', 'R'),
(3, 1587, NULL, 'FUNLEC', '2025-12-03 19:00:00', NULL, NULL, '2025-12-03 22:00:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2025-12-03', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(3, 1588, NULL, 'FUNLEC', '2025-12-02 19:00:00', NULL, NULL, '2025-12-02 22:00:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2025-12-02', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'P'),
(3, 1589, NULL, 'FUNLEC', '2025-12-01 07:30:00', NULL, NULL, '2025-12-01 11:30:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2025-12-01', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(5, 1590, NULL, 'RCG', '2025-12-01 13:00:00', NULL, NULL, '2025-12-01 18:00:00', '#00BCD4', NULL, 'A', '2025-12-01', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(5, 1591, NULL, 'RCG', '2025-12-02 08:00:00', NULL, NULL, '2025-12-02 18:00:00', '#00BCD4', NULL, 'A', '2025-12-02', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(5, 1592, NULL, 'RCG', '2025-12-05 08:00:00', NULL, NULL, '2025-12-05 18:00:00', '#00BCD4', NULL, 'A', '2025-12-05', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(3, 1593, NULL, 'FUNLEC', '2025-12-08 07:30:00', NULL, NULL, '2025-12-08 11:30:00', '#4CAF50', '<ul><li>Apoio Folha de pagamento</li></ul>', 'A', '2025-12-08', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(3, 1594, NULL, 'FUNLEC', '2025-12-08 19:00:00', NULL, NULL, '2025-12-08 21:00:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2025-12-08', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', 'R'),
(5, 1595, NULL, 'RCG', '2025-12-08 13:00:00', NULL, NULL, '2025-12-08 18:00:00', '#00BCD4', NULL, 'A', '2025-12-08', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(5, 1596, NULL, 'RCG', '2025-12-09 08:00:00', NULL, NULL, '2025-12-09 18:00:00', '#00BCD4', NULL, 'A', '2025-12-09', '08:00:00', '18:00:00', '11:00:00', '13:00:00', '08:00:00', 'P'),
(5, 1597, NULL, 'RCG', '2025-12-12 08:00:00', NULL, NULL, '2025-12-12 12:00:00', '#00BCD4', NULL, 'A', '2025-12-12', '08:00:00', '12:00:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(NULL, 1598, NULL, 'Beatriz', '2025-12-12 13:00:00', NULL, NULL, '2025-12-12 18:00:00', '#E91E63', NULL, 'A', '2025-12-12', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(NULL, 1599, NULL, 'Beatriz', '2025-12-13 08:00:00', NULL, NULL, '2025-12-13 18:00:00', '#E91E63', NULL, 'A', '2025-12-13', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', 'P'),
(3, 1600, NULL, 'FUNLEC', '2025-12-09 14:00:00', NULL, NULL, '2025-12-09 15:00:00', '#4CAF50', '<ul><li>Suporte folha de pagamento</li></ul>', 'A', '2025-12-09', '14:00:00', '15:00:00', '00:00:00', '00:00:00', '01:00:00', 'P'),
(4, 1601, NULL, 'MSGAS', '2025-12-09 19:00:00', NULL, NULL, '2025-12-09 22:00:00', '#2196F3', '<ul><li>Ajuste casas decimais campo de valor unitario</li></ul>', 'A', '2025-12-09', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(3, 1602, NULL, 'FUNLEC', '2025-12-15 07:30:00', NULL, NULL, '2025-12-15 08:30:00', '#4CAF50', '<ul><li>Suporte Folha de pagamento</li></ul>', 'A', '2025-12-15', '07:30:00', '08:30:00', '00:00:00', '00:00:00', '01:00:00', 'P'),
(5, 1603, NULL, 'RCG', '2025-12-15 08:30:00', NULL, NULL, '2025-12-15 11:30:00', '#00BCD4', NULL, 'A', '2025-12-15', '08:30:00', '11:30:00', '00:00:00', '00:00:00', '03:00:00', 'P'),
(3, 1604, NULL, 'FUNLEC', '2025-12-15 13:00:00', NULL, NULL, '2025-12-15 17:30:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2025-12-15', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', 'P'),
(5, 1605, NULL, 'RCG', '2025-12-16 08:00:00', NULL, NULL, '2025-12-16 18:00:00', '#00BCD4', NULL, 'A', '2025-12-16', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(4, 1606, NULL, 'MSGAS', '2025-12-16 19:00:00', NULL, NULL, '2025-12-16 22:00:00', '#2196F3', '<ul><li>Atualização<ul><li>25-08-18-TOTVSLICENSE_3.7.0_LINUX</li><li>25-12-06_ATUALIZACAO_12.1.2410_BACKOFFICE_EXPEDICAO_CONTINUA</li><li>25-12-08_ATUALIZACAO_12.1.2410_TSS_PROTHEUS_EXPEDICAO_CONTINUA</li><li>25-12-12-RPO_INSTALADOR_TSS_12.1.2410_EXP.CONTINUA</li><li>25-12-12-TSS_SCHEMAS</li><li>25-12-03-LIB_LABEL_17112025_P12_ONCA</li><li>25-12-12-TSS_URLS</li></ul></li></ul>', 'A', '2025-12-16', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(3, 1607, NULL, 'FUNLEC', '2025-12-17 19:00:00', NULL, NULL, '2025-12-17 22:00:00', '#4CAF50', '<ul><li>Atualização<ul><li><span style=\"color: rgb(102, 102, 102); font-family: &quot;Roboto Condensed&quot;, Roboto, sans-serif; font-size: 16px; letter-spacing: -0.2px;\">25-12-12_ATUALIZACAO_12.1.2410_MDT_EXPEDICAO_CONTINUA</span></li><li><font color=\"#666666\" face=\"Roboto Condensed, Roboto, sans-serif\"><span style=\"font-size: 16px; letter-spacing: -0.2px;\"><span style=\"letter-spacing: -0.2px;\">25-12-05_ATUALIZACAO_12.1.2410_TAF_EXPEDICAO_CONTINUA</span></span></font></li><li><font color=\"#666666\" face=\"Roboto Condensed, Roboto, sans-serif\"><span style=\"font-size: 16px; letter-spacing: -0.2px;\"><span style=\"letter-spacing: -0.2px;\"><span style=\"letter-spacing: -0.2px;\">25-12-09_ATUALIZACAO_12.1.2410_RH_EXPEDICAO_CONTINUA</span></span></span></font></li><li><font color=\"#666666\" face=\"Roboto Condensed, Roboto, sans-serif\"><span style=\"font-size: 16px; letter-spacing: -0.2px;\">25-12-06_ATUALIZACAO_12.1.2410_BACKOFFICE_EXPEDICAO_CONTINUA</span></font></li><li><font color=\"#666666\" face=\"Roboto Condensed, Roboto, sans-serif\"><span style=\"font-size: 16px; letter-spacing: -0.2px;\">25-12-12-RPO_INSTALADOR_TSS_12.1.2410_EXP.CONTINUA</span></font></li><li><font color=\"#666666\" face=\"Roboto Condensed, Roboto, sans-serif\"><span style=\"font-size: 16px; letter-spacing: -0.2px;\">25-12-12-TSS_SCHEMAS</span></font></li><li><font color=\"#666666\" face=\"Roboto Condensed, Roboto, sans-serif\"><span style=\"font-size: 16px; letter-spacing: -0.2px;\">25-12-03-LIB_LABEL_17112025_P12_ONCA</span></font></li><li><font color=\"#666666\" face=\"Roboto Condensed, Roboto, sans-serif\"><span style=\"font-size: 16px; letter-spacing: -0.2px;\">25-12-12-TSS_URLS</span></font></li></ul></li></ul>', 'A', '2025-12-17', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'P'),
(5, 1608, NULL, 'RCG', '2025-12-19 08:00:00', NULL, NULL, '2025-12-19 18:00:00', '#00BCD4', NULL, 'A', '2025-12-19', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(4, 1609, NULL, 'MSGAS', '2025-12-22 07:30:00', NULL, NULL, '2025-12-22 17:30:00', '#2196F3', '<ul><li>e-Sfinge TCE - Folha</li></ul>', 'A', '2025-12-22', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(4, 1610, NULL, 'MSGAS', '2025-12-23 07:30:00', NULL, NULL, '2025-12-23 17:30:00', '#2196F3', '<ul><li>e-Sfinge TCE - Folha</li></ul>', 'A', '2025-12-23', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(5, 1613, NULL, 'RCG', '2025-12-29 13:00:00', NULL, NULL, '2025-12-29 18:00:00', '#00BCD4', NULL, 'A', '2025-12-29', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(5, 1614, NULL, 'RCG', '2025-12-30 08:00:00', NULL, NULL, '2025-12-30 18:00:00', '#00BCD4', NULL, 'A', '2025-12-30', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(5, 1616, NULL, 'RCG', '2026-01-02 08:00:00', NULL, NULL, '2026-01-02 18:00:00', '#00BCD4', '<p><br></p>', 'A', '2026-01-02', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(4, 1617, NULL, 'MSGAS', '2025-12-17 07:30:00', NULL, NULL, '2025-12-17 17:30:00', '#2196F3', '<ul><li>e-Sfinge TCE - Folha</li></ul>', 'A', '2025-12-17', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(4, 1618, NULL, 'MSGAS', '2025-12-18 07:30:00', NULL, NULL, '2025-12-18 17:30:00', '#2196F3', '<ul><li>e-Sfinge TCE - Folha</li></ul>', 'A', '2025-12-18', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(4, 1619, NULL, 'MSGAS', '2025-12-17 20:00:00', NULL, NULL, '2025-12-17 22:00:00', '#2196F3', '<ul><li>Criação de Campo E-Esfinge TCE</li></ul>', 'A', '2025-12-17', '20:00:00', '22:00:00', '00:00:00', '00:00:00', '02:00:00', 'R'),
(4, 1620, NULL, 'MSGAS', '2025-12-10 07:30:00', NULL, NULL, '2025-12-10 17:30:00', '#2196F3', '<ul><li>e-Sfinge TCE - Folha</li></ul>', 'A', '2025-12-10', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(4, 1621, NULL, 'MSGAS', '2025-12-11 07:30:00', NULL, NULL, '2025-12-11 17:30:00', '#2196F3', '<ul><li>e-Sfinge TCE - Folha</li></ul>', 'A', '2025-12-11', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(4, 1623, NULL, 'MSGAS', '2026-01-05 19:00:00', NULL, NULL, '2026-01-05 22:00:00', '#2196F3', '<ul><li>Atualização de sistema realizada em 22/12<ul><li>Nova Tabela de IRRF - Folha de Pagamento</li></ul></li></ul>', 'A', '2026-01-05', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(3, 1624, NULL, 'FUNLEC', '2025-12-22 08:00:00', NULL, NULL, '2025-12-22 11:00:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2025-12-22', '08:00:00', '11:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(5, 1625, NULL, 'RCG', '2025-12-23 19:00:00', NULL, NULL, '2025-12-23 22:00:00', '#00BCD4', '<ul><li>C</li></ul>', 'A', '2025-12-23', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(5, 1626, NULL, 'RCG', '2025-12-22 19:00:00', NULL, NULL, '2025-12-22 21:00:00', '#00BCD4', '<ul><li>Reforna Tributaria</li></ul>', 'A', '2025-12-22', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', 'R'),
(5, 1627, NULL, 'RCG', '2025-12-29 19:00:00', NULL, NULL, '2025-12-29 21:00:00', '#00BCD4', NULL, 'A', '2025-12-29', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', 'R'),
(NULL, 1628, NULL, 'Priscila', '2025-12-29 08:00:00', NULL, NULL, '2025-12-29 11:00:00', '#3a87ad', NULL, 'A', '2025-12-29', '08:00:00', '11:00:00', '00:00:00', '00:00:00', '03:00:00', 'P'),
(5, 1629, NULL, 'RCG', '2025-12-11 19:00:00', NULL, NULL, '2025-12-11 22:00:00', '#00BCD4', '<ul><li>Atualização de Sistema</li></ul>', 'A', '2025-12-11', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(NULL, 1630, NULL, 'Ferias', '2026-01-09 13:00:00', NULL, NULL, '2026-01-09 18:00:00', '#3a87ad', NULL, 'A', '2026-01-09', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(NULL, 1631, NULL, 'Ferias', '2026-01-12 07:30:00', NULL, NULL, '2026-01-12 11:30:00', '#3a87ad', NULL, 'A', '2026-01-12', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(NULL, 1632, NULL, 'Ferias', '2026-01-13 08:00:00', NULL, NULL, '2026-01-13 18:00:00', '#3a87ad', NULL, 'A', '2026-01-13', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(NULL, 1633, NULL, 'Ferias', '2026-01-14 08:00:00', NULL, NULL, '2026-01-14 18:00:00', '#3a87ad', NULL, 'A', '2026-01-14', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', 'P'),
(NULL, 1634, NULL, 'Ferias', '2026-01-15 08:00:00', NULL, NULL, '2026-01-15 18:00:00', '#3a87ad', NULL, 'A', '2026-01-15', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', 'P'),
(NULL, 1635, NULL, 'Feriado', '2025-12-31 08:00:00', NULL, NULL, '2025-12-31 18:00:00', '#F44336', NULL, 'A', '2025-12-31', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', 'P'),
(3, 1636, NULL, 'FUNLEC', '2026-01-05 07:30:00', NULL, NULL, '2026-01-05 11:30:00', '#4CAF50', '<ul><li>Suporte folha de Pagamento</li></ul>', 'A', '2026-01-05', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(5, 1637, NULL, 'RCG', '2026-01-05 13:00:00', NULL, NULL, '2026-01-05 18:00:00', '#00BCD4', NULL, 'A', '2026-01-05', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(5, 1638, NULL, 'RCG', '2026-01-06 08:00:00', NULL, NULL, '2026-01-06 18:00:00', '#00BCD4', NULL, 'A', '2026-01-06', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(3, 1639, NULL, 'FUNLEC', '2026-01-06 13:00:00', NULL, NULL, '2026-01-06 14:00:00', '#4CAF50', '<ul><li>Suporte Folha de pagamento</li></ul>', 'A', '2026-01-06', '13:00:00', '14:00:00', '00:00:00', '00:00:00', '01:00:00', 'R'),
(4, 1640, NULL, 'MSGAS', '2026-01-06 19:00:00', NULL, NULL, '2026-01-06 22:00:00', '#2196F3', '<ul><li>Atualização de Sistema<ul><li>25-12-23-SMARTLINK-2.6.8_ONCA</li><li>25-12-22-LIB_LABEL_22122025_P12_ONCA</li><li>25-12-30_ATUALIZACAO_12.1.2410_RH_EXPEDICAO_CONTINUA</li><li>25-12-26_ATUALIZACAO_12.1.2410_MDT_EXPEDICAO_CONTINUA</li><li>25-12-19_ATUALIZACAO_12.1.2410_TAF_EXPEDICAO_CONTINUA</li><li>25-12-29-ARQUIVOS_PORTAL_MEU_RH</li></ul></li></ul>', 'A', '2026-01-06', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(4, 1641, NULL, 'MSGAS', '2026-01-07 07:30:00', NULL, NULL, '2026-01-07 17:30:00', '#2196F3', '<ul><li>Atualização do Sistema<ul><li>PACOTE_DE_CORRECAO_25257165_DSERCTR2_CAPEX-215_12.1.2410</li><li>PACOTE_DE_CORRECAO_25586012_DSTFC-13539_12.1.2410</li><li>PACOTE_DE_CORRECAO_25880331_DSERCTR2-8511_12.1.2410</li></ul></li></ul><p></p><ul></ul><p></p><ul><li>Ajuste Api Negociação<ul><li>Valor Minimo de Parcelas</li><li>Filtro de Situação de Titulos</li></ul></li></ul>', 'A', '2026-01-07', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(4, 1642, NULL, 'MSGAS', '2026-01-08 07:30:00', NULL, NULL, '2026-01-08 17:30:00', '#2196F3', '<ul><li>Ajuste Api Negociação<ul><li>Transferencia de titulos negociados para situação \"0-carteira\"</li></ul></li></ul>', 'A', '2026-01-08', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(5, 1643, NULL, 'RCG', '2026-01-09 08:00:00', NULL, NULL, '2026-01-09 12:00:00', '#00BCD4', NULL, 'A', '2026-01-09', '08:00:00', '12:00:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(3, 1644, NULL, 'FUNLEC', '2026-01-07 12:30:00', NULL, NULL, '2026-01-07 13:30:00', '#4CAF50', '<ul><li>Supote Folha de pagamento</li></ul>', 'A', '2026-01-07', '12:30:00', '13:30:00', '00:00:00', '00:00:00', '01:00:00', 'R'),
(4, 1645, NULL, 'MSGAS', '2026-01-21 07:30:00', NULL, NULL, '2026-01-21 17:30:00', '#2196F3', '<ul><li>Ajuste envio e-sfinge contabil.</li></ul>', 'A', '2026-01-21', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(4, 1646, NULL, 'MSGAS', '2026-01-22 07:30:00', NULL, NULL, '2026-01-22 17:30:00', '#2196F3', '<ul><li>Ajuste envio e-sfinge contabil.</li><li>Relatorio de Conferencia de envio e-sfinge contabil.</li></ul>', 'A', '2026-01-22', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(4, 1647, NULL, 'MSGAS', '2026-01-28 07:30:00', NULL, NULL, '2026-01-28 17:30:00', '#2196F3', '<ul><li>Ajuste envio e-sfinge contabil.</li><li>Relatorio de Conferencia de envio e-sfinge contabil.</li></ul>', 'A', '2026-01-28', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(4, 1648, NULL, 'MSGAS', '2026-01-29 07:30:00', NULL, NULL, '2026-01-29 17:30:00', '#2196F3', '<ul><li>Relatorio de Conferencia de envio e-sfinge contabil.</li></ul>', 'A', '2026-01-29', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(4, 1649, NULL, 'MSGAS', '2026-01-07 19:00:00', NULL, NULL, '2026-01-07 20:00:00', '#2196F3', '<ul><li>Aplicado patch&nbsp;<ul><li>PACOTE_DE_CORRECAO_25880331_DSERCTR2-8511_12.1.2410</li></ul></li></ul>', 'A', '2026-01-07', '19:00:00', '20:00:00', '00:00:00', '00:00:00', '01:00:00', 'R'),
(3, 1650, NULL, 'FUNLEC', '2026-01-07 19:00:00', NULL, NULL, '2026-01-07 22:00:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2026-01-07', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(3, 1651, NULL, 'FUNLEC', '2026-01-08 08:00:00', NULL, NULL, '2026-01-08 09:00:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2026-01-08', '08:00:00', '09:00:00', '00:00:00', '00:00:00', '01:00:00', 'R'),
(3, 1652, NULL, 'FUNLEC', '2026-01-19 07:30:00', NULL, NULL, '2026-01-19 11:30:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2026-01-19', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(5, 1653, NULL, 'RCG', '2026-01-19 13:00:00', NULL, NULL, '2026-01-19 18:00:00', '#00BCD4', NULL, 'A', '2026-01-19', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(5, 1654, NULL, 'RCG', '2026-01-20 08:00:00', NULL, NULL, '2026-01-20 18:00:00', '#00BCD4', NULL, 'A', '2026-01-20', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(5, 1655, NULL, 'RCG', '2026-01-23 08:00:00', NULL, NULL, '2026-01-23 18:00:00', '#00BCD4', NULL, 'A', '2026-01-23', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(3, 1656, NULL, 'FUNLEC', '2026-01-26 07:30:00', NULL, NULL, '2026-01-26 11:30:00', '#4CAF50', '<ul><li>Suporte folha de Pagamento</li></ul>', 'A', '2026-01-26', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(5, 1658, NULL, 'RCG', '2026-01-30 08:00:00', NULL, NULL, '2026-01-30 18:00:00', '#00BCD4', NULL, 'A', '2026-01-30', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(5, 1659, NULL, 'RCG', '2026-01-26 13:00:00', NULL, NULL, '2026-01-26 18:00:00', '#00BCD4', NULL, 'A', '2026-01-26', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(5, 1660, NULL, 'RCG', '2026-01-27 08:00:00', NULL, NULL, '2026-01-27 18:00:00', '#00BCD4', NULL, 'A', '2026-01-27', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(5, 1661, NULL, 'RCG', '2026-01-08 09:00:00', NULL, NULL, '2026-01-08 11:00:00', '#00BCD4', '<ul><li>Sped ICMS</li><li>Inutilização de NF-e</li></ul>', 'A', '2026-01-08', '09:00:00', '11:00:00', '00:00:00', '00:00:00', '02:00:00', 'R'),
(NULL, 1662, NULL, 'Ferias', '2026-01-12 13:00:00', NULL, NULL, '2026-01-12 18:00:00', '#3a87ad', NULL, 'A', '2026-01-12', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(NULL, 1663, NULL, 'Ferias', '2026-01-16 08:00:00', NULL, NULL, '2026-01-16 18:00:00', '#3a87ad', NULL, 'A', '2026-01-16', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(3, 1664, NULL, 'FUNLEC', '2026-01-20 19:00:00', NULL, NULL, '2026-01-20 22:00:00', '#4CAF50', '<ul><li>Atualização de Sistema</li></ul>', 'A', '2026-01-20', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'P'),
(4, 1665, NULL, 'MSGAS', '2026-01-20 19:30:00', NULL, NULL, '2026-01-20 21:30:00', '#2196F3', '<ul><li>Atualização de Sistema</li><li>RH EXPEDICAO CONTINUA Data: 16/01/2026 08:32</li><li>SIGAMDT EXPEDICAO CONTINUA Data: 12/01/2026 09:34</li><li>SMARTLINK-2.6.9_ONCA Data: 05/01/2026 16:57</li></ul>', 'A', '2026-01-20', '19:30:00', '21:30:00', '00:00:00', '00:00:00', '02:00:00', 'R'),
(4, 1666, NULL, 'MSGAS', '2026-01-27 19:00:00', NULL, NULL, '2026-01-27 22:00:00', '#2196F3', '<ul><li>Atualização Sistema</li><li>26-01-20-CENTRAL_DE_ATUALIZACOES_V2_7_2</li><li>PACOTE_DE_CORRECAO_000000_DSERFIS1-39162_12.1.2410</li><li>PACOTE_DE_CORRECAO_000000_DJOBRIG-171_12.1.2410</li></ul>', 'A', '2026-01-27', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(3, 1667, NULL, 'FUNLEC', '2026-01-27 09:00:00', NULL, NULL, '2026-01-27 11:00:00', '#4CAF50', '<ul><li>Atualização RH</li></ul>', 'A', '2026-01-27', '09:00:00', '11:00:00', '00:00:00', '00:00:00', '02:00:00', 'P'),
(4, 1668, NULL, 'MSGAS', '2026-01-28 19:00:00', NULL, NULL, '2026-01-28 21:00:00', '#2196F3', '<ul><li>Relatorio de Conferencia de envio e-sfinge contabil.</li></ul>', 'A', '2026-01-28', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', 'R'),
(4, 1669, NULL, 'MSGAS', '2026-01-21 19:00:00', NULL, NULL, '2026-01-21 21:00:00', '#2196F3', '<ul><li>Relatorio de Conferencia de envio e-sfinge contabil.</li></ul>', 'A', '2026-01-21', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', 'R'),
(3, 1670, 1, 'FUNLEC', '2026-02-02 07:30:00', NULL, NULL, '2026-02-02 17:30:00', '#4CAF50', '<p>Suporte folha de pagamento&nbsp;</p>', 'A', '2026-02-02', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(5, 1671, NULL, 'RCG', '2026-02-03 07:30:00', NULL, NULL, '2026-02-03 18:00:00', '#00BCD4', NULL, 'A', '2026-02-03', '07:30:00', '18:00:00', '12:00:00', '13:00:00', '09:30:00', 'P'),
(4, 1672, NULL, 'MSGAS', '2026-02-04 07:30:00', NULL, NULL, '2026-02-04 17:30:00', '#2196F3', '<ul><li>Ajuste envio e-sfinge contabil.</li><li>e-sfinge Folha</li></ul>', 'A', '2026-02-04', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(4, 1673, NULL, 'MSGAS', '2026-02-05 07:30:00', NULL, NULL, '2026-02-05 17:30:00', '#2196F3', '<ul><li>e-sfinge Folha</li></ul>', 'A', '2026-02-05', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(5, 1674, NULL, 'RCG', '2026-02-06 07:30:00', NULL, NULL, '2026-02-06 17:30:00', '#00BCD4', NULL, 'A', '2026-02-06', '07:30:00', '17:30:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(5, 1675, NULL, 'RCG', '2026-02-09 08:00:00', NULL, NULL, '2026-02-09 18:00:00', '#00BCD4', NULL, 'A', '2026-02-09', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(5, 1676, NULL, 'RCG', '2026-02-10 08:00:00', NULL, NULL, '2026-02-10 18:00:00', '#00BCD4', NULL, 'A', '2026-02-10', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(5, 1677, NULL, 'RCG', '2026-02-11 08:00:00', NULL, NULL, '2026-02-11 12:00:00', '#00BCD4', NULL, 'A', '2026-02-11', '08:00:00', '12:00:00', NULL, NULL, '04:00:00', 'P'),
(4, 1678, NULL, 'MSGAS', '2026-02-12 09:00:00', NULL, NULL, '2026-02-12 17:30:00', '#2196F3', '<ul><li>e-sfinge Contabilidade</li><li>e-sfinge Folha</li></ul>', 'A', '2026-02-12', '09:00:00', '17:30:00', '11:30:00', '13:30:00', '06:30:00', 'P'),
(4, 1679, NULL, 'MSGAS', '2026-02-13 07:30:00', NULL, NULL, '2026-02-13 17:30:00', '#2196F3', '<ul><li>e-sfinge Folha</li><li>Reservas PCO</li></ul>', 'A', '2026-02-13', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(NULL, 1680, NULL, 'FERIADO', '2026-02-16 08:00:00', NULL, NULL, '2026-02-16 18:00:00', '#E91E63', NULL, 'A', '2026-02-16', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', 'P'),
(NULL, 1681, NULL, 'FERIADO', '2026-02-17 08:00:00', NULL, NULL, '2026-02-17 18:00:00', '#E91E63', NULL, 'A', '2026-02-17', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', 'P'),
(4, 1682, NULL, 'MSGAS', '2026-02-18 07:30:00', NULL, NULL, '2026-02-18 11:30:00', '#2196F3', '<ul><li>eSfinge GPE</li></ul>', 'A', '2026-02-18', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'R'),
(4, 1683, NULL, 'MSGAS', '2026-02-18 13:00:00', NULL, NULL, '2026-02-18 17:30:00', '#2196F3', '<ul><li>eSfinge GPE</li><li>Reservas PCO</li></ul>', 'A', '2026-02-18', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', 'P'),
(4, 1684, NULL, 'MSGAS', '2026-02-19 07:30:00', NULL, NULL, '2026-02-19 17:30:00', '#2196F3', '<ul><li>Reservas PCO</li><li>eSfinfe CTB</li></ul>', 'A', '2026-02-19', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(5, 1685, NULL, 'RCG', '2026-02-20 08:00:00', NULL, NULL, '2026-02-20 17:30:00', '#00BCD4', NULL, 'A', '2026-02-20', '08:00:00', '17:30:00', '12:00:00', '13:00:00', '08:30:00', 'P'),
(3, 1686, NULL, 'FUNLEC', '2026-02-23 07:30:00', NULL, NULL, '2026-02-23 17:30:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2026-02-23', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(5, 1687, NULL, 'RCG', '2026-02-24 08:00:00', NULL, NULL, '2026-02-24 17:30:00', '#00BCD4', NULL, 'A', '2026-02-24', '08:00:00', '17:30:00', '12:00:00', '13:00:00', '08:30:00', 'P'),
(4, 1690, NULL, 'MSGAS', '2026-02-26 07:30:00', NULL, NULL, '2026-02-26 17:30:00', '#2196F3', '<ul><li>e-sfinge Folha</li><li>MeuRH</li></ul>', 'A', '2026-02-26', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(4, 1691, NULL, 'MSGAS', '2026-02-25 07:30:00', NULL, NULL, '2026-02-25 17:30:00', '#2196F3', '<ul><li>e-sfinge Folha</li></ul>', 'A', '2026-02-25', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(5, 1692, NULL, 'RCG', '2026-02-27 08:00:00', NULL, NULL, '2026-02-27 17:30:00', '#00BCD4', NULL, 'A', '2026-02-27', '08:00:00', '17:30:00', '12:00:00', '13:00:00', '08:30:00', 'P'),
(5, 1693, NULL, 'RCG', '2026-02-11 13:00:00', NULL, NULL, '2026-02-11 18:00:00', '#00BCD4', NULL, 'A', '2026-02-11', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(5, 1694, NULL, 'RCG', '2026-02-12 14:00:00', NULL, NULL, '2026-02-12 16:00:00', '#00BCD4', '<ul><li>Erro Fibra</li></ul>', 'A', '2026-02-12', '14:00:00', '16:00:00', '00:00:00', '00:00:00', '02:00:00', 'R'),
(5, 1695, NULL, 'RCG', '2026-02-12 18:00:00', NULL, NULL, '2026-02-12 19:00:00', '#00BCD4', '<ul><li>Erro Fibra</li></ul>', 'A', '2026-02-12', '18:00:00', '19:00:00', '00:00:00', '00:00:00', '01:00:00', 'P'),
(5, 1696, NULL, 'RCG', '2026-02-18 08:00:00', NULL, NULL, '2026-02-18 11:30:00', '#00BCD4', NULL, 'A', '2026-02-18', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', 'P'),
(4, 1697, NULL, 'MSGAS', '2026-02-18 19:00:00', NULL, NULL, '2026-02-18 20:00:00', '#2196F3', '<ul><li>Ponto de Entrada TCF040INF.PRW</li></ul>', 'A', '2026-02-18', '19:00:00', '20:00:00', '00:00:00', '00:00:00', '01:00:00', 'P'),
(8, 1698, 1, 'Health', '2026-02-05 15:00:00', NULL, NULL, '2026-02-05 16:00:00', '#9E9E9E', '<ul><li>Atendimento Andreia: <ul><li>Duvidas referente da Data de Emissão e Data de Digitação de documentos de entrada.</li></ul></li></ul>', 'A', '2026-02-05', '15:00:00', '16:00:00', '00:00:00', '00:00:00', '01:00:00', 'R'),
(8, 1699, 1, 'Health', '2026-02-18 15:00:00', NULL, NULL, '2026-02-18 16:00:00', '#9E9E9E', '<ul><li>Acesso Ambiente Homologação: Verificação de Acessos ao Ambiente de Homologação</li></ul>', 'A', '2026-02-18', '15:00:00', '16:00:00', '00:00:00', '00:00:00', '01:00:00', NULL),
(8, 1700, NULL, 'Health', '2026-02-18 19:00:00', NULL, NULL, '2026-02-18 22:00:00', '#9E9E9E', '<ul><li>Atualização de Sistema<ul><li>Appserver</li><li>Lib</li></ul></li></ul>', 'A', '2026-02-18', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(8, 1702, NULL, 'Health', '2026-02-10 15:00:00', NULL, NULL, '2026-02-10 18:00:00', '#9E9E9E', '<ul><li>Atendimento Anielly:<ul><li>Duvidas referente a relatorios de contas a pagar e receber com posição retroativa</li></ul></li><li>Atendimento&nbsp;Marilís - ADM Consórcio Lim<ul><li>&nbsp;Retorno de mercadoria</li></ul></li><li>Atendimento Rodrigo:<ul><li>Analise e cadastro de novos compradores em Alçada de compras.</li></ul></li></ul>', 'A', '2026-02-10', '15:00:00', '18:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(8, 1703, 1, 'Health', '2026-02-09 08:30:00', NULL, NULL, '2026-02-09 09:00:00', '#9E9E9E', '<ul><li>Atendimento&nbsp;Marilís - ADM Consórcio Lim<ul><li>Acesso ao Sistema</li></ul></li></ul>', 'A', '2026-02-09', '08:30:00', '09:00:00', '00:00:00', '00:00:00', '00:30:00', 'R'),
(8, 1704, NULL, 'Health', '2026-02-11 08:30:00', NULL, NULL, '2026-02-11 17:30:00', '#9E9E9E', '<ul><li>Atendimento&nbsp;Marilís - ADM Consórcio Lim<ul><li>&nbsp;Retorno de mercadoria</li></ul></li></ul>', 'A', '2026-02-11', '08:30:00', '17:30:00', '12:00:00', '13:00:00', '08:00:00', 'R'),
(8, 1705, NULL, 'Health', '2026-02-16 09:00:00', NULL, NULL, '2026-02-16 09:30:00', '#9E9E9E', '<ul><li>Atendimento&nbsp;Marilís - ADM Consórcio Lim<ul><li>&nbsp;Acesso Sistema</li></ul></li></ul>', 'A', '2026-02-16', '09:00:00', '09:30:00', '00:00:00', '00:00:00', '00:30:00', 'R'),
(8, 1707, NULL, 'Health', '2026-02-18 08:30:00', NULL, NULL, '2026-02-18 09:00:00', '#9E9E9E', '<ul><li>Atendimento&nbsp;Marilís - ADM Consórcio Lim<ul><li>&nbsp;Acesso Sistema</li></ul></li></ul>', 'A', '2026-02-18', '08:30:00', '09:00:00', '00:00:00', '00:00:00', '00:30:00', 'R'),
(8, 1708, NULL, 'Health', '2026-02-19 19:00:00', NULL, NULL, '2026-02-19 22:00:00', '#9E9E9E', '<ul><li>Atualização Sistema<ul><li>DBACCESS</li><li>TSS</li></ul></li></ul>', 'A', '2026-02-19', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(8, 1709, NULL, 'Health', '2026-02-24 19:00:00', NULL, NULL, '2026-02-24 22:00:00', '#9E9E9E', '<ul><li>Atualização Sistema:<ul><li>ATUALIZACAO DE ARQUIVOS FONTES V12.1.2410 BACKOFFICE EXPEDICAO CONTINUA</li><li>ATUALIZACAO DE ARQUIVOS FONTES V12.1.2410 DOCUMENTOS-ELETRONICOS EXPEDICAO CONTINUA</li></ul></li></ul>', 'A', '2026-02-24', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(8, 1710, NULL, 'Health', '2026-02-25 19:00:00', NULL, NULL, '2026-02-25 22:00:00', '#9E9E9E', '<ul><li>Atualização Sistema:<ul><li>ATUALIZACAO DE ARQUIVOS FONTES V12.1.2410 LOCACAO DE EQUIPAMENTOS EXPEDICAO CONTINUA</li></ul></li></ul>', 'A', '2026-02-25', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(8, 1711, NULL, 'Health', '2026-02-24 13:00:00', NULL, NULL, '2026-02-24 15:30:00', '#9E9E9E', '<ul><li>Apoio Andreia:<ul><li>Lancamento de NF com renteção de ISS</li></ul></li></ul>', 'A', '2026-02-24', '13:00:00', '15:30:00', '00:00:00', '00:00:00', '02:30:00', 'P'),
(8, 1712, NULL, 'Health', '2026-02-12 13:15:00', NULL, NULL, '2026-02-12 13:45:00', '#9E9E9E', '<ul><li>Apoio Tharine Silva<ul><li>Acesso Sistema</li></ul></li></ul>', 'A', '2026-02-12', '13:15:00', '13:45:00', '00:00:00', '00:00:00', '00:30:00', 'P'),
(4, 1713, NULL, 'MSGAS', '2026-02-24 19:30:00', NULL, NULL, '2026-02-24 22:00:00', '#2196F3', '<ul><li>Atualização Sistema<ul><li>26-02-13_ATUALIZACAO_12.1.2410_BACKOFFICE_EXPEDICAO_CONTINUA</li><li>26-02-06_ATUALIZACAO_12.1.2410_MDT_EXPEDICAO_CONTINUA</li><li>26-02-19_ATUALIZACAO_12.1.2410_RH_EXPEDICAO_CONTINUA</li><li>26-01-14_ATUALIZACAO_12.1.2410_TAF_EXPEDICAO_CONTINUA</li><li>26-02-11-P12_APPSERVER_BUILD-24.3.1.5</li><li>26-02-11-TOTVS_DBACCESS_BUILD_24.1.1.1</li></ul></li></ul>', 'A', '2026-02-24', '19:30:00', '22:00:00', '00:00:00', '00:00:00', '02:30:00', 'R'),
(4, 1714, NULL, 'MSGAS', '2026-02-24 07:30:00', NULL, NULL, '2026-02-24 10:00:00', '#2196F3', '<ul><li>Aplicação de Path SIGAGPE<ul><li>PACOTE_DE_CORRECAO_000000_DRHROTPRT-26779_12.1.2410</li><li>PACOTE_EMERGENCIAL_26566870_DRHROTPRT-27080_12.1.2410</li><li>PACOTE_DE_CORRECAO_26568792_DSERTAF1-39344_12.1.2410</li></ul></li><li>Atualização TSS<ul><li>26-02-05-RPO_INSTALADOR_TSS_12.1.2410_EXP.CONTINUA</li><li>26-02-05-TSS_SCHEMAS</li><li>26-02-05-TSS_URLS</li></ul></li></ul>', 'A', '2026-02-24', '07:30:00', '10:00:00', '00:00:00', '00:00:00', '02:30:00', 'R'),
(5, 1715, NULL, 'RCG', '2026-02-26 19:00:00', NULL, NULL, '2026-02-26 22:00:00', '#00BCD4', '<ul><li>Atualização Sistema</li></ul>', 'A', '2026-02-26', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(3, 1716, NULL, 'FUNLEC', '2026-02-25 09:00:00', NULL, NULL, '2026-02-25 17:00:00', '#4CAF50', '<ul><li>Ajuste Base Informe de Rendimentos</li></ul>', 'A', '2026-02-25', '09:00:00', '17:00:00', '11:30:00', '13:00:00', '06:30:00', 'R'),
(3, 1717, NULL, 'FUNLEC', '2026-02-26 09:00:00', NULL, NULL, '2026-02-26 16:00:00', '#4CAF50', '<ul><li>Ajuste Base Informe de Rendimentos</li></ul>', 'A', '2026-02-26', '09:00:00', '16:00:00', '11:00:00', '13:00:00', '05:00:00', 'R'),
(3, 1718, NULL, 'FUNLEC', '2026-02-25 19:00:00', NULL, NULL, '2026-02-25 22:00:00', '#4CAF50', '<ul><li>Ajuste Base Informe de Rendimentos</li></ul>', 'A', '2026-02-25', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(8, 1719, NULL, 'Health', '2026-02-26 10:00:00', NULL, NULL, '2026-02-26 11:00:00', '#9E9E9E', '<ul><li>Apoio&nbsp;<span style=\"background-color: rgb(254, 254, 254); color: rgb(28, 32, 36); font-family: Inter, -apple-system, system-ui, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Tahoma, Arial, sans-serif; font-size: 14px; text-wrap-mode: nowrap;\">Marilís</span><span style=\"background-color: rgb(254, 254, 254); color: rgb(28, 32, 36); font-family: Inter, -apple-system, system-ui, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Tahoma, Arial, sans-serif; font-size: 14px; text-wrap-mode: nowrap;\">&nbsp;</span><ul><li><span style=\"background-color: rgb(254, 254, 254); color: rgb(28, 32, 36); font-family: Inter, -apple-system, system-ui, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Tahoma, Arial, sans-serif; font-size: 14px; text-wrap-mode: nowrap;\">Retorno de notas fiscais de entrada</span></li></ul></li></ul>', 'A', '2026-02-26', '10:00:00', '11:00:00', '00:00:00', '00:00:00', '01:00:00', 'P'),
(3, 1720, NULL, 'FUNLEC', '2026-02-26 19:00:00', NULL, NULL, '2026-02-26 21:00:00', '#4CAF50', '<ul><li>Ajuste Base Informe de Rendimentos</li></ul>', 'A', '2026-02-26', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', 'P'),
(8, 1721, NULL, 'Health', '2026-02-27 10:00:00', NULL, NULL, '2026-02-27 12:30:00', '#9E9E9E', '<ul><li>Erro acesso Sistema - Falta de espaço servidor de banco de dados.</li></ul>', 'A', '2026-02-27', '10:00:00', '12:30:00', '00:00:00', '00:00:00', '02:30:00', 'P');
INSERT INTO `agendamento` (`contrato_id`, `id`, `profissional_id`, `descricao`, `horario_inicial`, `intervalo_inicial`, `intervalo_final`, `horario_final`, `cor`, `observacao`, `tipo`, `data_agenda`, `hora_inicio`, `hora_fim`, `hora_intervalo_inicial`, `hora_intervalo_final`, `hora_total`, `local`) VALUES
(3, 1722, NULL, 'FUNLEC', '2026-02-27 15:00:00', NULL, NULL, '2026-02-27 17:00:00', '#4CAF50', '<ul><li>Ajuste Informe de rendimentos</li></ul>', 'A', '2026-02-27', '15:00:00', '17:00:00', '00:00:00', '00:00:00', '02:00:00', 'P'),
(8, 1723, NULL, 'Health', '2026-03-03 15:00:00', NULL, NULL, '2026-03-03 16:00:00', '#9E9E9E', '<ul><li>Apoio&nbsp;Anielly&nbsp;<ul><li>Geração relatorio Titulos a receber</li></ul></li></ul>', 'A', '2026-03-03', '15:00:00', '16:00:00', '00:00:00', '00:00:00', '01:00:00', 'R'),
(3, 1724, NULL, 'FUNLEC', '2026-03-02 07:30:00', NULL, NULL, '2026-03-02 11:30:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2026-03-02', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(5, 1725, NULL, 'RCG', '2026-03-02 13:00:00', NULL, NULL, '2026-03-02 18:00:00', '#00BCD4', NULL, 'A', '2026-03-02', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(5, 1726, NULL, 'RCG', '2026-03-03 08:00:00', NULL, NULL, '2026-03-03 18:00:00', '#00BCD4', NULL, 'A', '2026-03-03', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(5, 1727, NULL, 'RCG', '2026-03-02 19:00:00', NULL, NULL, '2026-03-02 21:00:00', '#00BCD4', '<ul><li>Atualização APPSERVER,DBACCESS</li></ul>', 'A', '2026-03-02', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', 'P'),
(4, 1728, NULL, 'MSGAS', '2026-03-04 08:30:00', NULL, NULL, '2026-03-04 17:30:00', '#2196F3', '<ul><li>E-Sfinge Folha</li></ul>', 'A', '2026-03-04', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', 'P'),
(4, 1729, NULL, 'MSGAS', '2026-03-05 07:30:00', NULL, NULL, '2026-03-05 17:30:00', '#2196F3', '<ul><li>E-Sfinge Folha</li></ul>', 'A', '2026-03-05', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(5, 1730, NULL, 'RCG', '2026-03-06 08:00:00', NULL, NULL, '2026-03-06 17:30:00', '#00BCD4', NULL, 'A', '2026-03-06', '08:00:00', '17:30:00', '12:00:00', '13:00:00', '08:30:00', 'P'),
(3, 1731, NULL, 'FUNLEC', '2026-03-09 07:30:00', NULL, NULL, '2026-03-09 11:30:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2026-03-09', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(5, 1732, NULL, 'RCG', '2026-03-09 13:00:00', NULL, NULL, '2026-03-09 18:00:00', '#00BCD4', NULL, 'A', '2026-03-09', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(5, 1733, NULL, 'RCG', '2026-03-10 08:00:00', NULL, NULL, '2026-03-10 18:00:00', '#00BCD4', NULL, 'A', '2026-03-10', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(8, 1734, NULL, 'Health', '2026-03-10 10:00:00', NULL, NULL, '2026-03-10 15:00:00', '#9E9E9E', '<ul><li>Apoio Andreia<ul><li>Deligado controle de porder de terceiros filial 02</li><li>Repocessamento de saldo de poder de terceiros</li></ul></li></ul>', 'A', '2026-03-10', '10:00:00', '15:00:00', '11:00:00', '13:00:00', '03:00:00', 'R'),
(4, 1735, NULL, 'MSGAS', '2026-03-11 07:30:00', NULL, NULL, '2026-03-11 17:30:00', '#2196F3', '<ul><li>E-Esfige Folha de pagamento.</li></ul>', 'A', '2026-03-11', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(4, 1736, NULL, 'MSGAS', '2026-03-11 19:00:00', NULL, NULL, '2026-03-11 23:00:00', '#2196F3', '<ul><li>E-Esfinge GPE - PO-UI</li></ul>', 'A', '2026-03-11', '19:00:00', '23:00:00', '00:00:00', '00:00:00', '04:00:00', 'R'),
(4, 1737, NULL, 'MSGAS', '2026-03-12 07:30:00', NULL, NULL, '2026-03-12 14:30:00', '#2196F3', '<ul><li>E-Esfinge TCE</li></ul>', 'A', '2026-03-12', '07:30:00', '14:30:00', '11:30:00', '13:00:00', '05:30:00', 'P'),
(3, 1738, NULL, 'FUNLEC', '2026-03-16 07:30:00', NULL, NULL, '2026-03-16 11:30:00', '#4CAF50', '<ul><li>Apoio Folha de pagamento</li></ul>', 'A', '2026-03-16', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(5, 1739, NULL, 'RCG', '2026-03-16 13:00:00', NULL, NULL, '2026-03-16 18:00:00', '#00BCD4', NULL, 'A', '2026-03-16', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(4, 1740, NULL, 'MSGAS', '2026-03-17 07:30:00', NULL, NULL, '2026-03-17 17:30:00', '#2196F3', '<ul><li>Atualização Servidor de Licencas</li><li>Monitor e-Esfinge - GPE</li></ul>', 'A', '2026-03-17', '07:30:00', '17:30:00', '11:30:00', '12:30:00', '09:00:00', 'P'),
(5, 1741, NULL, 'RCG', '2026-03-18 08:00:00', NULL, NULL, '2026-03-18 11:30:00', '#00BCD4', '<ul><li>Evento Totvs</li></ul>', 'A', '2026-03-18', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', 'P'),
(5, 1742, NULL, 'RCG', '2026-03-18 13:00:00', NULL, NULL, '2026-03-18 18:00:00', '#00BCD4', NULL, 'A', '2026-03-18', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(4, 1743, NULL, 'MSGAS', '2026-03-19 07:30:00', NULL, NULL, '2026-03-19 17:30:00', '#2196F3', '<ul><li>Monitor e-Esfinge - GPE</li><li>Reunião com Leonardo(TI) e Ricardo(Financeiro) referente a coleta de indicadores</li></ul>', 'A', '2026-03-19', '07:30:00', '17:30:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(4, 1744, NULL, 'MSGAS', '2026-03-18 19:00:00', NULL, NULL, '2026-03-18 23:00:00', '#2196F3', '<ul><li>Atualização de Sistema:<ul><li>26-03-02-LIB_LABEL_02032026_P12_ONCA</li><li>26-03-10_ATUALIZACAO_12.1.2410_RH</li><li>26-03-06_ATUALIZACAO_12.1.2410_MDT</li><li>26-02-16_ATUALIZACAO_12.1.2410_TAF</li><li>26-02-13_ATUALIZACAO_12.1.2410_BACKOFFICE</li><li>26-03-04-P12_SMARTCLIENT_WEBAPP_10.1.6</li><li>26-03-04-P12_SMARTCLIENT_WEB-AGENT_1.0.24</li><li>PACOTE_DE_CORRECAO_25998199_DSERCTR2-8650_12.1.2410</li><li>PACOTE_DE_CORRECAO_26571851_DSERCTR1-50708_12.1.2410</li><li>PACOTE_DE_CORRECAO_000000_DENTRINO-6242_12.1.2410</li><li>26-03-10-TSS_URLS</li><li>26-03-10-TSS_SCHEMAS</li><li>26-03-16-ARQUIVOS_PORTAL_MEU_RH</li></ul></li><li>Aplicados os UPDDISTR relacionados</li></ul><p><ul></ul></p><p><br></p>', 'A', '2026-03-18', '19:00:00', '23:00:00', '00:00:00', '00:00:00', '04:00:00', 'R'),
(5, 1745, NULL, 'RCG', '2026-03-20 08:00:00', NULL, NULL, '2026-03-20 18:00:00', '#00BCD4', NULL, 'A', '2026-03-20', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(8, 1746, NULL, 'Health', '2026-03-17 08:00:00', NULL, NULL, '2026-03-17 08:30:00', '#9E9E9E', '<ul><li>Suporte Relatorio Contas a Receber e Pagar</li></ul>', 'A', '2026-03-17', '08:00:00', '08:30:00', '00:00:00', '00:00:00', '00:30:00', 'R'),
(8, 1747, NULL, 'Health', '2026-03-21 09:00:00', NULL, NULL, '2026-03-21 16:00:00', '#9E9E9E', '<ul><li>Atualização sistema</li></ul>', 'A', '2026-03-21', '09:00:00', '16:00:00', '12:00:00', '13:00:00', '06:00:00', 'R'),
(5, 1748, NULL, 'RCG', '2026-03-13 08:00:00', NULL, NULL, '2026-03-13 18:00:00', '#00BCD4', NULL, 'A', '2026-03-13', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(8, 1749, NULL, 'Health', '2026-03-14 09:00:00', NULL, NULL, '2026-03-14 12:00:00', '#9E9E9E', '<ul><li>Atualização sistema (Teste)</li></ul>', 'A', '2026-03-14', '09:00:00', '12:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(8, 1750, NULL, 'Health', '2026-03-23 08:00:00', NULL, NULL, '2026-03-23 11:00:00', '#9E9E9E', '<ul><li>Suporte Atualização</li></ul>', 'A', '2026-03-23', '08:00:00', '11:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(3, 1751, NULL, 'FUNLEC', '2026-03-23 07:30:00', NULL, NULL, '2026-03-23 11:30:00', '#4CAF50', '<ul><li>Suporte Folha de Pagamento</li></ul>', 'A', '2026-03-23', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(5, 1752, NULL, 'RCG', '2026-03-30 08:00:00', NULL, NULL, '2026-03-30 18:00:00', '#00BCD4', NULL, 'A', '2026-03-30', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(4, 1753, NULL, 'MSGAS', '2026-03-31 07:30:00', NULL, NULL, '2026-03-31 17:30:00', '#2196F3', '<ul><li>e-Sfinge Folha de pagamento</li></ul>', 'A', '2026-03-31', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(4, 1754, NULL, 'MSGAS', '2026-04-01 07:30:00', NULL, NULL, '2026-04-01 17:30:00', '#2196F3', '<ul><li>e-Sfinge Folha de pagamento</li></ul>', 'A', '2026-04-01', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(5, 1755, NULL, 'RCG', '2026-04-02 08:00:00', NULL, NULL, '2026-04-02 11:30:00', '#00BCD4', NULL, 'A', '2026-04-02', '08:00:00', '11:30:00', '00:00:00', '00:00:00', '03:30:00', 'P'),
(5, 1756, NULL, 'RCG', '2026-03-23 13:00:00', NULL, NULL, '2026-03-23 18:00:00', '#00BCD4', NULL, 'A', '2026-03-23', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(5, 1757, NULL, 'RCG', '2026-03-24 08:00:00', NULL, NULL, '2026-03-24 18:00:00', '#00BCD4', NULL, 'A', '2026-03-24', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(5, 1758, NULL, 'RCG', '2026-03-21 09:00:00', NULL, NULL, '2026-03-21 16:00:00', '#00BCD4', '<ul><li>Atualização de Sistema</li></ul>', 'A', '2026-03-21', '09:00:00', '16:00:00', '12:00:00', '13:00:00', '06:00:00', 'P'),
(4, 1759, NULL, 'MSGAS', '2026-03-25 07:30:00', NULL, NULL, '2026-03-25 17:30:00', '#2196F3', '<ul><li>e-Sfinge Folha de pagamento</li></ul>', 'A', '2026-03-25', '07:30:00', '17:30:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(4, 1760, NULL, 'MSGAS', '2026-03-25 19:00:00', NULL, NULL, '2026-03-25 22:00:00', '#2196F3', '<ul><li>e-Sfinge Folha de pagamento - PO-UI</li></ul>', 'A', '2026-03-25', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(4, 1761, NULL, 'MSGAS', '2026-03-26 07:30:00', NULL, NULL, '2026-03-26 17:30:00', '#2196F3', '<ul><li>e-Sfinge Folha de pagamento</li></ul>', 'A', '2026-03-26', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(4, 1762, NULL, 'MSGAS', '2026-03-26 19:00:00', NULL, NULL, '2026-03-26 22:00:00', '#2196F3', '<ul><li>e-Sfinge Folha de pagamento - PO-UI</li></ul>', 'A', '2026-03-26', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(5, 1763, NULL, 'RCG', '2026-03-27 08:00:00', NULL, NULL, '2026-03-27 18:00:00', '#00BCD4', NULL, 'A', '2026-03-27', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(4, 1764, NULL, 'MSGAS', '2026-03-19 19:00:00', NULL, NULL, '2026-03-19 22:00:00', '#2196F3', '<ul><li>e-Sfinge Folha de pagamento - PO-UI</li></ul>', 'A', '2026-03-19', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(NULL, 1765, NULL, 'Feriado', '2026-04-03 08:00:00', NULL, NULL, '2026-04-03 18:00:00', '#E91E63', NULL, 'A', '2026-04-03', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', 'P'),
(NULL, 1766, NULL, 'feriado', '2026-04-21 08:00:00', NULL, NULL, '2026-04-21 18:00:00', '#E91E63', NULL, 'A', '2026-04-21', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', 'P'),
(8, 1767, NULL, 'Health', '2026-03-13 13:00:00', NULL, NULL, '2026-03-13 17:00:00', '#9E9E9E', '<ul><li>Atualização sistema (Teste)</li></ul>', 'A', '2026-03-13', '13:00:00', '17:00:00', '00:00:00', '00:00:00', '04:00:00', 'R'),
(5, 1768, NULL, 'RCG', '2026-04-06 08:00:00', NULL, NULL, '2026-04-06 18:00:00', '#00BCD4', NULL, 'A', '2026-04-06', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(5, 1769, NULL, 'RCG', '2026-04-07 08:00:00', NULL, NULL, '2026-04-07 18:00:00', '#00BCD4', NULL, 'A', '2026-04-07', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(4, 1770, NULL, 'MSGAS', '2026-04-08 07:30:00', NULL, NULL, '2026-04-08 17:30:00', '#2196F3', '<ul><li>Atualização DEV<ul><li>26-03-23-CENTRAL_DE_ATUALIZACOES_V2_8_1</li><li>26-03-06_ATUALIZACAO_12.1.2410_MDT_EXPEDICAO_CONTINUA</li><li>26-03-11_ATUALIZACAO_12.1.2410_TAF_EXPEDICAO_CONTINUA</li><li>26-03-31_ATUALIZACAO_12.1.2410_RH_EXPEDICAO_CONTINUA</li><li>26-03-26-TOTVS_DBACCESS_BUILD_24.1.1.2</li><li>26-03-28_ATUALIZACAO_12.1.2410_BACKOFFICE_EXPEDICAO_CONTINUA</li></ul></li><li>Informe de Rendimento X Esocial</li><li>e-Sfinge Folha de pagamento</li></ul>', 'A', '2026-04-08', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(4, 1771, NULL, 'MSGAS', '2026-04-09 07:30:00', NULL, NULL, '2026-04-09 17:30:00', '#2196F3', '<ul><li>Informe de Rendimento X Esocial</li><li>e-Sfinge Folha de pagamento</li></ul>', 'A', '2026-04-09', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(5, 1772, NULL, 'RCG', '2026-04-10 08:00:00', NULL, NULL, '2026-04-10 17:00:00', '#00BCD4', NULL, 'A', '2026-04-10', '08:00:00', '17:00:00', '00:00:00', '00:00:00', '09:00:00', 'P'),
(4, 1773, NULL, 'MSGAS', '2026-04-08 19:00:00', NULL, NULL, '2026-04-08 22:00:00', '#2196F3', '<ul><li>Atualização&nbsp;<ul><li>26-03-23-CENTRAL_DE_ATUALIZACOES_V2_8_1</li><li>26-03-06_ATUALIZACAO_12.1.2410_MDT_EXPEDICAO_CONTINUA</li><li>26-03-11_ATUALIZACAO_12.1.2410_TAF_EXPEDICAO_CONTINUA</li><li>26-03-31_ATUALIZACAO_12.1.2410_RH_EXPEDICAO_CONTINUA</li><li>26-03-26-TOTVS_DBACCESS_BUILD_24.1.1.2</li><li>26-03-28_ATUALIZACAO_12.1.2410_BACKOFFICE_EXPEDICAO_CONTINUA</li></ul></li></ul>', 'A', '2026-04-08', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(4, 1774, NULL, 'MSGAS', '2026-04-09 20:00:00', NULL, NULL, '2026-04-09 22:30:00', '#2196F3', '<ul><li>e-Sfinge Folha de pagamento</li></ul>', 'A', '2026-04-09', '20:00:00', '22:30:00', '00:00:00', '00:00:00', '02:30:00', 'R'),
(4, 1775, NULL, 'MSGAS', '2026-04-13 07:30:00', NULL, NULL, '2026-04-13 11:30:00', '#2196F3', '<ul><li>e-Sfinge Folha de pagamento</li></ul>', 'A', '2026-04-13', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(5, 1776, NULL, 'RCG', '2026-04-13 13:00:00', NULL, NULL, '2026-04-13 18:00:00', '#00BCD4', NULL, 'A', '2026-04-13', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(6, 1777, NULL, 'GUATOS', '2026-04-13 13:00:00', NULL, NULL, '2026-04-13 17:00:00', '#FFC107', NULL, 'A', '2026-04-13', '13:00:00', '17:00:00', '00:00:00', '00:00:00', '04:00:00', 'R'),
(6, 1778, NULL, 'GUATOS', '2026-04-13 19:00:00', NULL, NULL, '2026-04-13 22:00:00', '#FFC107', NULL, 'A', '2026-04-13', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'P'),
(NULL, 1779, NULL, 'FERIADO', '2026-05-01 08:00:00', NULL, NULL, '2026-05-01 18:00:00', '#E91E63', NULL, 'A', '2026-05-01', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', 'P'),
(5, 1780, NULL, 'RCG', '2026-04-14 08:00:00', NULL, NULL, '2026-04-14 18:00:00', '#00BCD4', NULL, 'A', '2026-04-14', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(4, 1781, NULL, 'MSGAS', '2026-04-15 07:30:00', NULL, NULL, '2026-04-15 17:30:00', '#2196F3', '<ul><li>e-Sfinge Folha de pagamento</li></ul>', 'A', '2026-04-15', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(4, 1782, NULL, 'MSGAS', '2026-04-16 07:30:00', NULL, NULL, '2026-04-16 17:30:00', '#2196F3', '<ul><li>e-Sfinge Folha de pagamento</li></ul>', 'A', '2026-04-16', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(5, 1783, NULL, 'RCG', '2026-04-17 08:00:00', NULL, NULL, '2026-04-17 18:00:00', '#00BCD4', NULL, 'A', '2026-04-17', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(NULL, 1784, NULL, 'Sofia', '2026-04-18 12:00:00', NULL, NULL, '2026-04-18 18:00:00', '#F44336', NULL, 'A', '2026-04-18', '12:00:00', '18:00:00', '00:00:00', '00:00:00', '06:00:00', 'P'),
(3, 1785, NULL, 'FUNLEC', '2026-04-13 19:00:00', NULL, NULL, '2026-04-13 22:00:00', '#4CAF50', '<ul><li>Atualização Sistema</li></ul>', 'A', '2026-04-13', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'P'),
(3, 1786, NULL, 'FUNLEC', '2026-04-14 09:00:00', NULL, NULL, '2026-04-14 10:00:00', '#4CAF50', '<ul><li>Suporte a folha de pagamento</li></ul>', 'A', '2026-04-14', '09:00:00', '10:00:00', '00:00:00', '00:00:00', '01:00:00', 'P'),
(6, 1787, NULL, 'GUATOS', '2026-04-14 19:00:00', NULL, NULL, '2026-04-14 22:00:00', '#FFC107', NULL, 'A', '2026-04-14', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'P'),
(6, 1788, NULL, 'GUATOS', '2026-04-15 19:00:00', NULL, NULL, '2026-04-15 22:00:00', '#FFC107', NULL, 'A', '2026-04-15', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'P'),
(5, 1789, NULL, 'RCG', '2026-04-20 08:00:00', NULL, NULL, '2026-04-20 18:00:00', '#00BCD4', '<ul><li>Falta de Energia</li></ul>', 'A', '2026-04-20', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(4, 1790, NULL, 'MSGAS', '2026-04-22 07:30:00', NULL, NULL, '2026-04-22 17:30:00', '#2196F3', '<ul><li>API balancete pyplan</li></ul>', 'A', '2026-04-22', '07:30:00', '17:30:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(4, 1791, NULL, 'MSGAS', '2026-04-23 07:30:00', NULL, NULL, '2026-04-23 17:30:00', '#2196F3', '<ul><li>API balancete pyplan</li></ul>', 'A', '2026-04-23', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(5, 1792, NULL, 'RCG', '2026-04-24 08:00:00', NULL, NULL, '2026-04-24 18:00:00', '#00BCD4', NULL, 'A', '2026-04-24', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(4, 1793, NULL, 'MSGAS', '2026-04-27 07:30:00', NULL, NULL, '2026-04-27 11:30:00', '#2196F3', '<ul><li>e-Sfinge Folha de pagamento</li></ul>', 'A', '2026-04-27', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(5, 1794, NULL, 'RCG', '2026-04-27 13:00:00', NULL, NULL, '2026-04-27 18:00:00', '#00BCD4', NULL, 'A', '2026-04-27', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(5, 1795, NULL, 'RCG', '2026-04-28 08:00:00', NULL, NULL, '2026-04-28 18:00:00', '#00BCD4', NULL, 'A', '2026-04-28', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(4, 1796, NULL, 'MSGAS', '2026-04-29 07:30:00', NULL, NULL, '2026-04-29 17:30:00', '#2196F3', '<ul><li>e-Sfinge Folha de pagamento</li></ul>', 'A', '2026-04-29', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(4, 1797, NULL, 'MSGAS', '2026-04-30 07:30:00', NULL, NULL, '2026-04-30 17:30:00', '#2196F3', '<ul><li>e-Sfinge Folha de pagamento</li></ul>', 'A', '2026-04-30', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(5, 1798, NULL, 'RCG', '2026-04-22 19:00:00', NULL, NULL, '2026-04-22 22:00:00', '#00BCD4', '<ul><li>Atualização Sistema (HML)</li></ul>', 'A', '2026-04-22', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(5, 1799, NULL, 'RCG', '2026-04-23 19:00:00', NULL, NULL, '2026-04-23 22:00:00', '#00BCD4', '<ul><li>Atualização Sistema (HML)</li></ul>', 'A', '2026-04-23', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(5, 1800, NULL, 'RCG', '2026-04-27 19:00:00', NULL, NULL, '2026-04-27 22:00:00', '#00BCD4', '<ul><li>Atualização Sistema (HML)</li></ul>', 'A', '2026-04-27', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(6, 1801, NULL, 'GUATOS', '2026-05-01 08:00:00', NULL, NULL, '2026-05-01 18:00:00', '#FFC107', '<ul><li>Atualização</li></ul>', 'A', '2026-05-01', '08:00:00', '18:00:00', '11:00:00', '13:00:00', '08:00:00', 'P'),
(3, 1802, NULL, 'FUNLEC', '2026-04-30 19:00:00', NULL, NULL, '2026-04-30 22:00:00', '#4CAF50', '<ul><li>Atualização de Sistema HML</li></ul>', 'A', '2026-04-30', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(3, 1803, NULL, 'FUNLEC', '2026-04-29 19:00:00', NULL, NULL, '2026-04-29 21:00:00', '#4CAF50', '<ul><li>Atualização HML</li></ul>', 'A', '2026-04-29', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', 'R'),
(3, 1804, NULL, 'FUNLEC', '2026-05-01 08:00:00', NULL, NULL, '2026-05-01 18:00:00', '#4CAF50', '<ul><li>Atualização Produção</li></ul>', 'A', '2026-05-01', '08:00:00', '18:00:00', '11:00:00', '13:00:00', '08:00:00', 'P'),
(3, 1805, NULL, 'FUNLEC', '2026-05-02 08:00:00', NULL, NULL, '2026-05-02 17:00:00', '#4CAF50', '<ul><li>Atualização Produção</li></ul>', 'A', '2026-05-02', '08:00:00', '17:00:00', '11:00:00', '13:00:00', '07:00:00', 'R'),
(3, 1806, NULL, 'FUNLEC', '2026-04-28 19:00:00', NULL, NULL, '2026-04-28 21:00:00', '#4CAF50', '<ul><li>Atualização HML</li></ul>', 'A', '2026-04-28', '19:00:00', '21:00:00', '00:00:00', '00:00:00', '02:00:00', 'R'),
(8, 1807, NULL, 'Health', '2026-04-11 09:00:00', NULL, NULL, '2026-04-11 12:00:00', '#9E9E9E', '<ul><li>Atulização LIB e TSS</li></ul>', 'A', '2026-04-11', '09:00:00', '12:00:00', '00:00:00', '00:00:00', '03:00:00', 'P'),
(8, 1808, NULL, 'Health', '2026-04-22 14:00:00', NULL, NULL, '2026-04-22 15:00:00', '#9E9E9E', '<ul><li>Erro TSS Produção</li></ul>', 'A', '2026-04-22', '14:00:00', '15:00:00', '00:00:00', '00:00:00', '01:00:00', 'P'),
(8, 1809, NULL, 'Health', '2026-04-23 13:30:00', NULL, NULL, '2026-04-23 14:30:00', '#9E9E9E', '<ul><li>Acesso ambiente HML</li></ul>', 'A', '2026-04-23', '13:30:00', '14:30:00', '00:00:00', '00:00:00', '01:00:00', 'P'),
(8, 1810, NULL, 'Health', '2026-04-22 11:00:00', NULL, NULL, '2026-04-22 12:00:00', '#9E9E9E', '<ul><li>Suporte Financeiro</li></ul>', 'A', '2026-04-22', '11:00:00', '12:00:00', '00:00:00', '00:00:00', '01:00:00', 'P'),
(8, 1811, NULL, 'Health', '2026-04-25 09:00:00', NULL, NULL, '2026-04-25 12:00:00', '#9E9E9E', '<ul><li>Atualização 2510 HML</li></ul>', 'A', '2026-04-25', '09:00:00', '12:00:00', '00:00:00', '00:00:00', '03:00:00', 'P'),
(8, 1812, NULL, 'Health', '2026-04-26 13:00:00', NULL, NULL, '2026-04-26 16:00:00', '#9E9E9E', '<ul><li>Atualização 2510 HML</li></ul>', 'A', '2026-04-26', '13:00:00', '16:00:00', '00:00:00', '00:00:00', '03:00:00', 'P'),
(8, 1813, NULL, 'Health', '2026-04-30 19:00:00', NULL, NULL, '2026-04-30 22:00:00', '#9E9E9E', '<ul><li>Atualização 2510 HML</li></ul>', 'A', '2026-04-30', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'P'),
(4, 1814, NULL, 'MSGAS', '2026-05-04 07:30:00', NULL, NULL, '2026-05-04 11:30:00', '#2196F3', '<ul><li>e-Sfinge Folha pagamento</li></ul>', 'A', '2026-05-04', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(5, 1815, NULL, 'RCG', '2026-05-04 13:00:00', NULL, NULL, '2026-05-04 18:00:00', '#00BCD4', '<ul><li>Reunião novas regras para execução de Serviço de suporte TOTVS</li></ul>', 'A', '2026-05-04', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(5, 1816, NULL, 'RCG', '2026-05-05 08:00:00', NULL, NULL, '2026-05-05 18:00:00', '#00BCD4', '<ul><li>EFD ICMS CBA - 03/2026</li><li>Planejamento de Atualização acumuladas 2410</li><li>Planejamento de Atualização de Release 2510</li><li>Teste de Backup sistema</li></ul>', 'A', '2026-05-05', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(4, 1817, NULL, 'MSGAS', '2026-05-06 08:30:00', NULL, NULL, '2026-05-06 17:30:00', '#2196F3', '<ul><li>e-Sfinge Folha pagamento</li></ul>', 'A', '2026-05-06', '08:30:00', '17:30:00', '11:30:00', '13:30:00', '07:00:00', 'P'),
(4, 1818, NULL, 'MSGAS', '2026-05-07 09:00:00', NULL, NULL, '2026-05-07 17:30:00', '#2196F3', '<ul><li>e-Sfinge Folha pagamento</li></ul>', 'A', '2026-05-07', '09:00:00', '17:30:00', '11:30:00', '13:30:00', '06:30:00', 'P'),
(5, 1819, NULL, 'RCG', '2026-05-08 08:00:00', NULL, NULL, '2026-05-08 13:30:00', '#00BCD4', '<ul><li>Recalculo de Estoque RCG/CBA</li><li>Fechamento de Estoque</li></ul>', 'A', '2026-05-08', '08:00:00', '13:30:00', '11:00:00', '12:00:00', '04:30:00', 'P'),
(5, 1820, NULL, 'FALTA', '2026-05-08 13:30:00', NULL, NULL, '2026-05-08 17:30:00', '#00BCD4', '<ul><li><font color=\"#ff0000\">FALTA</font></li></ul>', 'A', '2026-05-08', '13:30:00', '17:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(4, 1821, NULL, 'MSGAS', '2026-05-11 07:30:00', NULL, NULL, '2026-05-11 11:30:00', '#2196F3', '<ul><li>e-Sfinge Folha pagamento</li></ul>', 'A', '2026-05-11', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(5, 1822, NULL, 'RCG', '2026-05-11 13:00:00', NULL, NULL, '2026-05-11 18:00:00', '#00BCD4', '<ul><li>Reunião CRM RD Station</li><li>Pesquisa de Antivirus CNABHUNTER</li><li>Backup Sistema</li></ul>', 'A', '2026-05-11', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(5, 1823, NULL, 'RCG', '2026-05-12 08:00:00', NULL, NULL, '2026-05-12 18:00:00', '#00BCD4', '<ul><li>Instalação de Antivirus(Faturamento RCG e CBA)</li><li>Teste Atualização Release 2510</li><li>Impressão de Orcamento CBA</li></ul>', 'A', '2026-05-12', '08:00:00', '18:00:00', '13:00:00', '14:00:00', '09:00:00', 'P'),
(4, 1824, NULL, 'MSGAS', '2026-05-11 19:00:00', NULL, NULL, '2026-05-11 22:00:00', '#2196F3', '<ul><li>Atualização 2510 DEV</li></ul>', 'A', '2026-05-11', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(4, 1825, NULL, 'MSGAS', '2026-05-12 19:30:00', NULL, NULL, '2026-05-12 22:00:00', '#2196F3', '<ul><li>Atualização 2510 DEV</li></ul>', 'A', '2026-05-12', '19:30:00', '22:00:00', '00:00:00', '00:00:00', '02:30:00', 'R'),
(4, 1826, NULL, 'MSGAS', '2026-05-13 07:30:00', NULL, NULL, '2026-05-13 17:30:00', '#2196F3', '<ul><li>e-Sfinge Folha pagamento</li></ul>', 'A', '2026-05-13', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(4, 1827, NULL, 'MSGAS', '2026-05-14 07:30:00', NULL, NULL, '2026-05-14 17:30:00', '#2196F3', '<ul><li>e-Sfinge Folha pagamento</li></ul>', 'A', '2026-05-14', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(5, 1828, NULL, 'RCG', '2026-05-15 08:00:00', NULL, NULL, '2026-05-15 18:00:00', '#00BCD4', '<ul><li>Formatação Computador Eliane</li><li>Ajustes e Teste 26-03-09-RDMAKES_SPED_NF-E</li></ul>', 'A', '2026-05-15', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(4, 1829, NULL, 'MSGAS', '2026-05-13 19:00:00', NULL, NULL, '2026-05-13 22:00:00', '#2196F3', '<ul><li>Atualização 2510 Dev</li></ul>', 'A', '2026-05-13', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(4, 1830, NULL, 'MSGAS', '2026-05-14 19:00:00', NULL, NULL, '2026-05-14 22:00:00', '#2196F3', '<ul><li>Atualização 2510 - DEV</li></ul>', 'A', '2026-05-14', '19:00:00', '22:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(8, 1831, NULL, 'Health', '2026-05-14 18:00:00', NULL, NULL, '2026-05-14 19:00:00', '#9E9E9E', '<ul><li>Atualização Sistema<ul><li>26-05-08_ATUALIZACAO_12.1.2410_BACKOFFICE_EXPEDICAO_CONTINUA</li><li>26-02-26_ATUALIZACAO_12.1.2410_TSS_PROTHEUS_EXPEDICAO_CONTINUA</li><li>PACOTE_DE_CORRECAO_000000_DMANMAT01-46122_12.1.2410</li><li>PACOTE_DE_CORRECAO_26675145_DSERTSS1-36229_12.1.2410</li><li>PACOTE_DE_CORRECAO_24738974_DSERFISE-13657_12.1.2410</li></ul></li></ul>', 'A', '2026-05-14', '18:00:00', '19:00:00', '00:00:00', '00:00:00', '01:00:00', 'P'),
(8, 1832, NULL, 'Health', '2026-05-08 13:00:00', NULL, NULL, '2026-05-08 17:30:00', '#9E9E9E', '<ul><li>Atualização Ambiente HML</li></ul>', 'A', '2026-05-08', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', 'P'),
(8, 1833, NULL, 'Health', '2026-05-12 13:00:00', NULL, NULL, '2026-05-12 18:00:00', '#9E9E9E', '<ul><li>Atualização de Release</li></ul>', 'A', '2026-05-12', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(4, 1834, NULL, 'MSGAS', '2026-05-18 07:30:00', NULL, NULL, '2026-05-18 11:30:00', '#2196F3', '<ul><li>API balancete pyplan</li></ul>', 'A', '2026-05-18', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(5, 1835, NULL, 'RCG', '2026-05-18 13:00:00', NULL, NULL, '2026-05-18 18:00:00', '#00BCD4', '<ul><li>Teste Backup</li><li>Ajustes e Teste 26-03-09-RDMAKES_SPED_NF-E</li></ul>', 'A', '2026-05-18', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(4, 1836, NULL, 'MSGAS', '2026-05-16 13:00:00', NULL, NULL, '2026-05-16 16:00:00', '#2196F3', '<ul><li>Atualização Ambiente de Produção<ul><li>26-03-17-P12_SMARTCLIENT_WEB-AGENT_1.0.25_WINDOWS_X64</li><li>26-03-25_ATUALIZACAO_12.1.2410_BA_PROTHEUS_INSIGHTS_EXPEDICAO_CONTINUA</li><li>26-04-01-SMARTLINK-2.7.1_ONCA</li><li>26-04-10-LIB_LABEL_13042026_P12_ONCA</li><li>26-04-15_ATUALIZACAO_12.1.2410_TAF_EXPEDICAO_CONTINUA</li><li>26-05-01_ATUALIZACAO_12.1.2410_MDT_EXPEDICAO_CONTINUA</li><li>26-05-06_ATUALIZACAO_12.1.2410_TSS_EXPEDICAO_CONTINUA</li><li>26-05-08_ATUALIZACAO_12.1.2410_BACKOFFICE_EXPEDICAO_CONTINUA</li><li>26-05-12_ATUALIZACAO_12.1.2410_RH_EXPEDICAO_CONTINUA</li><li>PACOTE_DE_CORRECAO_000000_DMANMAT01-46122_12.1.2410</li><li>PACOTE_DE_CORRECAO_000000_DMINA-29339_12.1.2410</li></ul></li></ul>', 'A', '2026-05-16', '13:00:00', '16:00:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(5, 1837, NULL, 'RCG', '2026-05-19 08:00:00', NULL, NULL, '2026-05-19 17:00:00', '#00BCD4', '<ul><li>Chamado MXPED-91074, instabilidade MAXIMA</li><li>Atualização Protheus(11:30 - 13:00):<ul><li>26-05-08_ATUALIZACAO_12.1.2410_BACKOFFICE_EXPEDICAO_CONTINUA</li><li>26-05-06_ATUALIZACAO_12.1.2410_TSS_EXPEDICAO_CONTINUA</li><li>26-04-10-LIB_LABEL_13042026_P12_ONCA</li><li>26-03-23-CENTRAL_DE_ATUALIZACOES_V2_8_1</li><li>26-04-01-SMARTLINK-2.7.1_ONCA</li><li>PACOTE_DE_CORRECAO_000000_DMINA-29339_12.1.2410</li><li>PACOTE_DE_CORRECAO_000000_DMANMAT01-46122_12.1.2410</li></ul></li><li>Teste Customização e Funcionalidades</li></ul>', 'A', '2026-05-19', '08:00:00', '17:00:00', '00:00:00', '00:00:00', '09:00:00', 'P'),
(4, 1838, NULL, 'MSGAS', '2026-05-20 07:30:00', NULL, NULL, '2026-05-20 16:30:00', '#2196F3', '<ul><li>API balancete pyplan</li></ul>', 'A', '2026-05-20', '07:30:00', '16:30:00', '12:00:00', '13:30:00', '07:30:00', 'P'),
(4, 1839, NULL, 'MSGAS', '2026-05-21 07:30:00', NULL, NULL, '2026-05-21 17:30:00', '#2196F3', '<ul><li>API balancete pyplan</li></ul>', 'A', '2026-05-21', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(5, 1840, NULL, 'RCG', '2026-05-22 08:00:00', NULL, NULL, '2026-05-22 18:00:00', '#00BCD4', '<ul><li>Teste Release 2510&nbsp;</li><li>Teste Customização e Funcionalidades 2510&nbsp;</li><li>Sicronismo de cadastro de produtos Maxima</li></ul>', 'A', '2026-05-22', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(4, 1841, NULL, 'MSGAS', '2026-05-25 07:30:00', NULL, NULL, '2026-05-25 11:30:00', '#2196F3', '<ul><li>API balancete pyplan</li></ul>', 'A', '2026-05-25', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(4, 1842, NULL, 'MSGAS', '2026-05-27 07:30:00', NULL, NULL, '2026-05-27 17:30:00', '#2196F3', '<ul><li>API balancete pyplan</li><li>Aplicado&nbsp;PACOTE_DE_CORRECAO_28233027_DSFIN-18977_12.1.2410&nbsp;</li></ul>', 'A', '2026-05-27', '07:30:00', '17:30:00', '12:00:00', '13:30:00', '08:30:00', 'P'),
(4, 1843, NULL, 'MSGAS', '2026-05-28 07:30:00', NULL, NULL, '2026-05-28 17:30:00', '#2196F3', '<ul><li>API balancete pyplan</li><li>Atualização ambiente DEV release 12.25.10</li><li>Instalação Smatview ambiente DEV release 12.25.10</li></ul>', 'A', '2026-05-28', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(5, 1845, NULL, 'RCG', '2026-05-25 13:00:00', NULL, NULL, '2026-05-25 18:00:00', '#00BCD4', '<ul><li>Teste de Restauraçaõ de Backup</li><li>Documentação CRM</li><li>Chamado MXPED-91074 maxima sistema</li></ul>', 'A', '2026-05-25', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(8, 1846, NULL, 'Health', '2026-05-25 14:00:00', NULL, NULL, '2026-05-25 15:00:00', '#9E9E9E', '<ul><li>Atendimento&nbsp;Tharini /&nbsp;Marilís&nbsp; Comensação de Titulos</li></ul>', 'A', '2026-05-25', '14:00:00', '15:00:00', '00:00:00', '00:00:00', '01:00:00', 'P'),
(8, 1847, NULL, 'Health', '2026-05-20 10:30:00', NULL, NULL, '2026-05-20 11:00:00', '#9E9E9E', '<ul><li>Serviço de NF-e - Andreia</li></ul>', 'A', '2026-05-20', '10:30:00', '11:00:00', '00:00:00', '00:00:00', '00:30:00', 'P'),
(8, 1848, NULL, 'Health', '2026-05-21 13:30:00', NULL, NULL, '2026-05-21 14:30:00', '#9E9E9E', '<ul><li>Liberação de Cadastro de Grupo de Produtos - Andreia</li><li>Consulta de Produto por data de cadastro - Andreia</li></ul>', 'A', '2026-05-21', '13:30:00', '14:30:00', '00:00:00', '00:00:00', '01:00:00', 'P'),
(8, 1849, NULL, 'Health', '2026-05-22 09:00:00', NULL, NULL, '2026-05-22 16:00:00', '#9E9E9E', '<ul><li>Ajustes Totvs Transmite - Andreia</li></ul>', 'A', '2026-05-22', '09:00:00', '16:00:00', '11:00:00', '13:00:00', '05:00:00', 'P'),
(5, 1850, NULL, 'RCG', '2026-05-26 08:00:00', NULL, NULL, '2026-05-26 18:00:00', '#00BCD4', '<ul><li>Atualização Release 2510</li><li>Erro copia de cadastro de produtos RCG &lt;-&gt; CBA</li></ul>', 'A', '2026-05-26', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(5, 1851, NULL, 'RCG', '2026-05-29 08:00:00', NULL, NULL, '2026-05-29 18:00:00', '#00BCD4', '<ul><li>Atualização Release 2510</li><li>Planilha de Clientes para Campanha de aniversario</li></ul>', 'A', '2026-05-29', '08:00:00', '18:00:00', '11:30:00', '13:00:00', '08:30:00', 'P'),
(4, 1852, NULL, 'MSGAS', '2026-05-27 19:30:00', NULL, NULL, '2026-05-27 22:30:00', '#2196F3', '<ul><li>API balancete pyplan</li></ul>', 'A', '2026-05-27', '19:30:00', '22:30:00', '00:00:00', '00:00:00', '03:00:00', 'R'),
(8, 1853, NULL, 'Health', '2026-05-19 15:30:00', NULL, NULL, '2026-05-19 16:30:00', '#9E9E9E', '<ul><li>Atendimento&nbsp;Anielly - MV_1DUP Grupo 09</li></ul>', 'A', '2026-05-19', '15:30:00', '16:30:00', '00:00:00', '00:00:00', '01:00:00', 'P'),
(8, 1854, NULL, 'Health', '2026-05-27 10:30:00', NULL, NULL, '2026-05-27 11:00:00', '#9E9E9E', '<ul><li>Notas Fisicais de vendas excluidas -&nbsp;Anielly&nbsp;</li></ul>', 'A', '2026-05-27', '10:30:00', '11:00:00', '00:00:00', '00:00:00', '00:30:00', 'P'),
(8, 1855, NULL, 'Health', '2026-05-29 13:00:00', NULL, NULL, '2026-05-29 15:00:00', '#9E9E9E', '<ul><li>Correção de Perfil de Usuaior 114/115 listar filial - Andreia</li></ul>', 'A', '2026-05-29', '13:00:00', '15:00:00', '00:00:00', '00:00:00', '02:00:00', 'P'),
(8, 1856, NULL, 'Health', '2026-05-15 13:00:00', NULL, NULL, '2026-05-15 17:00:00', '#9E9E9E', '<ul><li>Atualização de Release</li></ul>', 'A', '2026-05-15', '13:00:00', '17:00:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(4, 1857, NULL, 'MSGAS', '2026-06-01 07:30:00', NULL, NULL, '2026-06-01 11:30:00', '#2196F3', '<ul><li>Testes Reelase 2510</li></ul>', 'A', '2026-06-01', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(5, 1858, NULL, 'RCG', '2026-06-01 12:30:00', NULL, NULL, '2026-06-01 17:30:00', '#00BCD4', '<ul><li>Testes Reelase 2510</li><li>Testes de Backup</li></ul>', 'A', '2026-06-01', '12:30:00', '17:30:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(5, 1859, NULL, 'RCG', '2026-06-02 08:00:00', NULL, NULL, '2026-06-02 11:00:00', '#00BCD4', '<ul><li>Testes Release 2510</li><li>Relação e Comodatos CBA</li></ul>', 'A', '2026-06-02', '08:00:00', '11:00:00', '00:00:00', '00:00:00', '03:00:00', 'P'),
(5, 1860, NULL, 'FALTA', '2026-06-02 11:00:00', NULL, NULL, '2026-06-02 12:00:00', '#F44336', '<ul><li>Falta</li></ul>', 'A', '2026-06-02', '11:00:00', '12:00:00', '00:00:00', '00:00:00', '01:00:00', 'F'),
(5, 1861, NULL, 'FALTA', '2026-06-02 13:00:00', NULL, NULL, '2026-06-02 14:00:00', '#F44336', '<ul><li>Falta</li></ul>', 'A', '2026-06-02', '13:00:00', '14:00:00', '00:00:00', '00:00:00', '01:00:00', 'F'),
(5, 1862, NULL, 'RCG', '2026-06-02 14:00:00', NULL, NULL, '2026-06-02 17:30:00', '#00BCD4', '<ul><li>EFD ICMS CBA</li></ul>', 'A', '2026-06-02', '14:00:00', '17:30:00', '00:00:00', '00:00:00', '03:30:00', 'P'),
(4, 1863, NULL, 'MSGAS', '2026-06-03 07:30:00', NULL, NULL, '2026-06-03 17:30:00', '#2196F3', '<ul><li>Atualização Release 2510 - HML</li><li>TSS Release 2510 - HML</li></ul>', 'A', '2026-06-03', '07:30:00', '17:30:00', '12:00:00', '13:30:00', '08:30:00', 'P'),
(5, 1864, NULL, 'RCG', '2026-06-05 08:00:00', NULL, NULL, '2026-06-05 18:00:00', '#00BCD4', '<ul><li>Testes Release 2510</li><li>Ajustes integração MAXIMA</li></ul>', 'A', '2026-06-05', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(5, 1865, NULL, 'RCG', '2026-06-08 13:00:00', NULL, NULL, '2026-06-08 18:00:00', '#F44336', '<ul><li>Falta</li></ul>', 'A', '2026-06-08', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'F'),
(5, 1866, NULL, 'RCG', '2026-06-09 08:30:00', NULL, NULL, '2026-06-09 18:00:00', '#00BCD4', '<ul><li>Matheus TOTVS</li><li>Relatorio de Vendas 12 meses Alex</li><li>Tonner Impressora Gabriel</li><li>Titulos nosso numero duplicado CBA</li></ul>', 'A', '2026-06-09', '08:30:00', '18:00:00', '00:00:00', '00:00:00', '09:30:00', 'P'),
(4, 1867, NULL, 'MSGAS', '2026-06-10 07:30:00', NULL, NULL, '2026-06-10 17:30:00', '#2196F3', '<ul><li>Correção de erro na Criação de Usuarios DEV</li><li>Atualização DEV 2510</li><li>Reunião Novix</li><li>Analise boleto API</li><li>Compatibilização danfeii_m</li></ul>', 'A', '2026-06-10', '07:30:00', '17:30:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(4, 1868, NULL, 'MSGAS', '2026-06-11 07:30:00', NULL, NULL, '2026-06-11 17:30:00', '#2196F3', '<ul><li>e-Sfinge Folha pagamento</li></ul>', 'A', '2026-06-11', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(4, 1869, NULL, 'MSGAS', '2026-06-15 07:30:00', NULL, NULL, '2026-06-15 11:30:00', '#2196F3', '<ul><li>e-Sfinge Folha pagamento</li></ul>', 'A', '2026-06-15', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(5, 1870, NULL, 'RCG', '2026-06-12 08:00:00', NULL, NULL, '2026-06-12 17:30:00', '#00BCD4', '<ul><li>Testes Release 2510</li></ul>', 'A', '2026-06-12', '08:00:00', '17:30:00', '12:00:00', '13:00:00', '08:30:00', 'P'),
(5, 1871, NULL, 'RCG', '2026-06-15 13:00:00', NULL, NULL, '2026-06-15 17:30:00', '#00BCD4', '<ul><li>Testes Release 2510</li><li>Testes Backup sistema</li></ul>', 'A', '2026-06-15', '13:00:00', '17:30:00', '00:00:00', '00:00:00', '04:30:00', 'P'),
(5, 1872, NULL, 'RCG', '2026-06-16 08:00:00', NULL, NULL, '2026-06-16 17:30:00', '#00BCD4', '<ul><li>Criação de srvweb para Evolution API e ChatWoot(Whatsapp)</li><li>Testes Release 2510</li></ul>', 'A', '2026-06-16', '08:00:00', '17:30:00', '12:00:00', '13:30:00', '08:00:00', 'P'),
(4, 1873, NULL, 'MSGAS', '2026-06-17 07:30:00', NULL, NULL, '2026-06-17 17:30:00', '#2196F3', '<ul><li>Atendimento TOTVS base dev rotina de emprestimos\\aplicação</li><li>Levantamento mudança de tamanho parcela</li><li>apis saldo estoque</li></ul>', 'A', '2026-06-17', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(8, 1874, NULL, 'Health', '2026-06-13 09:00:00', NULL, NULL, '2026-06-13 17:00:00', '#9E9E9E', '<ul><li>Atualização Ambiente HML(Configurador de Tributos)</li></ul>', 'A', '2026-06-13', '09:00:00', '17:00:00', '12:00:00', '13:30:00', '06:30:00', 'P'),
(8, 1875, NULL, 'Health', '2026-06-20 09:00:00', NULL, NULL, '2026-06-20 17:00:00', '#9E9E9E', '<ul><li>Atualiazção Release 2510 produção</li></ul>', 'A', '2026-06-20', '09:00:00', '17:00:00', '12:00:00', '13:30:00', '06:30:00', 'P'),
(5, 1876, NULL, 'RCG', '2026-06-20 09:00:00', NULL, NULL, '2026-06-20 17:00:00', '#00BCD4', '<ul><li>Atualização release 2510</li></ul>', 'A', '2026-06-20', '09:00:00', '17:00:00', '12:00:00', '13:30:00', '06:30:00', 'P'),
(4, 1877, NULL, 'MSGAS', '2026-06-18 07:30:00', NULL, NULL, '2026-06-18 17:30:00', '#2196F3', '<ul><li>apis saldo estoque</li></ul>', 'A', '2026-06-18', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(5, 1878, NULL, 'RCG', '2026-06-19 08:00:00', NULL, NULL, '2026-06-19 18:00:00', '#00BCD4', '<ul><li>Atendimento Alex - Troca de condição de pagamento em pedido MAXIMA</li><li>Preparação de Backup Atuliazação</li><li>Testes NFE Release 2510</li><li>Testes Integração MAXIMA</li></ul>', 'A', '2026-06-19', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(5, 1879, NULL, 'RCG', '2026-06-22 08:00:00', NULL, NULL, '2026-06-22 18:00:00', '#00BCD4', '<ul><li>Apoio POS atualização</li><li>Testes de Backup</li><li>Ajuste Integração Maxima</li><li>Correção de problemas com webagent</li></ul>', 'A', '2026-06-22', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(4, 1880, NULL, 'MSGAS', '2026-06-23 07:30:00', NULL, NULL, '2026-06-23 11:30:00', '#2196F3', '<ul><li>e-Sfinge Folha pagamento</li></ul>', 'A', '2026-06-23', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(5, 1881, NULL, 'RCG', '2026-06-23 13:00:00', NULL, NULL, '2026-06-23 18:00:00', '#00BCD4', '<ul><li>Ajuste Integração Maxima</li><li>Transferencia Clientes Carteira Caroline</li></ul>', 'A', '2026-06-23', '13:00:00', '18:00:00', '00:00:00', '00:00:00', '05:00:00', 'P'),
(NULL, 1882, NULL, 'feriado', '2026-06-04 08:00:00', NULL, NULL, '2026-06-04 18:00:00', '#F44336', NULL, 'A', '2026-06-04', '08:00:00', '18:00:00', '00:00:00', '00:00:00', '10:00:00', 'P'),
(4, 1883, NULL, 'MSGAS', '2026-06-24 07:30:00', NULL, NULL, '2026-06-24 16:30:00', '#2196F3', '<ul><li>e-Sfinge Folha pagamento</li></ul>', 'A', '2026-06-24', '07:30:00', '16:30:00', '11:30:00', '13:30:00', '07:00:00', 'P'),
(4, 1884, NULL, 'MSGAS', '2026-06-25 07:30:00', NULL, NULL, '2026-06-25 17:30:00', '#2196F3', '<ul><li>e-Sfinge Folha pagamento</li></ul>', 'A', '2026-06-25', '07:30:00', '17:30:00', '11:30:00', '13:30:00', '08:00:00', 'P'),
(5, 1885, NULL, 'RCG', '2026-06-26 08:00:00', NULL, NULL, '2026-06-26 18:00:00', '#00BCD4', '<ul><li>Configuração acessos Caroline<ul><li>Computador/Email/Sistemas</li></ul></li><li>Ajuste integração Maxima(MXPED-92771)</li><li>Reunião Rose\\Eliane\\ Se Edezio - Reforma Tributaria</li></ul>', 'A', '2026-06-26', '08:00:00', '18:00:00', '12:00:00', '13:00:00', '09:00:00', 'P'),
(4, 1886, NULL, 'MSGAS', '2026-06-29 07:30:00', NULL, NULL, '2026-06-29 11:30:00', '#2196F3', '<ul><li>e-Sfinge Folha pagamento</li></ul>', 'A', '2026-06-29', '07:30:00', '11:30:00', '00:00:00', '00:00:00', '04:00:00', 'P'),
(5, 1887, NULL, 'RCG', '2026-06-29 16:00:00', NULL, NULL, '2026-06-29 18:00:00', '#00BCD4', '<ul><li>Propostas EXCEL Gabriel</li><li>Criação de Ambiente para Reforma Tributaria</li></ul>', 'A', '2026-06-29', '16:00:00', '18:00:00', '00:00:00', '00:00:00', '02:00:00', 'P'),
(5, 1888, NULL, 'RCG', '2026-06-30 08:00:00', NULL, NULL, '2026-06-30 11:30:00', '#00BCD4', '<ul><li>Relatório de Baixas CNAB personalizado&nbsp;</li><li>Reunião Alex sistema de proposta&nbsp;</li></ul>', 'A', '2026-06-30', '08:00:00', '11:30:00', NULL, NULL, '03:30:00', 'P'),
(5, 1889, NULL, 'RCG', '2026-06-29 13:00:00', NULL, NULL, '2026-06-29 16:00:00', '#E91E63', '<ul><li>Falta</li></ul>', 'A', '2026-06-29', '13:00:00', '16:00:00', '00:00:00', '00:00:00', '03:00:00', 'F'),
(4, 1890, NULL, 'MSGAS', '2026-06-12 10:00:00', NULL, NULL, '2026-06-12 11:00:00', '#2196F3', '<ul><li>Totvs Boleto Hibrido</li></ul>', 'A', '2026-06-12', '10:00:00', '11:00:00', '00:00:00', '00:00:00', '01:00:00', 'P'),
(5, 1891, NULL, 'RCG', '2026-06-29 09:00:00', NULL, NULL, '2026-06-29 10:00:00', '#00BCD4', '<ul><li>Erro Faturamento CBA</li></ul>', 'A', '2026-06-29', '09:00:00', '10:00:00', '00:00:00', '00:00:00', '01:00:00', 'R'),
(6, 1892, NULL, 'GUATOS', '2026-06-23 16:00:00', NULL, NULL, '2026-06-23 18:00:00', '#FFC107', '<ul><li>Apliicadas Atualizações solicitadas pelo SR&nbsp;Joelson Santos - Contador</li></ul>', 'A', '2026-06-23', '16:00:00', '18:00:00', '00:00:00', '00:00:00', '02:00:00', 'P'),
(6, 1893, NULL, 'GUATOS', '2026-06-26 13:30:00', NULL, NULL, '2026-06-26 17:00:00', '#FFC107', '<ul><li>Ajuste em cadastro de Calendario</li><li>Ajuste em cadastro Calendario X Moedas</li><li>Geração de arquivo ECD</li><li>Analise de relatorio \"Lançamentos com Diferença\"</li><li>Apresentando para o Contador lancamentos do diferenção e a necessidade de ajuste em cadastro de Visão Gerencial de Balanço Patrimonial</li></ul>', 'A', '2026-06-26', '13:30:00', '17:00:00', '00:00:00', '00:00:00', '03:30:00', 'P'),
(5, 1894, 1, 'RCG', '2026-06-30 13:00:00', NULL, NULL, '2026-06-30 16:30:00', '#E91E63', '<ul><li>Falta</li></ul>', 'A', '2026-06-30', '13:00:00', '16:30:00', '00:00:00', '00:00:00', '03:30:00', 'F'),
(5, 1895, NULL, 'RCG', '2026-06-30 16:30:00', NULL, NULL, '2026-06-30 18:00:00', '#00BCD4', '<ul><li>Erro importação de pedidos Josue</li><li>TES CBA - Fundo de combate à Probreza</li></ul>', 'A', '2026-06-30', '16:30:00', '18:00:00', '00:00:00', '00:00:00', '01:30:00', 'P');

-- --------------------------------------------------------

--
-- Estrutura para tabela `ausencias`
--

CREATE TABLE `ausencias` (
  `id` int NOT NULL,
  `profissional_id` int NOT NULL,
  `descricao` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `inicio` datetime DEFAULT NULL,
  `final` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `cidade`
--

CREATE TABLE `cidade` (
  `id` int NOT NULL,
  `estado_id` int NOT NULL,
  `nome` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Despejando dados para a tabela `cidade`
--

INSERT INTO `cidade` (`id`, `estado_id`, `nome`) VALUES
(1, 1, 'CAMPO GRANDE');

-- --------------------------------------------------------

--
-- Estrutura para tabela `colaborador`
--

CREATE TABLE `colaborador` (
  `id` int NOT NULL,
  `nome` text COLLATE utf8mb3_unicode_ci NOT NULL,
  `telefone` varchar(9) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `whatsapp` char(1) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `funcao_id` int NOT NULL,
  `email` text COLLATE utf8mb3_unicode_ci,
  `aprova_os` char(1) COLLATE utf8mb3_unicode_ci DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Despejando dados para a tabela `colaborador`
--

INSERT INTO `colaborador` (`id`, `nome`, `telefone`, `whatsapp`, `funcao_id`, `email`, `aprova_os`) VALUES
(5, 'Adriano', NULL, NULL, 4, NULL, 'N'),
(6, 'Marcelo Vinholi', NULL, NULL, 3, NULL, 'N'),
(7, 'Emerson Muniz', NULL, NULL, 3, NULL, 'N'),
(8, 'Rodrigo Cardoso', NULL, NULL, 2, 'rodrigo.cardoso@healthbrasil.com.br', 'N'),
(9, 'Rose Ribeiro', NULL, NULL, 4, NULL, 'N'),
(10, 'Rosires Ribeiro', NULL, NULL, 4, NULL, 'N'),
(11, 'Alex Velasques', NULL, NULL, 2, NULL, 'N'),
(12, 'Edson Gomes Barbosa', NULL, NULL, 3, NULL, 'N'),
(13, 'Carlos', NULL, NULL, 3, NULL, 'N'),
(14, 'Moises Nantes', NULL, NULL, 2, NULL, 'N'),
(15, 'Alan', NULL, NULL, 3, NULL, 'N'),
(16, 'Ricardo Patay Sotomayor', '679914684', 'S', 1, 'ricardops34@hotmail.com', 'S');

-- --------------------------------------------------------

--
-- Estrutura para tabela `contrato`
--

CREATE TABLE `contrato` (
  `id` int NOT NULL,
  `empresa_id` int NOT NULL,
  `descricao` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `dt_inicio` date NOT NULL,
  `dt_fim` date NOT NULL,
  `valor_hora` double DEFAULT NULL,
  `cor` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `valor_fixo` double DEFAULT NULL,
  `tipo` varchar(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Despejando dados para a tabela `contrato`
--

INSERT INTO `contrato` (`id`, `empresa_id`, `descricao`, `dt_inicio`, `dt_fim`, `valor_hora`, `cor`, `valor_fixo`, `tipo`) VALUES
(3, 1, 'FUNLEC', '2019-01-01', '2026-12-31', 115, '#4CAF50', NULL, 'H'),
(4, 3, 'MSGAS', '2021-12-01', '2026-12-31', 90, '#2196F3', NULL, 'H'),
(5, 2, 'RCG', '2022-01-01', '2026-12-31', NULL, '#00BCD4', 3500, 'F'),
(6, 4, 'GUATOS', '2020-01-01', '2030-12-31', 80, '#FFC107', NULL, 'H'),
(7, 5, 'GAO MSGAS', '2022-05-01', '2022-12-31', 70, '#2196F3', NULL, 'H'),
(8, 6, 'Health', '2022-06-01', '2022-12-31', 90, '#9E9E9E', NULL, 'H'),
(9, 7, 'JFS', '2022-10-01', '2023-12-31', 90, '#FF5722', NULL, 'H'),
(10, 8, 'H2L AVULSO', '2025-02-01', '2025-12-31', 120, '#00BCD4', NULL, 'H');

-- --------------------------------------------------------

--
-- Estrutura para tabela `contrato_item`
--

CREATE TABLE `contrato_item` (
  `id` int NOT NULL,
  `contrato_id` int NOT NULL,
  `dia_semana` int DEFAULT NULL,
  `hora_inicio` time DEFAULT NULL,
  `intervalo_ini` time DEFAULT NULL,
  `intervalo_fim` time DEFAULT NULL,
  `hora_final` time DEFAULT NULL,
  `profissional_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Despejando dados para a tabela `contrato_item`
--

INSERT INTO `contrato_item` (`id`, `contrato_id`, `dia_semana`, `hora_inicio`, `intervalo_ini`, `intervalo_fim`, `hora_final`, `profissional_id`) VALUES
(9, 3, 1, '07:30:00', NULL, NULL, '11:30:00', 1),
(13, 4, 3, '07:30:00', '11:30:00', '13:30:00', '17:30:00', 1),
(14, 4, 4, '07:30:00', '11:30:00', '13:30:00', '17:30:00', NULL),
(18, 5, 1, '13:00:00', NULL, NULL, '18:00:00', 1),
(19, 5, 2, '08:00:00', '11:30:00', '13:00:00', '18:00:00', 1),
(20, 5, 5, '08:00:00', '11:30:00', '13:00:00', '18:00:00', NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `contrato_profissional`
--

CREATE TABLE `contrato_profissional` (
  `id` int NOT NULL,
  `contrato_id` int NOT NULL,
  `profissional_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Despejando dados para a tabela `contrato_profissional`
--

INSERT INTO `contrato_profissional` (`id`, `contrato_id`, `profissional_id`) VALUES
(10, 6, 1),
(11, 7, 1),
(17, 8, 1),
(18, 9, 1),
(19, 10, 1),
(21, 4, 1),
(23, 5, 1),
(26, 3, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `empresa`
--

CREATE TABLE `empresa` (
  `id` int NOT NULL,
  `nome` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `cidade_id` int NOT NULL,
  `endereco` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `cor` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `razao` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `responsalvel` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Despejando dados para a tabela `empresa`
--

INSERT INTO `empresa` (`id`, `nome`, `cidade_id`, `endereco`, `cor`, `razao`, `responsalvel`) VALUES
(1, 'FUNLEC', 1, NULL, '#4CAF50', 'Fundação Lowtons de Educação e Cultura', NULL),
(2, 'RCG', 1, NULL, '#03A9F4', 'Representaçoes Campo Grande', NULL),
(3, 'MSGAS', 1, NULL, '#2196F3', 'MSGAS', NULL),
(4, 'GUATOS', 1, NULL, '#FF5722', 'GUATOS', NULL),
(5, 'GAO', 1, NULL, '#2196F3', 'GAO - MSGAS', NULL),
(6, 'Health Brasil', 1, NULL, '#9E9E9E', 'Health Brasil', NULL),
(7, 'JFS', 1, NULL, '#FF5722', 'JEITO FRIO', NULL),
(8, 'H2L', 1, NULL, '#00BCD4', 'H2L', NULL),
(9, 'MATPAR', 1, NULL, '#9E9E9E', 'MATPAR', NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `empresa_colaborador`
--

CREATE TABLE `empresa_colaborador` (
  `id` int NOT NULL,
  `empresa_id` int NOT NULL,
  `colaborador_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `estado`
--

CREATE TABLE `estado` (
  `id` int NOT NULL,
  `nome` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Despejando dados para a tabela `estado`
--

INSERT INTO `estado` (`id`, `nome`) VALUES
(1, 'MS');

-- --------------------------------------------------------

--
-- Estrutura para tabela `feriado`
--

CREATE TABLE `feriado` (
  `id` int NOT NULL,
  `dt_feriado` date DEFAULT NULL,
  `tipo` char(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `descricao` char(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Despejando dados para a tabela `feriado`
--

INSERT INTO `feriado` (`id`, `dt_feriado`, `tipo`, `descricao`) VALUES
(1, '2022-04-15', 'N', 'SEXTA FEIRA SANTA'),
(2, '2022-04-21', 'S', 'Tiradentes');

-- --------------------------------------------------------

--
-- Estrutura para tabela `funcao`
--

CREATE TABLE `funcao` (
  `id` int NOT NULL,
  `descricao` text COLLATE utf8mb3_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Despejando dados para a tabela `funcao`
--

INSERT INTO `funcao` (`id`, `descricao`) VALUES
(1, 'Administrativo'),
(2, 'Gerente'),
(3, 'Analista'),
(4, 'Proprietário '),
(5, 'Vendedor'),
(6, 'Representante');

-- --------------------------------------------------------

--
-- Estrutura para tabela `profissional`
--

CREATE TABLE `profissional` (
  `nome` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `id` int NOT NULL,
  `system_user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Despejando dados para a tabela `profissional`
--

INSERT INTO `profissional` (`nome`, `id`, `system_user_id`) VALUES
('Ricardo Patay Sotomayor', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `realizado`
--

CREATE TABLE `realizado` (
  `id` int NOT NULL,
  `contrato_id` int NOT NULL,
  `profissional_id` int NOT NULL,
  `descricao` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `inicio` datetime NOT NULL,
  `inter_inicial` datetime DEFAULT NULL,
  `inter_final` datetime DEFAULT NULL,
  `fim` datetime NOT NULL,
  `observacao` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `horas` double DEFAULT NULL,
  `agendamento_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_document`
--

CREATE TABLE `system_document` (
  `id` int NOT NULL,
  `system_user_id` int DEFAULT NULL,
  `title` text NOT NULL,
  `description` text,
  `category_id` int NOT NULL,
  `submission_date` date DEFAULT NULL,
  `archive_date` date DEFAULT NULL,
  `filename` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_document_category`
--

CREATE TABLE `system_document_category` (
  `id` int NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Despejando dados para a tabela `system_document_category`
--

INSERT INTO `system_document_category` (`id`, `name`) VALUES
(1, 'Documentação');

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_document_group`
--

CREATE TABLE `system_document_group` (
  `id` int NOT NULL,
  `document_id` int NOT NULL,
  `system_group_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_document_user`
--

CREATE TABLE `system_document_user` (
  `id` int NOT NULL,
  `document_id` int NOT NULL,
  `system_user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_group`
--

CREATE TABLE `system_group` (
  `id` int NOT NULL,
  `name` text NOT NULL,
  `uuid` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Despejando dados para a tabela `system_group`
--

INSERT INTO `system_group` (`id`, `name`, `uuid`) VALUES
(1, 'Admin', NULL),
(2, 'Standard', NULL),
(3, 'Cadastros básicos', '6cf72272-a21c-4c04-922d-d43e6b038e9a'),
(4, 'Gráficos', 'a3a6a24f-c2ca-4d26-81e3-86fabf374aaf'),
(5, 'Relatórios', 'fa0d2790-e6df-4f97-b1c0-047c9e831224'),
(6, 'Serviços', 'ed37a112-8c25-4503-9386-2aae28f576fc'),
(7, 'BChat Interno', '87fda867-44a5-4520-8a55-5a07596d6d2e');

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_group_program`
--

CREATE TABLE `system_group_program` (
  `id` int NOT NULL,
  `system_group_id` int DEFAULT NULL,
  `system_program_id` int DEFAULT NULL,
  `actions` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Despejando dados para a tabela `system_group_program`
--

INSERT INTO `system_group_program` (`id`, `system_group_id`, `system_program_id`, `actions`) VALUES
(1, 1, 1, NULL),
(2, 1, 2, NULL),
(3, 1, 3, NULL),
(4, 1, 4, NULL),
(5, 1, 5, NULL),
(6, 1, 6, NULL),
(7, 1, 8, NULL),
(8, 1, 9, NULL),
(9, 1, 11, NULL),
(10, 1, 14, NULL),
(11, 1, 15, NULL),
(12, 2, 10, NULL),
(13, 2, 12, NULL),
(14, 2, 13, NULL),
(15, 2, 16, NULL),
(16, 2, 17, NULL),
(17, 2, 18, NULL),
(18, 2, 19, NULL),
(19, 2, 20, NULL),
(20, 1, 21, NULL),
(21, 2, 22, NULL),
(22, 2, 23, NULL),
(23, 2, 24, NULL),
(24, 2, 25, NULL),
(25, 1, 26, NULL),
(26, 1, 27, NULL),
(27, 1, 28, NULL),
(28, 1, 29, NULL),
(29, 2, 30, NULL),
(30, 1, 31, NULL),
(31, 1, 32, NULL),
(32, 1, 33, NULL),
(33, 1, 34, NULL),
(34, 1, 35, NULL),
(36, 1, 36, NULL),
(37, 1, 37, NULL),
(38, 1, 38, NULL),
(39, 1, 39, NULL),
(40, 1, 40, NULL),
(41, 1, 41, NULL),
(42, 1, 42, NULL),
(43, 3, 43, NULL),
(44, 3, 44, NULL),
(45, 3, 45, NULL),
(46, 3, 46, NULL),
(47, 3, 47, NULL),
(48, 3, 48, NULL),
(49, 3, 49, NULL),
(50, 3, 50, NULL),
(51, 3, 51, NULL),
(52, 3, 52, NULL),
(53, 4, 53, NULL),
(54, 4, 54, NULL),
(55, 5, 55, NULL),
(56, 6, 56, NULL),
(57, 6, 57, NULL),
(58, 6, 58, NULL),
(59, 6, 59, NULL),
(60, 6, 60, NULL),
(61, 6, 61, NULL),
(62, 6, 62, NULL),
(63, 6, 63, NULL),
(64, 6, 64, NULL),
(65, 5, 65, NULL),
(66, 6, 66, NULL),
(67, 6, 67, NULL),
(68, 6, 68, NULL),
(69, 6, 69, NULL),
(70, 3, 70, NULL),
(71, 3, 71, NULL),
(72, 7, 72, NULL),
(73, 7, 73, NULL),
(74, 7, 74, NULL),
(75, 1, 75, NULL),
(76, 1, 76, NULL),
(77, 3, 77, NULL),
(78, 3, 78, NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_message`
--

CREATE TABLE `system_message` (
  `id` int NOT NULL,
  `system_user_id` int NOT NULL,
  `system_user_to_id` int NOT NULL,
  `subject` text NOT NULL,
  `message` text,
  `dt_message` datetime DEFAULT NULL,
  `checked` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_notification`
--

CREATE TABLE `system_notification` (
  `id` int NOT NULL,
  `system_user_id` int NOT NULL,
  `system_user_to_id` int NOT NULL,
  `subject` text,
  `message` text,
  `dt_message` datetime DEFAULT NULL,
  `action_url` text,
  `action_label` text,
  `icon` text,
  `checked` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_preference`
--

CREATE TABLE `system_preference` (
  `id` varchar(255) NOT NULL,
  `preference` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_program`
--

CREATE TABLE `system_program` (
  `id` int NOT NULL,
  `name` text NOT NULL,
  `controller` text NOT NULL,
  `actions` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Despejando dados para a tabela `system_program`
--

INSERT INTO `system_program` (`id`, `name`, `controller`, `actions`) VALUES
(1, 'System Group Form', 'SystemGroupForm', NULL),
(2, 'System Group List', 'SystemGroupList', NULL),
(3, 'System Program Form', 'SystemProgramForm', NULL),
(4, 'System Program List', 'SystemProgramList', NULL),
(5, 'System User Form', 'SystemUserForm', NULL),
(6, 'System User List', 'SystemUserList', NULL),
(7, 'Common Page', 'CommonPage', NULL),
(8, 'System PHP Info', 'SystemPHPInfoView', NULL),
(9, 'System ChangeLog View', 'SystemChangeLogView', NULL),
(10, 'Welcome View', 'WelcomeView', NULL),
(11, 'System Sql Log', 'SystemSqlLogList', NULL),
(12, 'System Profile View', 'SystemProfileView', NULL),
(13, 'System Profile Form', 'SystemProfileForm', NULL),
(14, 'System SQL Panel', 'SystemSQLPanel', NULL),
(15, 'System Access Log', 'SystemAccessLogList', NULL),
(16, 'System Message Form', 'SystemMessageForm', NULL),
(17, 'System Message List', 'SystemMessageList', NULL),
(18, 'System Message Form View', 'SystemMessageFormView', NULL),
(19, 'System Notification List', 'SystemNotificationList', NULL),
(20, 'System Notification Form View', 'SystemNotificationFormView', NULL),
(21, 'System Document Category List', 'SystemDocumentCategoryFormList', NULL),
(22, 'System Document Form', 'SystemDocumentForm', NULL),
(23, 'System Document Upload Form', 'SystemDocumentUploadForm', NULL),
(24, 'System Document List', 'SystemDocumentList', NULL),
(25, 'System Shared Document List', 'SystemSharedDocumentList', NULL),
(26, 'System Unit Form', 'SystemUnitForm', NULL),
(27, 'System Unit List', 'SystemUnitList', NULL),
(28, 'System Access stats', 'SystemAccessLogStats', NULL),
(29, 'System Preference form', 'SystemPreferenceForm', NULL),
(30, 'System Support form', 'SystemSupportForm', NULL),
(31, 'System PHP Error', 'SystemPHPErrorLogView', NULL),
(32, 'System Database Browser', 'SystemDatabaseExplorer', NULL),
(33, 'System Table List', 'SystemTableList', NULL),
(34, 'System Data Browser', 'SystemDataBrowser', NULL),
(35, 'System Menu Editor', 'SystemMenuEditor', NULL),
(36, 'System Request Log', 'SystemRequestLogList', NULL),
(37, 'System Request Log View', 'SystemRequestLogView', NULL),
(38, 'System Administration Dashboard', 'SystemAdministrationDashboard', NULL),
(39, 'System Log Dashboard', 'SystemLogDashboard', NULL),
(40, 'System Session dump', 'SystemSessionDumpView', NULL),
(41, 'System files diff', 'SystemFilesDiff', NULL),
(42, 'System Information', 'SystemInformationView', NULL),
(43, 'Profissionais', 'ProfissionalList', NULL),
(44, 'Empresas', 'EmpresaList', NULL),
(45, 'Estados', 'EstadoList', NULL),
(46, 'Cidades', 'CidadeList', NULL),
(47, 'Feriados', 'FeriadosList', NULL),
(48, 'Cadastro de feriados', 'FeriadosForm', NULL),
(49, 'Cadastro de cidade', 'CidadeForm', NULL),
(50, 'Cadastro de estado', 'EstadoForm', NULL),
(51, 'Cadastro de empresa', 'EmpresaForm', NULL),
(52, 'Cadastro de profissional', 'ProfissionalForm', NULL),
(53, 'Horas prestadas por profissional', 'RealizadoChart', NULL),
(54, 'Valor total gerado por profissional', 'RealizadoValorTotalChart', NULL),
(55, 'Relatório de serviços realizados', 'RealizadoReport', NULL),
(56, 'Agenda(Form)', 'AgendaCalendarForm', NULL),
(57, 'Agenda(View)', 'AgendaCalendarFormView', NULL),
(58, 'Trabalhos realizados', 'RealizadoList', NULL),
(59, 'Contratos', 'ContratoList', NULL),
(60, 'Gerar Apontamentos', 'GerarApontamento', NULL),
(61, 'Gerar Apontamentos(Clonado)', 'GerarApontamentoClonado', NULL),
(62, 'Confirmar Apontamentos', 'ConfirmarApontamento', NULL),
(63, 'Cadastro de contrato', 'ContratoForm', NULL),
(64, 'Cadastro de trabalho realizado', 'RealizadoForm', NULL),
(65, 'Ordem de Serviço', 'OrdemServicoDocument', NULL),
(66, 'Agendamentos', 'AgendamentoList', NULL),
(67, 'Calendario(Form)', 'AgendamentoCalendarioForm', NULL),
(68, 'Calendario(View)', 'AgendamentoCalendarioFormView', NULL),
(69, 'RealizadoListTeste', 'RealizadoListTeste', NULL),
(70, 'Cadastro de funções', 'FuncaoForm', NULL),
(71, 'Funções', 'FuncaoList', NULL),
(72, 'Form de adicionar usuário ao grupo de chat', 'SystemAddUserGroupForm', NULL),
(73, 'Form para iniciar um chat', 'SystemNewChatForm', NULL),
(74, 'Form para iniciar um chat em grupo', 'SystemNewChatGroupForm', NULL),
(75, 'Listagem para monitorar usuários online', 'SystemUserMonitorHeaderList', NULL),
(76, 'Formulário de imoportação de registros', 'SystemDataImportForm', NULL),
(77, 'Cadastro de colaborador', 'ColaboradorForm', NULL),
(78, 'Colaboradores', 'ColaboradorList', NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_unit`
--

CREATE TABLE `system_unit` (
  `id` int NOT NULL,
  `name` text NOT NULL,
  `connection_name` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_users`
--

CREATE TABLE `system_users` (
  `id` int NOT NULL,
  `name` text NOT NULL,
  `login` text NOT NULL,
  `password` text NOT NULL,
  `email` text,
  `frontpage_id` int DEFAULT NULL,
  `system_unit_id` int DEFAULT NULL,
  `active` char(1) DEFAULT NULL,
  `accepted_term_policy` char(1) DEFAULT NULL,
  `accepted_term_policy_at` text,
  `two_factor_enabled` char(1) DEFAULT 'N',
  `two_factor_secret` varchar(255) DEFAULT NULL,
  `two_factor_type` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Despejando dados para a tabela `system_users`
--

INSERT INTO `system_users` (`id`, `name`, `login`, `password`, `email`, `frontpage_id`, `system_unit_id`, `active`, `accepted_term_policy`, `accepted_term_policy_at`, `two_factor_enabled`, `two_factor_secret`, `two_factor_type`) VALUES
(1, 'Ricardo', 'admin', '$2y$12$W/4BSjKY9Yivvz/DCl0APudk0BvE4Ne7y0UU6uqPa.jehGyLD9auy', 'ricardops34@hotmail.com', 10, NULL, 'Y', NULL, NULL, 'N', NULL, NULL),
(2, 'User', 'user', 'ee11cbb19052e40b07aac0ca060c23ee', 'user@user.net', 7, NULL, 'N', NULL, NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_user_group`
--

CREATE TABLE `system_user_group` (
  `id` int NOT NULL,
  `system_user_id` int DEFAULT NULL,
  `system_group_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Despejando dados para a tabela `system_user_group`
--

INSERT INTO `system_user_group` (`id`, `system_user_id`, `system_group_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 1, 2),
(4, 1, 3),
(5, 1, 4),
(6, 1, 5),
(7, 1, 6);

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_user_program`
--

CREATE TABLE `system_user_program` (
  `id` int NOT NULL,
  `system_user_id` int DEFAULT NULL,
  `system_program_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Despejando dados para a tabela `system_user_program`
--

INSERT INTO `system_user_program` (`id`, `system_user_id`, `system_program_id`) VALUES
(1, 2, 7);

-- --------------------------------------------------------

--
-- Estrutura para tabela `system_user_unit`
--

CREATE TABLE `system_user_unit` (
  `id` int NOT NULL,
  `system_user_id` int DEFAULT NULL,
  `system_unit_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `agendamento`
--
ALTER TABLE `agendamento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_agendamento_1` (`contrato_id`),
  ADD KEY `fk_agendamento_2` (`profissional_id`);

--
-- Índices de tabela `ausencias`
--
ALTER TABLE `ausencias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ausencias_1` (`profissional_id`);

--
-- Índices de tabela `cidade`
--
ALTER TABLE `cidade`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cidade_1` (`estado_id`);

--
-- Índices de tabela `colaborador`
--
ALTER TABLE `colaborador`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_colaborador_2_2` (`funcao_id`);

--
-- Índices de tabela `contrato`
--
ALTER TABLE `contrato`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_contrato_1` (`empresa_id`);

--
-- Índices de tabela `contrato_item`
--
ALTER TABLE `contrato_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_item_contrato_1` (`contrato_id`),
  ADD KEY `fk_item_contrato_2` (`profissional_id`);

--
-- Índices de tabela `contrato_profissional`
--
ALTER TABLE `contrato_profissional`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_contrato_profissional_1` (`contrato_id`),
  ADD KEY `fk_contrato_profissional_2` (`profissional_id`);

--
-- Índices de tabela `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_empresa_1` (`cidade_id`);

--
-- Índices de tabela `empresa_colaborador`
--
ALTER TABLE `empresa_colaborador`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_empresa_colaborador_1_1` (`colaborador_id`),
  ADD KEY `fk_empresa_colaborador_2_2` (`empresa_id`);

--
-- Índices de tabela `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `feriado`
--
ALTER TABLE `feriado`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `funcao`
--
ALTER TABLE `funcao`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `profissional`
--
ALTER TABLE `profissional`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `system_user_id` (`system_user_id`);

--
-- Índices de tabela `realizado`
--
ALTER TABLE `realizado`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_realizado_1` (`contrato_id`),
  ADD KEY `fk_realizado_2` (`profissional_id`);

--
-- Índices de tabela `system_document`
--
ALTER TABLE `system_document`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_system_document_category_id` (`category_id`),
  ADD KEY `fk_system_document_system_user_id` (`system_user_id`);

--
-- Índices de tabela `system_document_category`
--
ALTER TABLE `system_document_category`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `system_document_group`
--
ALTER TABLE `system_document_group`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_system_document_group_document_id` (`document_id`),
  ADD KEY `fk_system_document_group_system_group_id` (`system_group_id`);

--
-- Índices de tabela `system_document_user`
--
ALTER TABLE `system_document_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_system_document_user_document_id` (`document_id`),
  ADD KEY `fk_system_document_user_system_user_id` (`system_user_id`);

--
-- Índices de tabela `system_group`
--
ALTER TABLE `system_group`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `system_group_program`
--
ALTER TABLE `system_group_program`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_group_program_program_idx` (`system_program_id`),
  ADD KEY `sys_group_program_group_idx` (`system_group_id`);

--
-- Índices de tabela `system_message`
--
ALTER TABLE `system_message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_system_message_system_user_id` (`system_user_id`),
  ADD KEY `fk_system_message_system_user_to_id` (`system_user_to_id`);

--
-- Índices de tabela `system_notification`
--
ALTER TABLE `system_notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_system_notification_system_user_id` (`system_user_id`),
  ADD KEY `fk_system_notification_system_user_to_id` (`system_user_to_id`);

--
-- Índices de tabela `system_preference`
--
ALTER TABLE `system_preference`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `system_program`
--
ALTER TABLE `system_program`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `system_unit`
--
ALTER TABLE `system_unit`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `system_users`
--
ALTER TABLE `system_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_user_program_idx` (`frontpage_id`);

--
-- Índices de tabela `system_user_group`
--
ALTER TABLE `system_user_group`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_user_group_group_idx` (`system_group_id`),
  ADD KEY `sys_user_group_user_idx` (`system_user_id`);

--
-- Índices de tabela `system_user_program`
--
ALTER TABLE `system_user_program`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_user_program_program_idx` (`system_program_id`),
  ADD KEY `sys_user_program_user_idx` (`system_user_id`);

--
-- Índices de tabela `system_user_unit`
--
ALTER TABLE `system_user_unit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `system_user_id` (`system_user_id`),
  ADD KEY `system_unit_id` (`system_unit_id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `agendamento`
--
ALTER TABLE `agendamento`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1896;

--
-- AUTO_INCREMENT de tabela `ausencias`
--
ALTER TABLE `ausencias`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `cidade`
--
ALTER TABLE `cidade`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `colaborador`
--
ALTER TABLE `colaborador`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de tabela `contrato`
--
ALTER TABLE `contrato`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `contrato_item`
--
ALTER TABLE `contrato_item`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de tabela `contrato_profissional`
--
ALTER TABLE `contrato_profissional`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de tabela `empresa`
--
ALTER TABLE `empresa`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `empresa_colaborador`
--
ALTER TABLE `empresa_colaborador`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `estado`
--
ALTER TABLE `estado`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `feriado`
--
ALTER TABLE `feriado`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `funcao`
--
ALTER TABLE `funcao`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `profissional`
--
ALTER TABLE `profissional`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `realizado`
--
ALTER TABLE `realizado`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `agendamento`
--
ALTER TABLE `agendamento`
  ADD CONSTRAINT `fk_agendamento_1` FOREIGN KEY (`contrato_id`) REFERENCES `contrato` (`id`),
  ADD CONSTRAINT `fk_agendamento_2` FOREIGN KEY (`profissional_id`) REFERENCES `profissional` (`id`);

--
-- Restrições para tabelas `ausencias`
--
ALTER TABLE `ausencias`
  ADD CONSTRAINT `fk_ausencias_1` FOREIGN KEY (`profissional_id`) REFERENCES `profissional` (`id`);

--
-- Restrições para tabelas `cidade`
--
ALTER TABLE `cidade`
  ADD CONSTRAINT `fk_cidade_1` FOREIGN KEY (`estado_id`) REFERENCES `estado` (`id`);

--
-- Restrições para tabelas `colaborador`
--
ALTER TABLE `colaborador`
  ADD CONSTRAINT `fk_colaborador_2_2` FOREIGN KEY (`funcao_id`) REFERENCES `funcao` (`id`);

--
-- Restrições para tabelas `contrato`
--
ALTER TABLE `contrato`
  ADD CONSTRAINT `fk_contrato_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`);

--
-- Restrições para tabelas `contrato_item`
--
ALTER TABLE `contrato_item`
  ADD CONSTRAINT `fk_item_contrato_1` FOREIGN KEY (`contrato_id`) REFERENCES `contrato` (`id`),
  ADD CONSTRAINT `fk_item_contrato_2` FOREIGN KEY (`profissional_id`) REFERENCES `profissional` (`id`);

--
-- Restrições para tabelas `contrato_profissional`
--
ALTER TABLE `contrato_profissional`
  ADD CONSTRAINT `fk_contrato_profissional_1` FOREIGN KEY (`contrato_id`) REFERENCES `contrato` (`id`),
  ADD CONSTRAINT `fk_contrato_profissional_2` FOREIGN KEY (`profissional_id`) REFERENCES `profissional` (`id`);

--
-- Restrições para tabelas `empresa`
--
ALTER TABLE `empresa`
  ADD CONSTRAINT `fk_empresa_1` FOREIGN KEY (`cidade_id`) REFERENCES `cidade` (`id`);

--
-- Restrições para tabelas `empresa_colaborador`
--
ALTER TABLE `empresa_colaborador`
  ADD CONSTRAINT `fk_empresa_colaborador_1_1` FOREIGN KEY (`colaborador_id`) REFERENCES `colaborador` (`id`),
  ADD CONSTRAINT `fk_empresa_colaborador_2_2` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`);

--
-- Restrições para tabelas `realizado`
--
ALTER TABLE `realizado`
  ADD CONSTRAINT `fk_realizado_1` FOREIGN KEY (`contrato_id`) REFERENCES `contrato` (`id`),
  ADD CONSTRAINT `fk_realizado_2` FOREIGN KEY (`profissional_id`) REFERENCES `profissional` (`id`);

--
-- Restrições para tabelas `system_document`
--
ALTER TABLE `system_document`
  ADD CONSTRAINT `fk_system_document_category_id` FOREIGN KEY (`category_id`) REFERENCES `system_document_category` (`id`),
  ADD CONSTRAINT `fk_system_document_system_user_id` FOREIGN KEY (`system_user_id`) REFERENCES `system_users` (`id`);

--
-- Restrições para tabelas `system_document_group`
--
ALTER TABLE `system_document_group`
  ADD CONSTRAINT `fk_system_document_group_document_id` FOREIGN KEY (`document_id`) REFERENCES `system_document` (`id`),
  ADD CONSTRAINT `fk_system_document_group_system_group_id` FOREIGN KEY (`system_group_id`) REFERENCES `system_group` (`id`);

--
-- Restrições para tabelas `system_document_user`
--
ALTER TABLE `system_document_user`
  ADD CONSTRAINT `fk_system_document_user_document_id` FOREIGN KEY (`document_id`) REFERENCES `system_document` (`id`),
  ADD CONSTRAINT `fk_system_document_user_system_user_id` FOREIGN KEY (`system_user_id`) REFERENCES `system_users` (`id`);

--
-- Restrições para tabelas `system_group_program`
--
ALTER TABLE `system_group_program`
  ADD CONSTRAINT `system_group_program_ibfk_1` FOREIGN KEY (`system_group_id`) REFERENCES `system_group` (`id`),
  ADD CONSTRAINT `system_group_program_ibfk_2` FOREIGN KEY (`system_program_id`) REFERENCES `system_program` (`id`);

--
-- Restrições para tabelas `system_message`
--
ALTER TABLE `system_message`
  ADD CONSTRAINT `fk_system_message_system_user_id` FOREIGN KEY (`system_user_id`) REFERENCES `system_users` (`id`),
  ADD CONSTRAINT `fk_system_message_system_user_to_id` FOREIGN KEY (`system_user_to_id`) REFERENCES `system_users` (`id`);

--
-- Restrições para tabelas `system_notification`
--
ALTER TABLE `system_notification`
  ADD CONSTRAINT `fk_system_notification_system_user_id` FOREIGN KEY (`system_user_id`) REFERENCES `system_users` (`id`),
  ADD CONSTRAINT `fk_system_notification_system_user_to_id` FOREIGN KEY (`system_user_to_id`) REFERENCES `system_users` (`id`);

--
-- Restrições para tabelas `system_users`
--
ALTER TABLE `system_users`
  ADD CONSTRAINT `system_users_ibfk_1` FOREIGN KEY (`frontpage_id`) REFERENCES `system_program` (`id`);

--
-- Restrições para tabelas `system_user_group`
--
ALTER TABLE `system_user_group`
  ADD CONSTRAINT `system_user_group_ibfk_1` FOREIGN KEY (`system_user_id`) REFERENCES `system_users` (`id`),
  ADD CONSTRAINT `system_user_group_ibfk_2` FOREIGN KEY (`system_group_id`) REFERENCES `system_group` (`id`);

--
-- Restrições para tabelas `system_user_program`
--
ALTER TABLE `system_user_program`
  ADD CONSTRAINT `system_user_program_ibfk_1` FOREIGN KEY (`system_user_id`) REFERENCES `system_users` (`id`),
  ADD CONSTRAINT `system_user_program_ibfk_2` FOREIGN KEY (`system_program_id`) REFERENCES `system_program` (`id`);

--
-- Restrições para tabelas `system_user_unit`
--
ALTER TABLE `system_user_unit`
  ADD CONSTRAINT `system_user_unit_ibfk_1` FOREIGN KEY (`system_user_id`) REFERENCES `system_users` (`id`),
  ADD CONSTRAINT `system_user_unit_ibfk_2` FOREIGN KEY (`system_unit_id`) REFERENCES `system_unit` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
