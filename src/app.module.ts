import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CiudadModule } from './ciudad/ciudad.module';
import { Ciudad } from './ciudad/ciudad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipoModule } from './equipo/equipo.module';
import { JugadorModule } from './jugador/jugador.module';
import { JuegoModule } from './juego/juego.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'JavierAdmin',
      password: 'javier22',
      database: 'BasketballJEGD0001',
      options: {
        encrypt: false, // MSSQL-specific option
      },
      synchronize: false,
      entities: [Ciudad],
      autoLoadEntities: true,
    }),
    CiudadModule,
    EquipoModule,
    JugadorModule,
    JuegoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
