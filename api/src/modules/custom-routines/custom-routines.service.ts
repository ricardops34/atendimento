import { Injectable, Logger } from '@nestjs/common';
import { join } from 'path';
import { existsSync } from 'fs';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CustomRoutinesService {
  private readonly logger = new Logger(CustomRoutinesService.name);
  private readonly routinesBaseDir = join(process.cwd(), 'custom_routines');

  constructor(private prisma: PrismaService) {}

  /**
   * Executa a rotina customizada VERSIONADA
   */
  async runHook(tenantId: string, hookName: string, data: any): Promise<any> {
    // 1. Busca no banco qual versão desta rotina está ATIVA para este cliente
    const activeRoutine = await this.prisma.customRoutine.findFirst({
      where: { 
        tenantId, 
        hookName, 
        isActive: true 
      },
      orderBy: { version: 'desc' }
    });

    if (activeRoutine) {
      // O caminho agora inclui a pasta do hook e o arquivo da versão (ex: custom_routines/ID/calculo/v2.js)
      const routinePath = join(this.routinesBaseDir, tenantId, hookName, activeRoutine.filePath);

      if (existsSync(routinePath)) {
        try {
          // IMPORTANTE: Limpa o cache do require para permitir atualizações a quente
          delete require.cache[require.resolve(routinePath)];
          const routine = require(routinePath);
          
          if (typeof routine.execute === 'function') {
            this.logger.log(`[PLUGIN V${activeRoutine.version}] Executando ${hookName} para ${tenantId}`);
            return await routine.execute(data);
          }
        } catch (error) {
          this.logger.error(`[PLUGIN ERROR] V${activeRoutine.version} - ${error.message}`);
        }
      }
    }

    return data;
  }
}
