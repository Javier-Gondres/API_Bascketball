import { Estadistica } from 'src/estadistica/entities/estadistica.entity';
import { Juego } from 'src/juego/entities/juego.entity';
import { Jugador } from 'src/jugador/entities/jugador.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('EstadisticaJuego')
export class EstadisticaJuego {
  @PrimaryColumn({ type: 'varchar', length: 5, nullable: false })
  CodEstadistica: string;

  @PrimaryColumn({ type: 'varchar', length: 5, nullable: false })
  CodJuego: string;

  @PrimaryColumn({ type: 'varchar', length: 5, nullable: false })
  CodJugador: string;

  @Column({ type: 'int', nullable: false })
  Cantidad: number;

  @ManyToOne(() => Jugador, (jugador) => jugador.estadisticasDeJuego, {
    nullable: false,
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'CodJugador' })
  jugador: Jugador;

  @ManyToOne(() => Juego, (juego) => juego.estadisticasDeJuego, {
    nullable: false,
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'CodJuego' })
  juego: Juego;

  @ManyToOne(
    () => Estadistica,
    (estadistica) => estadistica.estadisticasDeJuego,
    {
      nullable: false,
      onDelete: 'NO ACTION',
    },
  )
  @JoinColumn({ name: 'CodEstadistica' })
  estadistica: Estadistica;
}
