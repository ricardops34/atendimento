import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoModalComponent, PoModalModule, PoPageModule } from '@po-ui/ng-components';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { PortalClienteService } from '../../../core/services/portal-cliente.service';

// Somente leitura: sem dateClick (não cria agendamento), sem form-sidebar de edição.
// Referência visual: frontend/src/app/features/agendamentos/calendario (não alterado, não importado).
@Component({
  selector: 'app-portal-cliente-calendario',
  standalone: true,
  imports: [CommonModule, PoPageModule, PoModalModule, FullCalendarModule],
  templateUrl: './calendario.html',
})
export class PortalClienteCalendario implements OnInit {
  @ViewChild('detalheModal', { static: true }) detalheModal!: PoModalComponent;

  private portalClienteService = inject(PortalClienteService);

  rawAgendamentos: any[] = [];
  detalheSelecionado: any = null;

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    locales: [ptBrLocale],
    locale: 'pt-br',
    editable: false,
    selectable: false,
    eventClick: this.handleEventClick.bind(this),
    events: [],
  };

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.portalClienteService.calendario().subscribe((data: any[]) => {
      this.rawAgendamentos = data;
      this.calendarOptions = {
        ...this.calendarOptions,
        events: data.map((a: any) => {
          const dateStr = a.dataAgenda ? a.dataAgenda.split('T')[0] : '';
          return {
            id: a.id.toString(),
            title: `${a.contrato?.descricao || 'Sem Contrato'} - ${a.profissional?.nome || 'N/D'}`,
            start: dateStr && a.horaInicio ? `${dateStr}T${a.horaInicio}:00` : a.horarioInicial,
            end: dateStr && a.horaFim ? `${dateStr}T${a.horaFim}:00` : a.horarioFinal,
            backgroundColor: a.cor || '#333333',
            borderColor: a.cor || '#333333',
          };
        }),
      };
    });
  }

  handleEventClick(arg: any) {
    const id = parseInt(arg.event.id, 10);
    this.detalheSelecionado = this.rawAgendamentos.find((a) => a.id === id) || null;
    if (this.detalheSelecionado) {
      this.detalheModal.open();
    }
  }

  formatTipo(tipo: string): string {
    const map: Record<string, string> = { A: 'Agendada', R: 'Realizada', C: 'Cancelada', F: 'Feriado' };
    return map[tipo] || tipo;
  }

  formatLocal(local: string): string {
    const map: Record<string, string> = { P: 'Presencial', R: 'Remoto', F: 'Falta', E: 'Extra' };
    return map[local] || local;
  }
}
