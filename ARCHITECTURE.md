# Diretrizes de Desenvolvimento - Sistema SaaS

Este documento define os padrões de nomenclatura, linguagem e arquitetura para garantir a consistência do projeto.

## 🌍 Padrão de Idioma e Internacionalização (i18n)
O sistema utiliza o português como idioma principal para a interface e documentação, garantindo clareza para o público-alvo brasileiro.

## 🧬 Arquitetura Metadata-Driven (UI Dinâmica)
A interface não é "hardcoded". Ela é renderizada com base em um dicionário de metadados recuperado do banco de dados (tabelas `MetadataEntity` e `MetadataField`).

### 1. Hierarquia de Níveis de Acesso
- **Nível 1-8**: Usuários operacionais e gerentes com permissões crescentes.
- **Nível 9 (ADMIN_SAAS)**: Administrador Total do sistema, com visibilidade global.

### 2. Segurança por Campo (`minLevel`)
Cada campo nos metadados possui a propriedade `minLevel`. Se o nível do usuário for inferior, o campo é omitido da resposta da API.

### 3. Governança e Campos Travados
- **`locked: true`**: Impede alterações em campos vitais.
- **Campos JSONB**: Dados customizados por tenant são armazenados em colunas `JSONB` no PostgreSQL para flexibilidade sem migrações de esquema.

---

## ⚖️ Política de Governança e Customização

### 🟢 Customizável (Via Metadados)
*   **Cadastros Auxiliares**: CNAEs, Países, Estados, Cidades.
*   **Dados Públicos**: Tabelas RFB (Empresas, Sócios).
*   **Negócio**: Tabelas operacionais específicas do cliente.

### 🔴 Fixo / Protegido (Hardcoded)
Os itens abaixo são estruturais e imutáveis via interface para garantir segurança e integridade:
*   **Segurança**: Usuários, Papéis (Roles) e Permissões.
*   **Faturamento**: Planos, Mensalidades e Cobranças.
*   **Logs**: Auditoria e Status de Importação.
*   **Configuração**: Parâmetros de sistema, Gatilhos e Relatórios.

---

## 🛠️ Ferramentas Administrativas
- **Editor de Metadados**: Gerencia rótulos, níveis e validações (exclusivo para áreas customizáveis).
- **Configurador de Temas**: Utiliza CSS Custom Properties injetadas dinamicamente via `ThemeService` para branding por tenant.
