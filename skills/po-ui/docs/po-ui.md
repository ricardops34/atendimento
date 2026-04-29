# Guia Definitivo PO-UI (v21+) - BJSoft Offline Reference

Este documento é a base de conhecimento offline para desenvolvimento PO-UI no projeto BJSoft. Ele contém especificações detalhadas de componentes, serviços e padrões de arquitetura para Angular 21.

---

## 🚀 1. Configuração e Padrões v21

### Requisitos Técnicos
- **Angular**: v21+ (Uso de Standalone Components é obrigatório).
- **Build System**: `@angular/build` (esbuild).
- **Ícones**: **Animalia Icons** (`an an-`). O prefixo `po-icon-` é considerado legado.

### Estrutura de Importação (Granular)
Sempre utilize importações granulares nos componentes Standalone para garantir performance e compatibilidade:

```typescript
import { 
  PoFieldModule,      // Inputs, Selects, Checkboxes
  PoPageModule,       // Page Default, List, Edit
  PoTableModule,      // Tabelas e colunas
  PoComponentsModule, // Botões, Tabs, Info, Badges
  PoNotificationModule // Serviço de notificação
} from '@po-ui/ng-components';
```

---

## 🎨 2. Sistema de Ícones (Animalia)

A partir da v21, o prefixo padrão é `an an-`.

| Categoria | Ícone Comum | Nome (Animalia) |
| :--- | :--- | :--- |
| **Ações** | Adicionar | `an an-plus` |
| | Editar | `an an-pencil` |
| | Excluir | `an an-trash` |
| | Salvar | `an an-floppy-disk` |
| **Navegação** | Home | `an an-house` |
| | Usuário | `an an-user` |
| | Configurações | `an an-gear` |
| | Pesquisar | `an an-magnifying-glass` |
| **Status** | Sucesso | `an an-check-circle` |
| | Erro | `an an-x-circle` |
| | Alerta | `an an-warning` |

---

## 📦 3. Detalhamento de Componentes Core

### 3.1 `po-page-default`
O container principal para páginas que não são listas automáticas.
- **Propriedades**:
    - `p-title`: Título principal (String).
    - `p-breadcrumb`: Objeto `PoBreadcrumb` para trilha de navegação.
    - `p-actions`: Lista de botões de ação no topo.

### 3.2 `po-table`
O componente mais importante para exibição de dados.
- **Configuração de Colunas (`PoTableColumn`)**:
    - `property`: Nome do campo no JSON.
    - `label`: Título da coluna.
    - `type`: `string`, `number`, `currency`, `date`, `label`, `icon`.
    - `color`: Para colunas do tipo `label`.
    - `icons`: Array de objetos `{ icon, value, color, tooltip }` para colunas do tipo `icon`.

### 3.3 `po-input` / `po-password`
- **Máscaras**: Use `p-mask` (ex: `999.999.999-99`).
- **Validação**: `p-required` ativa o status de erro visual e bloqueia formulários PO-UI.
- **Limpeza**: `p-clean` adiciona o botão "X" para limpar o campo.

---

## 🛠️ 4. Serviços Essenciais (Exemplos de Código)

### PoNotificationService
```typescript
constructor(private poNotification: PoNotificationService) {}

showSuccess() {
  this.poNotification.success('Operação realizada com sucesso!');
}

showError(msg: string) {
  this.poNotification.error({
    message: msg,
    duration: 5000
  });
}
```

### PoDialogService
```typescript
constructor(private poDialog: PoDialogService) {}

confirmDelete() {
  this.poDialog.confirm({
    title: 'Confirmar Exclusão',
    message: 'Deseja realmente excluir este registro?',
    confirm: () => this.delete(),
    cancel: () => {}
  });
}
```

---

## 🔄 5. Interceptadores e HTTP

O PO-UI v21 utiliza o padrão de Interceptadores do Angular 18+.
Para gerenciar o estado de "loading" global ou injetar tokens de autenticação:

1. **`PoHttpInterceptor`**: Já vem configurado para tratar erros 401/403 e exibir notificações automáticas se configurado.
2. **Injeção de Tenant**: No BJSoft, o `TenantInterceptor` adiciona o `x-tenant-id` em todas as requisições.

---

## 📋 6. Modelos de Dados (Glossário)

| Interface | Descrição |
| :--- | :--- |
| `PoMenuItem` | `label`, `link`, `icon`, `subItems`. |
| `PoSelectOption` | `label`, `value`. |
| `PoDynamicFormField` | `property`, `label`, `gridColumns`, `required`, `options`. |
| `PoBreadcrumbItem` | `label`, `link`. |

---
> [!IMPORTANT]
> **Dica de Performance**: Sempre que possível, utilize as telas dinâmicas (`po-page-dynamic-table`) para CRUDs simples, pois elas já implementam busca, paginação e filtros avançados automaticamente seguindo os metadados da API.

*Documentação Offline v1.0 - BJSoft Skills*
