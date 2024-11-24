import { Ciudad } from 'src/ciudad/ciudad.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('Equipo')
export class Equipo {
  @PrimaryColumn({ type: 'varchar', length: 5, nullable: false })
  CodEquipo: string;

  @Column({ length: 50, nullable: false })
  Nombre: string;

  @Column({ type: 'varchar', length: 5 })
  CodCiudad: string;

  @ManyToOne(() => Ciudad, (ciudad) => ciudad.equipos, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'CodCiudad' })
  ciudad: Ciudad;
}
