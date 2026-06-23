import { Component, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PoPageLogin, PoTemplatesModule } from '@po-ui/ng-templates';
import {
  PoButtonModule,
  PoComboOption,
  PoFieldModule,
  PoModalComponent,
  PoModalModule,
  PoNotificationService,
} from '@po-ui/ng-components';
import { AuthService } from '../../../core/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { PoPageLoginCustomField } from '@po-ui/ng-templates';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PoTemplatesModule, PoModalModule, PoFieldModule, PoButtonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private API_URL = environment.apiUrl || 'http://localhost:3000';
  private http = inject(HttpClient);

  private authService = inject(AuthService);
  private router = inject(Router);
  private poNotification = inject(PoNotificationService);

  tenantOptions: PoComboOption[] = [];
  selectedTenantId: number | null = null;
  pendingCredentials: { email: string; password: string } | null = null;

  customField: PoPageLoginCustomField = {
    property: 'tenantId',
    placeholder: 'Selecione a Empresa',
    options: []
  };

  ngOnInit() {
    this.http.get<any[]>(`${this.API_URL}/tenants`).subscribe({
      next: (res) => {
        this.customField.options = res.map(t => ({ label: t.name, value: t.id }));
        this.customField = { ...this.customField };
      }
    });
  }

  loginSubmit(formData: any) {
    this.pendingCredentials = {
      email: formData.login,
      password: formData.password
    };
    this.submitLogin(formData.tenantId || formData.customField);
  }

  private submitLogin(tenantId?: number) {
    if (!this.pendingCredentials) {
      return;
    }

    this.authService.login({
      email: this.pendingCredentials.email,
      password: this.pendingCredentials.password,
      tenantId
    }).subscribe({
      next: (res) => {
        if (res?.requiresTenantSelection) {
          this.poNotification.warning('Por favor, selecione uma empresa válida.');
          return;
        }

        this.poNotification.success('Login realizado com sucesso!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.poNotification.error(err.error?.message || 'Falha na autenticação');
      }
    });
  }
}
