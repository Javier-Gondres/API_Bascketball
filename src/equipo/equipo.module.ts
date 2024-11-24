import { Module } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { EquipoController } from './equipo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from './entities/equipo.entity';
import { Ciudad } from 'src/ciudad/ciudad.entity';
import { Juego } from 'src/juego/entities/juego.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Equipo, Ciudad, Juego])],
  controllers: [EquipoController],
  providers: [EquipoService],
})
export class EquipoModule {}
