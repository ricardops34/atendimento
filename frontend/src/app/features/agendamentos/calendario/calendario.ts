import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageModule } from '@po-ui/ng-components';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { AgendamentoService } from '../../../core/services/agendamento.service';
import { FeriadoService } from '../../../core/services/feriado.service';
import { FormSidebar } from '../components/form-sidebar/form-sidebar';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, PoPageModule, FullCalendarModule, FormSidebar],
  templateUrl: './calendario.html',
  styles: [`
    :host ::ng-deep .fc-feriado-bg { background: #ffcdd2 !important; opacity: 0.6; }
    :host ::ng-deep .fc-feriado-header { color: #c62828 !important; }
  `],
})
export class Calendario implements OnInit {
  @ViewChild(FormSidebar) formSidebar!: FormSidebar;
  private agendamentoService = inject(AgendamentoService);
  private feriadoService = inject(FeriadoService);

  // Mapa "YYYY-MM-DD" -> descrição do feriado, já expandido para os feriados fixos
  // (recorrentes todo ano, ex: Natal) ao longo de uma janela de anos.
  private feriadosPorData = new Map<string, string>();

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
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    dayCellClassNames: (arg) => this.isFeriado(arg.date) ? ['fc-feriado-bg'] : [],
    dayHeaderClassNames: (arg) => this.isFeriado(arg.date) ? ['fc-feriado-header'] : [],
    dayHeaderDidMount: (arg) => {
      const descricao = this.getFeriadoDescricao(arg.date);
      if (descricao) arg.el.title = `Feriado: ${descricao}`;
    },
    events: []
  };

  rawAgendamentos: any[] = [];

  ngOnInit() {
    this.loadFeriados();
    this.loadEvents();
  }

  private toDateKey(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  private isFeriado(date: Date): boolean {
    return this.feriadosPorData.has(this.toDateKey(date));
  }

  private getFeriadoDescricao(date: Date): string | undefined {
    return this.feriadosPorData.get(this.toDateKey(date));
  }

  loadFeriados() {
    // pageSize alto: a lista de feriados cadastrados é pequena, não precisa paginar aqui.
    this.feriadoService.search({ pageSize: 1000 }).subscribe((res: any) => {
      const feriados = res?.items || [];
      const anoAtual = new Date().getFullYear();
      // Expande os feriados fixos (recorrentes todo ano) numa janela de anos ao redor do atual,
      // o suficiente para cobrir a navegação normal do calendário.
      const anos: number[] = [];
      for (let a = anoAtual - 1; a <= anoAtual + 2; a++) anos.push(a);

      const mapa = new Map<string, string>();
      for (const f of feriados) {
        const data = new Date(f.data);
        const mes = data.getUTCMonth();
        const dia = data.getUTCDate();
        if (f.fixo) {
          for (const ano of anos) {
            const key = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
            mapa.set(key, f.descricao);
          }
        } else {
          const key = `${data.getUTCFullYear()}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
          mapa.set(key, f.descricao);
        }
      }
      this.feriadosPorData = mapa;
      // Força o FullCalendar a reavaliar dayCellClassNames/dayHeaderClassNames com o mapa atualizado.
      this.calendarOptions = { ...this.calendarOptions };
    });
  }

  loadEvents() {
    this.agendamentoService.findAll().subscribe((data: any[]) => {
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
            borderColor: a.cor || '#333333'
          };
        })
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
