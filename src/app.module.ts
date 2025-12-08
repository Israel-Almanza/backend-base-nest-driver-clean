import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './infrastructure/database/sequelize.config';
import { ClienteModel } from './infrastructure/database/models/cliente.model';
import { ClienteController } from './presentation/controllers/cliente.controller';
import { ClienteRepositoryImpl } from './infrastructure/repositories/cliente.repository.impl';

import { UsuarioModel } from './infrastructure/database/models/usuario.model';
import { UsuarioController } from './presentation/controllers/usuario.controller';
import { UsuarioRepositoryImpl } from './infrastructure/repositories/usuario.repository.impl';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig),
    SequelizeModule.forFeature([ClienteModel, UsuarioModel]), // ✅ agrega UsuarioModel
   ],
  controllers: [ClienteController, UsuarioController], // ✅ agrega UsuarioController
  providers: [ClienteRepositoryImpl, UsuarioRepositoryImpl], // ✅ agrega el repositorio
})
export class AppModule {}