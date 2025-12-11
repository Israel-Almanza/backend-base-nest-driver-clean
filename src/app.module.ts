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

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig),
    SequelizeModule.forFeature([ClienteModel, UsuarioModel, PersonaModel, ParametroModel, AuthModel]), // ✅ agrega UsuarioModel
  ],
  controllers: [ClienteController, UsuarioController, ParametroController], // ✅ agrega UsuarioController
  providers: [
    GenericRepository,
    ClienteRepositoryImpl,
    UsuarioRepositoryImpl,
    ParametroRepositoryImpl,

    UsuarioService,   // ✅ OBLIGATORIO
    ParametroService,
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