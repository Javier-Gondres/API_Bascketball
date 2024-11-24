import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateEstadisticaJuegoDto {
  @IsNotEmpty({ message: 'El codigo de la estadistica no puede estar vacío' })
  @IsString({ message: 'El codigo debe ser un string' })
  @Length(1, 5)
  CodEstadistica: string;

  @IsNotEmpty({ message: 'El codigo del juego no puede estar vacío' })
  @IsString({ message: 'El codigo debe ser un string' })
  @Length(1, 5)
  CodJuego: string;

  @IsNotEmpty({ message: 'El codigo del juador no puede estar vacío' })
  @IsString({ message: 'El codigo debe ser un string' })
  @Length(1, 5)
  CodJugador: string;

  @IsNotEmpty({ message: 'Cantidad no puede estar vacío' })
  @IsInt({ message: 'debe ser un entero' })
  Cantidad: number;
}
