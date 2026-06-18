import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { of } from 'rxjs';
import { FormSidebar } from './form-sidebar';
import { AgendamentoService } from '../../../../core/services/agendamento.service';
import { ContratoService } from '../../../../core/services/contrato.service';
import { ProfissionalService } from '../../../../core/services/profissional.service';
import { PoNotificationService } from '@po-ui/ng-components';

describe('FormSidebar', () => {
  let component: FormSidebar;
  let fixture: ComponentFixture<FormSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSidebar],
      providers: [
        {
          provide: AgendamentoService,
          useValue: {
            create: () => of({}),
            update: () => of({}),
          },
        },
        {
          provide: ContratoService,
          useValue: {
            findAll: () => of([]),
          },
        },
        {
          provide: ProfissionalService,
          useValue: {
            findAll: () => of([]),
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
    }).compileComponents();

    fixture = TestBed.createComponent(FormSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('open()', () => {
    beforeEach(() => {
      component.pageSlide = { open: vi.fn(), close: vi.fn() } as any;
    });

    it('deve abrir o slide para agendamento Agendado (A)', () => {
      component.open({ tipo: 'A', dataAgenda: '2026-06-17T00:00:00Z' });
      expect(component.pageSlide.open).toHaveBeenCalled();
    });

    it('deve abrir o slide para agendamento Realizado (R)', () => {
      component.open({ tipo: 'R', dataAgenda: '2026-06-17T00:00:00Z' });
      expect(component.pageSlide.open).toHaveBeenCalled();
    });

    it('deve abrir o slide para agendamento Cancelado (C)', () => {
      component.open({ tipo: 'C', dataAgenda: '2026-06-17T00:00:00Z' });
      expect(component.pageSlide.open).toHaveBeenCalled();
    });

    it('deve abrir o slide para novo agendamento (sem dados)', () => {
      component.open();
      expect(component.pageSlide.open).toHaveBeenCalled();
    });
  });
});
