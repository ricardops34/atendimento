import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { MenuService } from '../../../core/services/menu.service';
import { RoutineService } from '../../../core/services/routine.service';
import { SystemModuleService } from '../../../core/services/system-module.service';
import { MenusEditPage } from './menus-edit.page';

describe('MenusEditPage', () => {
  const menuService = {
    findOne: vi.fn(),
    create: vi.fn(() => of({ id: 1 })),
    update: vi.fn(() => of({ id: 1 })),
  };

  beforeEach(async () => {
    TestBed.overrideComponent(MenusEditPage, { set: { template: '' } });
    await TestBed.configureTestingModule({
      imports: [MenusEditPage],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } },
        { provide: Router, useValue: { navigate: vi.fn() } },
        { provide: MenuService, useValue: menuService },
        { provide: RoutineService, useValue: { findAll: () => of([
          { id: 7, moduleId: 2, name: 'Clientes', key: 'clientes-list', path: '/clientes' },
        ]) } },
        { provide: SystemModuleService, useValue: { findAll: () => of([
          { id: 2, name: 'Cadastro' },
        ]) } },
        { provide: PoNotificationService, useValue: { success: vi.fn(), warning: vi.fn(), error: vi.fn() } },
      ],
    }).compileComponents();
    menuService.create.mockClear();
  });

  it('adds a routine as a detail of the current menu', () => {
    const component = TestBed.createComponent(MenusEditPage).componentInstance;
    component.ngOnInit();
    component.openNewItem();
    component.selectModule(2);
    component.itemForm.routineId = 7;
    component.itemForm.sortOrder = 10;
    component.confirmItem();

    expect(component.items).toEqual([
      expect.objectContaining({ module: 'Cadastro', routine: 'Clientes', routineId: 7, sortOrder: 10 }),
    ]);
  });

  it('defines every detail column as sortable', () => {
    const component = TestBed.createComponent(MenusEditPage).componentInstance;

    expect(component.itemColumns.every((column) => column.sortable === true)).toBe(true);
  });

  it('removes only the selected detail locally', () => {
    const component = TestBed.createComponent(MenusEditPage).componentInstance;
    component.items = [
      { routineId: 7, moduleId: 2, module: 'Cadastro', routine: 'Clientes', sortOrder: 10, isActive: true },
      { routineId: 8, moduleId: 3, module: 'Configuração', routine: 'Menu', sortOrder: 20, isActive: true },
    ];

    component.removeItem(component.items[0]);

    expect(component.items).toHaveLength(1);
    expect(component.items[0].routineId).toBe(8);
  });

  it('saves header and details in a single menu payload', () => {
    const component = TestBed.createComponent(MenusEditPage).componentInstance;
    component.formData = { title: 'Menu do Administrador', isActive: true };
    component.items = [
      { routineId: 7, moduleId: 2, module: 'Cadastro', routine: 'Clientes', sortOrder: 10, isActive: true },
    ];

    component.save();

    expect(menuService.create).toHaveBeenCalledWith({
      title: 'Menu do Administrador',
      isActive: true,
      items: [{ routineId: 7, sortOrder: 10, isActive: true }],
    });
  });
});
