import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { of } from 'rxjs';
import { Lista } from './lista';
import { AgendamentoService } from '../../../core/services/agendamento.service';
import { PoNotificationService } from '@po-ui/ng-components';

describe('Lista', () => {
  let component: Lista;
  let fixture: ComponentFixture<Lista>;

  beforeEach(async () => {
    TestBed.overrideComponent(Lista, {
      set: {
        template: '',
      },
    });

    await TestBed.configureTestingModule({
      imports: [Lista],
      providers: [
        {
          provide: AgendamentoService,
          useValue: {
            findAll: () => of([]),
            confirmar: () => of({}),
            fecharLote: () => of({ registrosProcessados: 0 }),
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

    fixture = TestBed.createComponent(Lista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
