import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EstadisticaJuegoService } from './estadistica-juego.service';
import { CreateEstadisticaJuegoDto } from './dto/create-estadistica-juego.dto';
import { UpdateEstadisticaJuegoDto } from './dto/update-estadistica-juego.dto';
import { EstadisticaJuego } from './entities/estadistica-juego.entity';

@Controller('estadistica-juego')
export class EstadisticaJuegoController {
  constructor(
    private readonly estadisticaJuegoService: EstadisticaJuegoService,
  ) {}
  @Post()
  create(@Body() createJugadorDto: CreateEstadisticaJuegoDto) {
    return this.estadisticaJuegoService.create(createJugadorDto);
  }

  @Get()
  findAll() {
    return this.estadisticaJuegoService.findAll();
  }

  @Get(':codigoJuego/:codigoEstadistica/:codigoJugador')
  async findOne(
    @Param('codigoJuego') codigoJuego: string,
    @Param('codigoEstadistica') codigoEstadistica: string,
    @Param('codigoJugador') codigoJugador: string,
  ): Promise<EstadisticaJuego> {
    return this.estadisticaJuegoService.findOne(
      codigoJuego,
      codigoEstadistica,
      codigoJugador,
    );
  }

  @Patch(':codigoJuego/:codigoEstadistica/:codigoJugador')
  update(
    @Param('codigoJuego') codigoJuego: string,
    @Param('codigoEstadistica') codigoEstadistica: string,
    @Param('codigoJugador') codigoJugador: string,
    @Body() updateJugadorDto: UpdateEstadisticaJuegoDto,
  ) {
    return this.estadisticaJuegoService.update(
      codigoJuego,
      codigoEstadistica,
      codigoJugador,
      updateJugadorDto,
    );
  }

  @Delete(':codigoJuego/:codigoEstadistica/:codigoJugador')
  async remove(
    @Param('codigoJuego') codigoJuego: string,
    @Param('codigoEstadistica') codigoEstadistica: string,
    @Param('codigoJugador') codigoJugador: string,
  ) {
    await this.estadisticaJuegoService.remove(
      codigoJuego,
      codigoEstadistica,
      codigoJugador,
    );

    return { message: 'Se ha eliminado correctamente la estadistica de juego' };
  }
}
