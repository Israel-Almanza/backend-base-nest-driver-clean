import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsuarioModel } from '../database/models/usuario.model';
import { UsuarioRepository } from '../../domain/repositories/usuario.repository';
import { Usuario } from '../../domain/entities/usuario.entity';
import { BaseMapper } from '../mappers/base.mapper';
import { UsuarioMapper } from '../mappers/usuario.mapper';

@Injectable()
export class UsuarioRepositoryImpl implements UsuarioRepository {
  constructor(
    @InjectModel(UsuarioModel)
    private readonly usuarioModel: typeof UsuarioModel,
  ) {}

  async create(usuario: Usuario): Promise<Usuario> {
    const nuevo = await this.usuarioModel.create({
      usuario: usuario.usuario,
    });

    return new Usuario(nuevo.id, nuevo.usuario);
  }

  async findAll(): Promise<Usuario[]> {
    // const usuarios = await this.usuarioModel.findAll();
    const models = await this.usuarioModel.findAll();
    // return usuarios.map(u => new Usuario(u.id, u.usuario));
    return BaseMapper.toDomainList(models, UsuarioMapper.toDomain);
  }
}
