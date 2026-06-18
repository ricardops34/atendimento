import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { of } from 'rxjs';
import { Lista } from './lista';
import { AgendamentoService } from '../../../core/services/agendamento.service';
import { ContratoService } from '../../../core/services/contrato.service';
import { PoNotificationService } from '@po-ui/ng-components';
import { ProfissionalService } from '../../../core/services/profissional.service';

describe('Lista', () => {
  let component: Lista;
  let fixture: ComponentFixture<Lista>;

  const agendamentoService = {
    findAll: () => of([]),
    search: vi.fn(),
    confirmar: () => of({}),
    fecharLote: () => of({ registrosProcessados: 0 }),
    export: vi.fn()
  };

  beforeEach(async () => {
    TestBed.overrideComponent(Lista, { set: { template: '' } });

    await TestBed.configureTestingModule({
      imports: [Lista],
      providers: [
        { provide: AgendamentoService, useValue: agendamentoService },
        { provide: ContratoService, useValue: { findAll: () => of([]) } },
        { provide: ProfissionalService, useValue: { findAll: () => of([]) } },
        {
          provide: PoNotificationService,
          useValue: { success: vi.fn(), warning: vi.fn(), error: vi.fn() }
        }
      ]
    }).compileComponents();

    agendamentoService.search.mockReset();
    agendamentoService.search.mockReturnValue(
      of({ items: [], page: 1, pageSize: 20, total: 0, hasNext: false })
    );

    fixture = TestBed.createComponent(Lista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads first page with search params and resets current items', () => {
    agendamentoService.search.mockReturnValueOnce(
      of({
        items: [{ id: 1, tipo: 'A', local: 'P', duracaoMinutos: 60 }],
        page: 1,
        pageSize: 20,
        total: 1,
        hasNext: false
      })
    );

    component.quickSearch = 'fallback';
    component.filters.tipo = 'A';
    component.loadData(true);

    expect(agendamentoService.search).toHaveBeenLastCalledWith({
      page: 1,
      pageSize: 20,
      search: 'fallback',
      tipo: 'A'
    });
    expect(component.agendamentos).toHaveLength(1);
  });

  it('appends next page on show more', () => {
    agendamentoService.search
      .mockReturnValueOnce(
        of({
          items: [{ id: 1, tipo: 'A', local: 'P', duracaoMinutos: 60 }],
          page: 1,
          pageSize: 20,
          total: 2,
          hasNext: true
        })
      )
      .mockReturnValueOnce(
        of({
          items: [{ id: 2, tipo: 'A', local: 'P', duracaoMinutos: 30 }],
          page: 2,
          pageSize: 20,
          total: 2,
          hasNext: false
        })
      );

    component.loadData(true);
    component.onShowMore();

    expect(agendamentoService.search).toHaveBeenLastCalledWith({
      page: 2,
      pageSize: 20
    });
    expect(component.agendamentos.map((item) => item.id)).toEqual([1, 2]);
  });

  it('OS action is always disabled', () => {
    const osAction = component.actions.find((a) => a.label === 'Ordem de Serviço');
    expect(osAction).toBeDefined();
    expect(typeof osAction!.disabled).toBe('function');
    expect((osAction!.disabled as () => boolean)()).toBe(true);
  });

  it('Confirmar action is disabled for non-agendado rows', () => {
    const confirmarAction = component.actions.find((a) => a.label === 'Confirmar');
    expect(confirmarAction).toBeDefined();
    const disabled = confirmarAction!.disabled as (row: any) => boolean;
    expect(disabled({ tipo: 'R' })).toBe(true);
    expect(disabled({ tipo: 'A' })).toBe(false);
  });

  it('defines export actions for all supported formats', () => {
    expect(component.exportActions.map((action) => action.label)).toEqual([
      'CSV',
      'XLS',
      'PDF',
      'XML'
    ]);
  });

  it('defines all listing columns as sortable', () => {
    expect(component.columns.every((column) => column.sortable === true)).toBe(true);
  });
});
