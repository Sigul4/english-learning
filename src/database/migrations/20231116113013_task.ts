import { Knex } from 'knex';
import { MULTIPLE_CHOICE_IMAGE, MULTIPLE_CHOICE_TEXT, TASK_TABLE_NAME, TYPE_WITH_KEYBOARD, WORD_FROM_LETTERS } from '../constants/tables.constant';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TASK_TABLE_NAME, function (table) {
      table.increments('question_id');
      table.enu('task_type', [MULTIPLE_CHOICE_TEXT, MULTIPLE_CHOICE_IMAGE, WORD_FROM_LETTERS, TYPE_WITH_KEYBOARD]).defaultTo(MULTIPLE_CHOICE_TEXT);
      table.text('question');
      table.json('extra_data');
      table.string('correct_answer', 255);
      table.timestamps(true, true);
    },
  );
}

export async function down(knex: Knex): Promise<void> {}
