import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoNotificationService, PoPageModule } from '@po-ui/ng-components';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { AgendamentoService } from '../../../core/services/agendamento.service';
import { FormSidebar } from '../components/form-sidebar/form-sidebar';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, PoPageModule, FullCalendarModule, FormSidebar],
  templateUrl: './calendario.html'
})
export class Calendario {
  @ViewChild(FormSidebar) formSidebar!: FormSidebar;
  @ViewChild(FullCalendarComponent) calendarComponent!: FullCalendarComponent;
  private agendamentoService = inject(AgendamentoService);
  private poNotification = inject(PoNotificationService);

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    locales: [ptBrLocale],
    locale: 'pt-br',
    dateClick: (arg: any) => this.handleDateClick(arg),
    eventClick: (arg: EventClickArg) => this.handleEventClick(arg),
    events: (fetchInfo, successCallback, failureCallback) => {
      const dataInicial = fetchInfo.startStr.split('T')[0];
      const dataFinal   = fetchInfo.endStr.split('T')[0];
      this.agendamentoService.search({ dataInicial, dataFinal, pageSize: 500, page: 1 }).subscribe({
        next: (result) => {
          const events = result.items.map((a: any) => ({
            id: a.id.toString(),
            title: `${a.contrato?.descricao || 'Sem Contrato'} - ${a.profissional?.nome || 'N/D'}`,
            start: a.horarioInicial,
            end: a.horarioFinal,
            backgroundColor: a.cor || '#333333',
            borderColor: a.cor || '#333333',
            extendedProps: { agendamento: a },
          }));
          successCallback(events);
        },
        error: () => {
          this.poNotification.error('Erro ao carregar eventos do calendário.');
          failureCallback(new Error('Falha ao buscar agendamentos'));
        },
      });
    },
  };

  refetchEvents() {
    this.calendarComponent?.getApi().refetchEvents();
  }

  handleDateClick(arg: any) {
    this.formSidebar.open(null, arg.date);
  }

  handleEventClick(arg: EventClickArg) {
    const agendamento = arg.event.extendedProps['agendamento'];
    if (agendamento) {
      this.formSidebar.open(agendamento);
    }
  }
}
