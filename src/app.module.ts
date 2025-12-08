import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './infrastructure/database/sequelize.config';

// MODELS
import { ClienteModel } from './infrastructure/database/models/cliente.model';
import { UsuarioModel } from './infrastructure/database/models/usuario.model';
// CONTROLLERS
import { UsuarioController } from './presentation/controllers/usuario.controller';
import { ClienteController } from './presentation/controllers/cliente.controller';

// REPOSITORIES
import { UsuarioRepositoryImpl } from './infrastructure/repositories/usuario.repository.impl';
import { ClienteRepositoryImpl } from './infrastructure/repositories/cliente.repository.impl';

// SERVICES ✅⬅️ ESTO FALTABA
import { UsuarioService } from './application/services/usuario.service';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig),
    SequelizeModule.forFeature([ClienteModel, UsuarioModel]), // ✅ agrega UsuarioModel
   ],
  controllers: [ClienteController, UsuarioController], // ✅ agrega UsuarioController
  providers: [
    ClienteRepositoryImpl,
    UsuarioRepositoryImpl,
    UsuarioService,   // ✅ OBLIGATORIO
    // ClienteService,   // ✅ si lo estás usando
  ],
})
export class AppModule {}