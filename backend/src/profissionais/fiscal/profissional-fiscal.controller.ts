import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Put,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { EmpresaGuard } from '../../auth/guards/empresa.guard';
import { ProfissionalScopeGuard } from '../../auth/guards/profissional-scope.guard';
import { ProfissionalFiscalService } from './profissional-fiscal.service';
import { UpsertProfissionalFiscalDto } from './dto/upsert-profissional-fiscal.dto';

const MAX_CERTIFICADO_SIZE = 10 * 1024 * 1024; // 10MB, de sobra para um .pfx

// Rotas de dados fiscais/NFS-e e certificado A1 do Analista (Profissional). "me" é
// autoatendimento (o próprio Analista ajusta seus dados); as rotas por :profissionalId
// servem gerente/administrador, sempre respeitando o profissionalScope já resolvido pelo
// ProfissionalScopeGuard (mesma regra usada em /profissionais). Por ser autoatendimento,
// não exige o menu 'profissionais-list' (esse é só para quem administra o cadastro geral).
@UseGuards(JwtAuthGuard, EmpresaGuard, ProfissionalScopeGuard)
@Controller('profissionais-fiscal')
export class ProfissionalFiscalController {
  constructor(private readonly service: ProfissionalFiscalService) {}

  private ownProfissionalIdOrThrow(req: any): number {
    if (!req.ownProfissionalId) {
      throw new NotFoundException(
        'Não há Profissional vinculado ao seu usuário.',
      );
    }
    return req.ownProfissionalId as number;
  }

  @Get('me')
  findMe(@Request() req: any) {
    const id = this.ownProfissionalIdOrThrow(req);
    return this.service.findByProfissionalId(
      id,
      req.empresaId,
      req.profissionalScope,
    );
  }

  @Put('me')
  updateMe(@Body() dto: UpsertProfissionalFiscalDto, @Request() req: any) {
    const id = this.ownProfissionalIdOrThrow(req);
    return this.service.upsert(id, dto, req.empresaId, req.profissionalScope);
  }

  @Post('me/certificado')
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: MAX_CERTIFICADO_SIZE } }),
  )
  uploadMeCertificado(
    @UploadedFile() file: Express.Multer.File,
    @Body('senha') senha: string,
    @Request() req: any,
  ) {
    const id = this.ownProfissionalIdOrThrow(req);
    return this.service.uploadCertificado(
      id,
      file,
      senha,
      req.empresaId,
      req.profissionalScope,
    );
  }

  @Delete('me/certificado')
  removeMeCertificado(@Request() req: any) {
    const id = this.ownProfissionalIdOrThrow(req);
    return this.service.removeCertificado(
      id,
      req.empresaId,
      req.profissionalScope,
    );
  }

  @Get(':profissionalId')
  findOne(
    @Param('profissionalId', ParseIntPipe) profissionalId: number,
    @Request() req: any,
  ) {
    return this.service.findByProfissionalId(
      profissionalId,
      req.empresaId,
      req.profissionalScope,
    );
  }

  @Put(':profissionalId')
  update(
    @Param('profissionalId', ParseIntPipe) profissionalId: number,
    @Body() dto: UpsertProfissionalFiscalDto,
    @Request() req: any,
  ) {
    return this.service.upsert(
      profissionalId,
      dto,
      req.empresaId,
      req.profissionalScope,
    );
  }

  @Post(':profissionalId/certificado')
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: MAX_CERTIFICADO_SIZE } }),
  )
  uploadCertificado(
    @Param('profissionalId', ParseIntPipe) profissionalId: number,
    @UploadedFile() file: Express.Multer.File,
    @Body('senha') senha: string,
    @Request() req: any,
  ) {
    if (!file)
      throw new BadRequestException('Envie o arquivo do certificado (.pfx).');
    return this.service.uploadCertificado(
      profissionalId,
      file,
      senha,
      req.empresaId,
      req.profissionalScope,
    );
  }

  @Delete(':profissionalId/certificado')
  removeCertificado(
    @Param('profissionalId', ParseIntPipe) profissionalId: number,
    @Request() req: any,
  ) {
    return this.service.removeCertificado(
      profissionalId,
      req.empresaId,
      req.profissionalScope,
    );
  }
}
