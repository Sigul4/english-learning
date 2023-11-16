import { Injectable } from '@nestjs/common';
import { Knex, knex } from 'knex';
import configs from '../../knexfile';

type KnexColumnType =
  | 'string'
  | 'text'
  | 'integer'
  | 'bigint'
  | 'float'
  | 'double'
  | 'date'
  | 'time'
  | 'datetime'
  | 'timestamp'
  | 'boolean'
  | 'binary'
  | 'uuid'
  | 'json'
  | 'jsonb'
  | 'enum'
  | 'increments';

type ColumnDefinition = {
  type: KnexColumnType;
  options?: any;
};

type TableSchema = Record<string, ColumnDefinition>;

@Injectable()
export class KnexSchemaBuilderService {
  private knex: Knex;

  constructor() {
    this.knex = knex(configs[process.env.NODE_ENV || 'development']);
  }

  public async createOrUpdateTable(tableName: string, schema: TableSchema): Promise<void> {
    if (await this.knex.schema.hasTable(tableName)) {
      await this.updateTable(tableName, schema);
    } else {
      await this.createTable(tableName, schema);
    }
  }

  private async createTable(tableName: string, schema: TableSchema): Promise<void> {
    await this.knex.schema.createTable(tableName, (table) => {
      table.increments(`${tableName}_id`).primary();

      for (const key in schema) {
        const { type } = schema[key];
        this.addColumn(table, key, type);
      }
    });
  }

  private async updateTable(tableName: string, schema: TableSchema): Promise<void> {
    const existingColumns = await this.knex(tableName).columnInfo();

    await this.knex.schema.alterTable(tableName, (table) => {
      for (const key in schema) {
        const { type } = schema[key];
        if (!existingColumns[key]) {
          this.addColumn(table, key, type);
        }
      }

      for (const key in existingColumns) {
        if (!schema[key] && key !== `${tableName}_id`) {
          table.dropColumn(key);
        }
      }
    });
  }

  private addColumn(table: Knex.CreateTableBuilder, key: string, type: KnexColumnType): void {
    table[type].bind(key);
  }
}
