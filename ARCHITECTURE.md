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

---

## 🎨 Padrões de Interface e Estabilidade (PO-UI)
Para garantir alta disponibilidade, compilação impecável (sem falhas de escape string no Angular) e independência de APIs externas de design, as seguintes regras se aplicam ao frontend:

1. **Recursos Estáticos**: Imagens estruturais (como `avatar-default.png` ou logos de fallback) devem SEMPRE ser servidas localmente na pasta `public` ou `assets`. O uso de APIs públicas de terceiros (como `ui-avatars.com`) para carregamento síncrono no template é terminantemente proibido.
2. **Componentização PO-UI**: A construção de cabeçalhos de sistema deve usar estritamente o `po-header` tipado pelas interfaces oficiais (`PoHeaderUser`, `PoHeaderActionTool`), evitando injetar HTML/CSS customizado onde o framework já provê suporte nativo.
3. **Menu de Sistema**: O `po-menu` é obrigatório dentro do `po-wrapper` para garantir o cálculo de 100% da viewport pelo framework. Além disso, todos os menus de nível raiz recebem fallback de ícone (ex: `an an-folder`) para impedir que o PO-UI bloqueie o estado de "Menu Recolhido" (`collapsed`).

---

## 🔒 Governança de Usuários e Segurança Operacional

Para garantir a conformidade fiscal e operacional, o cadastro de usuários deve observar os seguintes controles de segurança:

1. **Ciclo de Vida**: Todo usuário possui `Data de Criação` (auditável) e `Data de Bloqueio`. Um usuário bloqueado tem seu acesso revogado imediatamente pelo middleware de segurança.
2. **Controle de Retroatividade**:
   - `backdateDays`: Limita quantos dias no passado o usuário pode realizar lançamentos (ex: travar o financeiro após 5 dias do fechamento).
   - `futureDateDays`: Limita quantos dias no futuro o usuário pode agendar lançamentos.
3. **Jornada de Acesso**: O campo `workSchedule` define os dias da semana e faixas de horário permitidas para login, impedindo acessos fora do horário comercial se assim configurado.
4. **Hierarquia N:N**: Usuários podem ser vinculados a múltiplas **Empresas** e **Filiais** simultaneamente, devendo o sistema prover um seletor de contexto no Header quando houver mais de um vínculo ativo.
5. **Modo Simulação (Impersonation)**: Exclusivo para Nível 9 e usuários do grupo de suporte, permite auditar o sistema sob a perspectiva de outro usuário para fins de suporte técnico, gerando logs de auditoria específicos para esta ação.
