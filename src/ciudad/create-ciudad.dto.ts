import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCiudadDto {
  @IsNotEmpty({ message: 'El nombre de la ciudad no puede estar vacío' })
  @IsString({ message: "El nombre debe ser un string" })
  @Length(1, 50, { message: 'El nombre debe tener entre 1 y 50 caracteres' })
  Nombre: string;
}
