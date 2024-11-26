import { PartialType } from '@nestjs/mapped-types';
import { CreateJugadorDto } from './create-jugador.dto';

export class SearchJugadorDto extends PartialType(CreateJugadorDto) {}
