# 🏛️ Arquitetura do Sistema SaaS

Este documento descreve os padrões técnicos e arquiteturais do projeto.

---

## 🎨 Padrões de Interface (UI/UX) - AI-Ready

Para garantir que o sistema seja operável por Agentes de IA e mantenha consistência, todas as telas devem seguir estas regras:

### 1. Identificação Única (IDs Semânticos)
Todos os componentes principais (tabelas, botões, inputs) devem possuir um atributo `id` único seguindo o padrão:
`saas-[modulo]-[elemento]-[acao]`
- Ex: `saas-tenants-table`
- Ex: `saas-users-btn-new`

### 2. URLs Dinâmicas (Local vs Cloud)
Nunca utilize URLs fixas (`localhost`). Use um getter ou helper para detectar o ambiente:
```typescript
get apiUrl() {
  const hostname = window.location.hostname;
  return hostname.includes('localhost') 
    ? 'http://localhost:3000/endpoint' 
    : 'https://api.sistema.bjsoft.com.br/endpoint';
}
```

### 3. Metadados e Service-API
- Sempre utilize `p-service-api` em componentes dinâmicos do PO-UI. Isso permite que agentes externos descubram a estrutura de dados (campos, tipos, filtros) sem precisar ler o código-fonte.
- Mantenha os `fields` descritivos e com rótulos amigáveis.

---

## 🏗️ Estratégia de Multi-tenancy
Adotamos uma abordagem híbrida...
*(restante do conteúdo mantido)*
