import { IsNotEmpty, IsString } from "class-validator";

export class CreateCiudadDto {
  @IsNotEmpty({ message: 'El Nombre de la ciudad no puede estar vacío' })
  @IsString({message: "El nombre debe ser un string"})
  Nombre: string;
}