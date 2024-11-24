import { Equipo } from 'src/equipo/entities/equipo.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('Ciudad')
export class Ciudad {
  @PrimaryColumn({ type: 'varchar', length: 5, nullable: false })
  CodCiudad: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  Nombre: string;

  @OneToMany(() => Equipo, (equipo) => equipo.ciudad, { cascade: true })
  equipos: Equipo[];
}
