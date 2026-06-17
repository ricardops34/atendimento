import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PoPageLogin } from '@po-ui/ng-templates';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { AuthService } from '../../../core/auth/auth.service';
import { PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PoTemplatesModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private poNotification = inject(PoNotificationService);

  loginSubmit(formData: PoPageLogin) {
    this.authService.login({
      email: formData.login,
      password: formData.password
    }).subscribe({
      next: (res) => {
        this.poNotification.success('Login realizado com sucesso!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.poNotification.error(err.error?.message || 'Falha na autenticação');
      }
    });
  }
}
