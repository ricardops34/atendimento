import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoButtonModule, PoComboModule, PoComboOption, PoDividerModule, PoFieldModule, PoNotificationService, PoPageModule, PoLoadingModule } from '@po-ui/ng-components';
import { CepService } from '../../../core/services/cep.service';

@Component({
  selector: 'app-ceps-edit-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoFieldModule, PoButtonModule, PoDividerModule, PoComboModule, PoLoadingModule],
  templateUrl: './ceps-edit.page.html',
})
export class CepsEditPage implements OnInit {
  private service = inject(CepService);
  private poNotification = inject(PoNotificationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isEdit = false;
  saving = false;
  loading = false;
  buscandoCep = false;
  id: string | null = null;
  title = 'Novo CEP';
  
  form: any = { cep: '', logradouro: '', bairro: '', municipioId: null, estadoId: null };

  ngOnInit() {
    const idParam = this.route.snapshot.params['id'];
    if (idParam) {
      this.isEdit = true;
      this.id = idParam;
      this.title = 'Editar CEP';
      this.loadRecord();
    }
  }

  loadRecord() {
    this.loading = true;
    this.service.getCeps({ search: this.id! }).subscribe({
      next: (result: any) => {
        const cep = result.items.find((e: any) => e.cep === this.id);
        if (cep) {
          this.form = { 
            cep: cep.cep, 
            logradouro: cep.logradouro, 
            bairro: cep.bairro, 
            municipioId: cep.municipioId, 
            estadoId: cep.estadoId 
          };
        } else {
          this.poNotification.error('CEP não encontrado.');
          this.cancel();
        }
        this.loading = false;
      },
      error: () => {
        this.poNotification.error('Erro ao carregar CEP.');
        this.loading = false;
      }
    });
  }

  buscarCep() {
    if (!this.form.cep || this.form.cep.length < 8) {
      this.poNotification.warning('Digite um CEP válido para buscar no ViaCEP');
      return;
    }
    
    this.buscandoCep = true;
    this.service.getCepById(this.form.cep).subscribe({
      next: (cep: any) => {
        this.poNotification.success(`CEP ${cep.cep} encontrado!`);
        this.form.logradouro = cep.logradouro || this.form.logradouro;
        this.form.bairro = cep.bairro || this.form.bairro;
        this.form.municipioId = cep.municipioId || this.form.municipioId;
        this.form.estadoId = cep.estadoId || this.form.estadoId;
        this.buscandoCep = false;
      },
      error: () => {
        this.poNotification.error('CEP não encontrado ou inválido');
        this.buscandoCep = false;
      }
    });
  }

  save() {
    if (!this.form.cep?.trim() || !this.form.logradouro?.trim()) {
      this.poNotification.warning('Preencha CEP e Logradouro.');
      return;
    }

    this.saving = true;
    const payload = {
      cep: this.form.cep,
      logradouro: this.form.logradouro,
      bairro: this.form.bairro,
      municipioId: Number(this.form.municipioId),
      estadoId: Number(this.form.estadoId)
    };

    const request$ = this.isEdit 
      ? this.service.updateCep(this.id!, payload) 
      : this.service.createCep(payload);

    request$.subscribe({
      next: () => {
        this.poNotification.success(this.isEdit ? 'CEP atualizado.' : 'CEP criado.');
        this.saving = false;
        this.cancel();
      },
      error: () => {
        this.poNotification.error('Erro ao salvar CEP.');
        this.saving = false;
      },
    });
  }

  cancel() {
    this.router.navigate(['/configuracoes/ceps']);
  }
}
