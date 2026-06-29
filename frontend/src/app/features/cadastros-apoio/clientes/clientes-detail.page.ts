import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PoButtonModule,
  PoDividerModule,
  PoInfoModule,
  PoNotificationService,
  PoPageModule,
} from '@po-ui/ng-components';
import { ClienteService } from '../../../core/services/cliente.service';

@Component({
  selector: 'app-clientes-detail-page',
  standalone: true,
  imports: [CommonModule, PoPageModule, PoButtonModule, PoInfoModule, PoDividerModule],
  templateUrl: './clientes-detail.page.html',
})
export class ClientesDetailPage implements OnInit {
  private route   = inject(ActivatedRoute);
  private router  = inject(Router);
  private svc     = inject(ClienteService);
  private notify  = inject(PoNotificationService);

  registro: any = null;
  id!: number;

  get isPJ(): boolean { return this.registro?.tipoPessoa !== 'PF'; }
  get enderecoCompleto(): string {
    if (!this.registro) return '-';
    const r = this.registro;
    const partes = [
      r.logradouro,
      r.numero ? `nº ${r.numero}` : '',
      r.complemento,
      r.bairro,
    ].filter(Boolean).join(', ');
    return partes || '-';
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.params['id']);
    this.svc.findOne(this.id).subscribe({
      next: (data: any) => { this.registro = data; },
      error: () => {
        this.notify.error('Erro ao carregar cliente.');
        this.router.navigate(['/clientes']);
      },
    });
  }

  onEdit() { this.router.navigate(['/clientes', this.id, 'editar']); }
  onBack() { this.router.navigate(['/clientes']); }
}
