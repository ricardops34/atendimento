import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuDto, CreateMenuRoutineLinkDto } from './create-menu.dto';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {}
export class UpdateMenuRoutineLinkDto extends PartialType(CreateMenuRoutineLinkDto) {}
