import { UsuarioModel } from './models/usuario.model';
import { PersonaModel } from './models/persona.model';
import { EntidadModel } from './models/entidad.model';
import { RolUsuarioModel } from './models/rolUsuario.model';
import { RolModel } from './models/rol.model';
import { MenuModel } from './models/menu.model';
import { RolMenuModel } from './models/rolMenu.model';
// importa todos los modelos...

export function setupAssociations() {
  PersonaModel.hasOne(UsuarioModel, {
    foreignKey: { name: 'idPersona' },
    as: 'usuario'
  });

  UsuarioModel.belongsTo(PersonaModel, {
    foreignKey: { name: 'idPersona' },
    as: 'persona'
  });

  UsuarioModel.belongsTo(EntidadModel, { foreignKey: { name: 'idEntidad' }, as: 'entidad' });
  EntidadModel.hasMany(UsuarioModel,  { foreignKey: { name: 'idEntidad' }, as: 'usuarios' });

  // Roles de usuario
  UsuarioModel.belongsToMany(RolModel,  { through: { model: RolUsuarioModel, unique: false }, as: 'roles', foreignKey: 'idUsuario' });
  RolModel.belongsToMany(UsuarioModel, { through: { model: RolUsuarioModel, unique: false }, as: 'usuarios', foreignKey: 'idRol' });

  RolModel.belongsToMany(MenuModel, { through: { model: RolMenuModel, unique: false }, as: 'menus', foreignKey: 'idRol' });
  MenuModel.belongsToMany(RolModel, { through: { model: RolMenuModel, unique: false }, as: 'roles', foreignKey: 'idMenu' });

  // ...resto de tus asociaciones
}
