import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PoPageLoginModule } from '@po-ui/ng-templates';
import { PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, PoPageLoginModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  loading: boolean = false;

  constructor(
    private router: Router,
    private poNotification: PoNotificationService
  ) {}

  loginSubmit(formData: any) {
    this.loading = true;
    
    // Simulação de login - Integraremos com o backend a seguir
    console.log('Login Form Data:', formData);
    
    setTimeout(() => {
      this.loading = false;
      this.poNotification.success('Login realizado com sucesso!');
      this.router.navigate(['/']);
    }, 2000);
  }
}
