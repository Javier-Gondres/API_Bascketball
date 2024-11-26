import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { JugadorService } from './jugador.service';
import { CreateJugadorDto } from './dto/create-jugador.dto';
import { UpdateJugadorDto } from './dto/update-jugador.dto';
import { SearchJugadorDto } from './dto/searchJugador.dto';

@Controller('jugador')
export class JugadorController {
  constructor(private readonly jugadorService: JugadorService) {}

  @Post()
  create(@Body() createJugadorDto: CreateJugadorDto) {
    return this.jugadorService.create(createJugadorDto);
  }

  @Get()
  findAll() {
    return this.jugadorService.findAll();
  }

  @Get('buscar')
  buscarJugadores(@Query() searchParams: SearchJugadorDto) {
    return this.jugadorService.buscarJugadores(searchParams);
  }

  @Get(':codigo')
  findOne(@Param('codigo') codigo: string) {
    return this.jugadorService.findOne(codigo);
  }

  @Patch(':codigo')
  update(
    @Param('codigo') codigo: string,
    @Body() updateJugadorDto: UpdateJugadorDto,
  ) {
    return this.jugadorService.update(codigo, updateJugadorDto);
  }

  @Delete(':codigo')
  async remove(@Param('codigo') codigo: string) {
    await this.jugadorService.remove(codigo);

    return { message: 'Se ha eliminado correctamente el jugador' };
  }
}
