import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuxiliaryService } from './auxiliary.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Auxiliary (IBGE / Fiscal)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('auxiliary')
export class AuxiliaryController {
  constructor(private readonly auxiliaryService: AuxiliaryService) {}

  @Get('cep/:code')
  @ApiOperation({ summary: 'Consultar CEP (Local + ViaCEP)' })
  async getCep(@Param('code') code: string) {
    return this.auxiliaryService.findCep(code);
  }

  @Get('countries')
  async getCountries() {
    return this.auxiliaryService.findAllCountries();
  }

  @Get('states')
  async getStates() {
    return this.auxiliaryService.findAllStates();
  }

  @Get('cities')
  async getCities(@Query('stateId') stateId: string) {
    return this.auxiliaryService.findAllCities(stateId);
  }

  @Get('cnaes')
  async getCnaes() {
    return this.auxiliaryService.findAllCnaes();
  }
}
