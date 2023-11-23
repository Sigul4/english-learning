import { Knex } from "knex";
import { USER_TEST_HISTORY, TEST_TABLE_NAME, USER_TABLE_NAME } from '../constants/tables.constant';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(USER_TEST_HISTORY, function (table) {
    table
      .integer('test_id')
      .unsigned()
      .references('test_id')
      .inTable(TEST_TABLE_NAME);
    table
      .integer('user_id')
      .unsigned()
      .references('user_id')
      .inTable(USER_TABLE_NAME);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(USER_TEST_HISTORY);
}
