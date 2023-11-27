import { Injectable } from '@nestjs/common';
import Knex from 'knex';
import knexConfig from './../../knexfile'


@Injectable()
export class MigrationService {
  private knexInstance: any;

  constructor() {
    this.knexInstance = Knex(knexConfig['development']);
  }

  async runMigrations(): Promise<void> {
    try {
      await this.knexInstance.migrate.latest();
    } catch (error) {
      // Обработка ошибок здесь, например, запись в лог или отправка уведомления
      console.error('Ошибка миграции базы данных:', error);
      throw error; // Перебрасываем ошибку, чтобы вызывающий код также мог обработать ее, если нужно
    }
  }  
}