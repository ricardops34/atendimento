import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('ContratosPage status actions', () => {
  it('shows the blocked status and contextual block actions', () => {
    const source = readFileSync(new URL('./contratos.page.ts', import.meta.url), 'utf8');

    expect(source).toContain("property: 'bloqueadoStatus'");
    expect(source).toContain("type: 'label'");
    expect(source).toContain("{ value: 'Sim', label: 'Sim', color: 'color-07' }");
    expect(source).toContain("{ value: 'Não', label: 'Não', color: 'color-10' }");
    expect(source).toContain("label: 'Bloquear'");
    expect(source).toContain("label: 'Ativar'");
    expect(source).toContain('[p-table-custom-actions]="tableCustomActions"');
    expect(source).toContain('remove: (_id: string, resource: any) => !resource.temAgendamentos');
  });
});
