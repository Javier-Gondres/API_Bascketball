import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateJugadorDto } from './dto/create-jugador.dto';
import { UpdateJugadorDto } from './dto/update-jugador.dto';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Equipo } from 'src/equipo/entities/equipo.entity';
import { Ciudad } from 'src/ciudad/ciudad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Jugador } from './entities/jugador.entity';
import { CodeGenerator } from 'src/utils/codeGenerator/codeGenerator.utils';
import { EstadisticaJuego } from 'src/estadistica-juego/entities/estadistica-juego.entity';
import { SearchJugadorDto } from './dto/searchJugador.dto';

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
    return this.jugadorRepository.find({ relations: ['equipo'] });
  }

  async findOne(codigo: string): Promise<Jugador> {
    const entidad = await this.jugadorRepository.findOne({
      where: { CodJugador: codigo },
      relations: ['equipo'],
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
    } else {
      jugador.ciudad = null;
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
    } else {
      jugador.equipo = null;
    }

    Object.assign(jugador, data);

    const updatedEquipo = await this.jugadorRepository.save(jugador);

    return updatedEquipo;
  }

  async remove(codigo: string): Promise<void> {
    await this.estadisticaJuegoRepository.delete({ CodJugador: codigo });

    const result = await this.jugadorRepository.delete(codigo);
    if (result.affected === 0) {
      throw new NotFoundException(`Equipo con código ${codigo} no encontrado`);
    }
  }

  async buscarJugadores(searchParams: SearchJugadorDto): Promise<Jugador[]> {
    const {
      Apellido1,
      Apellido2,
      FechaNacim,
      Nombre1,
      Nombre2,
      Numero,
      ciudadesId,
      equiposId,
    } = searchParams;

    if (
      !Apellido1 &&
      !Apellido2 &&
      !ciudadesId &&
      !equiposId &&
      !FechaNacim &&
      !Nombre1 &&
      !Nombre2 &&
      !Numero
    ) {
      throw new BadRequestException(
        'Debe proporcionar al menos un criterio de búsqueda',
      );
    }

    const resultados = await this.executeQuery((qb) => {
      qb = qb.leftJoinAndSelect('jugador.equipo', 'equipo');
      qb = qb.leftJoinAndSelect('jugador.ciudad', 'ciudad');

      if (Apellido1) {
        qb = qb.where('jugador.Apellido1 = :Apellido1', { Apellido1 });
      }
      if (Apellido2) {
        qb = qb.andWhere('jugador.Apellido2 = :Apellido2', { Apellido2 });
      }
      if (ciudadesId) {
        qb = qb.andWhere('jugador.CiudadNacim IN (:...ciudadesId)', {
          ciudadesId,
        });
      }
      if (Nombre1) {
        qb = qb.andWhere('jugador.Nombre1 = :Nombre1', { Nombre1 });
      }
      if (Nombre2) {
        qb = qb.andWhere('jugador.Nombre2 = :Nombre2', { Nombre2 });
      }
      if (equiposId) {
        qb = qb.andWhere('jugador.CodEquipo IN (:...equiposId)', {
          equiposId,
        });
      }
      if (FechaNacim) {
        qb = qb.andWhere('jugador.FechaNacim = :FechaNacim', { FechaNacim });
      }
      if (Numero) {
        qb = qb.andWhere('jugador.Numero = :Numero', { Numero });
      }

      return qb;
    });

    return resultados;
  }

  private async executeQuery(
    queryBuilderFn: (
      qb: SelectQueryBuilder<Jugador>,
    ) => SelectQueryBuilder<Jugador>,
  ): Promise<Jugador[]> {
    const qb = this.jugadorRepository.createQueryBuilder('jugador');
    const customizedQb = queryBuilderFn(qb);
    return await customizedQb.getMany();
  }
}
