import { Module } from '@nestjs/common';
import { JuegoService } from './juego.service';
import { JuegoController } from './juego.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from 'src/equipo/entities/equipo.entity';
import { Juego } from './entities/juego.entity';
import { EstadisticaJuego } from 'src/estadistica-juego/entities/estadistica-juego.entity';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [TypeOrmModule.forFeature([Equipo, Juego, EstadisticaJuego])],
  controllers: [JuegoController],
  providers: [JuegoService, DatabaseService],
})
export class JuegoModule {}
