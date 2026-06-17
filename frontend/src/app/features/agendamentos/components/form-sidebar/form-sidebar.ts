import { Component, EventEmitter, Output, ViewChild, inject, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  PoButtonModule, 
  PoFieldModule, 
  PoModalComponent, 
  PoModalModule,
  PoComboOption,
  PoNotificationService
} from '@po-ui/ng-components';
import { AgendamentoService } from '../../../../core/services/agendamento.service';
import { ContratoService } from '../../../../core/services/contrato.service';
import { ProfissionalService } from '../../../../core/services/profissional.service';

@Component({
  selector: 'app-form-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, PoModalModule, PoFieldModule, PoButtonModule],
  templateUrl: './form-sidebar.html'
})
export class FormSidebar implements OnInit {
  @ViewChild(PoModalComponent, { static: true }) modal!: PoModalComponent;
  @Output() saved = new EventEmitter<void>();

  private agendamentoService = inject(AgendamentoService);
  private contratoService = inject(ContratoService);
  private profissionalService = inject(ProfissionalService);
  private poNotification = inject(PoNotificationService);

  contratos: PoComboOption[] = [];
  profissionais: PoComboOption[] = [];

  modalidadeOptions: PoComboOption[] = [
    { label: 'Presencial', value: 'P' },
    { label: 'Remoto', value: 'R' },
    { label: 'Falta', value: 'F' }
  ];

  formData: any = {};
  isEdit = false;

  ngOnInit() {
    this.loadDependencies();
  }

  loadDependencies() {
    this.contratoService.findAll().subscribe((data) => {
      this.contratos = data.map(c => ({ label: c.descricao, value: c.id }));
    });
    this.profissionalService.findAll().subscribe((data) => {
      this.profissionais = data.map(p => ({ label: p.nome, value: p.id }));
    });
  }

  open(agendamento?: any, initialDate?: Date) {
    if (agendamento) {
      this.isEdit = true;
      this.formData = { ...agendamento, dataAgenda: agendamento.dataAgenda.split('T')[0] };
    } else {
      this.isEdit = false;
      this.formData = {
        dataAgenda: initialDate ? initialDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        local: 'P',
        tipo: 'A'
      };
    }
    this.modal.open();
  }

  save() {
    if (!this.formData.contratoId || !this.formData.dataAgenda || !this.formData.horaInicio || !this.formData.horaFim) {
      this.poNotification.warning('Preencha todos os campos obrigatórios!');
      return;
    }

    const payload = { ...this.formData };

    if (this.isEdit) {
      this.agendamentoService.update(this.formData.id, payload).subscribe({
        next: () => {
          this.poNotification.success('Agendamento atualizado com sucesso!');
          this.saved.emit();
          this.modal.close();
        },
        error: (err) => this.poNotification.error(err.error.message || 'Erro ao atualizar.')
      });
    } else {
      this.agendamentoService.create(payload).subscribe({
        next: () => {
          this.poNotification.success('Agendamento criado com sucesso!');
          this.saved.emit();
          this.modal.close();
        },
        error: (err) => this.poNotification.error(err.error.message || 'Erro ao criar.')
      });
    }
  }
}
