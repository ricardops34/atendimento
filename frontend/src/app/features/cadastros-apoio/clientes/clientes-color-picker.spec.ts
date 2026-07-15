import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('ClientesEditPage color picker', () => {
  it('uses a visual color selector bound to the agenda color', () => {
    const template = readFileSync(
      new URL('./clientes-edit.page.html', import.meta.url),
      'utf8',
    );

    expect(template).toContain('type="color"');
    expect(template).toContain('[(ngModel)]="form.cor"');
    expect(template).not.toContain('p-label="Cor na Agenda (hex)"');
  });
});
