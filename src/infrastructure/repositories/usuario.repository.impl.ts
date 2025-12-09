import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsuarioModel } from '../database/models/usuario.model';
import { UsuarioRepository } from '../../domain/repositories/usuario.repository';
import { Usuario } from '../../domain/entities/usuario.entity';
import { BaseMapper } from '../mappers/base.mapper';
import { UsuarioMapper } from '../mappers/usuario.mapper';
import { GenericRepository } from '../database/generic.repository';
import { Transaction } from 'sequelize';
import { toJSON } from '../lib/utils';

@Injectable()
export class UsuarioRepositoryImpl implements UsuarioRepository {
  constructor(
    @InjectModel(UsuarioModel)
    private readonly usuarioModel: typeof UsuarioModel,

    private readonly genericRepo: GenericRepository, // ✅ inyectado
  ) {}

  async create(usuario: Usuario , Usuario, t?: Transaction ): Promise<Usuario> {
    const model = await this.genericRepo.createOrUpdate(
      { usuario: usuario.usuario },
      this.usuarioModel,
      t, // ✅ ahora sí acepta transacción
    );

    return UsuarioMapper.toDomain(model);
  }

  async findAll(params): Promise<{ count: number; rows: Usuario[] }> {
    console.log('parametros :::::::: ', params)
    const usuarios = await this.usuarioModel.findAndCountAll();
    return toJSON(usuarios);
    // const models = await this.genericRepo.findAll(this.usuarioModel);
    // return BaseMapper.toDomainList(models, UsuarioMapper.toDomain);
  }
}
