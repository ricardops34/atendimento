import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PoDialogService, PoNotificationService } from '@po-ui/ng-components';

// Reconstrói as ações padrão de Editar/Excluir do po-page-dynamic-table como
// ações customizadas (p-table-custom-actions), unicamente para poder exibir
// ícone em cada uma — o p-actions.edit/remove nativo do PO UI não expõe essa
// opção. Mantém o mesmo comportamento do nativo: navega pra edição, e no
// excluir mostra diálogo de confirmação + chama o DELETE + atualiza a tabela.
export interface EditDeleteActionsOptions {
  router: Router;
  http: HttpClient;
  dialog: PoDialogService;
  notification: PoNotificationService;
  apiUrl: string;
  editPath: (resource: any) => any[];
  confirmLabel: (resource: any) => string;
  refresh: () => void;
  idProperty?: string;
  entityLabel?: string;
  editVisible?: (resource: any) => boolean;
  deleteVisible?: (resource: any) => boolean;
}

export function buildEditDeleteActions(opts: EditDeleteActionsOptions) {
  const entity = opts.entityLabel || 'Registro';
  const idProperty = opts.idProperty || 'id';

  return [
    {
      label: 'Editar',
      icon: 'an an-pencil-simple',
      visible: opts.editVisible ?? (() => true),
      action: (resource: any) => opts.router.navigate(opts.editPath(resource)),
    },
    {
      label: 'Excluir',
      icon: 'an an-trash',
      visible: opts.deleteVisible ?? (() => true),
      action: (resource: any) => {
        opts.dialog.confirm({
          title: 'Confirmar exclusão',
          message: `Confirma a exclusão de "${opts.confirmLabel(resource)}"?`,
          confirm: () => {
            opts.http.delete(`${opts.apiUrl}/${resource[idProperty]}`).subscribe({
              next: () => {
                opts.notification.success(`${entity} excluído com sucesso.`);
                opts.refresh();
              },
              error: () => opts.notification.error(`Erro ao excluir ${entity.toLowerCase()}.`),
            });
          },
        });
      },
    },
  ];
}
