import { Module } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CiudadController } from './ciudad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from './ciudad.entity';
import { Equipo } from 'src/equipo/entities/equipo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ciudad, Equipo])],
  providers: [CiudadService],
  controllers: [CiudadController]
})
export class CiudadModule {}
