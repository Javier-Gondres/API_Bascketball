import { Module } from '@nestjs/common';
import { EstadisticaService } from './estadistica.service';
import { EstadisticaController } from './estadistica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estadistica } from './entities/estadistica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estadistica])],
  controllers: [EstadisticaController],
  providers: [EstadisticaService],
})
export class EstadisticaModule {}
