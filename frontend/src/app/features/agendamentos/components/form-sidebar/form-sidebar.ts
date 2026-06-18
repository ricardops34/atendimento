import { Component, EventEmitter, Output, ViewChild, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  PoButtonModule,
  PoFieldModule,
  PoPageSlideComponent,
  PoPageSlideModule,
  PoComboOption,
  PoNotificationService,
  PoDialogService
} from '@po-ui/ng-components';
import { AgendamentoService } from '../../../../core/services/agendamento.service';
import { ContratoService } from '../../../../core/services/contrato.service';
import { ProfissionalService } from '../../../../core/services/profissional.service';

@Component({
  selector: 'app-form-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageSlideModule, PoFieldModule, PoButtonModule],
  templateUrl: './form-sidebar.html'
})
export class FormSidebar implements OnInit {
  @ViewChild(PoPageSlideComponent, { static: true }) pageSlide!: PoPageSlideComponent;
  @Output() saved = new EventEmitter<void>();

  private agendamentoService = inject(AgendamentoService);
  private contratoService = inject(ContratoService);
  private profissionalService = inject(ProfissionalService);
  private poNotification = inject(PoNotificationService);
  private poDialog = inject(PoDialogService);

  contratos: PoComboOption[] = [];
  contratosRaw: any[] = [];
  profissionais: PoComboOption[] = [];

  readonly modalidadeOptions: PoComboOption[] = [
    { label: 'Presencial', value: 'P' },
    { label: 'Remoto', value: 'R' },
    { label: 'Falta', value: 'F' }
  ];

  readonly tipoOptions: PoComboOption[] = [
    { label: 'Agendada', value: 'A' },
    { label: 'Realizada', value: 'R' },
    { label: 'Cancelada', value: 'C' },
    { label: 'Feriado', value: 'F' }
  ];

  formData: any = {};
  isEdit = false;

  ngOnInit() {
    this.loadDependencies();
  }

  loadDependencies() {
    this.contratoService.findAll().subscribe((data) => {
      this.contratosRaw = data;
      this.contratos = data.map((c: any) => ({ label: `${c.descricao}`, value: c.id }));
    });
    this.profissionalService.findAll().subscribe((data) => {
      this.profissionais = data.map((p: any) => ({ label: p.nome, value: p.id }));
    });
  }

  open(agendamento?: any, initialDate?: Date) {
    if (agendamento) {
      this.isEdit = true;
      this.formData = {
        ...agendamento,
        dataAgenda: agendamento.dataAgenda?.split('T')[0] ?? agendamento.dataAgenda,
        horaTotal: this.computeHoraTotal(
          agendamento.horaInicio,
          agendamento.horaFim,
          agendamento.horaIntervaloInicial || '00:00',
          agendamento.horaIntervaloFinal || '00:00'
        )
      };
    } else {
      this.isEdit = false;
      this.formData = {
        dataAgenda: initialDate ? initialDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        local: 'P',
        tipo: 'A',
        cor: '#3a87ad',
        horaIntervaloInicial: '00:00',
        horaIntervaloFinal: '00:00',
        horaTotal: ''
      };
    }
    this.pageSlide.open();
  }

  onContratoChange(id: number) {
    this.formData.contratoId = id;
    const contrato = this.contratosRaw.find((c: any) => c.id === id);
    if (contrato) {
      this.formData.cor = contrato.cor || '#333333';
      if (!this.isEdit) {
        this.formData.descricao = contrato.descricao;
      }
    }
  }

  onHoraChange() {
    this.formData.horaTotal = this.computeHoraTotal(
      this.formData.horaInicio,
      this.formData.horaFim,
      this.formData.horaIntervaloInicial || '00:00',
      this.formData.horaIntervaloFinal || '00:00'
    );
  }

  private computeHoraTotal(ini: string, fim: string, intIni: string, intFim: string): string {
    if (!ini || !fim) return '';
    const toMin = (t: string) => {
      const [h, m] = (t || '00:00').split(':').map(Number);
      return (h || 0) * 60 + (m || 0);
    };
    const total = (toMin(fim) - toMin(ini)) - (toMin(intFim) - toMin(intIni));
    if (total <= 0) return '00:00';
    return `${Math.floor(total / 60).toString().padStart(2, '0')}:${(total % 60).toString().padStart(2, '0')}`;
  }

  save() {
    if (!this.formData.contratoId || !this.formData.dataAgenda || !this.formData.horaInicio || !this.formData.horaFim) {
      this.poNotification.warning('Preencha todos os campos obrigatórios!');
      return;
    }

    const payload = { ...this.formData };
    delete payload.horaTotal;

    if (this.isEdit) {
      this.agendamentoService.update(this.formData.id, payload).subscribe({
        next: () => {
          this.poNotification.success('Agendamento atualizado com sucesso!');
          this.saved.emit();
          this.pageSlide.close();
        },
        error: (err) => this.poNotification.error(err.error?.message || 'Erro ao atualizar.')
      });
    } else {
      this.agendamentoService.create(payload).subscribe({
        next: () => {
          this.poNotification.success('Agendamento criado com sucesso!');
          this.saved.emit();
          this.pageSlide.close();
        },
        error: (err) => this.poNotification.error(err.error?.message || 'Erro ao criar.')
      });
    }
  }

  confirmar() {
    this.poDialog.confirm({
      title: 'Confirmar atendimento',
      message: 'Deseja confirmar este atendimento como Realizado?',
      confirm: () => {
        this.agendamentoService.confirmar(this.formData.id).subscribe({
          next: () => {
            this.poNotification.success('Atendimento confirmado como Realizado.');
            this.saved.emit();
            this.pageSlide.close();
          },
          error: (err) => this.poNotification.error(err.error?.message || 'Erro ao confirmar.')
        });
      }
    });
  }

  excluir() {
    this.poDialog.confirm({
      title: 'Excluir agendamento',
      message: 'Deseja realmente excluir este agendamento?',
      confirm: () => {
        this.agendamentoService.remove(this.formData.id).subscribe({
          next: () => {
            this.poNotification.success('Agendamento excluído.');
            this.saved.emit();
            this.pageSlide.close();
          },
          error: (err) => this.poNotification.error(err.error?.message || 'Erro ao excluir.')
        });
      }
    });
  }
}
