import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { setTimestamps } from '@/infrastructure/lib/utils';

@setTimestamps()
@Table({ tableName: 'sys_usuario' }) // ✅ Nombre de la tabla personalizado
export class UsuarioModel extends Model {
  @Column({ field: 'id_persona' }) // ⚡ Nombre personalizado en la DB
  idPersona: number
  @Column({ field: 'id_entidad' })
  idEntidad: number
  @Column
  usuario: string;
  @Column({
    type: DataType.STRING(1000),
    allowNull: false,
  })
  contrasena: string;

}
