import { UsuarioModel } from './models/usuario.model';
import { PersonaModel } from './models/persona.model';
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

  // ...resto de tus asociaciones
}
