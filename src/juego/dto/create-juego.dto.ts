import { IsDate, IsNotEmpty, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateJuegoDto {
  @IsNotEmpty({ message: 'La descripcion de la ciudad no puede estar vacío' })
  @IsString({ message: 'La descripcion debe ser un string' })
  @Length(1, 50)
  Descripcion: string;

  @IsNotEmpty({ message: 'El codigo del Equipo1 no puede estar vacío' })
  @IsString({ message: 'El codigo debe ser un string' })
  @Length(1, 5)
  Equipo1: string;

  @IsNotEmpty({ message: 'El codigo del Equipo2 no puede estar vacío' })
  @IsString({ message: 'El codigo debe ser un string' })
  @Length(1, 5)
  Equipo2: string;

  @IsDate({ message: 'La fecha debe ser una fecha valida' })
  @Transform(
    ({ value }) => {
      return new Date(value);
    },
    { toClassOnly: false },
  )
  Fecha: Date;
}
