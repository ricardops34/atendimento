# 🧬 Arquitetura de Dados Dinâmica (Metadata-Driven)

Este documento define o padrão para customização de campos, temas e regras de negócio por tenant sem alteração de código.

## 1. O Conceito
O sistema utiliza o padrão **Metadata-Driven UI**. A interface não é "hardcoded", mas sim renderizada com base em um dicionário de metadados recuperado do banco de dados no momento do acesso.

## 2. Armazenamento de Dados Customizados
Para suportar campos criados pelos usuários, utilizamos o tipo **JSONB** do PostgreSQL.

### Estrutura da Tabela de Negócio (Exemplo: Fornecedores)
| ID | Tenant_ID | Nome (Fixo) | CNPJ (Fixo) | **Additional_Data (JSONB)** |
|----|-----------|-------------|-------------|----------------------------|
| 1  | Empresa_A | Fornecedor X| 00.000...   | `{"insc_mun": "123", "cor": "Azul"}` |
| 2  | Empresa_B | Fornecedor Y| 11.111...   | `{"vencimento_alvara": "2025-01-01"}` |

## 3. Dicionário de Metadados (Configuração)
A tabela `FieldDefinitions` controla o que aparece para cada cliente:
- `tenantId`: Dono da configuração.
- `entity`: Nome da tabela (ex: "Supplier").
- `property`: Nome da chave no JSONB.
- `label`: Nome que aparece na tela.
- `type`: Tipo do campo (string, number, date, boolean).
- `isRequired`: Se o campo deve ser obrigatório.
- `tab`: Em qual aba o campo deve ser exibido.
- `order`: Ordem de exibição.

## 4. Temas e Estilização
Os temas são controlados por **CSS Custom Properties**.
- O Admin do cliente define as cores no módulo de configurações.
- O sistema salva um objeto JSON no registro do `Tenant`.
- No carregamento do Frontend, um `ThemeService` injeta os valores no `:root`.

## 5. Regras e Gatilhos (Fill Triggers)
Gatilhos de preenchimento são salvos como expressões lógicas:
- `on`: Evento (change, blur, load).
- `condition`: Expressão a ser avaliada.
- `action`: Ação a ser tomada (set_value, hide_field, show_error).

## 6. Vantagens
- **Escalabilidade**: Uma única base de código atende milhares de variações.
- **Zero Downtime**: Clientes adicionam campos sem precisar de novos deploys ou migrações de banco.
- **Isolamento**: O `tenant_id` garante que a Empresa A nunca veja as definições de campos da Empresa B.
