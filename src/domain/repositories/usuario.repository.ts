import { Usuario } from '../entities/usuario.entity';
import { Transaction } from 'sequelize';

export interface UsuarioRepository {
  create(usuario: Usuario, t?: Transaction): Promise<Usuario>;
  findAll(): Promise<Usuario[]>;
}
