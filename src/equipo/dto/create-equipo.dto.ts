import {
  IsDefined,
  IsNotEmpty,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';

export class CreateEquipoDto {
  @IsNotEmpty({ message: 'El Nombre de la ciudad no puede estar vacío' })
  @IsString({ message: 'El nombre debe ser un string' })
  @Length(1, 50)
  Nombre: string;

  @IsDefined({ message: 'El código de la ciudad no puede ser undefined' })
  @ValidateIf((o) => o.CodCiudad !== null)
  @IsString({ message: 'El código de la ciudad debe ser una cadena de texto' })
  @Length(1, 5, { message: 'El código debe tener entre 1 y 5 caracteres' })
  CodCiudad: string | null;
}
