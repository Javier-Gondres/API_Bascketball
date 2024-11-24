import { Controller, Get, Post, Param, Delete, Put, Body } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { Ciudad } from './ciudad.entity';
import { CiudadDto } from './ciudad.dto';

@Controller('ciudad')
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

  @Get()
  findAll(): Promise<Ciudad[]> {
    return this.ciudadService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') CodCiudad: string): Promise<Ciudad> {
    return this.ciudadService.findOne(CodCiudad);
  }

  @Post()
  create(@Body() ciudadData: CiudadDto): Promise<Ciudad> {
    return this.ciudadService.create(ciudadData);
  }

  @Put('/:id')
  update(@Param('id') CodCiudad: string, @Body() ciudadData: CiudadDto): Promise<Ciudad> {
    return this.ciudadService.update(CodCiudad, ciudadData);
  }

  @Delete('/:id')
  remove(@Param('id') CodCiudad: string): Promise<void> {
    return this.ciudadService.remove(CodCiudad);
  }
}
