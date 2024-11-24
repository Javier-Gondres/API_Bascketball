import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateEstadisticaDto {
  @IsNotEmpty({ message: 'La descripcion no puede estar vacío' })
  @IsString({ message: 'La descripcion debe ser un string' })
  @Length(1, 100)
  Descripcion: string;

  @IsNotEmpty({ message: 'el valor no puede estar vacío' })
  @IsInt({ message: 'el valor debe ser un entero' })
  Valor: number;
}
