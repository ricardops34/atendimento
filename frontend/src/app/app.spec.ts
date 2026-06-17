import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { vi } from 'vitest';
import { of } from 'rxjs';
import { App } from './app';
import { AuthService } from './core/auth/auth.service';
import { TenantStateService } from './core/auth/tenant-state.service';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {
          provide: AuthService,
          useValue: {
            isAuthenticated: () => false,
            me: () => of(null),
            logout: vi.fn(),
          },
        },
        {
          provide: TenantStateService,
          useValue: {
            user: () => null,
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: vi.fn(),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
