import { Equipo } from 'src/equipo/entities/equipo.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('Juego')
export class Juego {
  @PrimaryColumn({ type: 'varchar', length: 5, nullable: false })
  CodJuego: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  Descripcion: string;

  @Column({ type: 'varchar', length: 5, nullable: false })
  Equipo1: string;

  @Column({ type: 'varchar', length: 5, nullable: false })
  Equipo2: string;

  @Column({ type: 'date', nullable: false })
  Fecha: Date;

  @ManyToOne(() => Equipo, (equipo) => equipo.juegosEquipo1, {
    nullable: false,
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'Equipo1' })
  Equipo1Entity: Equipo;

  @ManyToOne(() => Equipo, (equipo) => equipo.juegosEquipo2, {
    nullable: false,
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'Equipo2' })
  Equipo2Entity: Equipo;
}
