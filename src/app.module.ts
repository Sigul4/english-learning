import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexSchemaModule } from './database/knex.module';
import { KnexSchemaBuilderService } from './database/knex-builder.service';
import { MigrationService } from './database/knex-migration.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, KnexSchemaBuilderService, MigrationService],
})
export class AppModule {}
