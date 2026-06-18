import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { ProfissionaisPage } from './profissionais.page';
import { ProfissionalService } from '../../../core/services/profissional.service';
import { PoNotificationService } from '@po-ui/ng-components';

describe('ProfissionaisPage', () => {
  let component: ProfissionaisPage;
  let fixture: ComponentFixture<ProfissionaisPage>;

  const profissionalService = {
    findAll: () => of([{ id: 1, nome: 'Profissional A' }]),
    search: vi.fn(),
    create: () => of({}),
    update: () => of({}),
    remove: () => of({}),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfissionaisPage],
      providers: [
        { provide: ProfissionalService, useValue: profissionalService },
        {
          provide: PoNotificationService,
          useValue: { success: vi.fn(), warning: vi.fn(), error: vi.fn() },
        },
      ],
    }).overrideComponent(ProfissionaisPage, { set: { template: '' } }).compileComponents();

    profissionalService.search.mockReset();
    profissionalService.search.mockReturnValue(
      of({ items: [{ id: 1, nome: 'Profissional A' }], page: 1, pageSize: 20, total: 1, hasNext: false })
    );

    fixture = TestBed.createComponent(ProfissionaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('loads paginated professionals using the standard search params', () => {
    component.quickSearch = 'Ana';
    component.loadData(true);

    expect(profissionalService.search).toHaveBeenLastCalledWith({
      page: 1,
      pageSize: 20,
      search: 'Ana',
      sortProperty: 'nome',
      sortDirection: 'ascending',
      nome: undefined,
      id: undefined,
    });
    expect(component.profissionais.length).toBe(1);
  });

  it('defines sortable listing columns', () => {
    expect(component.columns.every((column) => column.sortable === true)).toBe(true);
  });
});
