import { UsuarioRepository } from '../../domain/repositories/usuario.repository';
import { Usuario } from '../../domain/entities/usuario.entity';

export class CrearUsuarioUseCase {
  constructor(private repo: UsuarioRepository) {}

  execute(nombre: string, apellido: string) {
    const usuario = new Usuario(0, nombre);
    return this.repo.createOrUpdate(usuario);
  }
}
