import { Module } from '@nestjs/common';
import { EstadisticaService } from './estadistica.service';
import { EstadisticaController } from './estadistica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estadistica } from './entities/estadistica.entity';
import { EstadisticaJuego } from 'src/estadistica-juego/entities/estadistica-juego.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estadistica, EstadisticaJuego])],
  controllers: [EstadisticaController],
  providers: [EstadisticaService],
})
export class EstadisticaModule {}
