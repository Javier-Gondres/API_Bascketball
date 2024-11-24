import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { CreateCiudadDto } from './create-ciudad.dto';

export class UpdateCiudadDto extends PartialType(CreateCiudadDto) {
  @IsNotEmpty({ message: 'El Nombre de la ciudad no puede estar vacío' })
  @IsString({ message: 'El nombre debe ser un string' })
  @Length(1, 50, { message: 'El nombre debe tener entre 1 y 50 caracteres' })
  Nombre: string;
}
