import { Injectable } from '@nestjs/common';
import { UsuarioRepositoryImpl } from '../../infrastructure/repositories/usuario.repository.impl';
import { Usuario } from '../../domain/entities/usuario.entity';
import { TransactionService } from '@/infrastructure/database/transaction.service';

@Injectable()
export class UsuarioService {
    constructor(
        private readonly repo: UsuarioRepositoryImpl,
        private readonly transaction: TransactionService, // ✅ inyectado
    ) { }

    /*async crear(usuario: string): Promise<Usuario> {
      // if (!usuario) {
      //   throw new Error('Nombre y apellido son obligatorios');
      // }
       
      return this.repo.create(new Usuario(null, usuario));
    } */

    async crear(usuario: string): Promise<Usuario> {
        let t;

        try {
            t = await this.transaction.create();

            const result = await this.repo.create(
                new Usuario(null, usuario), t );

            await this.transaction.commit(t);
            return result;
        } catch (error) {
            await this.transaction.rollback(t);
            throw error;
        }
    }


    async listar(): Promise<Usuario[]> {
        return this.repo.findAll();
    }
}

