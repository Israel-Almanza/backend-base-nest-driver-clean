import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';

@Injectable()
export class GenericRepository {
  async createOrUpdate(
    object: any,
    model: any,
    t?: Transaction,
  ): Promise<any> {
    const cond: any = {
      where: { id: object.id || null },
    };

    if (t) cond.transaction = t;

    const item = await model.findOne(cond);

    if (item) {
      object.updatedAt = new Date();
      delete object.createdAt;

      await model.update(object, cond);
      const result = await model.findOne(cond);
      return result?.toJSON() ?? null;
    }

    object.createdAt = new Date();
    const result = await model.create(object, t ? { transaction: t } : {});
    return result.toJSON();
  }

  async findAll(model: any): Promise<any[]> {
    const result = await model.findAll();
    return result.map(r => r.toJSON());
  }
}
