import type { Knex } from 'knex';
import 'ts-node/register';
import dotenv from 'dotenv';

// Update with your config settings.
dotenv.config();

const environments: string[] = ['development', 'test', 'production'];

const connection: Knex.ConnectionConfig = {
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
};

console.log('connection in DBBB',connection)

const commonConfig: Knex.Config = {
  client: 'pg',
  connection,
  migrations: {
    directory: process.env.MIGRATIONS_DIR || './src/database/migrations',
  },
  seeds: {
    directory: process.env.SEEDS_DIR || './seeds',
  },
};

export default Object.fromEntries(environments.map((env: string) => [env, commonConfig]));
