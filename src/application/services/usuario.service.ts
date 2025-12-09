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

    async crear(datos: any): Promise<Usuario> {
        let t;
        try {
            t = await this.transaction.create();
            const result = await this.repo.createOrUpdate(new Usuario(null, datos.usuario, datos.idPersona, datos.idEntidad), t);
            await this.transaction.commit(t);
            return result;
        } catch (error) {
            await this.transaction.rollback(t);
            throw error;
        }
    }

    async actualizar(datos: any): Promise<Usuario> {
        if (!datos.id) {
            throw new Error('El ID es obligatorio para actualizar');
        }
        let t;
        try {
            t = await this.transaction.create();

            const result = await this.repo.createOrUpdate(
                new Usuario(
                    datos.id,                     // ✅ AQUÍ YA VA EL ID
                    datos.usuario,
                    datos.idPersona,
                    datos.idEntidad,
                ),
                t
            );

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
            throw new ErrorApp(error.message, 400);
        }
    }
}

