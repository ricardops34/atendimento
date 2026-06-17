import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Calendario } from './calendario';
import { AgendamentoService } from '../../../core/services/agendamento.service';

describe('Calendario', () => {
  let component: Calendario;
  let fixture: ComponentFixture<Calendario>;

  beforeEach(async () => {
    TestBed.overrideComponent(Calendario, {
      set: {
        template: '',
      },
    });

    await TestBed.configureTestingModule({
      imports: [Calendario],
      providers: [
        {
          provide: AgendamentoService,
          useValue: {
            findAll: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Calendario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
