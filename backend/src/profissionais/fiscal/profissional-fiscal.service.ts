import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as forge from 'node-forge';
import { PrismaService } from '../../prisma/prisma.service';
import { UpsertProfissionalFiscalDto } from './dto/upsert-profissional-fiscal.dto';
import {
  decryptBuffer,
  decryptText,
  encryptBuffer,
  encryptText,
} from '../../common/crypto/secret-encryption.util';

// Campos nunca devolvidos pela API: são segredos (arquivo do certificado e senha), só servem
// para a futura assinatura da NFS-e, não para leitura/exibição.
const SAFE_SELECT = {
  id: true,
  profissionalId: true,
  cnpj: true,
  razaoSocial: true,
  nomeFantasia: true,
  inscricaoMunicipal: true,
  regimeTributario: true,
  optanteSimplesNacional: true,
  cnae: true,
  codigoServico: true,
  aliquotaIss: true,
  cep: true,
  logradouro: true,
  numero: true,
  complemento: true,
  bairro: true,
  municipioId: true,
  municipio: { select: { id: true, nome: true, estadoId: true } },
  estadoId: true,
  estado: { select: { id: true, nome: true, sigla: true } },
  emailNfse: true,
  telefoneNfse: true,
  certificadoNomeArquivo: true,
  certificadoValidade: true,
  certificadoAtualizadoEm: true,
  criadoEm: true,
  atualizadoEm: true,
} as const;

@Injectable()
export class ProfissionalFiscalService {
  constructor(private prisma: PrismaService) {}

  private async assertProfissionalNoEscopo(
    profissionalId: number,
    empresaId: number,
    profissionalScope?: number[] | null,
  ) {
    const profissional = await this.prisma.profissional.findFirst({
      where: { id: profissionalId, empresaId },
    });
    if (!profissional)
      throw new NotFoundException('Profissional não encontrado.');
    if (profissionalScope && !profissionalScope.includes(profissionalId)) {
      throw new NotFoundException('Profissional não encontrado.');
    }
    return profissional;
  }

  async findByProfissionalId(
    profissionalId: number,
    empresaId: number,
    profissionalScope?: number[] | null,
  ) {
    await this.assertProfissionalNoEscopo(
      profissionalId,
      empresaId,
      profissionalScope,
    );
    const dados = await this.prisma.profissionalFiscal.findUnique({
      where: { profissionalId },
      select: SAFE_SELECT,
    });
    return (
      dados ?? {
        profissionalId,
        certificadoNomeArquivo: null,
        certificadoValidade: null,
      }
    );
  }

  async upsert(
    profissionalId: number,
    dto: UpsertProfissionalFiscalDto,
    empresaId: number,
    profissionalScope?: number[] | null,
  ) {
    await this.assertProfissionalNoEscopo(
      profissionalId,
      empresaId,
      profissionalScope,
    );
    await this.prisma.profissionalFiscal.upsert({
      where: { profissionalId },
      update: { ...dto },
      create: { ...dto, profissionalId },
    });
    return this.findByProfissionalId(
      profissionalId,
      empresaId,
      profissionalScope,
    );
  }

  async uploadCertificado(
    profissionalId: number,
    file: Express.Multer.File,
    senha: string,
    empresaId: number,
    profissionalScope?: number[] | null,
  ) {
    await this.assertProfissionalNoEscopo(
      profissionalId,
      empresaId,
      profissionalScope,
    );
    if (!file)
      throw new BadRequestException('Envie o arquivo do certificado (.pfx).');
    if (!senha)
      throw new BadRequestException('Informe a senha do certificado.');

    const validade = this.validarCertificado(file.buffer, senha);

    await this.prisma.profissionalFiscal.upsert({
      where: { profissionalId },
      update: {
        certificadoArquivo: encryptBuffer(file.buffer),
        certificadoSenha: encryptText(senha),
        certificadoNomeArquivo: file.originalname,
        certificadoValidade: validade,
        certificadoAtualizadoEm: new Date(),
      },
      create: {
        profissionalId,
        certificadoArquivo: encryptBuffer(file.buffer),
        certificadoSenha: encryptText(senha),
        certificadoNomeArquivo: file.originalname,
        certificadoValidade: validade,
        certificadoAtualizadoEm: new Date(),
      },
    });

    return this.findByProfissionalId(
      profissionalId,
      empresaId,
      profissionalScope,
    );
  }

  async removeCertificado(
    profissionalId: number,
    empresaId: number,
    profissionalScope?: number[] | null,
  ) {
    await this.assertProfissionalNoEscopo(
      profissionalId,
      empresaId,
      profissionalScope,
    );
    const existente = await this.prisma.profissionalFiscal.findUnique({
      where: { profissionalId },
    });
    if (existente) {
      await this.prisma.profissionalFiscal.update({
        where: { profissionalId },
        data: {
          certificadoArquivo: null,
          certificadoSenha: null,
          certificadoNomeArquivo: null,
          certificadoValidade: null,
          certificadoAtualizadoEm: null,
        },
      });
    }
    return this.findByProfissionalId(
      profissionalId,
      empresaId,
      profissionalScope,
    );
  }

  /** Valida a senha do .pfx abrindo-o com node-forge e devolve a data de validade do certificado. */
  private validarCertificado(buffer: Buffer, senha: string): Date {
    let p12: forge.pkcs12.Pkcs12Pfx;
    try {
      const der = forge.util.createBuffer(buffer.toString('binary'));
      const asn1 = forge.asn1.fromDer(der);
      p12 = forge.pkcs12.pkcs12FromAsn1(asn1, senha);
    } catch {
      throw new BadRequestException(
        'Não foi possível abrir o certificado: arquivo inválido ou senha incorreta.',
      );
    }

    const certBags =
      p12.getBags({ bagType: forge.pki.oids.certBag })[
        forge.pki.oids.certBag
      ] || [];
    const certificado = certBags.find((bag) => bag.cert)?.cert;
    if (!certificado) {
      throw new BadRequestException(
        'O arquivo enviado não contém um certificado válido.',
      );
    }

    const validade = certificado.validity.notAfter;
    if (validade.getTime() < Date.now()) {
      throw new BadRequestException(
        `Certificado vencido em ${validade.toLocaleDateString('pt-BR')}.`,
      );
    }
    return validade;
  }

  /** Uso interno futuro (emissão da NFS-e): devolve o .pfx e a senha decriptados. */
  async obterCertificadoDecriptado(profissionalId: number) {
    const registro = await this.prisma.profissionalFiscal.findUnique({
      where: { profissionalId },
    });
    if (!registro?.certificadoArquivo || !registro.certificadoSenha)
      return null;
    return {
      arquivo: decryptBuffer(Buffer.from(registro.certificadoArquivo)),
      senha: decryptText(Buffer.from(registro.certificadoSenha)),
    };
  }
}
