import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  PoButtonModule,
  PoInfoModule,
  PoLoadingModule,
  PoPageModule,
} from '@po-ui/ng-components';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/auth/auth.service';
import { EmpresaStateService } from '../../core/auth/empresa-state.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PoPageModule, PoButtonModule, PoInfoModule, PoLoadingModule],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage implements OnInit {
  private router = inject(Router);
  private http = inject(HttpClient);
  private empresaState = inject(EmpresaStateService);

  userName = '';
  loading = true;

  indicadores = {
    clientes: 0,
    contratos: 0,
    profissionais: 0,
    agendamentosHoje: 0,
  };

  atalhos = [
    { label: 'Clientes', icon: 'an an-buildings', link: '/clientes', descricao: 'Gerenciar clientes' },
    { label: 'Contratos', icon: 'an an-file-text', link: '/contratos', descricao: 'Gerenciar contratos' },
    { label: 'Profissionais', icon: 'an an-user', link: '/profissionais', descricao: 'Gerenciar profissionais' },
    { label: 'Agenda', icon: 'an an-calendar-blank', link: '/agendamentos/calendario', descricao: 'Ver calendário' },
    { label: 'Atendimentos', icon: 'an an-list-dashes', link: '/agendamentos/lista', descricao: 'Lista de atendimentos' },
  ];

  ngOnInit() {
    const user = this.empresaState.user();
    this.userName = user?.name?.split(' ')[0] || 'usuário';
    this.loadIndicadores();
  }

  private loadIndicadores() {
    const api = environment.apiUrl;
    let pending = 4;
    const done = () => { pending--; if (pending === 0) this.loading = false; };

    this.http.get<any>(`${api}/clientes/search?pageSize=1`).subscribe({
      next: (r) => { this.indicadores.clientes = r.total ?? 0; done(); },
      error: () => done(),
    });

    this.http.get<any>(`${api}/contratos/search?pageSize=1`).subscribe({
      next: (r) => { this.indicadores.contratos = r.total ?? 0; done(); },
      error: () => done(),
    });

    this.http.get<any>(`${api}/profissionais/search?pageSize=1`).subscribe({
      next: (r) => { this.indicadores.profissionais = r.total ?? 0; done(); },
      error: () => done(),
    });

    const hoje = new Date().toISOString().slice(0, 10);
    this.http.get<any>(`${api}/agendamentos/search?pageSize=1&data=${hoje}`).subscribe({
      next: (r) => { this.indicadores.agendamentosHoje = r.total ?? 0; done(); },
      error: () => done(),
    });
  }

  navegar(link: string) {
    this.router.navigate([link]);
  }
}
