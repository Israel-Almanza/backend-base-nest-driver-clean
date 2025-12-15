import { Injectable } from '@nestjs/common';
import { RolRepositoryImpl } from '@/infrastructure/repositories/rol.repository.impl';
import { Rol } from '@/domain/entities/rol.entity';
import { TransactionService } from '@/infrastructure/database/transaction.service';
import { ErrorApp } from '@/domain/lib/error';

@Injectable()
export class RolService {
    constructor(
        private readonly repo: RolRepositoryImpl,
        private readonly transaction: TransactionService,
    ) { }

    async crear(datos: any): Promise<Rol> {
        let t;
        try {
            t = await this.transaction.create();

            const entity = new Rol(
                null,
                datos.idEntidad,
                datos.nombre,
                datos.descripcion,
                datos.estado
            );

            const result = await this.repo.createOrUpdate(entity, t);
            await this.transaction.commit(t);

            return result;
        } catch (error) {
            await this.transaction.rollback(t);
            throw error;
        }
    }

    async actualizar(datos: any): Promise<Rol> {
        if (!datos.id) {
            throw new Error('El ID es obligatorio para actualizar');
        }

        let t;
        try {
            t = await this.transaction.create();

            const entity = new Rol(
                datos.id,
                datos.idEntidad,
                datos.nombre,
                datos.descripcion,
                datos.estado
            );

            const result = await this.repo.createOrUpdate(entity, t);
            await this.transaction.commit(t);

            return result;
        } catch (error) {
            await this.transaction.rollback(t);
            throw error;
        }
    }

    async findOne(params): Promise<Rol> {
        try {
            return await this.repo.findOne(params);
        } catch (error) {
            throw new ErrorApp(error.message, 400);
        }
    }

    async eliminar(id: number): Promise<number> {
        try {
            return await this.repo.deleteItem(id);
        } catch (error) {
            throw new ErrorApp(error.message, 400);
        }
    }

    async listar(params: any): Promise<{ count: number; rows: Rol[] }> {
        try {
            return await this.repo.findAll(params);
        } catch (error) {
            throw new ErrorApp(error.message, 400);
        }
    }
}
