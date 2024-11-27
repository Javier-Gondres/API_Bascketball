import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateJugadorDto } from './create-jugador.dto';
import { ArrayNotEmpty, IsArray, IsOptional } from 'class-validator';

export class SearchJugadorDto extends PartialType(
  PickType(CreateJugadorDto, [
    'Apellido1',
    'Apellido2',
    'Nombre1',
    'Nombre2',
    'Numero',
    'FechaNacim',
  ]),
) {
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  ciudadesId?: string[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  equiposId?: string[];
}
