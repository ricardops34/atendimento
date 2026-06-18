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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PoTemplatesModule, PoModalModule, PoFieldModule, PoButtonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('tenantModal', { static: true }) tenantModal!: PoModalComponent;

  private authService = inject(AuthService);
  private router = inject(Router);
  private poNotification = inject(PoNotificationService);

  tenantOptions: PoComboOption[] = [];
  selectedTenantId: number | null = null;
  pendingCredentials: { email: string; password: string } | null = null;

  loginSubmit(formData: PoPageLogin) {
    this.pendingCredentials = {
      email: formData.login,
      password: formData.password
    };
    this.submitLogin();
  }

  confirmTenantSelection() {
    if (!this.pendingCredentials || !this.selectedTenantId) {
      return;
    }

    this.submitLogin(this.selectedTenantId);
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
          this.tenantOptions = (res.tenantOptions || []).map((item: any) => ({
            label: item.tenantName,
            value: item.tenantId
          }));
          this.selectedTenantId =
            res.tenantOptions?.find((item: any) => item.isDefault)?.tenantId ??
            res.tenantOptions?.[0]?.tenantId ??
            null;
          this.tenantModal.open();
          return;
        }

        this.tenantModal.close();
        this.poNotification.success('Login realizado com sucesso!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.poNotification.error(err.error?.message || 'Falha na autenticação');
      }
    });
  }
}
