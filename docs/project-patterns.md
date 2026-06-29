# Project Patterns

## Frontend Stack

- Angular deve permanecer na linha `v21`.
- PO-UI deve permanecer na linha `v21`.
- Qualquer upgrade de Angular ou PO-UI deve preservar compatibilidade entre as duas stacks antes de entrar no projeto.
- Seguir os pre-requisitos oficiais do `po-ui/po-angular`: `Node.js 20.11.x+`, `@angular/cli@21`, Angular `21.2.x`, `rxjs 7.8.x`, `typescript 5.9.x` e `zone.js 0.15.x`.
- Dependencias usadas diretamente pelo bootstrap Angular devem estar declaradas no `package.json`; `zone.js` nao pode ficar apenas como dependencia transitiva.
- Em PO-UI `v21`, os icones devem usar `Animalia Icons` com prefixo `an an-*`.
- Nao usar `po-icon-*` em novas implementacoes ou ajustes no frontend `v21`.

## Menu Shell

- Itens do `po-menu` devem ter `icon`.
- Itens do `po-menu` devem ter `shortLabel`.
- O menu lateral deve expor uma opcao explicita de `Sair`/logoff.
- O menu lateral deve ser carregado dinamicamente a partir do cadastro de `menus`, respeitando os modulos liberados no perfil do usuario.
- A manutencao do menu deve ocorrer nas rotinas administrativas de `Modulos`, `Rotinas`, `Menus`, `Perfis`, `Tenants` e `Usuarios`.

---

## Padrões de CRUD

### Decisão: qual componente de listagem usar?

Antes de criar qualquer listagem, avaliar o quadro abaixo:

| Critério | `po-page-dynamic-table` | `po-page-list + po-table` |
|---|---|---|
| Código necessário | ~15 linhas | ~150–200 linhas |
| Filtros | Automáticos (sidebar gerada pelo PO UI) | Manuais (modal próprio) |
| Paginação | Automática | Manual (`page`, `hasNext`, `onShowMore`) |
| Ordenação | Automática | Manual (`onSortChange`) |
| Exportar (CSV/XLS/PDF) | Não suportado nativamente | Implementação própria |
| Colunas com template customizado | Não suportado | `po-table-column-template` |
| Ações customizadas por linha | Apenas new/edit/detail/remove | Qualquer ação (`PoTableAction`) |
| Controle total do estado | Não | Sim |

**Regra de decisão:**

- **CRUD simples** (campos diretos, sem ações especiais) → usar `po-page-dynamic-table`
  - Exemplos: Clientes, Profissionais, Empresas
- **CRUD complexo** (exportação, ações em lote, filtros por período, colunas calculadas) → usar `po-page-list + po-table`
  - Exemplos: Contratos (fechar lote), Atendimentos (exportar, confirmar lote)

> ⚠️ **Limitações do `po-page-dynamic-table`** que podem forçar uso do `po-page-list`:
> - Botão "Novo" tem label, `p-kind` e `p-icon` **fixos** — não é possível trocar para "Adicionar", mudar ícone ou estilo
> - Sem suporte a `po-table-column-template` (células customizadas)
> - Sem exportação nativa
> - Sem ações em lote

---

### Padrão: po-page-dynamic-table (CRUD simples)

**Requisito de backend:** `GET /recurso` deve retornar `{ items: [], hasNext: boolean, page, pageSize, total }`.

```typescript
// recurso.page.ts
@Component({
  standalone: true,
  imports: [PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Título"
      [p-service-api]="apiUrl"
      [p-fields]="fields"
      [p-actions]="actions">
    </po-page-dynamic-table>
  `,
})
export class RecursoPage {
  readonly apiUrl = `${environment.apiUrl}/recurso`;

  fields: PoPageDynamicTableField[] = [
    { property: 'id',    key: true, visible: false },
    { property: 'nome',  label: 'Nome',  visible: true, filter: true },
    { property: 'email', label: 'Email', visible: true, filter: true },
  ];

  actions: PoPageDynamicTableActions = {
    new:    '/recurso/novo',
    detail: '/recurso/:id',
    edit:   '/recurso/:id/editar',
    remove: true,
  };
}
```

---

### Padrão: po-page-list + po-table (CRUD complexo)

```typescript
// recurso.page.ts  — estrutura mínima
export class RecursoPage implements OnInit {
  itens: any[] = [];
  loading = false;
  loadingShowMore = false;
  page = 1;
  readonly pageSize = 20;
  hasNext = false;
  quickSearch = '';
  filters: { campo?: string } = {};

  columns: PoTableColumn[] = [
    { property: 'nome', label: 'Nome', sortable: true },
  ];

  actions: PoTableAction[] = [
    { label: 'Editar',  icon: 'an an-pencil-simple', action: (r) => this.router.navigate(['/recurso', r.id, 'editar']) },
    { label: 'Excluir', icon: 'an an-trash',         action: (r) => this.router.navigate(['/recurso', r.id, 'excluir']) },
  ];

  loadData(reset = false) { /* chama service.search() */ }
  onShowMore() { this.page++; this.loadData(); }
  onSortChange(sort: PoTableColumnSort) { /* atualiza sort e recarrega */ }
  onQuickSearch(value: string) { this.quickSearch = value; this.loadData(true); }
}
```

---

### Padrão: Criar / Editar (`po-page-edit`)

Mesmo componente para criar e editar. Detecta modo pelo parâmetro `:id` na rota.

```typescript
// recurso-edit.page.ts
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoFieldModule, PoButtonModule],
  templateUrl: './recurso-edit.page.html',
})
export class RecursoEditPage implements OnInit {
  isEdit = false;
  saving = false;
  id: number | null = null;
  title = 'Novo';
  form: any = { /* campos iniciais */ };

  ngOnInit() {
    const idParam = this.route.snapshot.params['id'];
    if (idParam) {
      this.isEdit = true;
      this.id = Number(idParam);
      this.title = 'Editar';
      this.loadRecord();
    }
  }

  save() { /* POST ou PATCH conforme isEdit */ }
  cancel() { this.router.navigate(['/recurso']); }
}
```

```html
<!-- recurso-edit.page.html -->
<po-page-edit [p-title]="title" (p-save)="save()" (p-cancel)="cancel()">
  <po-divider p-label="Seção"></po-divider>
  <div class="po-row">
    <po-input class="po-md-6" p-label="Nome *" name="nome"
      [ngModel]="form.nome" (ngModelChange)="form.nome = $event">
    </po-input>
  </div>
</po-page-edit>
```

---

### Padrão: Detalhe (`po-page-detail` ou `po-page-default + po-info`)

```html
<po-page-default p-title="Recurso">
  <div style="display: flex; gap: 8px; margin-bottom: 16px;">
    <po-button p-label="Editar" p-icon="an an-pencil-simple" (p-click)="onEdit()"></po-button>
    <po-button p-label="Voltar" p-kind="secondary" (p-click)="onBack()"></po-button>
  </div>
  <div class="po-row">
    <po-info class="po-md-6" p-label="Nome" [p-value]="registro?.nome || '-'"></po-info>
  </div>
</po-page-default>
```

---

### Rotas padrão por CRUD

```typescript
// app.routes.ts — padrão de rotas
{ path: 'recurso',             loadComponent: () => import('...').then(m => m.RecursoPage) },
{ path: 'recurso/novo',        loadComponent: () => import('...').then(m => m.RecursoEditPage) },
{ path: 'recurso/:id',         loadComponent: () => import('...').then(m => m.RecursoDetailPage) },
{ path: 'recurso/:id/editar',  loadComponent: () => import('...').then(m => m.RecursoEditPage) },
```

> Quando usar `po-page-dynamic-table`, as rotas de novo/editar/detalhe são gerenciadas pelas `actions` do componente.
> O `remove: true` nas actions usa o confirm dialog nativo do PO UI (não precisa de rota de exclusão).

---

### Convenções de nomenclatura de arquivos

| Tipo | Arquivo | Classe |
|---|---|---|
| Listagem | `recurso.page.ts` | `RecursoPage` |
| Criar/Editar | `recurso-edit.page.ts` | `RecursoEditPage` |
| Detalhe | `recurso-detail.page.ts` | `RecursoDetailPage` |
| Excluir (se necessário) | `recurso-excluir.page.ts` | `RecursoExcluirPage` |

---

### Inventário atual dos CRUDs

| CRUD | Listagem | Editar | Detalhe | Excluir | Status |
|---|---|---|---|---|---|
| Clientes | `po-page-list + po-table` | `po-page-edit` | `po-page-default` | rota própria | ✅ Padrão |
| Profissionais | `po-page-list + po-table` | `po-page-edit` | `po-page-default` | rota própria | ⚠️ Migrar para padrão |
| Contratos | `po-page-list + po-table` | `po-page-edit` | `po-page-default` | rota própria | ✅ Manter (complexo) |
| Empresas (config) | `po-page-list + po-table` | `po-page-edit` | — | — | ✅ Padrão |
| Usuários | `po-page-list + po-table` | — | — | — | ⚠️ Avaliar |
| Atendimentos / Lista | `po-page-list + po-table` | sidebar | — | — | ✅ Manter (complexo) |
| Calendário | FullCalendar | sidebar | — | — | ✅ Manter |
