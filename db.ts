import Knex from 'knex';
import configs from './knexfile';

export const knexInstance = Knex(configs[process.env.NODE_ENV || 'development']);
