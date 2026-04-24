import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 1. Configuração do Swagger (Documentação)
  const config = new DocumentBuilder()
    .setTitle('Seu SaaS - API Portal')
    .setDescription('Portal de documentação para integração de sistemas externos.')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'x-api-key')
    .addTag('Tenants', 'Gestão de Clientes e Assinaturas')
    .addTag('Products', 'Gestão de Produtos e Estoque')
    .addTag('Public', 'Informações Públicas de Branding')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // 2. Servir arquivos estáticos (Uploads)
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  // 3. CORS e Segurança
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
