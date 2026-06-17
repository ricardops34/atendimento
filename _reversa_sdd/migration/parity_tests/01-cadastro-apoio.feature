# language: pt
# spec-id: PT-001
# rastreabilidade:
#   process_flows: cadastros-apoio/requirements.md § RN01, RN02, RN03
#   target_architecture: Bounded Context Cadastros de Apoio (BC-01)
#   paradigma_alvo: OO com Injeção de Dependência e DTOs class-validator

Funcionalidade: Cadastros de Apoio para Agendamentos
  Como Administrador do Sistema
  Quero cadastrar Empresas, Profissionais e Contratos com identificação de cores
  Para estabelecer a base operacional de lançamentos na agenda

  @paridade @critico
  Cenário: Cadastro de Contrato válido com empresa e cor padrão
    Dado que a empresa "Empresa Exemplo" e o profissional "Ricardo" estão devidamente cadastrados
    Quando o administrador solicita a criação de um Contrato com a descrição "Contrato TI", associado à empresa "Empresa Exemplo" e cor "#4CAF50" via API
    Então o sistema aceita a requisição, persiste o contrato e gera um ID único
    E o contrato registrado contém a cor hexadecimal "#4CAF50"

  @paridade
  Cenário: Rejeição de Contrato sem Empresa Vinculada
    Dado que o administrador tenta cadastrar um Contrato com a descrição "Contrato Inválido" mas não informa a empresa
    Quando a requisição é submetida à API
    Então o sistema rejeita a operação com erro de validação (HTTP 400 Bad Request)
    E nenhuma alteração é efetuada no banco de dados

  @paridade
  Cenário: Validação de Formato de Cor Hexadecimal do Contrato
    Dado que o administrador tenta cadastrar um Contrato informando uma cor inválida "VERDE" ou "12345"
    Quando a requisição é submetida
    Então o sistema bloqueia o salvamento e retorna erro de validação do formato de cor hexadecimal (HTTP 400)
    E o erro explicita que a cor deve estar no formato regex /^#[0-9A-F]{6}$/i
