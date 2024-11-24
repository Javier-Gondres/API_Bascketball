import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Ciudad')
export class Ciudad {
  @PrimaryColumn({ type: 'nchar', length: 5 })
  CodCiudad: string;

  @Column({ length: 100, nullable: false })
  Nombre: string;
}
