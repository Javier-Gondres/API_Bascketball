import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudad } from 'src/ciudad/ciudad.entity';
import { Equipo } from './entities/equipo.entity';
import { Repository } from 'typeorm';
import { CodeGenerator } from 'src/utils/codeGenerator/codeGenerator.utils';
import { Juego } from 'src/juego/entities/juego.entity';

@Injectable()
export class EquipoService {
  constructor(
    @InjectRepository(Ciudad)
    private ciudadRepository: Repository<Ciudad>,
    @InjectRepository(Equipo)
    private equipoRepository: Repository<Equipo>,
    @InjectRepository(Juego)
    private juegoRepository: Repository<Juego>,
  ) {}

  async findAll(): Promise<Equipo[]> {
    return this.equipoRepository.find();
  }

  async findOne(codigo: string): Promise<Equipo> {
    const entidad = await this.equipoRepository.findOne({
      where: { CodEquipo: codigo },
    });

    if (!entidad) {
      throw new NotFoundException(
        `No se encontró el equipo con el codigo ${codigo}`,
      );
    }

    return entidad;
  }

  async create(data: Omit<CreateEquipoDto, 'CodEquipo'>): Promise<Equipo> {
    const ciudad = await this.ciudadRepository.findOne({
      where: { CodCiudad: data.CodCiudad },
    });
    if (!ciudad) {
      throw new NotFoundException(
        `Ciudad con código ${data.CodCiudad} no encontrada`,
      );
    }

    const codigo = await CodeGenerator.generateUniqueCode<Equipo>(
      this.equipoRepository,
      'CodEquipo',
    );
    const newEntity = this.equipoRepository.create({
      ...data,
      CodEquipo: codigo,
    });
    return this.equipoRepository.save(newEntity);
  }

  async update(codigo: string, data: UpdateEquipoDto): Promise<Equipo> {
    console.log({ codigo, data });

    const equipo = await this.equipoRepository.findOne({
      where: { CodEquipo: codigo },
      relations: ['ciudad'],
    });

    if (!equipo) {
      throw new NotFoundException(`Equipo con código ${codigo} no encontrado`);
    }

    if (data.CodCiudad) {
      const ciudad = await this.ciudadRepository.findOne({
        where: { CodCiudad: data.CodCiudad },
      });
      if (!ciudad) {
        throw new NotFoundException(
          `Ciudad con código ${data.CodCiudad} no encontrada`,
        );
      }
      equipo.ciudad = ciudad;
    }

    Object.assign(equipo, data);

    const updatedEquipo = await this.equipoRepository.save(equipo);

    return updatedEquipo;
  }
  async remove(codigo: string): Promise<void> {
    await this.juegoRepository.delete({ Equipo1: codigo });

    await this.juegoRepository.delete({ Equipo2: codigo });

    const result = await this.equipoRepository.delete(codigo);
    if (result.affected === 0) {
      throw new NotFoundException(`Equipo con código ${codigo} no encontrado`);
    }
  }
}
