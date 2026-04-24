import { Injectable, Logger } from '@nestjs/common';
import { join } from 'path';
import { existsSync } from 'fs';

@Injectable()
export class CustomRoutinesService {
  private readonly logger = new Logger(CustomRoutinesService.name);
  private readonly routinesBaseDir = join(process.cwd(), 'custom_routines');

  /**
   * Procura e executa um "Hook" customizado para o cliente
   * @param tenantId ID do cliente
   * @param hookName Nome da rotina (ex: 'calculo_comissao')
   * @param data Dados para processamento
   */
  async runHook(tenantId: string, hookName: string, data: any): Promise<any> {
    const routinePath = join(this.routinesBaseDir, tenantId, `${hookName}.js`);

    if (existsSync(routinePath)) {
      try {
        // Importa o arquivo dinamicamente
        // Nota: Em produção, usaríamos uma sandbox (vm2) para segurança total
        const routine = require(routinePath);
        
        if (typeof routine.execute === 'function') {
          this.logger.log(`[PLUGIN] Executando rotina customizada para ${tenantId}: ${hookName}`);
          return await routine.execute(data);
        }
      } catch (error) {
        this.logger.error(`[PLUGIN ERROR] Falha na rotina ${hookName} do cliente ${tenantId}: ${error.message}`);
      }
    }

    // Se não houver rotina, retorna os dados originais sem alteração
    return data;
  }
}
