import { Knex } from 'knex';

import { GROUP_TABLE_NAME } from '../constants/tables.constant';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(GROUP_TABLE_NAME, function (table) {
    table.increments('group_id');
    table.string('name', 255);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(GROUP_TABLE_NAME);
}
