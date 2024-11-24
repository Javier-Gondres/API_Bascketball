import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Estadistica')
export class Estadistica {
  @PrimaryColumn({ type: 'varchar', length: 5, nullable: false })
  CodEstadistica: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  Descripcion: string;

  @Column({ type: 'int', nullable: false })
  Valor: number;
}
