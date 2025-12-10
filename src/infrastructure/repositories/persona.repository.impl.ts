import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PersonaModel } from '../database/models/persona.model';
import { UsuarioRepository } from '../../domain/repositories/usuario.repository';
import { Usuario } from '../../domain/entities/usuario.entity';
import { GenericRepository } from '../database/generic.repository';
import { Transaction } from 'sequelize';
import { toJSON, getQuery } from '../lib/utils';

@Injectable()
export class UsuarioRepositoryImpl implements UsuarioRepository {
  constructor(
    @InjectModel(PersonaModel)
    private readonly personaModel: typeof PersonaModel,

    private readonly genericRepo: GenericRepository, // ✅ inyectado
  ) {}

  async findOne(params= {} ): Promise<Usuario> {
    const query: any = {};
    query.where = params;
    const result = await this.personaModel.findOne(query);
    return result.toJSON();
  }

  async createOrUpdate(item: Usuario , t?: Transaction ): Promise<Usuario> {
    return await this.genericRepo.createOrUpdate(item,this.personaModel,t);
  }

  async deleteItem(id: number , t?: Transaction ): Promise<number> {
    return await this.genericRepo.deleteItem(id,this.personaModel,t);
  }

  async findAll(params: any): Promise<{ count: number; rows: Usuario[] }> {
    const query = getQuery(params);
    if(params.id) {
      query.where.id = params.id;
    }
    const usuarios = await this.personaModel.findAndCountAll(query);
    return toJSON(usuarios);
  }
}
