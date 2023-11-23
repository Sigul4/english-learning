import { Knex } from 'knex';

import { GROUP_TABLE_NAME, TEST_TABLE_NAME, USER_TABLE_NAME } from '../constants/tables.constant';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TEST_TABLE_NAME, function (table) {
    table.increments('test_id');
    table.string('title', 255);
    table.json('description');
    table.boolean('completed').defaultTo(false);
    table.integer('user_id').unsigned().references('user_id').inTable(USER_TABLE_NAME);
    table.integer('group_id').unsigned().references('group_id').inTable(GROUP_TABLE_NAME);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TEST_TABLE_NAME);
}
