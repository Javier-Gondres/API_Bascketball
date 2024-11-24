import { Ciudad } from 'src/ciudad/ciudad.entity';
import { Juego } from 'src/juego/entities/juego.entity';
import { Jugador } from 'src/jugador/entities/jugador.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity('Equipo')
export class Equipo {
  @PrimaryColumn({ type: 'varchar', length: 5, nullable: false })
  CodEquipo: string;

  @Column({ length: 50, nullable: false })
  Nombre: string;

  @Column({ type: 'varchar', length: 5, nullable: false })
  CodCiudad: string;

  @ManyToOne(() => Ciudad, (ciudad) => ciudad.equipos, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'CodCiudad' })
  ciudad: Ciudad | null;

  @OneToMany(() => Jugador, (jugador) => jugador.equipo, {
    cascade: ['remove'],
  })
  jugadores: Jugador[];

  @OneToMany(() => Juego, (juego) => juego.Equipo1, {
    cascade: ['remove'],
  })
  juegosEquipo1: Juego[];

  @OneToMany(() => Juego, (juego) => juego.Equipo2, {
    cascade: ['remove'],
  })
  juegosEquipo2: Juego[];
}
