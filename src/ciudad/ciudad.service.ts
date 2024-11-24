import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudad } from './ciudad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CiudadService {
  constructor(
    @InjectRepository(Ciudad)
    private ciudadRepository: Repository<Ciudad>,
  ) {}

  async findAll(): Promise<Ciudad[]> {
    return this.ciudadRepository.find();
  }

  async findOne(CodCiudad: string): Promise<Ciudad> {
    return this.ciudadRepository.findOne({ where: { CodCiudad } });
  }

  async create(ciudadData: Partial<Ciudad>): Promise<Ciudad> {
    const newCiudad = this.ciudadRepository.create(ciudadData);
    return this.ciudadRepository.save(newCiudad);
  }

  async update(CodCiudad: string, ciudadData: Partial<Ciudad>): Promise<Ciudad> {
    const hasCiudad = await this.findOne(CodCiudad);
    if (!hasCiudad) throw new Error(`No se encontró la ciudad con el codigo ${CodCiudad}`);
    await this.ciudadRepository.update(CodCiudad, ciudadData);
    return this.findOne(CodCiudad);
  }

  async remove(CodCiudad: string): Promise<void> {
    await this.ciudadRepository.delete(CodCiudad);
  }
}
