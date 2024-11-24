import { Module } from '@nestjs/common';
import { JuegoService } from './juego.service';
import { JuegoController } from './juego.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from 'src/equipo/entities/equipo.entity';
import { Juego } from './entities/juego.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Equipo, Juego])],
  controllers: [JuegoController],
  providers: [JuegoService],
})
export class JuegoModule {}
