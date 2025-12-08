import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'sys_usuario' }) // ✅ Nombre de la tabla personalizado
export class UsuarioModel extends Model {
  @Column
  idPersona: number 
  @Column
  idEntidad: number    
  @Column
  usuario: string;
}
