import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
  Body,
} from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { Ciudad } from './ciudad.entity';
import { CreateCiudadDto } from './create-ciudad.dto';
import { UpdateCiudadDto } from './update-ciudad.dto';

@Controller('ciudad')
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

  @Get()
  findAll(): Promise<Ciudad[]> {
    return this.ciudadService.findAll();
  }

  @Get(':CodCiudad')
  findOne(@Param('CodCiudad') CodCiudad: string): Promise<Ciudad> {
    return this.ciudadService.findOne(CodCiudad);
  }

  @Post()
  create(@Body() ciudadData: CreateCiudadDto): Promise<Ciudad> {
    return this.ciudadService.create({
      ...ciudadData,
      equipos: [],
      jugadores: [],
    });
  }

  @Put(':CodCiudad')
  update(
    @Param('CodCiudad') CodCiudad: string,
    @Body() ciudadData: UpdateCiudadDto,
  ): Promise<Ciudad> {
    return this.ciudadService.update(CodCiudad, ciudadData);
  }

  @Delete(':CodCiudad')
  async remove(
    @Param('CodCiudad') CodCiudad: string,
  ): Promise<{ message: string }> {
    await this.ciudadService.remove(CodCiudad);

    return { message: 'Se ha eliminado correctamente la ciudad' };
  }
}
