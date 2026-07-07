import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PoButtonModule,
  PoFieldModule,
  PoLoadingModule,
  PoNotificationService,
  PoPageModule,
} from '@po-ui/ng-components';
import { PaisService } from '../../../core/services/pais.service';

@Component({
  selector: 'app-paises-edit-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PoPageModule,
    PoFieldModule,
    PoButtonModule,
    PoLoadingModule,
  ],
  templateUrl: './paises-edit.page.html',
})
export class PaisesEditPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private svc = inject(PaisService);
  private notify = inject(PoNotificationService);

  id: number | null = null;
  loading = false;
  saving = false;

  form: any = {
    id: null,
    nome: '',
    sigla: '',
  };

  get title(): string {
    return this.id ? 'Editar País' : 'Novo País';
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.loadData();
    }
  }

  loadData() {
    this.loading = true;
    this.svc.findOne(this.id!).subscribe({
      next: (data: any) => {
        this.form = { ...data };
        this.loading = false;
      },
      error: () => {
        this.notify.error('Erro ao carregar o país.');
        this.loading = false;
        this.router.navigate(['/paises']);
      },
    });
  }

  save() {
    if (!this.form.id || !this.form.nome?.trim() || !this.form.sigla?.trim()) {
      this.notify.warning('Preencha os campos obrigatórios (Código, Nome, Sigla).');
      return;
    }
    
    this.form.id = Number(this.form.id);
    this.saving = true;

    const req$ = this.id
      ? this.svc.update(this.id, this.form)
      : this.svc.create(this.form);

    req$.subscribe({
      next: () => {
        this.notify.success(
          this.id ? 'País atualizado com sucesso.' : 'País criado com sucesso.'
        );
        this.saving = false;
        this.router.navigate(['/paises']);
      },
      error: (err: any) => {
        const msg = err?.error?.message || 'Erro ao salvar o país.';
        this.notify.error(msg);
        this.saving = false;
      },
    });
  }

  cancel() {
    this.router.navigate(['/paises']);
  }
}
