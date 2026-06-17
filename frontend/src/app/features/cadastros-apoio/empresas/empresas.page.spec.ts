import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { EmpresasPage } from './empresas.page';
import { EmpresaService } from '../../../core/services/empresa.service';
import { PoNotificationService } from '@po-ui/ng-components';

describe('EmpresasPage', () => {
  let component: EmpresasPage;
  let fixture: ComponentFixture<EmpresasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresasPage],
      providers: [
        {
          provide: EmpresaService,
          useValue: {
            findAll: () => of([{ id: 1, nome: 'Empresa A' }]),
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
    }).overrideComponent(EmpresasPage, { set: { template: '' } }).compileComponents();

    fixture = TestBed.createComponent(EmpresasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load companies', () => {
    component.loadData();
    expect(component.empresas.length).toBe(1);
  });
});
