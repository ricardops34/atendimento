import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const readPage = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8');

describe('advanced search fields', () => {
  it.each([
    ['./contratos/contratos.page.ts', ['descricao', 'clienteNome', 'tipo', 'dtInicio', 'dtFim', 'bloqueado']],
    ['./feriados/feriados.page.ts', ['id', 'descricao', 'ano', 'dataDe', 'dataAte', 'tipo', 'fixo']],
    ['./atributos/atributos.page.ts', ['id', 'titulo', 'tipo', 'cadastro', 'obrigatorio', 'ativo']],
    ['./profissionais/profissionais.page.ts', ['id', 'nome', 'userName']],
    ['./paises/paises.page.ts', ['id', 'nome', 'sigla']],
  ])('enables supported filters in %s', (path, properties) => {
    const source = readPage(path as string);

    for (const property of properties as string[]) {
      expect(source).toMatch(
        new RegExp(`property:\\s*['"]${property}['"][^}]*filter:\\s*true`),
      );
    }
  });
});
