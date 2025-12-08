import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'sys_usuario' }) // ✅ Nombre de la tabla personalizado
export class UsuarioModel extends Model {
  @Column({ field: 'id_persona' }) // ⚡ Nombre personalizado en la DB
  idPersona: number 
  @Column({ field: 'id_entidad' })
  idEntidad: number    
  @Column
  usuario: string;
}
