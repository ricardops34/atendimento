import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { ProfissionaisPage } from './profissionais.page';
import { ProfissionalService } from '../../../core/services/profissional.service';
import { PoNotificationService } from '@po-ui/ng-components';

describe('ProfissionaisPage', () => {
  let component: ProfissionaisPage;
  let fixture: ComponentFixture<ProfissionaisPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfissionaisPage],
      providers: [
        {
          provide: ProfissionalService,
          useValue: {
            findAll: () => of([{ id: 1, nome: 'Profissional A' }]),
            create: () => of({}),
            update: () => of({}),
            remove: () => of({}),
          },
        },
        {
          provide: PoNotificationService,
          useValue: {
            success: vi.fn(),
            warning: vi.fn(),
            error: vi.fn(),
          },
        },
      ],
    }).overrideComponent(ProfissionaisPage, { set: { template: '' } }).compileComponents();

    fixture = TestBed.createComponent(ProfissionaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load professionals', () => {
    component.loadData();
    expect(component.profissionais.length).toBe(1);
  });
});
