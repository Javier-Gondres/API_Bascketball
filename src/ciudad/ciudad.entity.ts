import { Equipo } from 'src/equipo/entities/equipo.entity';
import { Jugador } from 'src/jugador/entities/jugador.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('Ciudad')
export class Ciudad {
  @PrimaryColumn({ type: 'varchar', length: 5, nullable: false })
  CodCiudad: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  Nombre: string;

  @OneToMany(() => Equipo, (equipo) => equipo.ciudad, { cascade: ['remove'] })
  equipos: Equipo[];

  @OneToMany(() => Jugador, (jugador) => jugador.ciudad, { cascade: ['remove'] })
  jugadores: Jugador[];
}
