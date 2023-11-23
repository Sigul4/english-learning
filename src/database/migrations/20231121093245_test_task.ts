import { Knex } from "knex";
import { TEST_TASK_TABLE_NAME, TEST_TABLE_NAME, TASK_TABLE_NAME } from '../constants/tables.constant';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TEST_TASK_TABLE_NAME, function (table) {
    table
      .integer('test_id')
      .unsigned()
      .references('test_id')
      .inTable(TEST_TABLE_NAME);
    table
      .integer('task_id')
      .unsigned()
      .references('task_id')
      .inTable(TASK_TABLE_NAME);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TEST_TASK_TABLE_NAME);
}
