import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { ContratosPage } from './contratos.page';
import { ContratoService } from '../../../core/services/contrato.service';
import { EmpresaService } from '../../../core/services/empresa.service';
import { PoNotificationService } from '@po-ui/ng-components';

describe('ContratosPage', () => {
  let component: ContratosPage;
  let fixture: ComponentFixture<ContratosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratosPage],
      providers: [
        {
          provide: ContratoService,
          useValue: {
            findAll: () => of([{ id: 1, descricao: 'Contrato A', empresa: { nome: 'Empresa A' } }]),
            create: () => of({}),
            update: () => of({}),
            remove: () => of({}),
          },
        },
        {
          provide: EmpresaService,
          useValue: {
            findAll: () => of([{ id: 1, nome: 'Empresa A' }]),
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
    }).overrideComponent(ContratosPage, { set: { template: '' } }).compileComponents();

    fixture = TestBed.createComponent(ContratosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load contracts', () => {
    component.loadData();
    expect(component.contratos.length).toBe(1);
  });
});
