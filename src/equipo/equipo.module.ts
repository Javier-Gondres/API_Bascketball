import { Module } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { EquipoController } from './equipo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from './entities/equipo.entity';
import { Ciudad } from 'src/ciudad/ciudad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Equipo, Ciudad])],
  controllers: [EquipoController],
  providers: [EquipoService],
})
export class EquipoModule {}
