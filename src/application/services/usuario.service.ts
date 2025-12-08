import { Injectable } from '@nestjs/common';
import { UsuarioRepositoryImpl } from '../../infrastructure/repositories/usuario.repository.impl';
import { Usuario } from '../../domain/entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(private readonly repo: UsuarioRepositoryImpl) {}

  async crear(usuario: string): Promise<Usuario> {
    if (!usuario) {
      throw new Error('Nombre y apellido son obligatorios');
    }
    return this.repo.create(new Usuario(null, usuario));
  }

  async listar(): Promise<Usuario[]> {
    return this.repo.findAll();
  }
}

