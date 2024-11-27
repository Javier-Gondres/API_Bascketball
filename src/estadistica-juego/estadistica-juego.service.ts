import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEstadisticaJuegoDto } from './dto/create-estadistica-juego.dto';
import { UpdateEstadisticaJuegoDto } from './dto/update-estadistica-juego.dto';
import { Juego } from 'src/juego/entities/juego.entity';
import { Repository } from 'typeorm';
import { Jugador } from 'src/jugador/entities/jugador.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Estadistica } from 'src/estadistica/entities/estadistica.entity';
import { EstadisticaJuego } from './entities/estadistica-juego.entity';

@Injectable()
export class EstadisticaJuegoService {
  constructor(
    @InjectRepository(Jugador)
    private jugadorRepository: Repository<Jugador>,
    @InjectRepository(Juego)
    private juegoRepository: Repository<Juego>,
    @InjectRepository(Estadistica)
    private estadisticaRepository: Repository<Estadistica>,
    @InjectRepository(EstadisticaJuego)
    private estadisticaJuegoRepository: Repository<EstadisticaJuego>,
  ) {}

  async findAll(): Promise<EstadisticaJuego[]> {
    return this.estadisticaJuegoRepository.find({
      relations: ['juego', 'estadistica', 'jugador'],
    });
  }

  async findOne(
    codigoJuego: string,
    codigoEstadistica: string,
    codigoJugador: string,
  ): Promise<EstadisticaJuego> {
    const entidad = await this.estadisticaJuegoRepository.findOne({
      where: {
        CodEstadistica: codigoEstadistica,
        CodJugador: codigoJugador,
        CodJuego: codigoJuego,
      },
    });

    if (!entidad) {
      throw new NotFoundException(
        `EstadisticaJuego con codigoJuego ${codigoJuego}, codigoEstadistica ${codigoEstadistica} y codigoJugador ${codigoJugador} no encontrado`,
      );
    }

    return entidad;
  }

  async create(
    data: Omit<CreateEstadisticaJuegoDto, 'CodEstadisticaJuego'>,
  ): Promise<EstadisticaJuego> {
    const estadisticaDeJuego = await this.estadisticaJuegoRepository.findOne({
      where: {
        CodEstadistica: data.CodEstadistica,
        CodJuego: data.CodJuego,
        CodJugador: data.CodJugador,
      },
    });

    if (estadisticaDeJuego) {
      throw new BadRequestException(`Esta estadistica de juego ya existe`);
    }

    const jugador = await this.jugadorRepository.findOne({
      where: { CodJugador: data.CodJugador },
    });
    if (!jugador) {
      throw new NotFoundException(
        `jugador con código ${data.CodJugador} no encontrada`,
      );
    }

    const juego = await this.juegoRepository.findOne({
      where: { CodJuego: data.CodJuego },
    });
    if (!juego) {
      throw new NotFoundException(
        `juego con código ${data.CodJuego} no encontrada`,
      );
    }

    const estadistica = await this.estadisticaRepository.findOne({
      where: { CodEstadistica: data.CodEstadistica },
    });
    if (!estadistica) {
      throw new NotFoundException(
        `estadistica con código ${data.CodEstadistica} no encontrada`,
      );
    }
    const newEntity = this.estadisticaJuegoRepository.create({
      ...data,
      CodEstadistica: data.CodEstadistica,
      CodJuego: data.CodJuego,
      CodJugador: data.CodJugador,
      estadistica,
      juego,
      jugador,
    });

    return this.estadisticaJuegoRepository.save(newEntity);
  }

  async update(
    codigoJuego: string,
    codigoEstadistica: string,
    codigoJugador: string,
    data: UpdateEstadisticaJuegoDto,
  ): Promise<EstadisticaJuego> {
    const estadisticaDeJuego = await this.estadisticaJuegoRepository.findOne({
      where: {
        CodEstadistica: codigoEstadistica,
        CodJuego: codigoJuego,
        CodJugador: codigoJugador,
      },
      relations: ['juego', 'estadistica', 'jugador'],
    });

    if (!estadisticaDeJuego) {
      throw new NotFoundException(
        `EstadisticaJuego con codigoJuego ${codigoJuego}, codigoEstadistica ${codigoEstadistica} y codigoJugador ${codigoJugador} no encontrado`,
      );
    }

    Object.assign(estadisticaDeJuego, data);

    const updatedEquipo =
      await this.estadisticaJuegoRepository.save(estadisticaDeJuego);

    return updatedEquipo;
  }

  async remove(
    codigoJuego: string,
    codigoEstadistica: string,
    codigoJugador: string,
  ): Promise<void> {
    const result = await this.estadisticaJuegoRepository.delete({
      CodJuego: codigoJuego,
      CodEstadistica: codigoEstadistica,
      CodJugador: codigoJugador,
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `EstadisticaJuego con codigoJuego ${codigoJuego}, codigoEstadistica ${codigoEstadistica} y codigoJugador ${codigoJugador} no encontrado`,
      );
    }
  }
}
