import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoButtonModule, PoDividerModule, PoFieldModule, PoNotificationService, PoPageModule, PoLoadingModule } from '@po-ui/ng-components';
import { EstadoService } from '../../../core/services/estado.service';

@Component({
  selector: 'app-estados-edit-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoFieldModule, PoButtonModule, PoDividerModule, PoLoadingModule],
  templateUrl: './estados-edit.page.html',
})
export class EstadosEditPage implements OnInit {
  private service = inject(EstadoService);
  private poNotification = inject(PoNotificationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isEdit = false;
  saving = false;
  loading = false;
  id: number | null = null;
  title = 'Novo Estado';
  
  form: any = { id: '', nome: '', sigla: '' };

  ngOnInit() {
    const idParam = this.route.snapshot.params['id'];
    if (idParam) {
      this.isEdit = true;
      this.id = Number(idParam);
      this.title = 'Editar Estado';
      this.loadRecord();
    }
  }

  loadRecord() {
    this.loading = true;
    this.service.getEstados({ nome: '' }).subscribe({
      next: (result: any) => {
        const estado = result.items.find((e: any) => e.id === this.id);
        if (estado) {
          this.form = { id: estado.id, nome: estado.nome, sigla: estado.sigla };
        } else {
          this.poNotification.error('Estado não encontrado.');
          this.cancel();
        }
        this.loading = false;
      },
      error: () => {
        this.poNotification.error('Erro ao carregar estado.');
        this.loading = false;
      }
    });
  }

  save() {
    if (!this.form.nome?.trim() || !this.form.sigla?.trim()) {
      this.poNotification.warning('Preencha nome e sigla.');
      return;
    }
    
    if (!this.isEdit && (!this.form.id || String(this.form.id).trim() === '')) {
      this.poNotification.warning('Preencha o Código IBGE.');
      return;
    }

    this.saving = true;
    const payload = {
      id: Number(this.form.id),
      nome: this.form.nome.trim(),
      sigla: this.form.sigla.trim()
    };

    const request$ = this.isEdit 
      ? this.service.updateEstado(this.id!, payload) 
      : this.service.createEstado(payload);

    request$.subscribe({
      next: () => {
        this.poNotification.success(this.isEdit ? 'Estado atualizado.' : 'Estado criado.');
        this.saving = false;
        this.cancel();
      },
      error: () => {
        this.poNotification.error('Erro ao salvar estado.');
        this.saving = false;
      },
    });
  }

  cancel() {
    this.router.navigate(['/configuracoes/estados']);
  }
}
