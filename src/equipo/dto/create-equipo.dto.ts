import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateEquipoDto {
  @IsNotEmpty({ message: 'El Nombre de la ciudad no puede estar vacío' })
  @IsString({ message: 'El nombre debe ser un string' })
  @Length(1, 50)
  Nombre: string;

  @IsNotEmpty({ message: 'El codigo de la ciudad no puede estar vacío' })
  @IsString({ message: 'El codigo debe ser un string' })
  @Length(1, 5)
  CodCiudad: string;
}
