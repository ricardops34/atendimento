import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { ContratosPage } from './contratos.page';
import { ContratoService } from '../../../core/services/contrato.service';
import { EmpresaService } from '../../../core/services/empresa.service';
import { PoNotificationService } from '@po-ui/ng-components';
import { ProfissionalService } from '../../../core/services/profissional.service';

describe('ContratosPage', () => {
  let component: ContratosPage;
  let fixture: ComponentFixture<ContratosPage>;

  const contratoService = {
    findAll: () => of([{ id: 1, descricao: 'Contrato A', empresa: { nome: 'Empresa A' } }]),
    search: vi.fn(),
    create: () => of({}),
    update: () => of({}),
    remove: () => of({}),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratosPage],
      providers: [
        { provide: ContratoService, useValue: contratoService },
        {
          provide: EmpresaService,
          useValue: { findAll: () => of([{ id: 1, nome: 'Empresa A' }]) },
        },
        {
          provide: ProfissionalService,
          useValue: { findAll: () => of([]) },
        },
        {
          provide: PoNotificationService,
          useValue: { success: vi.fn(), warning: vi.fn(), error: vi.fn() },
        },
      ],
    }).overrideComponent(ContratosPage, { set: { template: '' } }).compileComponents();

    contratoService.search.mockReset();
    contratoService.search.mockReturnValue(
      of({ items: [{ id: 1, descricao: 'Contrato A', empresa: { nome: 'Empresa A' } }], page: 1, pageSize: 20, total: 1, hasNext: false })
    );

    fixture = TestBed.createComponent(ContratosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('loads paginated contracts using the standard search params', () => {
    component.quickSearch = 'Contrato';
    component.filters.empresaId = 1;
    component.loadData(true);

    expect(contratoService.search).toHaveBeenLastCalledWith({
      page: 1,
      pageSize: 20,
      search: 'Contrato',
      empresaId: 1,
      isFeriado: undefined,
      descricao: undefined,
      sortProperty: 'descricao',
      sortDirection: 'ascending',
    });
    expect(component.contratos.length).toBe(1);
  });

  it('defines sortable listing columns', () => {
    expect(component.columns.filter((column) => column.sortable === true).map((column) => column.property)).toEqual([
      'empresa.nome',
      'descricao',
      'tipo',
    ]);
  });
});
