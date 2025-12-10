export class Parametro {
  constructor(
    public id: string,
    public grupo: string,
    public codigo: string,
    // public otros: string | null,
    public nombre: string,
    public descripcion: string | null,
    // public estado: 'ACTIVO' | 'INACTIVO',
    // public createdAt?: Date,
    // public updatedAt?: Date,
    // public deletedAt?: Date | null,
  ) {}
}