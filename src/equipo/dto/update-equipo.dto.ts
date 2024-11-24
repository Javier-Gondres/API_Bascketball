import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipoDto } from './create-equipo.dto';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateEquipoDto extends PartialType(CreateEquipoDto) {
  @IsNotEmpty({ message: 'El Nombre de la ciudad no puede estar vacío' })
  @IsString({ message: 'El nombre debe ser un string' })
  @Length(1, 50)
  Nombre: string;

  @IsNotEmpty({ message: 'El codigo de la ciudad no puede estar vacío' })
  @IsString({ message: 'El codigo debe ser un string' })
  @Length(1, 5)
  CodCiudad: string;
}
