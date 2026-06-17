import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageModule } from '@po-ui/ng-components';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { AgendamentoService } from '../../../core/services/agendamento.service';
import { FormSidebar } from '../components/form-sidebar/form-sidebar';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, PoPageModule, FullCalendarModule, FormSidebar],
  templateUrl: './calendario.html'
})
export class Calendario implements OnInit {
  @ViewChild(FormSidebar) formSidebar!: FormSidebar;
  private agendamentoService = inject(AgendamentoService);

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    locale: 'pt-br',
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: []
  };

  rawAgendamentos: any[] = [];

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.agendamentoService.findAll().subscribe((data: any[]) => {
      this.rawAgendamentos = data;
      this.calendarOptions = {
        ...this.calendarOptions,
        events: data.map((a: any) => ({
          id: a.id.toString(),
          title: `${a.contrato?.descricao || 'Sem Contrato'} - ${a.profissional?.nome || 'N/D'}`,
          start: a.horarioInicial,
          end: a.horarioFinal,
          backgroundColor: a.cor || '#333333',
          borderColor: a.cor || '#333333'
        }))
      };
    });
  }

  handleDateClick(arg: any) {
    this.formSidebar.open(null, arg.date);
  }

  handleEventClick(arg: any) {
    const id = parseInt(arg.event.id, 10);
    const agendamento = this.rawAgendamentos.find(a => a.id === id);
    if (agendamento) {
      this.formSidebar.open(agendamento);
    }
  }
}
