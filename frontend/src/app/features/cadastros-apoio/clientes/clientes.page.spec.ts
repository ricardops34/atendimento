import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { ClientesPage } from './clientes.page';
import { ClienteService } from '../../../core/services/cliente.service';
import { PoNotificationService } from '@po-ui/ng-components';

describe('ClientesPage', () => {
  let component: ClientesPage;
  let fixture: ComponentFixture<ClientesPage>;

  const clienteService = {
    findAll: () => of([{ id: 1, nome: 'Empresa A' }]),
    search: vi.fn(),
    create: () => of({}),
    update: () => of({}),
    remove: () => of({}),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesPage],
      providers: [
        { provide: ClienteService, useValue: clienteService },
        {
          provide: PoNotificationService,
          useValue: { success: vi.fn(), warning: vi.fn(), error: vi.fn() },
        },
      ],
    }).overrideComponent(ClientesPage, { set: { template: '' } }).compileComponents();

    clienteService.search.mockReset();
    clienteService.search.mockReturnValue(
      of({ items: [{ id: 1, nome: 'Empresa A' }], page: 1, pageSize: 20, total: 1, hasNext: false })
    );

    fixture = TestBed.createComponent(ClientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('loads paginated companies using the standard search params', () => {
    component.quickSearch = 'Empresa';
    component.loadData(true);

    expect(clienteService.search).toHaveBeenLastCalledWith({
      page: 1,
      pageSize: 20,
      search: 'Empresa',
      sortProperty: 'nome',
      sortDirection: 'ascending',
      nome: undefined,
      id: undefined,
    });
    expect(component.empresas.length).toBe(1);
  });

  it('defines sortable listing columns', () => {
    expect(component.columns.filter((column) => column.sortable === true).map((column) => column.property)).toEqual([
      'id',
      'nome',
    ]);
  });
});
