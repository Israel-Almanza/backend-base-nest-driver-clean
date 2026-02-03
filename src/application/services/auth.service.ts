import { Injectable } from '@nestjs/common';
import { RolRepositoryImpl } from '@/infrastructure/repositories/rol.repository.impl';
import { Rol } from '@/domain/entities/rol.entity';
import { TransactionService } from '@/infrastructure/database/transaction.service';
import { UsuarioRepositoryImpl } from '@/infrastructure/repositories/usuario.repository.impl';
import { AuthRepositoryImpl } from '@/infrastructure/repositories/auth.repository.impl';
import { MenuRepositoryImpl } from '@/infrastructure/repositories/menu.repository.impl';
import { PermisoRepositoryImpl } from '@/infrastructure/repositories/permiso.repository.impl';

import { ErrorApp } from '@/domain/lib/error';
import { ParametroRepositoryImpl } from '@/infrastructure/repositories/parametro.repository.impl';
import { generateToken } from '../lib/auth';

@Injectable()
export class AuthService {
    constructor(
        private readonly repo: RolRepositoryImpl,
        private readonly usuarioRepository: UsuarioRepositoryImpl,
        private readonly menuRepository: MenuRepositoryImpl,
        private readonly authRepository: AuthRepositoryImpl,
        private readonly permisoRepository: PermisoRepositoryImpl,
        private readonly parametroRepository: ParametroRepositoryImpl,
        private readonly transaction: TransactionService,
    ) { }

    async getMenusRoles(roles) {
        const idRoles = roles.map(x => x.id);
        const { rows } = await this.menuRepository.findByRoles(idRoles);
        return rows;
    }

    async getPermisos(roles) {
        const idRoles = roles.map(x => x.id);
        const { rows } = await this.permisoRepository.findByRoles(idRoles);
        const permisos = {};
        for (const permiso of rows) {
            permisos[permiso.nombre] = true;
        }
        return permisos;
    }

    async getResponse(usuario) {
        try {
            usuario.menu = await this.getMenusRoles(usuario.roles);
            usuario.permisos = await this.getPermisos(usuario.roles);

            console.log("AAAAAAAAAAAAAAAAAA")
            usuario.token = await generateToken(this.parametroRepository, {
                idRoles: usuario.roles.map(x => x.id),
                idUsuario: usuario.id,
                celular: usuario.celular,
                correoElectronico: usuario.correoElectronico,
                usuario: usuario.usuario,
                idEntidad: usuario.entidad.id
            });

            return usuario;
        } catch (error) {
            throw new ErrorApp(error.message, 400);
        }
    }

    async login(usuario, contrasena, request) {
        try {
             console.log("pase esta linea 111 ")
            const existeUsuario: any = await this.usuarioRepository.login({ usuario });
            if (!existeUsuario) {
                throw new Error('Error en su usuario o su contraseña.');
            }
            
            const respuestaVerificacion = await this.authRepository.verificarContrasena(contrasena, existeUsuario.contrasena);
            if (!respuestaVerificacion) {
                throw new Error('Error en su usuario o su contraseña.');
            }
            console.log("pase esta linea 222", respuestaVerificacion)
            delete existeUsuario.contrasena;
            const respuesta = await this.getResponse(existeUsuario);
            console.log("pase esta linea 333")
            await this.authRepository.deleteItemCond({ idUsuario: existeUsuario.id });
            await this.authRepository.createOrUpdate({
                ip       : request.ipInfo.ip,
                navegador: request.ipInfo.navigator,
                userAgent: request.headers['user-agent'],
                token: respuesta.token,
                idUsuario: existeUsuario.id,
                // idRol       : existeUsuario.roles.map(x => x.id).join(','),
                idEntidad: existeUsuario.entidad.id,
                userCreated: existeUsuario.id
            });
            return respuesta;
        } catch (err) {
            console.log("error ----> ", err)
            throw new ErrorApp(err.message, 400);
        }
    }
}
