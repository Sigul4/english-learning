import { Knex } from 'knex';

import { USER_TABLE_NAME } from '../constants/tables.constant';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(USER_TABLE_NAME, function (table) {
    table.increments('user_id');
    table.string('first_name', 255);
    table.string('last_name', 255);
    table.string('email', 255);
    table.string('login', 255);
    table.string('password', 255);
    table.string('status', 255);
    table.boolean('deleted').defaultTo(false);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(USER_TABLE_NAME);
}
