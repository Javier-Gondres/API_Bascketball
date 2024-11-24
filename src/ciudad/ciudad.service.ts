import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudad } from './ciudad.entity';
import { Repository } from 'typeorm';
import { CodeGenerator } from 'src/utils/codeGenerator/codeGenerator.utils';

@Injectable()
export class CiudadService {
  constructor(
    @InjectRepository(Ciudad)
    private ciudadRepository: Repository<Ciudad>,
  ) {}

  async findAll(): Promise<Ciudad[]> {
    return this.ciudadRepository.find({ relations: ['equipos'] });
  }

  async findOne(CodCiudad: string): Promise<Ciudad> {
    const ciudad = await this.ciudadRepository.findOne({
      where: { CodCiudad },
      relations: ['equipos'],
    });

    if (!ciudad) {
      throw new NotFoundException(
        `No se encontró la ciudad con el codigo ${CodCiudad}`,
      );
    }

    return ciudad;
  }

  async create(ciudadData: Omit<Ciudad, 'CodCiudad'>): Promise<Ciudad> {
    const CodCiudad = await CodeGenerator.generateUniqueCode(
      this.ciudadRepository,
    );
    const newCiudad = this.ciudadRepository.create({
      ...ciudadData,
      CodCiudad,
    });
    return this.ciudadRepository.save(newCiudad);
  }

  async update(
    CodCiudad: string,
    ciudadData: Partial<Ciudad>,
  ): Promise<Ciudad> {
    const hasCiudad = await this.findOne(CodCiudad);
    if (!hasCiudad)
      throw new NotFoundException(
        `No se encontró la ciudad con el codigo ${CodCiudad}`,
      );
    await this.ciudadRepository.update(CodCiudad, ciudadData);
    return this.findOne(CodCiudad);
  }

  async remove(CodCiudad: string): Promise<void> {
    const result = await this.ciudadRepository.delete(CodCiudad);

    if (result.affected === 0) {
      throw new NotFoundException('No se encontró la ciudad a eliminar');
    }
  }
}
