import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  PoButtonModule,
  PoComboOption,
  PoFieldModule,
  PoNotificationService,
  PoPageModule,
  PoRadioGroupOption,
} from '@po-ui/ng-components';
import { PortalClienteService } from '../../../core/services/portal-cliente.service';

@Component({
  selector: 'app-portal-cliente-extrato',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoFieldModule, PoButtonModule],
  templateUrl: './extrato.html',
})
export class PortalClienteExtrato {
  private portalClienteService = inject(PortalClienteService);
  private poNotification = inject(PoNotificationService);

  dataInicial?: string;
  dataFinal?: string;
  tipoExtrato: 'sintetico' | 'analitico' | 'calendario' = 'analitico';
  gerando = false;

  readonly tipoExtratoOptions: PoRadioGroupOption[] = [
    { label: 'Sintético (Resumo)', value: 'sintetico' },
    { label: 'Analítico (Com Observações)', value: 'analitico' },
    { label: 'Calendário', value: 'calendario' },
  ];

  readonly formatOptions: PoComboOption[] = [
    { label: 'PDF', value: 'pdf' },
    { label: 'XLS', value: 'xls' },
  ];

  gerarExtrato(format: 'pdf' | 'xls') {
    if (!this.dataInicial || !this.dataFinal) {
      this.poNotification.warning('Informe a data inicial e a data final.');
      return;
    }

    this.gerando = true;
    this.portalClienteService.extrato(this.dataInicial, this.dataFinal, this.tipoExtrato, format).subscribe({
      next: (blob) => {
        const extMap: Record<'pdf' | 'xls', string> = { pdf: 'pdf', xls: 'xlsx' };
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `extrato-cliente.${extMap[format]}`;
        a.click();
        URL.revokeObjectURL(url);
        this.gerando = false;
      },
      error: async (err) => {
        let message = 'Erro ao gerar extrato.';
        if (err.error instanceof Blob) {
          try {
            const text = await err.error.text();
            const json = JSON.parse(text);
            message = json.message || message;
          } catch {}
        }
        this.poNotification.error(message);
        this.gerando = false;
      },
    });
  }
}
