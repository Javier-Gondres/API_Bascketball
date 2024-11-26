import { Ciudad } from 'src/ciudad/ciudad.entity';
import { Equipo } from 'src/equipo/entities/equipo.entity';
import { EstadisticaJuego } from 'src/estadistica-juego/entities/estadistica-juego.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity('Jugador')
export class Jugador {
  @PrimaryColumn({ type: 'varchar', length: 5, nullable: false })
  CodJugador: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  Nombre1: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  Nombre2: string | null;

  @Column({ type: 'varchar', length: 50, nullable: false })
  Apellido1: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  Apellido2: string | null;

  @Column({ type: 'varchar', length: 5, nullable: true })
  CiudadNacim: string | null;

  @Column({ type: 'date', nullable: false })
  FechaNacim: Date;

  @Column({ type: 'nchar', length: 2, nullable: false })
  Numero: string;

  @Column({ type: 'varchar', length: 5, nullable: false })
  CodEquipo: string;

  @ManyToOne(() => Ciudad, (ciudad) => ciudad.jugadores, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'CiudadNacim' })
  ciudad: Ciudad | null;

  @ManyToOne(() => Equipo, (equipo) => equipo.jugadores, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'CodEquipo' })
  equipo: Equipo | null;

  @OneToMany(
    () => EstadisticaJuego,
    (estadisticasDeJuego) => estadisticasDeJuego.CodJugador,
    {
      cascade: ['remove'],
    },
  )
  estadisticasDeJuego: EstadisticaJuego[];
}
