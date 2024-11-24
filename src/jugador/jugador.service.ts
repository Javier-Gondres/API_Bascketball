import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJugadorDto } from './dto/create-jugador.dto';
import { UpdateJugadorDto } from './dto/update-jugador.dto';
import { Repository } from 'typeorm';
import { Equipo } from 'src/equipo/entities/equipo.entity';
import { Ciudad } from 'src/ciudad/ciudad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Jugador } from './entities/jugador.entity';
import { CodeGenerator } from 'src/utils/codeGenerator/codeGenerator.utils';
import { EstadisticaJuego } from 'src/estadistica-juego/entities/estadistica-juego.entity';

@Injectable()
export class JugadorService {
  constructor(
    @InjectRepository(Ciudad)
    private ciudadRepository: Repository<Ciudad>,
    @InjectRepository(Equipo)
    private equiporRepository: Repository<Equipo>,
    @InjectRepository(Jugador)
    private jugadorRepository: Repository<Jugador>,
    @InjectRepository(EstadisticaJuego)
    private estadisticaJuegoRepository: Repository<EstadisticaJuego>,
  ) {}

  async findAll(): Promise<Jugador[]> {
    return this.jugadorRepository.find();
  }

  async findOne(codigo: string): Promise<Jugador> {
    const entidad = await this.jugadorRepository.findOne({
      where: { CodJugador: codigo },
    });

    if (!entidad) {
      throw new NotFoundException(
        `No se encontró el jugador con el codigo ${codigo}`,
      );
    }

    return entidad;
  }

  async create(data: Omit<CreateJugadorDto, 'CodJugador'>): Promise<Jugador> {
    const ciudad = await this.ciudadRepository.findOne({
      where: { CodCiudad: data.CiudadNacim },
    });
    if (!ciudad) {
      throw new NotFoundException(
        `Ciudad con código ${data.CiudadNacim} no encontrada`,
      );
    }

    const equipo = await this.equiporRepository.findOne({
      where: { CodEquipo: data.CodEquipo },
    });
    if (!equipo) {
      throw new NotFoundException(
        `Equipo con código ${data.CodEquipo} no encontrada`,
      );
    }

    const codigo = await CodeGenerator.generateUniqueCode<Jugador>(
      this.jugadorRepository,
      'CodJugador',
    );

    const newEntity = this.jugadorRepository.create({
      ...data,
      CodJugador: codigo,
    });

    return this.jugadorRepository.save(newEntity);
  }

  async update(codigo: string, data: UpdateJugadorDto): Promise<Jugador> {
    const jugador = await this.jugadorRepository.findOne({
      where: { CodJugador: codigo },
      relations: ['ciudad', 'equipo'],
    });

    if (!jugador) {
      throw new NotFoundException(`Jugador con código ${codigo} no encontrado`);
    }

    if (data.CiudadNacim) {
      const ciudad = await this.ciudadRepository.findOne({
        where: { CodCiudad: data.CiudadNacim },
      });
      if (!ciudad) {
        throw new NotFoundException(
          `Ciudad con código ${data.CiudadNacim} no encontrada`,
        );
      }
      jugador.ciudad = ciudad;
    }

    if (data.CodEquipo) {
      const equipo = await this.equiporRepository.findOne({
        where: { CodEquipo: data.CodEquipo },
      });
      if (!equipo) {
        throw new NotFoundException(
          `Equipo con código ${data.CodEquipo} no encontrada`,
        );
      }
      jugador.equipo = equipo;
    }

    Object.assign(jugador, data);

    const updatedEquipo = await this.jugadorRepository.save(jugador);

    return updatedEquipo;
  }

  async remove(codigo: string): Promise<void> {
    await this.estadisticaJuegoRepository.delete({ CodJuego: codigo });

    const result = await this.jugadorRepository.delete(codigo);
    if (result.affected === 0) {
      throw new NotFoundException(`Equipo con código ${codigo} no encontrado`);
    }
  }
}
