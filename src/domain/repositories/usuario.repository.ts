import { Usuario } from '../entities/usuario.entity';

export interface UsuarioRepository {
  create(usuario: Usuario): Promise<Usuario>;
  findAll(): Promise<Usuario[]>;
}
