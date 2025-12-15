import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MenuModel } from '../database/models/menu.model';
import { MenuRepository } from '../../domain/repositories/menu.repository';
import { Menu } from '../../domain/entities/menu.entity';
import { GenericRepository } from '../database/generic.repository';
import { Transaction } from 'sequelize';
import { toJSON, getQuery } from '../lib/utils';

@Injectable()
export class MenuRepositoryImpl implements MenuRepository {
  constructor(
    @InjectModel(MenuModel)
    private readonly menuModel: typeof MenuModel,

    private readonly genericRepo: GenericRepository,
  ) {}

  async findOne(params = {}): Promise<Menu> {
    const query: any = {};
    query.where = params;
    const result = await this.menuModel.findOne(query);
    return result?.toJSON();
  }

  async createOrUpdate(
    item: Menu,
    t?: Transaction,
  ): Promise<Menu> {
    return await this.genericRepo.createOrUpdate(item, this.menuModel, t);
  }

  async deleteItem(id: number, t?: Transaction): Promise<number> {
    return await this.genericRepo.deleteItem(id, this.menuModel, t);
  }

  async findAll(params: any): Promise<{ count: number; rows: Menu[] }> {
    const query = getQuery(params);

    if (params.id) {
      query.where.id = params.id;
    }

    const result = await this.menuModel.findAndCountAll(query);
    return toJSON(result);
  }
}
