import { describe, expect, it } from 'vitest';
import { orderMenuDetails } from './menu-detail-order';

describe('orderMenuDetails', () => {
  it('orders menu details by module and then routine', () => {
    const items = [
      { module: 'Usuário', routine: 'Perfil' },
      { module: 'Cadastro', routine: 'Profissionais' },
      { module: 'Cadastro', routine: 'Clientes' },
      { module: 'Básicos', routine: 'Estados' },
    ];

    expect(orderMenuDetails(items).map((item) => `${item.module}/${item.routine}`)).toEqual([
      'Básicos/Estados',
      'Cadastro/Clientes',
      'Cadastro/Profissionais',
      'Usuário/Perfil',
    ]);
    expect(items[0].module).toBe('Usuário');
  });
});
