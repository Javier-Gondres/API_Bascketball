import { Module } from '@nestjs/common';
import { JugadorService } from './jugador.service';
import { JugadorController } from './jugador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from 'src/equipo/entities/equipo.entity';
import { Ciudad } from 'src/ciudad/ciudad.entity';
import { Jugador } from './entities/jugador.entity';
import { EstadisticaJuego } from 'src/estadistica-juego/entities/estadistica-juego.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Equipo, Ciudad, Jugador, EstadisticaJuego])],
  controllers: [JugadorController],
  providers: [JugadorService],
})
export class JugadorModule {}
