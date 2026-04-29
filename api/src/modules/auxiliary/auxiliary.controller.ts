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
  async getCountries(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
    @Query('filter') filter?: string
  ) {
    return this.auxiliaryService.findAllCountries(Number(page) || 1, Number(pageSize) || 10, filter);
  }

  @Get('states')
  async getStates(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
    @Query('filter') filter?: string
  ) {
    return this.auxiliaryService.findAllStates(Number(page) || 1, Number(pageSize) || 10, filter);
  }

  @Get('cities')
  async getCities(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
    @Query('filter') filter?: string,
    @Query('stateId') stateId?: string
  ) {
    return this.auxiliaryService.findAllCities(Number(page) || 1, Number(pageSize) || 10, filter, stateId);
  }

  @Get('cnaes')
  async getCnaes(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
    @Query('filter') filter?: string
  ) {
    return this.auxiliaryService.findAllCnaes(Number(page) || 1, Number(pageSize) || 10, filter);
  }
}
