import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateJugadorDto {
  @IsNotEmpty({ message: 'El Nombre1 del jugador no puede estar vacío' })
  @IsString({ message: 'El nombre1 debe ser un string' })
  @Length(1, 50)
  Nombre1: string;

  @IsOptional()
  @IsString({ message: 'El nombre2 debe ser un string' })
  @Length(1, 50)
  Nombre2: string | null;

  @IsNotEmpty({ message: 'El apellido1 de la ciudad no puede estar vacío' })
  @IsString({ message: 'El apellido1 debe ser un string' })
  @Length(1, 50)
  Apellido1: string;

  @IsOptional()
  @IsString({ message: 'El apellido2 debe ser un string' })
  @Length(1, 50)
  Apellido2: string | null;

  @IsNotEmpty({ message: 'El codigo de la ciudad no puede estar vacío' })
  @IsString({ message: 'El codigo debe ser un string' })
  @Length(1, 5)
  CiudadNacim: string;

  @IsNotEmpty({ message: 'El codigo del equipo no puede estar vacío' })
  @IsString({ message: 'El codigo debe ser un string' })
  @Length(1, 5)
  CodEquipo: string;

  @IsDate({ message: 'La fecha de nacimiento debe ser una fecha valida' })
  @Type(() => Date)
  FechaNacim: Date;

  @IsNotEmpty({ message: 'El numero de la ciudad no puede estar vacío' })
  @IsString({ message: 'El numero debe ser un string' })
  @Length(2, 2)
  Numero: string;
}
