# Diretrizes de Desenvolvimento - Sistema SaaS

Este documento define os padrões de nomenclatura e linguagem para garantir a consistência do projeto.

## 🌍 Padrão de Idioma e Internacionalização (i18n)
(Mantido...)

## 🧬 Arquitetura de Metadados e Segurança Granular

### 1. Hierarquia de Níveis (1-9)
Para controlar a visibilidade de dados sensíveis, o sistema utiliza uma escala de 1 a 9:
- **Nível 1-8**: Usuários operacionais e gerentes com permissões crescentes.
- **Nível 9**: Administrador Total (Admin).

### 2. Segurança por Campo (`minLevel`)
Cada campo nos metadados possui a propriedade `minLevel`:
- Se o usuário logado tiver um nível **menor** que o exigido pelo campo, a API remove esse campo da resposta.
- Isso impede que usuários de baixo nível sequer saibam da existência de campos como "Comissão", "Lucro" ou "Senhas".

### 3. Governança e Campos Travados (`locked`)
- **`locked: true`**: Impede que o administrador do Tenant altere a obrigatoriedade de campos vitais.

---

## ⚖️ Política de Governança e Customização

O sistema segue uma política rígida de separação entre o que é customizável pelo usuário e o que é fixo por segurança:

### 🟢 Customizável (Via Metadados)
*   **Cadastros Auxiliares**: CNAEs, Países, Estados, Cidades.
*   **Dados Públicos**: Tabelas RFB (Empresas, Sócios, etc.).
*   **Negócio**: Tabelas operacionais específicas do cliente.

### 🔴 Fixo / Protegido (Hardcoded)
Os itens abaixo **não** podem ser editados ou personalizados via interface:
*   **Segurança**: Cadastro de Usuários, Papéis e Permissões.
*   **Faturamento**: Controle de mensalidades, planos e cobranças.
*   **Logs**: Auditoria e logs de processamento.
*   **Configuração**: Parâmetros de sistema/usuário, Gatilhos (Triggers) e Relatórios.

---

## 🛠️ Ferramentas Administrativas
- **Editor de Metadados**: Gerencia rótulos, níveis e validações.
- **Configurador de Telas**: Arraste e solte para organizar a interface.
