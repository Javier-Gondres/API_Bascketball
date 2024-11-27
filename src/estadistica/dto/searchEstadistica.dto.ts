import { PartialType, PickType } from '@nestjs/mapped-types';
import { ArrayNotEmpty, IsArray, IsOptional } from 'class-validator';
import { CreateEstadisticaDto } from './create-estadistica.dto';

export class SearchEstadisticaDto extends PartialType(
  PickType(CreateEstadisticaDto, ['Valor', 'Descripcion']),
) {
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  estadisticasId?: string[];
}
