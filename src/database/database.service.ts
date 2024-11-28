// database.service.ts
import { Injectable } from '@nestjs/common';
import * as sql from 'mssql';

@Injectable()
export class DatabaseService {
  private pool: sql.ConnectionPool;

  constructor() {
    this.pool = new sql.ConnectionPool({
      user: 'JavierAdmin',
      password: 'javier22',
      server: 'localhost',
      database: 'BasketballJEGD0001',
      options: {
        encrypt: false,
      },
    });
  }

  async getConnection(): Promise<sql.ConnectionPool> {
    if (!this.pool.connected) {
      await this.pool.connect();
    }
    return this.pool;
  }
}
