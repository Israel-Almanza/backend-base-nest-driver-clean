import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { ClienteModel } from './models/cliente.model';

export const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'publica',
  database: 'db_test',
  models: [ClienteModel],
  autoLoadModels: true,
  synchronize: true,
};