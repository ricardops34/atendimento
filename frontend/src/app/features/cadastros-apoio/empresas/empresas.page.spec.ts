import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { EmpresasPage } from './empresas.page';
import { EmpresaService } from '../../../core/services/empresa.service';
import { PoNotificationService } from '@po-ui/ng-components';

describe('EmpresasPage', () => {
  let component: EmpresasPage;
  let fixture: ComponentFixture<EmpresasPage>;

  const empresaService = {
    findAll: () => of([{ id: 1, nome: 'Empresa A' }]),
    search: vi.fn(),
    create: () => of({}),
    update: () => of({}),
    remove: () => of({}),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresasPage],
      providers: [
        { provide: EmpresaService, useValue: empresaService },
        {
          provide: PoNotificationService,
          useValue: { success: vi.fn(), warning: vi.fn(), error: vi.fn() },
        },
      ],
    }).overrideComponent(EmpresasPage, { set: { template: '' } }).compileComponents();

    empresaService.search.mockReset();
    empresaService.search.mockReturnValue(
      of({ items: [{ id: 1, nome: 'Empresa A' }], page: 1, pageSize: 20, total: 1, hasNext: false })
    );

    fixture = TestBed.createComponent(EmpresasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('loads paginated companies using the standard search params', () => {
    component.quickSearch = 'Empresa';
    component.loadData(true);

    expect(empresaService.search).toHaveBeenLastCalledWith({
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
    expect(component.columns.every((column) => column.sortable === true)).toBe(true);
  });
});
