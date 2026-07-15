import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('MenusEditPage table sorting', () => {
  it('enables PO Table sorting on the menu details grid', () => {
    const source = readFileSync(
      new URL('./menus-edit.page.ts', import.meta.url),
      'utf8',
    );

    expect(source).toContain('[p-sort]="true"');
  });
});
