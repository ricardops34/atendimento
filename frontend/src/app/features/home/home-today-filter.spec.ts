import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('HomePage today indicator', () => {
  it('filters appointments using the date range accepted by the API', () => {
    const source = readFileSync(new URL('./home.page.ts', import.meta.url), 'utf8');

    expect(source).toContain('dataInicial=${hoje}&dataFinal=${hoje}');
    expect(source).not.toContain('&data=${hoje}');
  });
});
