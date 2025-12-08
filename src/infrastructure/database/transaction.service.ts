import { Injectable } from '@nestjs/common';
import { Sequelize, Transaction } from 'sequelize';

@Injectable()
export class TransactionService {
  constructor(private readonly sequelize: Sequelize) {}

  async create(): Promise<Transaction> {
    return this.sequelize.transaction();
  }

  async commit(t: Transaction) {
    if (t) {
      await t.commit();
    }
  }

  async rollback(t: Transaction) {
    if (t) {
      await t.rollback();
    }
  }
}
