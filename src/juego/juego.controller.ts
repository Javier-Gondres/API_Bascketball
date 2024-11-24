import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JuegoService } from './juego.service';
import { CreateJuegoDto } from './dto/create-juego.dto';
import { UpdateJuegoDto } from './dto/update-juego.dto';

@Controller('juego')
export class JuegoController {
  constructor(private readonly juegoService: JuegoService) {}

  @Post()
  create(@Body() createJugadorDto: CreateJuegoDto) {
    return this.juegoService.create(createJugadorDto);
  }

  @Get()
  findAll() {
    return this.juegoService.findAll();
  }

  @Get(':codigo')
  findOne(@Param('codigo') codigo: string) {
    return this.juegoService.findOne(codigo);
  }

  @Patch(':codigo')
  update(
    @Param('codigo') codigo: string,
    @Body() updateJugadorDto: UpdateJuegoDto,
  ) {
    return this.juegoService.update(codigo, updateJugadorDto);
  }

  @Delete(':codigo')
  async remove(@Param('codigo') codigo: string) {
    await this.juegoService.remove(codigo);

    return { message: 'Se ha eliminado correctamente el juego' };
  }
}
