import { PickType } from '@nestjs/mapped-types';
import { CreateEstadisticaJuegoDto } from './create-estadistica-juego.dto';

export class UpdateEstadisticaJuegoDto extends PickType(
  CreateEstadisticaJuegoDto,
  ['Cantidad'],
) {}
