import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('ContratosPage edit action', () => {
  it('marks the contract id as the PO Dynamic Table key', () => {
    const source = readFileSync(
      new URL('./contratos.page.ts', import.meta.url),
      'utf8',
    );

    expect(source).toMatch(/property:\s*'id'.*key:\s*true/);
    expect(source).not.toContain('isKey: true');
  });
});
