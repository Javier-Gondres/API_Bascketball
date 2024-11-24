import { Module } from '@nestjs/common';
import { EstadisticaJuegoService } from './estadistica-juego.service';
import { EstadisticaJuegoController } from './estadistica-juego.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Juego } from 'src/juego/entities/juego.entity';
import { Jugador } from 'src/jugador/entities/jugador.entity';
import { Estadistica } from 'src/estadistica/entities/estadistica.entity';
import { EstadisticaJuego } from './entities/estadistica-juego.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Juego, Jugador, Estadistica, EstadisticaJuego])],
  controllers: [EstadisticaJuegoController],
  providers: [EstadisticaJuegoService],
})
export class EstadisticaJuegoModule {}
