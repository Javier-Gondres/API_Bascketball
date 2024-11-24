import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EstadisticaService } from './estadistica.service';
import { CreateEstadisticaDto } from './dto/create-estadistica.dto';
import { UpdateEstadisticaDto } from './dto/update-estadistica.dto';

@Controller('estadistica')
export class EstadisticaController {
  constructor(private readonly estadisticaService: EstadisticaService) {}

  @Post()
  create(@Body() createJugadorDto: CreateEstadisticaDto) {
    return this.estadisticaService.create(createJugadorDto);
  }

  @Get()
  findAll() {
    return this.estadisticaService.findAll();
  }

  @Get(':codigo')
  findOne(@Param('codigo') codigo: string) {
    return this.estadisticaService.findOne(codigo);
  }

  @Patch(':codigo')
  update(
    @Param('codigo') codigo: string,
    @Body() updateJugadorDto: UpdateEstadisticaDto,
  ) {
    return this.estadisticaService.update(codigo, updateJugadorDto);
  }

  @Delete(':codigo')
  async remove(@Param('codigo') codigo: string) {
    await this.estadisticaService.remove(codigo);

    return { message: 'Se ha eliminado correctamente la estadistica' };
  }
}
