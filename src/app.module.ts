import { Module, OnModuleInit } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './infrastructure/database/sequelize.config';
import { Sequelize } from 'sequelize-typescript';
import { setupAssociations } from './infrastructure/database/associations';

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

// ✅ TRANSACTION SERVICE
import { GenericRepository } from './infrastructure/database/generic.repository';
import { TransactionService } from './infrastructure/database/transaction.service';
import { PersonaModel } from './infrastructure/database/models/persona.model';
import { ParametroModel } from './infrastructure/database/models/parametro.model';
import { ParametroController } from './presentation/controllers/parametro.controller';
import { ParametroService } from './application/services/parametro.service';
import { ParametroRepositoryImpl } from './infrastructure/repositories/parametro.repository.impl';
import { AuthModel } from './infrastructure/database/models/auth.model';
import { MenuModel } from './infrastructure/database/models/menu.model';
import { MenuRepositoryImpl } from './infrastructure/repositories/menu.repository.impl';
import { MenuService } from './application/services/menu.service';
import { MenuController } from './presentation/controllers/menu.controller';
import { RolModel } from './infrastructure/database/models/rol.model';
import { RolRepositoryImpl } from './infrastructure/repositories/rol.repository.impl';
import { RolService } from './application/services/rol.service';
import { RolController } from './presentation/controllers/rol.controller';
import { PermisoModel } from './infrastructure/database/models/permiso.model';
import { PermisoController } from './presentation/controllers/permiso.controller';
import { PermisoRepositoryImpl } from './infrastructure/repositories/permiso.repository.impl';
import { PermisoService } from './application/services/permiso.service';
import { EntidadModel } from './infrastructure/database/models/entidad.model';
import { RolUsuarioModel } from './infrastructure/database/models/rolUsuario.model';
import { RolMenuModel } from './infrastructure/database/models/rolMenu.model';
import { AuthController } from './presentation/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { AuthRepositoryImpl } from './infrastructure/repositories/auth.repository.impl';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig),
    SequelizeModule.forFeature([ClienteModel, UsuarioModel, PersonaModel, ParametroModel, AuthModel, MenuModel,RolModel, PermisoModel,
      EntidadModel, RolModel,RolUsuarioModel, RolMenuModel
    ]), // ✅ agrega UsuarioModel
  ],
  controllers: [ UsuarioController,ClienteController, ParametroController, MenuController, 
    RolController, PermisoController, AuthController], // ✅ agrega UsuarioController
  providers: [
    GenericRepository,
    ClienteRepositoryImpl,
    UsuarioRepositoryImpl,
    ParametroRepositoryImpl,
    MenuRepositoryImpl,
    RolRepositoryImpl,
    PermisoRepositoryImpl,
    AuthRepositoryImpl,

    UsuarioService,   // ✅ OBLIGATORIO
    ParametroService,
    MenuService,
    RolService,
    PermisoService,
    AuthService,
    // ClienteService,   // ✅ si lo estás usando,
    TransactionService     // ✅ ESTE ERA EL QUE FALTABA
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private sequelize: Sequelize) { }

  onModuleInit() {
    setupAssociations();            // ⬅️ SE LLAMA AQUÍ
    this.sequelize.sync();          // opcional
  }

}