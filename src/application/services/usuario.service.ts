import { Injectable } from '@nestjs/common';
import { UsuarioRepositoryImpl } from '../../infrastructure/repositories/usuario.repository.impl';
import { Usuario } from '../../domain/entities/usuario.entity';
import { TransactionService } from '@/infrastructure/database/transaction.service';
import { ErrorApp } from '@/domain/lib/error';

@Injectable()
export class UsuarioService {
    constructor(
        private readonly repo: UsuarioRepositoryImpl,
        private readonly transaction: TransactionService, // ✅ inyectado
    ) { }

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


    async listar(params): Promise<{ count: number; rows: Usuario[] }> {
        try {
          const respuesta = await this.repo.findAll(params);   
          return respuesta
        } catch (error) {
            console.log('error ---> ', error)
            throw new ErrorApp(error.message, 400);
        }
    }
}

