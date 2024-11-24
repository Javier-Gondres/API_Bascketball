import { EstadisticaJuego } from 'src/estadistica-juego/entities/estadistica-juego.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('Estadistica')
export class Estadistica {
  @PrimaryColumn({ type: 'varchar', length: 5, nullable: false })
  CodEstadistica: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  Descripcion: string;

  @Column({ type: 'int', nullable: false })
  Valor: number;

  @OneToMany(
    () => EstadisticaJuego,
    (estadisticasDeJuego) => estadisticasDeJuego.CodJugador,
    {
      cascade: ['remove'],
    },
  )
  estadisticasDeJuego: EstadisticaJuego[];
}
