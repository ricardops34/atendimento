import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PoButtonModule, PoPageModule, PoTableAction, PoTableColumn, PoTableModule, PoNotificationService } from '@po-ui/ng-components';
import { AgendamentoService } from '../../../core/services/agendamento.service';
import { FormSidebar } from '../components/form-sidebar/form-sidebar';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, PoPageModule, PoTableModule, PoButtonModule, FormSidebar],
  templateUrl: './lista.html',
  providers: [DatePipe]
})
export class Lista implements OnInit {
  @ViewChild(FormSidebar) formSidebar!: FormSidebar;

  private agendamentoService = inject(AgendamentoService);
  private poNotification = inject(PoNotificationService);
  private datePipe = inject(DatePipe);

  agendamentos: any[] = [];
  loading = false;

  columns: PoTableColumn[] = [
    { property: 'dataAgenda', label: 'Data', type: 'date' },
    { property: 'contrato.descricao', label: 'Contrato' },
    { property: 'profissional.nome', label: 'Profissional' },
    { property: 'localFormatado', label: 'Modalidade' },
    { property: 'duracaoFormatada', label: 'Duração Total' },
    { property: 'tipoFormatado', label: 'Status', type: 'label', labels: [
      { value: 'Agendada', color: 'color-01', label: 'Agendada' },
      { value: 'Realizada', color: 'color-10', label: 'Realizada' },
      { value: 'Cancelada', color: 'color-07', label: 'Cancelada' },
      { value: 'Feriado', color: 'color-08', label: 'Feriado' }
    ]}
  ];

  actions: PoTableAction[] = [
    {
      label: 'Editar',
      icon: 'po-icon-edit',
      action: this.onEdit.bind(this)
    },
    {
      label: 'Confirmar',
      icon: 'po-icon-ok',
      action: this.onConfirm.bind(this),
      disabled: (row: any) => row.tipo !== 'A'
    }
  ];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.agendamentoService.findAll().subscribe((data: any[]) => {
      this.agendamentos = data.map((a: any) => ({
        ...a,
        localFormatado: this.formatLocal(a.local),
        duracaoFormatada: this.formatMinutesToHours(a.duracaoMinutos),
        tipoFormatado: this.formatTipo(a.tipo)
      }));
      this.loading = false;
    });
  }

  onNew() {
    this.formSidebar.open();
  }

  onEdit(row: any) {
    this.formSidebar.open(row);
  }

  onConfirm(row: any) {
    if (row.tipo !== 'A') return;
    this.agendamentoService.confirmar(row.id).subscribe({
      next: () => {
        this.poNotification.success('Atendimento confirmado como Realizado.');
        this.loadData();
      },
      error: (err: any) => this.poNotification.error('Erro ao confirmar atendimento.')
    });
  }

  onFecharLote() {
    const ids = this.agendamentos.filter(a => a.tipo === 'A').map(a => a.id);
    if (ids.length === 0) {
      this.poNotification.warning('Nenhum agendamento pendente para fechar lote.');
      return;
    }
    this.agendamentoService.fecharLote(ids).subscribe({
      next: (res: any) => {
        this.poNotification.success(`Fechamento concluído. ${res.registrosProcessados} registros atualizados.`);
        this.loadData();
      },
      error: (err: any) => this.poNotification.error('Erro no fechamento de lote.')
    });
  }

  private formatLocal(local: string) {
    const map: any = { 'P': 'Presencial', 'R': 'Remoto', 'F': 'Falta' };
    return map[local] || local;
  }

  private formatTipo(tipo: string) {
    const map: any = { 'A': 'Agendada', 'R': 'Realizada', 'C': 'Cancelada', 'F': 'Feriado' };
    return map[tipo] || tipo;
  }

  private formatMinutesToHours(minutes: number) {
    if (!minutes) return '00:00';
    const h = Math.floor(minutes / 60).toString().padStart(2, '0');
    const m = (minutes % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
  }
}
