import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';

@Controller('equipo')
export class EquipoController {
  constructor(private readonly equipoService: EquipoService) {}

  @Post()
  create(@Body() createEquipoDto: CreateEquipoDto) {
    return this.equipoService.create(createEquipoDto);
  }

  @Get()
  findAll() {
    return this.equipoService.findAll();
  }

  @Get(':codigo')
  findOne(@Param('codigo') codigo: string) {
    return this.equipoService.findOne(codigo);
  }

  @Patch(':codigo')
  update(
    @Param('codigo') codigo: string,
    @Body() updateEquipoDto: UpdateEquipoDto,
  ) {
    return this.equipoService.update(codigo, updateEquipoDto);
  }

  @Delete(':codigo')
  async remove(@Param('codigo') codigo: string) {
    await this.equipoService.remove(codigo);

    return { message: 'Se ha eliminado correctamente el equipo' };
  }
}
