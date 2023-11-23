import { Knex } from 'knex';

import { IMAGE_TABLE_NAME } from '../constants/tables.constant';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(IMAGE_TABLE_NAME, function (table) {
    table.increments('image_id');
    table.string('title', 255);
    table.string('file_path', 255);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(IMAGE_TABLE_NAME);
}
