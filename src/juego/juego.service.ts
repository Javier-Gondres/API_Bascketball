import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateJuegoDto } from './dto/create-juego.dto';
import { UpdateJuegoDto } from './dto/update-juego.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipo } from 'src/equipo/entities/equipo.entity';
import { Repository } from 'typeorm';
import { Juego } from './entities/juego.entity';
import { CodeGenerator } from 'src/utils/codeGenerator/codeGenerator.utils';
import { EstadisticaJuego } from 'src/estadistica-juego/entities/estadistica-juego.entity';
import { DatabaseService } from 'src/database/database.service';
import * as sql from 'mssql';
import {
  EstadisticasDelJuegoResponse,
  GameInfo,
  TotalesEquipo,
} from 'src/game-info/game-info.interface';

@Injectable()
export class JuegoService {
  constructor(
    @InjectRepository(Equipo)
    private equiporRepository: Repository<Equipo>,
    @InjectRepository(Juego)
    private juegoRepository: Repository<Juego>,
    @InjectRepository(EstadisticaJuego)
    private estadisticaJuegoRepository: Repository<EstadisticaJuego>,
    private readonly databaseService: DatabaseService,
  ) {}

  async findAll(): Promise<Juego[]> {
    return this.juegoRepository.find({
      relations: ['Equipo1Entity', 'Equipo2Entity'],
    });
  }

  async findOne(codigo: string): Promise<Juego> {
    const entidad = await this.juegoRepository.findOne({
      where: { CodJuego: codigo },
      relations: ['Equipo1Entity', 'Equipo2Entity'],
    });

    if (!entidad) {
      throw new NotFoundException(
        `No se encontró el Juego con el codigo ${codigo}`,
      );
    }

    return entidad;
  }

  async create(data: Omit<CreateJuegoDto, 'CodJuego'>): Promise<Juego> {
    if (data.Equipo1 === data.Equipo2) {
      throw new BadRequestException('Equipo1 y Equipo2 no pueden ser el mismo');
    }

    const equipo1 = await this.equiporRepository.findOne({
      where: { CodEquipo: data.Equipo1 },
    });
    if (!equipo1) {
      throw new NotFoundException(
        `equipo1 con código ${data.Equipo1} no encontrada`,
      );
    }

    const equipo2 = await this.equiporRepository.findOne({
      where: { CodEquipo: data.Equipo2 },
    });
    if (!equipo2) {
      throw new NotFoundException(
        `equipo2 con código ${data.Equipo2} no encontrada`,
      );
    }

    const codigo = await CodeGenerator.generateUniqueCode<Juego>(
      this.juegoRepository,
      'CodJuego',
    );

    const newEntity = this.juegoRepository.create({
      ...data,
      CodJuego: codigo,
      Equipo1Entity: equipo1,
      Equipo2Entity: equipo2,
    });

    return this.juegoRepository.save(newEntity);
  }

  async update(codigo: string, data: UpdateJuegoDto): Promise<Juego> {
    if (data.Equipo1 === data.Equipo2) {
      throw new BadRequestException('Equipo1 y Equipo2 no pueden ser el mismo');
    }

    const Juego = await this.juegoRepository.findOne({
      where: { CodJuego: codigo },
      relations: ['Equipo1Entity', 'Equipo2Entity'],
    });

    if (!Juego) {
      throw new NotFoundException(`Juego con código ${codigo} no encontrado`);
    }

    if (data.Equipo1) {
      const equipo = await this.equiporRepository.findOne({
        where: { CodEquipo: data.Equipo1 },
      });
      if (!equipo) {
        throw new NotFoundException(
          `Equipo1 con código ${data.Equipo1} no encontrada`,
        );
      }
      Juego.Equipo1Entity = equipo;
    }

    if (data.Equipo2) {
      const equipo = await this.equiporRepository.findOne({
        where: { CodEquipo: data.Equipo2 },
      });
      if (!equipo) {
        throw new NotFoundException(
          `Equipo2 con código ${data.Equipo2} no encontrada`,
        );
      }
      Juego.Equipo2Entity = equipo;
    }

    Object.assign(Juego, data);

    return this.juegoRepository.save(Juego);
  }

  async remove(codigo: string): Promise<void> {
    await this.estadisticaJuegoRepository.delete({ CodJuego: codigo });

    const result = await this.juegoRepository.delete(codigo);
    if (result.affected === 0) {
      throw new NotFoundException(`Juego con código ${codigo} no encontrado`);
    }
  }

  async estadisticasDelJuego(
    codJuego: string,
  ): Promise<EstadisticasDelJuegoResponse> {
    try {
      const pool = await this.databaseService.getConnection();

      const request = pool.request();
      request.input('CodJuego', sql.NChar(5), codJuego);

      const result = await request.execute('EstadisticasDelJuego');

      const [
        gameInfoArray,
        estadisticasEquipoLocal,
        totalesEquipoLocalArray,
        estadisticasEquipoVisitante,
        totalesEquipoVisitanteArray,
      ] = result.recordsets as any;

      const gameInfo: GameInfo = gameInfoArray[0];
      const totalesEquipoLocal: TotalesEquipo = totalesEquipoLocalArray[0];
      const totalesEquipoVisitante: TotalesEquipo =
        totalesEquipoVisitanteArray[0];

      return {
        gameInfo,
        estadisticasEquipoLocal,
        totalesEquipoLocal,
        estadisticasEquipoVisitante,
        totalesEquipoVisitante,
      };
    } catch (error) {
      console.error('Error al ejecutar el stored procedure:', error);

      if (error.number === 50000) {
        // Error lanzado por RAISERROR con severidad 16
        throw new NotFoundException(error.message);
      }

      throw new BadRequestException('Error al obtener estadísticas del juego.');
    }
  }
}
