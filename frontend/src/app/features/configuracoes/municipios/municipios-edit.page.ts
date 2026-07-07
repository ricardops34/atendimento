import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoButtonModule, PoComboModule, PoComboOption, PoDividerModule, PoFieldModule, PoNotificationService, PoPageModule, PoLoadingModule } from '@po-ui/ng-components';
import { MunicipioService } from '../../../core/services/municipio.service';
import { EstadoService } from '../../../core/services/estado.service';

@Component({
  selector: 'app-municipios-edit-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoFieldModule, PoButtonModule, PoDividerModule, PoComboModule, PoLoadingModule],
  templateUrl: './municipios-edit.page.html',
})
export class MunicipiosEditPage implements OnInit {
  private service = inject(MunicipioService);
  private estadoService = inject(EstadoService);
  private poNotification = inject(PoNotificationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isEdit = false;
  saving = false;
  loading = false;
  id: number | null = null;
  title = 'Novo Município';
  
  estadosOptions: PoComboOption[] = [];
  form: any = { id: '', nome: '', estadoId: null };

  ngOnInit() {
    this.loadEstados();
    const idParam = this.route.snapshot.params['id'];
    if (idParam) {
      this.isEdit = true;
      this.id = Number(idParam);
      this.title = 'Editar Município';
      this.loadRecord();
    }
  }

  loadEstados() {
    this.estadoService.getEstados({ limit: 100 }).subscribe(res => {
      this.estadosOptions = res.items.map((e: any) => ({ label: `${e.nome} (${e.sigla})`, value: e.id }));
    });
  }

  loadRecord() {
    this.loading = true;
    this.service.getMunicipios({ search: '' }).subscribe({
      next: (result: any) => {
        const municipio = result.items.find((e: any) => e.id === this.id);
        if (municipio) {
          this.form = { id: municipio.id, nome: municipio.nome, estadoId: municipio.estadoId };
        } else {
          this.poNotification.error('Município não encontrado.');
          this.cancel();
        }
        this.loading = false;
      },
      error: () => {
        this.poNotification.error('Erro ao carregar município.');
        this.loading = false;
      }
    });
  }

  save() {
    if (!this.form.nome?.trim() || !this.form.estadoId) {
      this.poNotification.warning('Preencha nome e estado.');
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
      estadoId: Number(this.form.estadoId)
    };

    const request$ = this.isEdit 
      ? this.service.updateMunicipio(this.id!, payload) 
      : this.service.createMunicipio(payload);

    request$.subscribe({
      next: () => {
        this.poNotification.success(this.isEdit ? 'Município atualizado.' : 'Município criado.');
        this.saving = false;
        this.cancel();
      },
      error: () => {
        this.poNotification.error('Erro ao salvar município.');
        this.saving = false;
      },
    });
  }

  cancel() {
    this.router.navigate(['/configuracoes/municipios']);
  }
}
