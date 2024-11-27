import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstadisticaDto } from './dto/create-estadistica.dto';
import { UpdateEstadisticaDto } from './dto/update-estadistica.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estadistica } from './entities/estadistica.entity';
import { Repository } from 'typeorm';
import { CodeGenerator } from 'src/utils/codeGenerator/codeGenerator.utils';
import { EstadisticaJuego } from 'src/estadistica-juego/entities/estadistica-juego.entity';

@Injectable()
export class EstadisticaService {
  constructor(
    @InjectRepository(Estadistica)
    private estadisticaRepository: Repository<Estadistica>,

    @InjectRepository(EstadisticaJuego)
    private estadisticaJuegoRepository: Repository<EstadisticaJuego>,
  ) {}

  async findAll(): Promise<Estadistica[]> {
    return this.estadisticaRepository.find();
  }

  async findOne(codigo: string): Promise<Estadistica> {
    const entidad = await this.estadisticaRepository.findOne({
      where: { CodEstadistica: codigo },
    });

    if (!entidad) {
      throw new NotFoundException(
        `No se encontró el Estadistica con el codigo ${codigo}`,
      );
    }

    return entidad;
  }

  async create(
    data: Omit<CreateEstadisticaDto, 'CodEstadistica'>,
  ): Promise<Estadistica> {
    const codigo = await CodeGenerator.generateUniqueCode<Estadistica>(
      this.estadisticaRepository,
      'CodEstadistica',
    );

    const newEntity = this.estadisticaRepository.create({
      ...data,
      CodEstadistica: codigo,
    });

    return this.estadisticaRepository.save(newEntity);
  }

  async update(
    codigo: string,
    data: UpdateEstadisticaDto,
  ): Promise<Estadistica> {
    const estadistica = await this.estadisticaRepository.findOne({
      where: { CodEstadistica: codigo },
    });

    if (!estadistica) {
      throw new NotFoundException(
        `estadistica con código ${codigo} no encontrado`,
      );
    }

    Object.assign(estadistica, data);

    const updateEntidad = await this.estadisticaRepository.save(estadistica);

    return updateEntidad;
  }

  async remove(codigo: string): Promise<void> {
    await this.estadisticaJuegoRepository.delete({ CodEstadistica: codigo });

    const result = await this.estadisticaRepository.delete(codigo);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Estadistica con código ${codigo} no encontrado`,
      );
    }
  }

  async obtenerEstadisticasQueNoTengaElJugador(
    codigoJuego: string,
    codigoJugador: string,
  ): Promise<Estadistica[]> {
    // Obtener los códigos de estadísticas que el jugador ya tiene en el juego
    const estadisticasDelJugador = await this.estadisticaJuegoRepository
      .createQueryBuilder('ej')
      .select('ej.CodEstadistica')
      .where('ej.CodJuego = :codigoJuego', { codigoJuego })
      .andWhere('ej.CodJugador = :codigoJugador', { codigoJugador })
      .getMany();

    const codigosEstadisticasDelJugador = estadisticasDelJugador.map(
      (ej) => ej.CodEstadistica,
    );

    // Obtener las estadísticas que el jugador no tiene
    const estadisticasQueNoTiene = await this.estadisticaRepository
      .createQueryBuilder('e')
      .where('e.CodEstadistica NOT IN (:...codigos)', {
        codigos: codigosEstadisticasDelJugador.length
          ? codigosEstadisticasDelJugador
          : ['-1'], // Si el jugador no tiene estadísticas, ponemos un valor que no existe
      })
      .getMany();

    return estadisticasQueNoTiene;
  }
}
